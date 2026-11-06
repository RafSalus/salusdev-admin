import { Users, UserCheck, AlertTriangle, UserX, TrendingUp } from "lucide-react"
import type { SubscriptionSummary } from "../types/subscription.types"

interface SubscriptionKpisProps {
  summary: SubscriptionSummary
  selectedProductName?: string
}

export function SubscriptionKpis({ summary, selectedProductName }: SubscriptionKpisProps) {
  return (
    <div className="space-y-3">
      {selectedProductName && (
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5a6f65]">
          <span>Métricas filtradas para o produto:</span>
          <span className="rounded-md bg-[#163e32]/10 px-2 py-0.5 font-bold text-[#163e32]">
            {selectedProductName}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* 1. Ativos */}
        <div className="rounded-2xl border border-[#163e32]/10 bg-white p-4 sm:p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-[#6b7f75] uppercase">
              Ativos
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#dff4e8] text-[#287353]">
              <UserCheck size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#142821]">
              {summary.activeCount}
            </span>
            <span className="text-[11px] font-semibold text-[#6b7f75]">assinantes</span>
          </div>
        </div>

        {/* 2. Em Teste (Trial) */}
        <div className="rounded-2xl border border-[#163e32]/10 bg-white p-4 sm:p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-[#6b7f75] uppercase">
              Em Teste
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#142821]">
              {summary.trialingCount}
            </span>
            <span className="text-[11px] font-semibold text-[#6b7f75]">degustação</span>
          </div>
        </div>

        {/* 3. Inadimplentes */}
        <div className="rounded-2xl border border-[#163e32]/10 bg-white p-4 sm:p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-[#6b7f75] uppercase">
              Inadimplentes
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#fff7ed] text-[#d97706]">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#142821]">
              {summary.pastDueCount}
            </span>
            <span className="text-[11px] font-semibold text-[#6b7f75]">pendentes</span>
          </div>
        </div>

        {/* 4. Cancelados */}
        <div className="rounded-2xl border border-[#163e32]/10 bg-white p-4 sm:p-5 shadow-xs transition hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-[#6b7f75] uppercase">
              Cancelados
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#f1f5f9] text-[#64748b]">
              <UserX size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#142821]">
              {summary.canceledCount}
            </span>
            <span className="text-[11px] font-semibold text-[#6b7f75]">inativos</span>
          </div>
        </div>

        {/* 5. Faturamento / Gateway */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#163e32]/10 bg-linear-to-br from-[#163e32] to-[#0f2d24] p-4 sm:p-5 text-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-[#a4e2c6] uppercase">
              Cobrança B2C
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-white">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="mt-3 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-white">
                R$ --,--
              </span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-white uppercase">
                Em breve
              </span>
            </div>
            <span className="mt-1 text-[11px] font-medium text-[#c0e8d6]">
              Gateway de pagamentos
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
