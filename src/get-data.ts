import {Helpers, RouteMatch, RouterTask, RouteTaskConfiguration, RouteTaskError} from '@scvo/router';
import * as firebase from 'firebase-admin';

import {FirebaseAppConfiguration, FirebaseAppConfigurations, FirebaseApps} from './interfaces';

const hbs = require('clayhandlebars')();

export class FirebaseGetDataRouterTask extends RouterTask {
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
            credential: firebase.credential.cert(config.credential),
            databaseURL: config.databaseURL
          }, appName);
      }
    });
  }

  /* tslint:disable:no-any */
  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
    const config: FirebaseGetDataConfiguration =
        (task.config as FirebaseGetDataConfiguration);
    const pathCompiled = hbs.compile(config.pathTemplate);
    const path = pathCompiled(routeMatch);
    const app = this.apps[config.appName];
    const snapshot: firebase.database.DataSnapshot =
        await app.database().ref(path).once('value');
    if (snapshot.exists()) {
      return snapshot.val();
    } else if (config.defaultData) {
      return config.defaultData;
    } else {
      throw new Error('Failed to load data at: ' + path);
    }
  }
  /* tslint:enable:no-any */
}

/* tslint:disable:no-any */
export interface FirebaseGetDataConfiguration {
  appName: string;
  pathTemplate: string;
  defaultData?: any;
}
/* tslint:enable:no-any */
