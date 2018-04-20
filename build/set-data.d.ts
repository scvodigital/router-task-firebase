import { RouteMatch, RouterTask, RouteTaskConfiguration } from '@scvo/router';
import { FirebaseAppConfigurations, FirebaseApps } from './interfaces';
export declare class FirebaseSetDataRouterTask extends RouterTask {
    name: string;
    apps: FirebaseApps;
    constructor(appConfigurations: FirebaseAppConfigurations);
    execute(routeMatch: RouteMatch, task: RouteTaskConfiguration): Promise<any>;
}
export interface FirebaseSetDataConfiguration {
    appName: string;
    pathTemplate: string;
    dataTemplate: string;
    parseJson?: boolean;
    setOrUpdate: 'set' | 'update';
}
