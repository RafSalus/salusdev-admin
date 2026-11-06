import { useEffect, useState } from "react"
import { X, CheckCircle2, UserCog } from "lucide-react"
import type {
  Subscription,
  PlanCode,
  SubscriptionStatus,
} from "../types/subscription.types"

interface SubscriptionActionModalProps {
  subscription: Subscription | null
  open: boolean
  onClose: () => void
  onSave: (
    subscriptionId: string,
    newStatus: SubscriptionStatus,
    newPlanCode: PlanCode
  ) => void
}

export function SubscriptionActionModal({
  subscription,
  open,
  onClose,
  onSave,
}: SubscriptionActionModalProps) {
  const [status, setStatus] = useState<SubscriptionStatus>("Ativo")
  const [planCode, setPlanCode] = useState<PlanCode>("pro")

  useEffect(() => {
    if (subscription) {
      setStatus(subscription.status)
      setPlanCode(subscription.planCode)
    }
  }, [subscription])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
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

  if (!open || !subscription) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(subscription!.id, status, planCode)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-sub-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d2218]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-[#163e32]/15 bg-white shadow-2xl overflow-hidden">
        {/* Topo */}
        <div className="flex items-center justify-between border-b border-[#163e32]/10 px-6 py-4.5 bg-[#fbfdfc]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#dff4e8] text-[#163e32]">
              <UserCog size={20} />
            </div>
            <div>
              <h2 id="manage-sub-title" className="text-base font-bold text-[#142821]">
                Gerenciar Assinatura
              </h2>
              <p className="text-xs text-[#63766d]">
                Ações comerciais e liberação de acessos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-xl text-[#61746c] hover:bg-[#eef4f0] hover:text-[#142821] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Dados do Assinante */}
          <div className="rounded-2xl bg-[#f5f8f6] p-4 border border-[#163e32]/8">
            <div className="font-extrabold text-sm text-[#142821]">
              {subscription.customerName}
            </div>
            <div className="text-xs text-[#61746b]">
              {subscription.customerEmail}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#667a70]">Produto:</span>
              <span
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-bold text-white text-[11px]"
                style={{ backgroundColor: subscription.productColor }}
              >
                {subscription.productName} ({subscription.productShort})
              </span>
            </div>
          </div>

          {/* Plano */}
          <div>
            <label htmlFor="sub-plan-select" className="block text-xs font-bold text-[#4e6359] uppercase mb-1">
              Plano de Assinatura
            </label>
            <select
              id="sub-plan-select"
              value={planCode}
              onChange={(e) => setPlanCode(e.target.value as PlanCode)}
              className="w-full rounded-xl border border-[#163e32]/20 bg-[#fbfdfc] px-3.5 py-2.5 text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
            >
              <option value="free">Gratuito</option>
              <option value="pro">Pro (Intermediário)</option>
              <option value="premium">Premium (Completo VIP)</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="sub-status-select" className="block text-xs font-bold text-[#4e6359] uppercase mb-1">
              Status da Assinatura
            </label>
            <select
              id="sub-status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
              className="w-full rounded-xl border border-[#163e32]/20 bg-[#fbfdfc] px-3.5 py-2.5 text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
            >
              <option value="Ativo">Ativo (Regular)</option>
              <option value="Em teste">Em teste (Degustação)</option>
              <option value="Inadimplente">Inadimplente (Pendente)</option>
              <option value="Cancelado">Cancelado (Suspenso)</option>
            </select>
          </div>

          <div className="rounded-xl border border-[#b86a2e]/20 bg-[#fff9f3] p-3 text-[11px] font-semibold text-[#8a5223]">
            As alterações são aplicadas instantaneamente e atualizam os entitlements do usuário no produto correspondente.
          </div>

          {/* Botões */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] rounded-xl border border-[#163e32]/20 px-4 py-2 text-xs font-bold text-[#163e32] hover:bg-[#eef4f0] transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="min-h-[44px] flex items-center gap-1.5 rounded-xl bg-[#163e32] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0f2d24] transition cursor-pointer active:scale-95"
            >
              <CheckCircle2 size={16} />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
