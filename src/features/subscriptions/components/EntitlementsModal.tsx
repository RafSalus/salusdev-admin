import { useEffect, useRef } from "react"
import { X, Check, Minus, ShieldCheck, Layers } from "lucide-react"
import type { Entitlement } from "../types/subscription.types"

interface EntitlementsModalProps {
  open: boolean
  entitlements: Entitlement[]
  onClose: () => void
}

export function EntitlementsModal({
  open,
  entitlements,
  onClose,
}: EntitlementsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="entitlements-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d2218]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-3xl border border-[#163e32]/15 bg-white shadow-2xl overflow-hidden"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-[#163e32]/10 px-6 py-4.5 bg-[#fbfdfc]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#dff4e8] text-[#163e32]">
              <Layers size={20} />
            </div>
            <div>
              <h2 id="entitlements-modal-title" className="text-base sm:text-lg font-bold text-[#142821]">
                Matriz Canônica de Entitlements
              </h2>
              <p className="text-xs text-[#63766d]">
                Controle de acessos e recursos liberados em tempo real por plano
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="grid h-9 w-9 place-items-center rounded-xl text-[#61746c] hover:bg-[#eef4f0] hover:text-[#142821] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabela de Entitlements */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="overflow-x-auto rounded-2xl border border-[#163e32]/10 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#163e32]/10 bg-[#f4f8f6] font-bold text-[#163e32]">
                <tr>
                  <th className="py-3 px-4">Recurso / Entitlement</th>
                  <th className="py-3 px-3 text-center">Gratuito</th>
                  <th className="py-3 px-3 text-center bg-[#eef7f3]">Pro</th>
                  <th className="py-3 px-3 text-center bg-[#fff8f2]">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#163e32]/8 text-[#253930]">
                {entitlements.map((ent) => {
                  const hasFree = ent.plans.includes("free")
                  const hasPro = ent.plans.includes("pro")
                  const hasPremium = ent.plans.includes("premium")

                  return (
                    <tr key={ent.id} className="hover:bg-[#fafcfb] transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#142821]">{ent.name}</div>
                        <div className="text-[11px] text-[#6d8076]">{ent.description}</div>
                        <code className="text-[10px] text-[#8e9f96] font-mono">{ent.featureKey}</code>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {hasFree ? (
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-[#dff4e8] text-[#163e32] mx-auto">
                            <Check size={14} />
                          </div>
                        ) : (
                          <div className="grid h-6 w-6 place-items-center text-[#a8b7af] mx-auto">
                            <Minus size={14} />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center bg-[#f7faf8]">
                        {hasPro ? (
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-[#163e32] text-white mx-auto shadow-xs">
                            <Check size={14} />
                          </div>
                        ) : (
                          <div className="grid h-6 w-6 place-items-center text-[#a8b7af] mx-auto">
                            <Minus size={14} />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center bg-[#fdfcf9]">
                        {hasPremium ? (
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-[#b86a2e] text-white mx-auto shadow-xs">
                            <ShieldCheck size={14} />
                          </div>
                        ) : (
                          <div className="grid h-6 w-6 place-items-center text-[#a8b7af] mx-auto">
                            <Minus size={14} />
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-between border-t border-[#163e32]/10 bg-[#fbfdfc] px-6 py-4">
          <p className="text-[11px] font-semibold text-[#667a70]">
            Fonte canônica de entitlements do ecossistema SalusDev
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#163e32] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0f2d24] transition active:scale-95 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
