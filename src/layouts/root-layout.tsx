import { Toaster } from '@/components/ui/toaster'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools initialIsOpen={false} />
    </div>
  )
}
