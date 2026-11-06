import { useState } from "react"
import { Users, UserCheck, Flag, Calendar, RefreshCw } from "lucide-react"
import type { KartDashboardMetrics, KartPilot } from "../types/kartControl.types"
import { KpiCard } from "./KpiCard"
import { PilotRow } from "./PilotRow"

export interface KartDashboardViewProps {
  metrics: KartDashboardMetrics
  pilots: KartPilot[]
  onRefresh: () => void
  onEditPilot: (pilot: KartPilot) => void
}

export function KartDashboardView({
  metrics,
  pilots,
  onRefresh,
  onEditPilot,
}: KartDashboardViewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  function handleRefreshClick() {
    setIsRefreshing(true)
    onRefresh()
    window.setTimeout(() => setIsRefreshing(false), 500)
  }

  return (
    <div className="space-y-6">
      {/* Topo: Título da Página e Botão Atualizar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#23634e]">
            PAINEL ADMINISTRATIVO
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-[#142821]">
            Status geral
          </h1>
        </div>

        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={isRefreshing}
          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-white border border-[#163e32]/12 px-4 py-2 text-xs font-bold text-[#142821] shadow-xs hover:bg-[#f6f8f5] transition active:scale-95 disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin text-[#23634e]" : ""} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* 4 Cards de Métricas / KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Pilotos"
          value={metrics.pilots}
          icon={Users}
        />
        <KpiCard
          label="Inscritos (próxima)"
          value={metrics.nextRegistrations}
          icon={UserCheck}
        />
        <KpiCard
          label="Último resultado"
          value={metrics.lastResult}
          icon={Flag}
        />
        <KpiCard
          label="Eventos"
          value={metrics.events}
          icon={Calendar}
        />
      </div>

      {/* Lista: Últimos pilotos cadastrados */}
      <section className="rounded-2xl border border-[#163e32]/8 bg-white p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 border-b border-[#163e32]/8 pb-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eef7f2] text-[#23634e]">
            <Users size={18} />
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#142821]">
            Últimos pilotos cadastrados
          </h2>
        </div>

        <div className="mt-2 divide-y divide-[#163e32]/6">
          {pilots.length === 0 ? (
            <p className="py-8 text-center text-xs font-semibold text-[#87948e]">
              Nenhum piloto cadastrado nesta unidade.
            </p>
          ) : (
            pilots.map((pilot) => (
              <PilotRow
                key={pilot.id}
                pilot={pilot}
                onEdit={onEditPilot}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}
