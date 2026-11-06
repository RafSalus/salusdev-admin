import { Icon } from "@/components/ui/Icon"

export interface HeaderProps {
  onOpenSidebar: () => void
  currentSection?: string
  userName?: string
  userInitials?: string
  onLogout?: () => void
}

export function Header({
  onOpenSidebar,
  currentSection = "Produtos",
  userName = "Rafael Amaral Salustiano",
  userInitials = "RA",
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#173e32]/8 bg-white/90 px-4 backdrop-blur-xl sm:px-7">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#173e32]/9 text-[#5e7168] lg:hidden"
          aria-label="Abrir menu de navegação"
        >
          <Icon name="menu" size={19} />
        </button>
        <div className="hidden items-center gap-2 text-[10px] font-bold text-[#95a09b] sm:flex">
          Centro de Comando <Icon name="chevron" size={13} />{" "}
          <span className="text-[#476057]">{currentSection}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-[#eff4ef] px-3 py-1.5 text-[9px] font-extrabold text-[#39735d] sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#48a27e]" />{" "}
          Ambiente de protótipo
        </div>

        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#173e32]/8 bg-white text-[#60736a] hover:bg-[#f8f9f6]"
          aria-label="Notificações"
        >
          <Icon name="bell" size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#ef795f]" />
        </button>

        {/* Informações do usuário logado */}
        <div className="hidden items-center gap-2.5 rounded-xl border border-[#173e32]/8 bg-white px-2.5 py-1.5 sm:flex">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#173e32] text-[10px] font-extrabold text-white">
            {userInitials}
          </div>
          <div className="text-left">
            <p className="text-[11px] font-bold text-[#18342a] leading-tight">
              {userName}
            </p>
            <p className="text-[9px] text-[#48a27e] font-semibold">MFA Ativo</p>
          </div>
        </div>

        {/* Botão de Logout (AUTH-06 e AUTH-12) */}
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title="Encerrar sessão com segurança"
            aria-label="Encerrar sessão"
            className="flex h-10 items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/70 px-3 text-xs font-bold text-rose-700 transition hover:bg-rose-100/80"
          >
            <Icon name="logout" size={16} />
            <span className="hidden md:inline">Sair</span>
          </button>
        )}

        <div className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-[#173e32] text-[10px] font-extrabold text-white sm:hidden">
          {userInitials}
        </div>
      </div>
    </header>
  )
}

