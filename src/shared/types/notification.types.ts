export type NotificationType = "info" | "success" | "warning"

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: NotificationType
}
