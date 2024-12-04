import { Toaster } from '@/components/ui/toaster'
import { Outlet } from '@tanstack/react-router'

export const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  )
}
