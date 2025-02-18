import { getMeAction } from '@/app/(app)/_functions/get-me.action'
import { signoutAction } from '@/app/(app)/_functions/signout.action'
import { SignupAlert } from './_components/signup-alert'
import { SignupForm } from './_components/signup-form'
import { signupAction } from './_functions/signup.action'

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
