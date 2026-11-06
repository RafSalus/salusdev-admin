import { useRef } from "react"
import { Bell, CheckCheck, ShieldCheck, Info, CheckCircle2, Inbox } from "lucide-react"
import type { NotificationItem } from "@/shared/types/notification.types"
import { useDismiss } from "@/shared/hooks/useDismiss"

export interface NotificationsMenuProps {
  open: boolean
  onClose: () => void
  notifications: NotificationItem[]
  onMarkAllAsRead: () => void
  onSelectNotification?: (id: string) => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

export function NotificationsMenu({
  open,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  triggerRef,
}: NotificationsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useDismiss({
    enabled: open,
    ref: menuRef,
    ignoreRef: triggerRef,
    onDismiss: onClose,
  })

  if (!open) return null

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-label="Painel de notificações"
      className="absolute right-0 top-14 z-50 w-[min(92vw,360px)] rounded-2xl border border-[#163e32]/12 bg-white p-4 shadow-[0_12px_40px_rgba(20,40,33,0.18)] transition-all animate-in fade-in duration-200"
    >
      {/* Cabeçalho do Painel */}
      <div className="flex items-center justify-between border-b border-[#163e32]/8 pb-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#eaf5ee] text-[#1e6149]">
            <Bell size={15} />
          </span>
          <h3 className="text-xs font-black text-[#142821]">Notificações</h3>
          {unreadCount > 0 && (
            <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-[#ef795f] px-1.5 text-[9px] font-black text-white">
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1 text-[10px] font-bold text-[#23634e] hover:underline"
          >
            <CheckCheck size={13} />
            <span>Marcar lidas</span>
          </button>
        )}
      </div>

      {/* Lista de Notificações */}
      <div className="mt-3 max-h-[320px] space-y-2 overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <div className="py-8 text-center">
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#f4f6f3] text-[#7a8a83]">
              <Inbox size={20} />
            </span>
            <p className="mt-2 text-xs font-bold text-[#142821]">Nenhuma notificação</p>
            <p className="text-[10px] text-[#7a8a83]">Você está em dia com tudo.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectNotification?.(item.id)
                onClose()
              }}
              className={`flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition ${
                item.read
                  ? "bg-transparent hover:bg-[#f6f8f5]"
                  : "bg-[#f4f8f5] hover:bg-[#ebf3ee]"
              }`}
            >
              <span
                className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                  item.type === "success"
                    ? "bg-[#eaf5ee] text-[#1e6149]"
                    : item.type === "warning"
                    ? "bg-[#fef4e8] text-[#c07f2b]"
                    : "bg-[#eef5fc] text-[#2c77aa]"
                }`}
              >
                {item.type === "success" ? (
                  <CheckCircle2 size={14} />
                ) : item.type === "warning" ? (
                  <ShieldCheck size={14} />
                ) : (
                  <Info size={14} />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[11px] font-black text-[#142821]">
                    {item.title}
                  </p>
                  {!item.read && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef795f]" />
                  )}
                </div>
                <p className="mt-0.5 text-[10px] leading-relaxed text-[#60736a] line-clamp-2">
                  {item.message}
                </p>
                <p className="mt-1 text-[9px] font-semibold text-[#8c9992]">
                  {item.time}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
