import { useState, useRef } from "react"
import { Home, Users, Calendar, Award, GitMerge, MoreHorizontal, ArrowLeft, LogOut } from "lucide-react"
import type { KartSection } from "../types/kartControl.types"
import { useDismiss } from "@/shared/hooks/useDismiss"

export interface KartSidebarProps {
  currentSection: KartSection
  onSelectSection: (section: KartSection) => void
  onExitToSalusDev: () => void
  onCloseMobileDrawer?: () => void
}

interface NavItemDef {
  key: KartSection
  label: string
  icon: typeof Home
}

const navItems: NavItemDef[] = [
  { key: "Início", label: "Início", icon: Home },
  { key: "Pilotos", label: "Pilotos", icon: Users },
  { key: "Calendário", label: "Calendário", icon: Calendar },
  { key: "Resultados", label: "Resultados", icon: Award },
  { key: "Mesclar", label: "Mesclar", icon: GitMerge },
]

export function KartSidebar({
  currentSection,
  onSelectSection,
  onExitToSalusDev,
  onCloseMobileDrawer,
}: KartSidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useDismiss({
    enabled: menuOpen,
    ref: menuRef,
    ignoreRef: buttonRef,
    onDismiss: () => setMenuOpen(false),
  })

  function handleNav(section: KartSection) {
    onSelectSection(section)
    onCloseMobileDrawer?.()
  }

  return (
    <aside className="flex h-full w-[252px] flex-col justify-between border-r border-[#163e32]/8 bg-white px-4 py-5 select-none">
      {/* Topo: Brand SalusDev e Card do Produto */}
      <div className="space-y-6">
        {/* Marca SalusDev - Link de Retorno ao Centro de Comando */}
        <button
          type="button"
          onClick={onExitToSalusDev}
          className="flex w-full items-center gap-3 px-2 text-left transition hover:opacity-80 group cursor-pointer"
          title="Voltar ao Centro de Comando SalusDev"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#eef7f2] border border-[#163e32]/12 text-[11px] font-black tracking-tighter text-[#163e32]">
            &lt; / &gt;
          </span>
          <div>
            <p className="text-[17px] font-extrabold leading-none tracking-[-0.035em] text-[#142821]">
              Salus<span className="text-[#23634e]">Dev</span>
            </p>
            <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[.18em] text-[#87948e] group-hover:text-[#163e32] transition">
              Centro de comando
            </p>
          </div>
        </button>

        {/* Card do Produto KartControl */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#163e32]/8 bg-[#fbfcfb] p-3 shadow-2xs">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#b86a2e] text-xs font-black text-white shadow-2xs">
            KC
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-black text-[#142821]">
              KartControl
            </p>
            <p className="truncate text-[10px] font-medium text-[#7a8a83] mt-0.5">
              Kart Apucarana
            </p>
          </div>
        </div>

        {/* Navegação ADMINISTRAÇÃO */}
        <div>
          <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8c9992]">
            ADMINISTRAÇÃO
          </p>
          <nav className="space-y-1" aria-label="Navegação administrativa KartControl">
            {navItems.map((item) => {
              const isActive = currentSection === item.key
              const IconComp = item.icon

              return (
                <button
                  key={item.key}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleNav(item.key)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition active:scale-[0.98] ${
                    isActive
                      ? "bg-[#163e32] text-white shadow-xs"
                      : "text-[#4d5e56] hover:bg-[#f6f8f5] hover:text-[#163e32]"
                  }`}
                >
                  <IconComp size={18} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Rodapé: Administrador e Menu de Ações */}
      <div className="relative border-t border-[#163e32]/8 pt-4">
        <div className="flex items-center justify-between rounded-xl p-2 hover:bg-[#f8faf8] transition">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eaf3ee] text-xs font-extrabold text-[#163e32]">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[#142821] leading-tight">
                Administrador
              </p>
              <p className="truncate text-[10px] font-medium text-[#87948e]">
                Kart Apucarana
              </p>
            </div>
          </div>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu do operador"
            className="grid h-8 w-8 place-items-center rounded-lg text-[#667770] hover:bg-[#eef2ef] transition"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Flyout de opções do operador */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute bottom-16 right-2 z-50 w-52 rounded-2xl border border-[#163e32]/12 bg-white p-2 shadow-xl animate-in fade-in duration-150"
          >
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onExitToSalusDev()
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-[#163e32] hover:bg-[#f6f8f5] transition"
            >
              <ArrowLeft size={14} />
              <span>Voltar à Gestão SalusDev</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onExitToSalusDev()
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={14} />
              <span>Sair do painel</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
