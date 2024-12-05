import { ProtectedRoute } from '@/components/protected-route'
import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { App } from '../App'
import { RootLayout } from '../layouts/root-layout'
import { DisciplineFilesPage } from './discipline-files-page'
import { LoginPage } from './login-page'
import { ProfilePage } from './profile-page'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  ),
})

const disciplineFilesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/disciplines/$year/$discipline/files',
  component: () => (
    <ProtectedRoute>
      <DisciplineFilesPage />
    </ProtectedRoute>
  ),
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  disciplineFilesRoute,
  loginRoute,
  profileRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
