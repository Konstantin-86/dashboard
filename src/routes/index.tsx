import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import MainPages from '../pages/MainPage'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: MainPages,
})