import { useRef } from "react"
import { LogOut, ShieldCheck, Mail, UserCheck } from "lucide-react"
import { useDismiss } from "@/shared/hooks/useDismiss"

export interface ProfileMenuProps {
  open: boolean
  onClose: () => void
  userName?: string
  userEmail?: string
  userRole?: string
  userInitials?: string
  onLogout?: () => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

export function ProfileMenu({
  open,
  onClose,
  userName = "Rafael Amaral Salustiano",
  userEmail = "rafael@salusdev.com",
  userRole = "Administrador Geral",
  userInitials = "RA",
  onLogout,
  triggerRef,
}: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useDismiss({
    enabled: open,
    ref: menuRef,
    ignoreRef: triggerRef,
    onDismiss: onClose,
  })

  if (!open) return null

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Menu de perfil do operador"
      className="absolute right-0 top-14 z-50 w-[min(92vw,320px)] rounded-2xl border border-[#163e32]/12 bg-white p-4 shadow-[0_12px_40px_rgba(20,40,33,0.18)] transition-all animate-in fade-in duration-200"
    >
      {/* Bloco de Informações do Operador */}
      <div className="flex items-center gap-3.5 border-b border-[#163e32]/8 pb-3.5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#163e32] text-sm font-black text-white shadow-xs">
          {userInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-black text-[#142821]">{userName}</p>
          <p className="flex items-center gap-1 truncate text-[10px] text-[#60736a] mt-0.5">
            <Mail size={11} className="shrink-0 text-[#8c9992]" />
            <span className="truncate">{userEmail}</span>
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#eaf5ee] px-2 py-0.5 text-[9px] font-black text-[#1e6149]">
            <ShieldCheck size={11} />
            MFA Ativo (AAL2)
          </span>
        </div>
      </div>

      {/* Detalhes do Perfil */}
      <div className="py-3 text-[11px] space-y-1.5 border-b border-[#163e32]/8">
        <div className="flex items-center justify-between text-[#60736a]">
          <span className="flex items-center gap-1.5 text-[10px] font-bold">
            <UserCheck size={13} className="text-[#8c9992]" />
            Papel no sistema
          </span>
          <span className="font-extrabold text-[#142821] text-[10px]">{userRole}</span>
        </div>
        <div className="flex items-center justify-between text-[#60736a]">
          <span className="text-[10px] font-bold">Ambiente</span>
          <span className="font-extrabold text-[#1e6149] text-[10px]">Centro de Comando</span>
        </div>
      </div>

      {/* Ação de Logout */}
      {onLogout && (
        <div className="pt-3">
          <button
            type="button"
            onClick={() => {
              onClose()
              onLogout()
            }}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/80 px-3.5 py-2.5 text-xs font-black text-rose-700 transition active:scale-[0.98] hover:bg-rose-100"
          >
            <LogOut size={15} />
            <span>Encerrar sessão segura</span>
          </button>
        </div>
      )}
    </div>
  )
}
