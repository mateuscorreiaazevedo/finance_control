import { User } from '@/domain/user'
import { SetTheme } from '@/shared/components'

export default function DashboardPage() {
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    birthDate: new Date('1990-01-01'),
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-02'),
    password: 'Xkipi34.',
  })

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-2">
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <SetTheme />
    </div>
  )
}
