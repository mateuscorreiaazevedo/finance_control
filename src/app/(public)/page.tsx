import { getTranslations } from '@/modules/shared/utils'

export default async function Landingpage() {
  const { translate } = await getTranslations()

  return (
    <div>
      <p>{translate('common.hello')}</p>
    </div>
  )
}
