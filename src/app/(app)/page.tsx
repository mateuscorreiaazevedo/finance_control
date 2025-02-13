import { UserFactory } from '@/modules/user'

export default async function App() {
  const { data, error, ok } = await UserFactory.findAll()

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-xl">Olá mundo</h1>
      {ok ? <pre>{JSON.stringify({ data }, null, 2)}</pre> : <p>{error}</p>}
    </div>
  )
}
