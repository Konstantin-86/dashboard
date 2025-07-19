import { createRootRoute } from '@tanstack/react-router'
import App from '../App'
import NotFound from '../components/404/notFound'

export const Route = createRootRoute({
    component: App,
    notFoundComponent: NotFound,
})