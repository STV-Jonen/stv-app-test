import { SignIn } from '@clerk/clerk-react'
import React from 'react'

type Props = {}

export const LoginPage = ({}: Props) => {
  return (
    <div>
      <SignIn />
    </div>
  )
}
