import { Icon } from "@/components/ui/Icon"

export interface HeaderProps {
  onOpenSidebar: () => void
  currentSection?: string
}

export function Header({
  onOpenSidebar,
  currentSection = "Produtos",
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

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full bg-[#eff4ef] px-3 py-2 text-[9px] font-extrabold text-[#39735d] sm:flex">
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
        <div className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-[#173e32] text-[10px] font-extrabold text-white lg:hidden">
          RA
        </div>
      </div>
    </header>
  )
}
