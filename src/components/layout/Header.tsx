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
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#173e32]/8 bg-white/95 px-4 backdrop-blur-xl sm:px-7">
      {/* Lado Esquerdo: Mobile exibe Logo oficial (fiel a Dashboard - M.png) / Desktop exibe Breadcrumbs */}
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
        <div className="hidden items-center gap-2 text-[10px] font-bold text-[#95a09b] lg:flex">
          Centro de Comando <Icon name="chevron" size={13} />{" "}
          <span className="text-[#476057]">{currentSection}</span>
        </div>
      </div>

      {/* Lado Direito: Notificações, Perfil e Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Selo de Ambiente Protótipo visível no Desktop */}
        <div className="hidden items-center gap-2 rounded-full bg-[#eff4ef] px-3 py-1.5 text-[9px] font-extrabold text-[#39735d] sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#48a27e]" />{" "}
          Ambiente de protótipo
        </div>

        {/* Botão de Notificações com indicador vermelho (Fiel aos designs D e M) */}
        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#173e32]/8 bg-white text-[#60736a] transition hover:bg-[#f8f9f6]"
          aria-label="Notificações"
        >
          <Icon name="bell" size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#ef795f]" />
        </button>

        {/* Informações do usuário logado no Desktop */}
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

        {/* Botão de Logout seguro */}
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

        {/* Avatar Circular no Mobile: Fiel a Dashboard - M.png (fundo menta com texto escuro) */}
        <div
          title={userName}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf3ee] border border-[#163e32]/10 text-[11px] font-extrabold text-[#163e32] sm:hidden"
        >
          {userInitials}
        </div>
      </div>
    </header>
  )
}

