import { SignOutButton, useAuth } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { Button, buttonVariants } from './components/ui/button'
import { cn } from './utils/utils'

type Props = {}

export const App = ({}: Props) => {
  const { userId } = useAuth()
  return (
    <div className="p-4 space-y-4">
      <div>
        <div>Benutzer</div>
        <div>{userId}</div>
        <SignOutButton redirectUrl="/login">
          <Button>Abmelden</Button>
        </SignOutButton>
      </div>
      <div className="border rounded-md p-4">
        <div>Disziplinen</div>

        <Link
          to="/disciplines/$year/$discipline/files"
          params={{ year: '24-25', discipline: 'barren' }}
          className={cn(buttonVariants({ variant: 'link' }))}
        >
          Barren
        </Link>
      </div>
    </div>
  )
}
