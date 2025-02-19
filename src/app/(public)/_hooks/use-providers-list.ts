import images from '@/assets/images'
import { useTranslations } from '@/modules/shared/hooks'

type ProviderItem = {
  key: string
  label: string
}

type NewProviderItem = {
  key: string
  label: string
  icon: any
}

export function useProvidersList() {
  const { translateArray } = useTranslations()
  const listProviders: NewProviderItem[] = []

  const providerIconDictionary: Record<string, any> = {
    google: images.icons.google,
  }

  const providers = translateArray<ProviderItem>('common.public.providers.list')

  if (Array.isArray(providers)) {
    providers.forEach(provider => {
      listProviders.push({
        ...provider,
        icon: providerIconDictionary[provider.key],
      })
    })
  }

  return listProviders
}
