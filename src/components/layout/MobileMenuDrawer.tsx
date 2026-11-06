import { useState, useRef, useEffect } from "react"
import { Icon } from "@/components/ui/Icon"
import { navGroups } from "@/shared/constants/navigation"

export interface MobileMenuDrawerProps {
  open: boolean
  onClose: () => void
  activeItem?: string
  onSelectSection?: (section: string) => void
}

export function MobileMenuDrawer({
  open,
  onClose,
  activeItem = "Dashboard",
  onSelectSection,
}: MobileMenuDrawerProps) {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef<number>(0)

  // Reset drag position when drawer opens or closes
  useEffect(() => {
    if (!open) {
      setDragY(0)
      setIsDragging(false)
    }
  }, [open])

  // Suporte a gesto de arrastar restrito à alça superior (BUG-0001 corrigido)
  function handleTouchStart(e: React.TouchEvent) {
    startYRef.current = e.touches[0].clientY
    setIsDragging(true)
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging) return
    const delta = e.touches[0].clientY - startYRef.current
    if (delta > 0) {
      setDragY(delta)
    }
  }

  function handleTouchEnd() {
    if (!isDragging) return
    setIsDragging(false)
    if (dragY > 75) {
      onClose()
    }
    setDragY(0)
  }

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        open ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop com desfoque e fechamento ao toque */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-[#0b1a15]/50 backdrop-blur-xs transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Painel Bottom Sheet (desliza suavemente de baixo para cima) */}
      <div
        style={{
          transform: isDragging
            ? `translateY(${dragY}px)`
            : open
            ? "translateY(0)"
            : "translateY(100%)",
          transition: isDragging ? "none" : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-[32px] border-t border-[#163e32]/12 bg-white shadow-[0_-12px_44px_rgba(15,35,27,0.22)]"
      >
        {/* Barra de puxar com o dedo (Drag Handle) com touch-action: none exclusiva */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "none" }}
          className="pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing select-none"
        >
          <span className="h-1.5 w-12 rounded-full bg-[#cbd5d0]" />
        </div>

        {/* Topo do Menu: Logotipo e Botão de Fechar 'X' */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#163e32]/8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef7f2] border border-[#163e32]/12 text-[12px] font-black tracking-tighter text-[#163e32]">
              &lt; / &gt;
            </span>
            <div>
              <p className="text-[17px] font-extrabold leading-none tracking-[-0.035em] text-[#142821]">
                Salus<span className="text-[#23634e]">Dev</span>
              </p>
              <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[.18em] text-[#87948e]">
                Centro de comando
              </p>
            </div>
          </div>

          {/* Botão de Fechar no 'X' */}
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full bg-[#f4f6f3] text-[#4d5e56] transition hover:bg-[#e9eee9] active:scale-95"
            aria-label="Fechar menu"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Conteúdo rolável do menu (rola livremente sem disparar fechamento) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Grupos de Navegação com ícones Lucide */}
          <nav aria-label="Navegação móvel completa" className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#8c9992]">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = item.label === activeItem
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          onSelectSection?.(item.label)
                          onClose()
                        }}
                        className={`flex min-h-[46px] w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition active:scale-[0.98] ${
                          isActive
                            ? "bg-[#163e32] text-white shadow-xs"
                            : "text-[#4d5e56] hover:bg-[#f6f8f5] hover:text-[#163e32]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon name={item.icon} size={19} />
                          <span>{item.label}</span>
                        </span>
                        {item.count !== undefined && (
                          <span
                            className={`grid h-5 min-w-[20px] place-items-center rounded-full px-1.5 text-[9px] font-black ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-[#eaf1ed] text-[#23634e]"
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

            {/* Seção Sistema */}
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#8c9992]">
                Sistema
              </p>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    onSelectSection?.("Configurações")
                    onClose()
                  }}
                  className={`flex min-h-[46px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition active:scale-[0.98] ${
                    activeItem === "Configurações"
                      ? "bg-[#163e32] text-white shadow-xs"
                      : "text-[#4d5e56] hover:bg-[#f6f8f5] hover:text-[#163e32]"
                  }`}
                >
                  <Icon name="settings" size={19} />
                  <span>Configurações</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectSection?.("Ajuda")
                    onClose()
                  }}
                  className={`flex min-h-[46px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition active:scale-[0.98] ${
                    activeItem === "Ajuda"
                      ? "bg-[#163e32] text-white shadow-xs"
                      : "text-[#4d5e56] hover:bg-[#f6f8f5] hover:text-[#163e32]"
                  }`}
                >
                  <Icon name="help" size={19} />
                  <span>Ajuda e Documentação</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
