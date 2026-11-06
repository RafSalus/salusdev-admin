import { MoreHorizontal, UserCheck, AlertTriangle, UserX, Clock, Calendar } from "lucide-react"
import type { Subscription } from "../types/subscription.types"

interface SubscribersTableProps {
  subscriptions: Subscription[]
  onManageSubscription: (sub: Subscription) => void
  onResetFilters?: () => void
}

export function SubscribersTable({
  subscriptions,
  onManageSubscription,
  onResetFilters,
}: SubscribersTableProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="rounded-2xl border border-[#163e32]/10 bg-white p-12 text-center shadow-xs">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-[#f2f7f4] text-[#163e32]">
          <Calendar size={24} />
        </div>
        <h3 className="text-base font-bold text-[#142821]">
          Nenhum assinante encontrado
        </h3>
        <p className="mt-1 text-xs text-[#63766d] max-w-sm mx-auto">
          Não há registros correspondentes aos filtros selecionados. Tente ajustar o produto, o plano ou a busca.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-[#163e32] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0f2d24] transition cursor-pointer"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>
    )
  }

  function renderStatusBadge(status: Subscription["status"]) {
    switch (status) {
      case "Ativo":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dff4e8] px-2.5 py-1 text-[11px] font-extrabold text-[#1f6b4a]">
            <UserCheck size={12} />
            <span>Ativo</span>
          </span>
        )
      case "Em teste":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff6ff] px-2.5 py-1 text-[11px] font-extrabold text-[#2563eb]">
            <Clock size={12} />
            <span>Em teste</span>
          </span>
        )
      case "Inadimplente":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff7ed] px-2.5 py-1 text-[11px] font-extrabold text-[#c26200]">
            <AlertTriangle size={12} />
            <span>Inadimplente</span>
          </span>
        )
      case "Cancelado":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-extrabold text-[#64748b]">
            <UserX size={12} />
            <span>Cancelado</span>
          </span>
        )
    }
  }

  function renderPlanBadge(planName: Subscription["planName"]) {
    switch (planName) {
      case "Gratuito":
        return (
          <span className="rounded-md bg-[#edf2ef] px-2 py-0.5 text-[11px] font-bold text-[#556960]">
            Gratuito
          </span>
        )
      case "Pro":
        return (
          <span className="rounded-md bg-[#e2f3eb] px-2 py-0.5 text-[11px] font-extrabold text-[#163e32]">
            Pro
          </span>
        )
      case "Premium":
        return (
          <span className="rounded-md bg-[#fff2e5] px-2 py-0.5 text-[11px] font-extrabold text-[#b86a2e]">
            Premium
          </span>
        )
    }
  }

  return (
    <div className="rounded-2xl border border-[#163e32]/10 bg-white shadow-xs overflow-hidden">
      {/* Visualização Desktop [D] */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#163e32]/10 bg-[#fbfdfc] font-bold text-[#5c7267] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-5">Assinante</th>
              <th className="py-3.5 px-4">Produto</th>
              <th className="py-3.5 px-4">Plano</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Início</th>
              <th className="py-3.5 px-4">Renovação</th>
              <th className="py-3.5 px-5 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#163e32]/6 text-[#142821]">
            {subscriptions.map((sub) => {
              const initials = sub.customerName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()

              return (
                <tr key={sub.id} className="hover:bg-[#f8faf9] transition">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-8 w-8 place-items-center rounded-xl font-black text-xs text-white shrink-0"
                        style={{ backgroundColor: sub.productColor }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#142821]">
                          {sub.customerName}
                        </div>
                        <div className="text-[11px] text-[#63776e]">
                          {sub.customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold text-white shadow-2xs"
                      style={{ backgroundColor: sub.productColor }}
                    >
                      {sub.productShort} · {sub.productName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {renderPlanBadge(sub.planName)}
                  </td>
                  <td className="py-3.5 px-4">
                    {renderStatusBadge(sub.status)}
                  </td>
                  <td className="py-3.5 px-4 text-[#5c7066] font-medium">
                    {sub.startedAt}
                  </td>
                  <td className="py-3.5 px-4 text-[#5c7066] font-medium">
                    {sub.currentPeriodEnd}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => onManageSubscription(sub)}
                      aria-label={`Gerenciar assinatura de ${sub.customerName}`}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-xl border border-[#163e32]/15 bg-white px-3 py-1.5 text-xs font-bold text-[#163e32] shadow-2xs hover:bg-[#eaf3ee] transition cursor-pointer active:scale-95"
                    >
                      <MoreHorizontal size={14} />
                      <span>Gerenciar</span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Visualização Mobile [M] - Cards Empilhados */}
      <div className="lg:hidden divide-y divide-[#163e32]/8">
        {subscriptions.map((sub) => {
          const initials = sub.customerName
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()

          return (
            <div key={sub.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-2xl font-black text-sm text-white shrink-0"
                    style={{ backgroundColor: sub.productColor }}
                  >
                    {initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#142821]">
                      {sub.customerName}
                    </h4>
                    <p className="text-xs text-[#63776e]">
                      {sub.customerEmail}
                    </p>
                  </div>
                </div>
                {renderStatusBadge(sub.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-[#f8faf9] p-2.5 rounded-xl border border-[#163e32]/6">
                <div>
                  <span className="block text-[10px] font-bold text-[#6f8279] uppercase">
                    Produto
                  </span>
                  <span
                    className="inline-block mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: sub.productColor }}
                  >
                    {sub.productName}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#6f8279] uppercase">
                    Plano
                  </span>
                  <div className="mt-0.5">{renderPlanBadge(sub.planName)}</div>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#6f8279] uppercase">
                    Início
                  </span>
                  <span className="font-medium text-[#2d4138]">{sub.startedAt}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#6f8279] uppercase">
                    Renovação
                  </span>
                  <span className="font-medium text-[#2d4138]">{sub.currentPeriodEnd}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onManageSubscription(sub)}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-[#163e32]/20 bg-white py-2 text-xs font-bold text-[#163e32] shadow-2xs hover:bg-[#eaf3ee] transition active:scale-95"
              >
                <MoreHorizontal size={15} />
                <span>Gerenciar Assinatura</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
