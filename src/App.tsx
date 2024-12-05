import { UserButton } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from './components/ui/button'
import { cn } from './utils/utils'

export const App = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-end">
        <UserButton />
      </div>

      <div className="border rounded-md p-4">
        <div>Disziplinen 24/25</div>

        <div className="flex flex-col items-start">
          <Link
            to="/disciplines/$year/$discipline/files"
            params={{ year: '24-25', discipline: 'barren' }}
            className={cn(buttonVariants({ variant: 'link', size: 'sm' }))}
          >
            Barren
          </Link>
          <Link
            to="/disciplines/$year/$discipline/files"
            params={{ year: '24-25', discipline: 'gk' }}
            className={cn(buttonVariants({ variant: 'link', size: 'sm' }))}
          >
            GK
          </Link>
        </div>
      </div>
    </div>
  )
}
