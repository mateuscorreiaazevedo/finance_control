import { signoutAction } from '@/modules/shared/functions'
import { getMeAction } from '@/modules/user/functions'
import { signupAction } from './_actions/signup.action'
import { SignupAlert } from './_components/signup-alert'
import { SignupForm } from './_components/signup-form'

export default async function SignUpPage() {
  const { data, error } = await getMeAction()

  return (
    <div className="w-full flex-col gap-2 h-screen flex items-center justify-center">
      <h1>Cadastro</h1>
      <SignupForm onSignup={signupAction} onSignout={signoutAction} />
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
      <SignupAlert error={error} />
    </div>
  )
}
