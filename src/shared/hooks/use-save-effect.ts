import { type DependencyList, type EffectCallback, useEffect, useRef } from 'react'

export function useSaveEffect(effect: EffectCallback, deps?: DependencyList) {
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      effect()
    }
  }, deps)
}
