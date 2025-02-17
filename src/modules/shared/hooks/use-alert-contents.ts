import { useEffect, useState } from 'react'

export function useAlertContents(props: ToastNotificationProps) {
  const { onDismiss = () => {}, ...restProps } = props

  const [show, setShow] = useState(true)

  const handleDismiss = async () => {
    setShow(false)
    await new Promise(resolve => setTimeout(resolve, 200))
    onDismiss()
  }

  const timeResolveHide = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
    setShow(false)
    await new Promise(resolve => setTimeout(resolve, 200)) // 200 miliseconds
    onDismiss()
  }

  useEffect(() => {
    timeResolveHide()
    if (!show) {
      setShow(true)
    }
  }, [restProps.id])

  return {
    show,
    handleDismiss,
    ...restProps,
  }
}
