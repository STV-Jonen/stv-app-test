import { SignIn } from '@clerk/clerk-react'

type Props = {}

export const LoginPage = ({}: Props) => {
  return (
    <div>
      <SignIn />
    </div>
  )
}
