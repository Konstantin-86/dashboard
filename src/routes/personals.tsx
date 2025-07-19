import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import Personals from '../pages/PersonalsPage'

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: '/personals',
    component: Personals,

})