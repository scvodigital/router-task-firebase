import {RouterTask, RouteMatch, Helpers, RouteTaskError, RouteTaskConfiguration} from '@scvo/router';

export class FirebaseAuthRouterTask extends RouterTask {
  name = 'firebase-auth';

  constructor() {
    super();
  }

  async execute(routeMatch: RouteMatch, task: RouteTaskConfiguration):
      Promise<any> {
  }
}
