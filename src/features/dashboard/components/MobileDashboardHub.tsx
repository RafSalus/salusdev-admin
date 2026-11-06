import {
  Package,
  Wrench,
  CheckCircle2,
  Users,
  ShieldCheck,
  Activity,
} from "lucide-react"
import type { Product } from "@/features/products/types/product.types"
import { dashboardActionGroups } from "../data/dashboardActions"
import { initialSystemNodes } from "../data/dashboard.mock"

export interface MobileDashboardHubProps {
  products?: Product[]
  userName?: string
  onSelectSection: (section: string) => void
}

export function MobileDashboardHub({
  products = [],
  userName = "Rafael",
  onSelectSection,
}: MobileDashboardHubProps) {
  const firstName = userName.split(" ")[0] || "Rafael"

  // Cálculos de métricas a partir dos dados de produtos
  const totalProducts = products.length
  const devProducts = products.filter((p) => p.status === "Desenvolvimento").length
  const activeProducts = products.filter((p) => p.status === "Ativo").length
  const totalClients = products.reduce((acc, p) => acc + p.clients, 0)

  // 3 primeiros nós de sistemas essenciais para visão compacta
  const priorityNodes = initialSystemNodes.slice(0, 3)

  return (
    <div className="mx-auto max-w-[420px] pb-32 pt-1 lg:hidden">
      {/* 1. Saudação Compacta */}
      <header className="mb-5 px-1">
        <h1 className="text-[22px] font-black tracking-tight text-[#142821]">
          Olá, {firstName}
        </h1>
        <p className="mt-0.5 text-xs font-medium text-[#60736a]">
          Centro de comando e visão operacional do ecossistema.
        </p>
      </header>

      {/* 2. Resumo em 2x2 (KPIs Compactos) */}
      <section className="mb-5 grid grid-cols-2 gap-2.5" aria-label="Métricas resumidas">
        {/* Total de Produtos */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#163e32]/8 bg-white p-3 shadow-xs">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf5ee] text-[#1e6149]">
            <Package size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-black leading-none text-[#142821]">
              {totalProducts.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 truncate text-[10px] font-bold text-[#60736a]">
              Total Produtos
            </p>
          </div>
        </div>

        {/* Em Construção */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#163e32]/8 bg-white p-3 shadow-xs">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fef4e8] text-[#c07f2b]">
            <Wrench size={17} />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-black leading-none text-[#142821]">
              {devProducts.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 truncate text-[10px] font-bold text-[#60736a]">
              Em Construção
            </p>
          </div>
        </div>

        {/* Ativos */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#163e32]/8 bg-white p-3 shadow-xs">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eef5fc] text-[#2c77aa]">
            <CheckCircle2 size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-black leading-none text-[#142821]">
              {activeProducts.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 truncate text-[10px] font-bold text-[#60736a]">
              Sistemas Ativos
            </p>
          </div>
        </div>

        {/* Clientes */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#163e32]/8 bg-white p-3 shadow-xs">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f4effc] text-[#714fb0]">
            <Users size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-black leading-none text-[#142821]">
              {totalClients.toString().padStart(2, "0")}
            </p>
            <p className="mt-1 truncate text-[10px] font-bold text-[#60736a]">
              Clientes Totais
            </p>
          </div>
        </div>
      </section>

      {/* 3. Status dos Sistemas (Cartão Compacto com 3 Linhas) */}
      <section className="mb-6 rounded-2xl border border-[#163e32]/8 bg-white p-3.5 shadow-xs" aria-label="Status dos sistemas">
        <div className="flex items-center justify-between border-b border-[#163e32]/6 pb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#142821]">
            <Activity size={14} className="text-[#1e6149]" />
            <span>Saúde Operacional</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#eaf5ee] px-2 py-0.5 text-[9px] font-black text-[#1e6149]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1e6149]" />
            Todos online
          </span>
        </div>

        <div className="mt-2.5 divide-y divide-[#163e32]/5">
          {priorityNodes.map((node) => (
            <div key={node.name} className="flex items-center justify-between py-2 text-xs first:pt-1 last:pb-1">
              <div className="min-w-0 flex-1 pr-2">
                <p className="truncate text-[11px] font-bold text-[#142821]">{node.name}</p>
                <p className="text-[9px] text-[#8c9992]">{node.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold text-[#8c9992]">{node.latency}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf5ee] px-2 py-0.5 text-[9px] font-bold text-[#1e6149]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1e6149]" />
                  {node.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Acesso Rápido em Grade Compacta 3 Colunas (54px tiles) */}
      <div className="space-y-6">
        {dashboardActionGroups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="mb-2.5 px-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#85948c]"
            >
              {group.category}
            </h2>

            <div className="grid grid-cols-3 gap-2.5">
              {group.items.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectSection(item.section)}
                    aria-label={`Acessar ${item.label}`}
                    className="group flex flex-col items-center justify-center rounded-2xl border border-[#163e32]/6 bg-white p-3 shadow-xs transition-all duration-150 active:scale-95 active:bg-[#f6f8f5] hover:border-[#163e32]/15 hover:shadow-sm"
                  >
                    {/* Tile Quadrado Compacto (~48-52px) */}
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl transition-transform duration-150 group-hover:scale-105"
                      style={{ backgroundColor: item.bgLight, color: item.color }}
                    >
                      <IconComponent size={21} strokeWidth={2.2} />
                    </span>

                    {/* Rótulo Centralizado com quebra controlada */}
                    <span className="mt-2 text-center text-[11px] font-bold tracking-tight text-[#142821] line-clamp-2">
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
