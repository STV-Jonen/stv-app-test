import { SignIn } from '@clerk/clerk-react'

export const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <SignIn />
    </div>
  )
}
