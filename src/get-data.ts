import {RouterTask, RouteMatch, Helpers, RouteTaskError, RouteTaskConfiguration} from '@scvo/router';

export class FirebaseGetDataRouterTask extends RouterTask {
  name = 'firebase-get-data';

  constructor() {
    super();
  }

  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
  }
}
