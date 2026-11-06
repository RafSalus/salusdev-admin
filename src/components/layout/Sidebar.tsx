import { Icon } from "@/components/ui/Icon"
import { Logo } from "./Logo"
import { navGroups } from "@/shared/constants/navigation"

export interface SidebarProps {
  open: boolean
  onClose: () => void
  activeItem?: string
  onSelectSection?: (section: string) => void
  userName?: string
  userInitials?: string
  onLogout?: () => void
}

export function Sidebar({
  open,
  onClose,
  activeItem = "Produtos",
  onSelectSection,
  userName = "Rafael Salustiano",
  userInitials = "RA",
  onLogout,
}: SidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0c1d17]/35 backdrop-blur-sm lg:hidden"
          aria-label="Fechar menu"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 hidden lg:flex w-[252px] flex-col border-r border-[#173e32]/8 bg-white px-4 py-5`}
      >
        <div className="flex items-center justify-between px-2">
          <Logo />
        </div>

        <nav className="mt-8 flex-1 overflow-y-auto" aria-label="Navegação administrativa">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="mb-2 px-3 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#9ca6a1]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = item.label === activeItem
                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => {
                        onSelectSection?.(item.label)
                        onClose()
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[12px] font-bold transition ${
                        isActive
                          ? "bg-[#173e32] text-white shadow-sm"
                          : "text-[#586b63] hover:bg-[#f4f6f1] hover:text-[#173e32]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon name={item.icon} size={18} />
                        {item.label}
                      </span>
                      {item.count !== undefined && (
                        <span
                          className={`grid h-5 min-w-[20px] place-items-center rounded-full px-1.5 text-[9px] font-extrabold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-[#eaf1ed] text-[#337a5f]"
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[#173e32]/8 pt-3 space-y-1">
          <button
            type="button"
            onClick={() => {
              onSelectSection?.("Configurações")
              onClose()
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[12px] font-bold transition ${
              activeItem === "Configurações"
                ? "bg-[#173e32] text-white shadow-sm"
                : "text-[#687871] hover:bg-[#f5f6f2] hover:text-[#173e32]"
            }`}
          >
            <Icon name="settings" size={18} /> Configurações
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectSection?.("Ajuda")
              onClose()
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[12px] font-bold transition ${
              activeItem === "Ajuda"
                ? "bg-[#173e32] text-white shadow-sm"
                : "text-[#687871] hover:bg-[#f5f6f2] hover:text-[#173e32]"
            }`}
          >
            <Icon name="help" size={18} /> Ajuda
          </button>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#f5f6f2] p-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#173e32] text-[10px] font-extrabold text-white">
            {userInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-extrabold text-[#243d34]">
              {userName}
            </p>
            <p className="text-[9px] font-semibold text-[#8a9791]">
              Administrador
            </p>
          </div>
        </div>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title="Encerrar sessão com segurança"
            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/70 py-2 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100"
          >
            <Icon name="logout" size={14} />
            <span>Sair do sistema</span>
          </button>
        )}
      </aside>
    </>
  )
}
