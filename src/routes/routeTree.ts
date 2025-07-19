// src/routes/routeTree.ts
import { Route as RootRoute } from './__root';
import { Route as IndexRoute } from './index';
import { Route as PersonalsRoute } from './personals';
import { Route as TemplatesRoute } from './template';


export const routeTree = RootRoute.addChildren([
    IndexRoute,
    PersonalsRoute,
    TemplatesRoute
    // ...другие маршруты
]);