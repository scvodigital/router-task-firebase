import { RouteMatch, RouterTask, RouteTaskConfiguration } from '@scvo/router';
import * as firebase from 'firebase-admin';
import { FirebaseAppConfigurations, FirebaseApps } from './interfaces';
export declare class FirebaseAuthRouterTask extends RouterTask {
    name: string;
    apps: FirebaseApps;
    constructor(appConfigurations: FirebaseAppConfigurations);
    execute(routeMatch: RouteMatch, task: RouteTaskConfiguration): Promise<firebase.auth.UserRecord>;
}
export interface FirebaseAuthConfiguration {
    cookie: string;
    appName: string;
    noCookieRoute?: string;
    notAuthenticatedRoute?: string;
}
