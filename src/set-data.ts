import {Helpers, RouteMatch, RouterTask, RouteTaskConfiguration, RouteTaskError} from '@scvo/router';
import * as firebase from 'firebase-admin';

import {FirebaseAppConfiguration, FirebaseAppConfigurations, FirebaseApps} from './interfaces';

const hbs = require('clayhandlebars')();

export class FirebaseSetDataRouterTask extends RouterTask {
  name = 'firebase-get-data';
  apps: FirebaseApps = {};

  constructor(appConfigurations: FirebaseAppConfigurations) {
    super();
    firebase.apps.forEach((app: firebase.app.App | null) => { 
      if (app) {
        this.apps[app.name] = app;
      }
    });
    Object.keys(appConfigurations).forEach(appName => {
      if (!this.apps.hasOwnProperty(appName)) {
        var config = appConfigurations[appName];
        this.apps[appName] =
          firebase.initializeApp({
            credential: firebase.credential.cert(
              (config.credential as firebase.ServiceAccount)
            ),
            databaseURL: config.databaseURL
          }, appName);
      }
    });
  }

  /* tslint:disable:no-any */
  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
    const config: FirebaseSetDataConfiguration =
        (task.config as FirebaseSetDataConfiguration);
    console.log('pathTemplate:', config.pathTemplate);
    const pathCompiled = hbs.compile(config.pathTemplate);
    console.log('dataTemplate:', config.dataTemplate);
    const dataCompiled = hbs.compile(config.dataTemplate);
    const path = pathCompiled(routeMatch);
    const dataString = dataCompiled(routeMatch);
    const data = config.parseJson ? JSON.parse(dataString) : dataString;

    const app = this.apps[config.appName];

    if (config.setOrUpdate === 'set') {
      const response = await app.database().ref(path).set(data);
      return response;
    } else if (config.setOrUpdate === 'update') {
      const response = await app.database().ref(path).update(data);
      return response;
    } else { 
      throw new Error('Task missing "setOrUpdate" property');
    }
  }
  /* tslint:enable:no-any */
}

/* tslint:disable:no-any */
export interface FirebaseSetDataConfiguration {
  appName: string;
  pathTemplate: string;
  dataTemplate: string;
  parseJson?: boolean;
  setOrUpdate: 'set' | 'update';
}
/* tslint:enable:no-any */
