import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import TemplatePage from '../pages/TemplatePage'

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: '/templates',
    component: TemplatePage,

})