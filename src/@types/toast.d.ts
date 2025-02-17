declare interface ToastNotificationProps {
  id: string
  title?: string
  description?: string
  isDismissed?: boolean
  withIcon?: boolean
  onDismiss?: () => void
}
