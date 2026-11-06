import { useState, useRef } from "react"
import { Icon } from "@/components/ui/Icon"
import { NotificationsMenu } from "./NotificationsMenu"
import { ProfileMenu } from "./ProfileMenu"
import { initialNotifications } from "@/shared/data/notifications.mock"
import type { NotificationItem } from "@/shared/types/notification.types"

export interface HeaderProps {
  onOpenSidebar: () => void
  currentSection?: string
  breadcrumbOverride?: React.ReactNode
  userName?: string
  userEmail?: string
  userRole?: string
  userInitials?: string
  onLogout?: () => void
}

export function Header({
  onOpenSidebar,
  currentSection = "Produtos",
  breadcrumbOverride,
  userName = "Rafael Amaral Salustiano",
  userEmail = "rafael@salusdev.com",
  userRole = "Administrador Geral",
  userInitials = "RA",
  onLogout,
}: HeaderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const bellTriggerRef = useRef<HTMLButtonElement>(null)
  const desktopProfileRef = useRef<HTMLButtonElement>(null)
  const mobileProfileRef = useRef<HTMLButtonElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  function handleToggleNotifications() {
    setProfileOpen(false)
    setNotificationsOpen((prev) => !prev)
  }

  function handleToggleProfile() {
    setNotificationsOpen(false)
    setProfileOpen((prev) => !prev)
  }

  function handleMarkAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#173e32]/8 bg-white/95 pt-safe backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:h-[68px] sm:px-7">
        {/* Lado Esquerdo: Mobile exibe Logo oficial / Desktop exibe Breadcrumbs */}
        <div className="flex items-center gap-3">
          {/* Marca SalusDev visível no Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#eef7f2] border border-[#163e32]/12 text-[11px] font-black tracking-tighter text-[#163e32]">
              &lt; / &gt;
            </span>
            <span className="text-[17px] font-extrabold tracking-[-0.035em] text-[#142821]">
              Salus<span className="text-[#23634e]">Dev</span>
            </span>
          </div>

          {/* Breadcrumb visível a partir de tablet/desktop */}
          {breadcrumbOverride ? (
            <div className="hidden lg:block">{breadcrumbOverride}</div>
          ) : (
            <div className="hidden items-center gap-2 text-[10px] font-bold text-[#95a09b] lg:flex">
              Centro de Comando <Icon name="chevron" size={13} />{" "}
              <span className="text-[#476057]">{currentSection}</span>
            </div>
          )}
        </div>

        {/* Lado Direito: Notificações e Perfil */}
        <div className="relative flex items-center gap-2 sm:gap-3">
          {/* Selo de Ambiente Protótipo visível no Desktop */}
          <div className="hidden items-center gap-2 rounded-full bg-[#eff4ef] px-3 py-1.5 text-[9px] font-extrabold text-[#39735d] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#48a27e]" />{" "}
            Ambiente de protótipo
          </div>

          {/* Botão de Notificações */}
          <div className="relative">
            <button
              ref={bellTriggerRef}
              type="button"
              onClick={handleToggleNotifications}
              aria-label="Abrir notificações"
              aria-expanded={notificationsOpen}
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#173e32]/8 bg-white text-[#60736a] transition hover:bg-[#f8f9f6] active:scale-95"
            >
              <Icon name="bell" size={19} />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#ef795f]" />
              )}
            </button>

            {/* Flyout de Notificações */}
            <NotificationsMenu
              open={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllAsRead}
              triggerRef={bellTriggerRef}
            />
          </div>

          {/* Menu de Perfil no Desktop (Bloco clicável) */}
          <div className="relative hidden sm:block">
            <button
              ref={desktopProfileRef}
              type="button"
              onClick={handleToggleProfile}
              aria-label="Abrir menu do perfil"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              className="flex items-center gap-2.5 rounded-xl border border-[#173e32]/8 bg-white px-3 py-1.5 transition hover:bg-[#f8f9f6] active:scale-95"
            >
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#173e32] text-[10px] font-extrabold text-white">
                {userInitials}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#18342a] leading-tight">
                  {userName}
                </p>
                <p className="text-[9px] text-[#48a27e] font-semibold">MFA Ativo</p>
              </div>
            </button>
          </div>

          {/* Avatar Circular no Mobile: Aciona o Menu de Perfil (com logout) */}
          <div className="relative sm:hidden">
            <button
              ref={mobileProfileRef}
              type="button"
              onClick={handleToggleProfile}
              title="Abrir perfil do operador"
              aria-label="Abrir perfil do operador"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf3ee] border border-[#163e32]/10 text-[11px] font-extrabold text-[#163e32] transition active:scale-95"
            >
              {userInitials}
            </button>
          </div>

          {/* Flyout de Perfil (atende mobile e desktop) */}
          <ProfileMenu
            open={profileOpen}
            onClose={() => setProfileOpen(false)}
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
            userInitials={userInitials}
            onLogout={onLogout}
            triggerRef={profileOpen ? (window.innerWidth < 640 ? mobileProfileRef : desktopProfileRef) : undefined}
          />
        </div>
      </div>
    </header>
  )
}
