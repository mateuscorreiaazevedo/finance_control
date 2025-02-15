import { getTranslations } from '@/modules/core'

export default async function App() {
  const { translate } = await getTranslations()

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-xl">{translate('common.gretting', { name: 'Mateus' })}</h1>
    </div>
  )
}
