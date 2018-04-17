import { RouteMatch, RouterTask, RouteTaskConfiguration } from '@scvo/router';
import { FirebaseApps, FirebaseAppConfigurations } from './interfaces';
export declare class FirebaseGetDataRouterTask extends RouterTask {
    name: string;
    apps: FirebaseApps;
    constructor(appConfigurations: FirebaseAppConfigurations);
    execute(routeMatch: RouteMatch, task: RouteTaskConfiguration): Promise<any>;
}
