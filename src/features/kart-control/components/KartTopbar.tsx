import { useState, useRef } from "react"
import { ChevronRight, ExternalLink, Menu, ChevronDown, Check, ArrowLeft, LogOut } from "lucide-react"
import type { KartSection, KartUnit } from "../types/kartControl.types"
import { useDismiss } from "@/shared/hooks/useDismiss"

export interface KartTopbarProps {
  currentSection: KartSection
  currentUnit: KartUnit
  availableUnits: KartUnit[]
  onSelectUnit: (unit: KartUnit) => void
  onOpenMobileDrawer: () => void
  onExitToSalusDev: () => void
  onOpenSite: () => void
}

export function KartTopbar({
  currentSection,
  currentUnit,
  availableUnits,
  onSelectUnit,
  onOpenMobileDrawer,
  onExitToSalusDev,
  onOpenSite,
}: KartTopbarProps) {
  const [unitOpen, setUnitOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const unitRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useDismiss({
    enabled: unitOpen,
    ref: unitRef,
    onDismiss: () => setUnitOpen(false),
  })

  useDismiss({
    enabled: userOpen,
    ref: userRef,
    onDismiss: () => setUserOpen(false),
  })

  return (
    <header className="sticky top-0 z-30 border-b border-[#163e32]/8 bg-white/95 pt-safe backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-7">
        {/* Esquerda: Menu mobile e Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileDrawer}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#163e32]/10 bg-white text-[#4d5e56] lg:hidden"
            aria-label="Abrir menu de navegação"
          >
            <Menu size={19} />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#87948e]">
            <span>KartControl</span>
            <ChevronRight size={13} className="text-[#a0aaa5]" />
            <span className="text-[#142821] font-extrabold">{currentSection}</span>
          </div>
        </div>

        {/* Direita: Unidade, Voltar ao Site e Avatar */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Seletor de Unidade */}
          <div ref={unitRef} className="relative">
            <button
              type="button"
              onClick={() => setUnitOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#45574f] hover:bg-[#f6f8f5] transition"
            >
              <span>{currentUnit.name}</span>
              <ChevronDown size={13} className="text-[#8c9992]" />
            </button>

            {unitOpen && (
              <div className="absolute right-0 top-11 z-50 w-56 rounded-2xl border border-[#163e32]/12 bg-white p-2 shadow-xl animate-in fade-in duration-150">
                <p className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#8c9992]">
                  Unidade operacional
                </p>
                <div className="space-y-0.5 mt-1">
                  {availableUnits.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        onSelectUnit(u)
                        setUnitOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs font-bold transition ${
                        u.id === currentUnit.id
                          ? "bg-[#eaf5ee] text-[#1e6149]"
                          : "text-[#4d5e56] hover:bg-[#f6f8f5]"
                      }`}
                    >
                      <span>{u.name}</span>
                      {u.id === currentUnit.id && <Check size={13} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botão Voltar ao Site */}
          <button
            type="button"
            onClick={onOpenSite}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#163e32]/12 bg-white px-3.5 py-2 text-xs font-bold text-[#142821] shadow-2xs hover:bg-[#f6f8f5] transition active:scale-95"
            title="Acessar o site do KartControl"
          >
            <ExternalLink size={13} />
            <span>Voltar ao Site</span>
          </button>

          {/* Avatar com Menu */}
          <div ref={userRef} className="relative">
            <button
              type="button"
              onClick={() => setUserOpen((prev) => !prev)}
              aria-label="Abrir menu do operador"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#eaf3ee] border border-[#163e32]/12 text-xs font-extrabold text-[#163e32] hover:bg-[#dcefe3] transition active:scale-95"
            >
              A
            </button>

            {userOpen && (
              <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-[#163e32]/12 bg-white p-3 shadow-xl animate-in fade-in duration-150">
                <div className="border-b border-[#163e32]/8 pb-2.5 mb-2">
                  <p className="text-xs font-black text-[#142821]">Administrador</p>
                  <p className="text-[10px] text-[#7a8a83]">{currentUnit.name}</p>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserOpen(false)
                      onOpenSite()
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold text-[#45574f] hover:bg-[#f6f8f5] transition sm:hidden"
                  >
                    <ExternalLink size={13} />
                    <span>Acessar o Site</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserOpen(false)
                      onExitToSalusDev()
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold text-[#163e32] hover:bg-[#f6f8f5] transition"
                  >
                    <ArrowLeft size={13} />
                    <span>Voltar à Gestão SalusDev</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserOpen(false)
                      onExitToSalusDev()
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={13} />
                    <span>Sair do painel</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
