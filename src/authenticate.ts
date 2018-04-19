import {Helpers, RouteMatch, RouterTask, RouteTaskConfiguration, RouteTaskError} from '@scvo/router';
import * as firebase from 'firebase-admin';

import {FirebaseAppConfiguration, FirebaseAppConfigurations, FirebaseApps} from './interfaces';

export class FirebaseAuthRouterTask extends RouterTask {
  name = 'firebase-auth';
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

  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<firebase.auth.UserRecord> {
    const config: FirebaseAuthConfiguration =
        (task.config as FirebaseAuthConfiguration);
    if (!routeMatch.request.cookies.hasOwnProperty(config.cookie)) {
      throw new RouteTaskError(new Error('No authentication token provided'), {
        data: null,
        redirectTo: config.noCookieRoute,
        sourceRoute: routeMatch,
        statusCode: 403,
        task
      });
    }
    const idToken = routeMatch.request.cookies[config.cookie];
    const app = this.apps[config.appName];
    const decodedToken = await app.auth().verifyIdToken(idToken);
    if (!decodedToken) {
      throw new RouteTaskError(new Error('Failed to verify token'), {
        data: null,
        redirectTo: config.notAuthenticatedRoute,
        sourceRoute: routeMatch,
        statusCode: 403,
        task
      });
    }
    const user = await app.auth().getUser(decodedToken.uid);
    if (!user) {
      throw new Error('Failed to get user ' + decodedToken.uid);
    }
    return user;
  }
}

export interface FirebaseAuthConfiguration {
  cookie: string;
  appName: string;
  noCookieRoute?: string;
  notAuthenticatedRoute?: string;
}
