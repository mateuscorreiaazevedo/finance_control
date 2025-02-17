import type { ComponentType } from 'react'
import toast from 'react-hot-toast'

type Props = {
  component: ComponentType<ToastNotificationProps>
  props: Omit<ToastNotificationProps, 'onDismiss'>
}

export function useToast() {
  function setNotification({ component: Component, props: { id, ...props } }: Props) {
    toast.custom(
      t => <Component id={`toast-${id}`} onDismiss={() => toast.dismiss(t.id)} {...props} />,
      {
        id: id,
        duration: 2400, // 2.4 seconds
      },
    )
  }

  return { setNotification }
}
