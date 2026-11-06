import { ArrowRight, Users, UserCheck, AlertTriangle, UserX, Clock } from "lucide-react"
import {
  initialSubscriptions,
  getSubscriptionSummaryByProduct,
  getLatestSubscribersByProduct,
} from "@/features/subscriptions/data/subscriptions.mock"

interface ProductSubscriptionsCardProps {
  productId: number
  productName: string
  onNavigateToSubscriptions?: (productId: number) => void
}

export function ProductSubscriptionsCard({
  productId,
  productName,
  onNavigateToSubscriptions,
}: ProductSubscriptionsCardProps) {
  const summary = getSubscriptionSummaryByProduct(initialSubscriptions, productId)
  const latestSubscribers = getLatestSubscribersByProduct(initialSubscriptions, productId, 4)

  return (
    <div className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs space-y-5">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eaf3ee] text-[#163e32]">
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#142821]">
              Assinaturas e Planos B2C
            </h3>
            <p className="text-xs text-[#63766d]">
              Resumo comercial derivado da fonte única de assinaturas
            </p>
          </div>
        </div>

        {onNavigateToSubscriptions && (
          <button
            type="button"
            onClick={() => onNavigateToSubscriptions(productId)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#163e32] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0f2d24] transition active:scale-95 cursor-pointer"
          >
            <span>Ver em Assinaturas</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* Agregados de Assinantes */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#163e32]/8 bg-[#f8faf9] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Ativos
          </span>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <UserCheck size={14} className="text-[#287353]" />
            <span className="text-lg font-black text-[#142821]">
              {summary.activeCount}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-[#163e32]/8 bg-[#f8faf9] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Em Teste
          </span>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <Clock size={14} className="text-[#2563eb]" />
            <span className="text-lg font-black text-[#142821]">
              {summary.trialingCount}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-[#163e32]/8 bg-[#f8faf9] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Inadimplentes
          </span>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <AlertTriangle size={14} className="text-[#d97706]" />
            <span className="text-lg font-black text-[#142821]">
              {summary.pastDueCount}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-[#163e32]/8 bg-[#f8faf9] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Cancelados
          </span>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <UserX size={14} className="text-[#64748b]" />
            <span className="text-lg font-black text-[#142821]">
              {summary.canceledCount}
            </span>
          </div>
        </div>
      </div>

      {/* Prévia dos últimos assinantes */}
      <div className="space-y-2.5">
        <span className="block text-xs font-bold text-[#445b50] uppercase tracking-wider">
          Últimos Assinantes Vinculados
        </span>

        {latestSubscribers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#163e32]/15 p-6 text-center text-xs text-[#6e8177]">
            Nenhum assinante cadastrado para este produto ainda.
          </div>
        ) : (
          <div className="divide-y divide-[#163e32]/8 rounded-xl border border-[#163e32]/10 bg-[#fbfdfc] overflow-hidden">
            {latestSubscribers.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between p-3 text-xs hover:bg-white transition"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="grid h-7 w-7 place-items-center rounded-lg text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: sub.productColor }}
                  >
                    {sub.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#142821]">
                      {sub.customerName}
                    </div>
                    <div className="text-[11px] text-[#6b7e75]">
                      {sub.customerEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                      sub.planCode === "premium"
                        ? "bg-[#fff2e5] text-[#b86a2e]"
                        : sub.planCode === "pro"
                        ? "bg-[#e2f3eb] text-[#163e32]"
                        : "bg-[#edf2ef] text-[#556960]"
                    }`}
                  >
                    {sub.planName}
                  </span>
                  <span className="text-[11px] font-medium text-[#798d83]">
                    {sub.startedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-[11px] text-[#6b7f75]">
        * A governança de produto não armazena dados de pagamento ou credenciais financeiras. Toda gestão comercial é centralizada no módulo global Assinaturas.
      </div>
    </div>
  )
}
