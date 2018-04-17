import { RouteMatch, RouterTask, RouteTaskConfiguration } from '@scvo/router';
import { FirebaseAppConfigurations, FirebaseApps } from './interfaces';
export declare class FirebaseGetDataRouterTask extends RouterTask {
    name: string;
    apps: FirebaseApps;
    constructor(appConfigurations: FirebaseAppConfigurations);
    execute(routeMatch: RouteMatch, task: RouteTaskConfiguration): Promise<any>;
}
export interface FirebaseGetDataConfiguration {
    appName: string;
    pathTemplate: string;
    defaultData?: any;
}
