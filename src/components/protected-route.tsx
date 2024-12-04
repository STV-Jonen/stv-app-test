import { isNotNullOrUndefined } from '@/utils/utils'
import { RedirectToSignIn, useAuth } from '@clerk/clerk-react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isLoaded, userId } = useAuth()

  if (!isLoaded) return null

  return isNotNullOrUndefined(userId) ? <>{children}</> : <RedirectToSignIn />
}
