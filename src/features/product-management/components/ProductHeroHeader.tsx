import React from "react"

export interface ProductHeroHeaderProps {
  name: string
  short: string
  category: string
  description: string
  status: string
  clients: number
  progress: number
  color: string
}

export function ProductHeroHeader({
  name,
  short,
  category,
  description,
  status,
  clients,
  progress,
  color,
}: ProductHeroHeaderProps) {
  return (
    <section className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Identidade visual e textos do produto */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div
            className="grid h-14 w-14 sm:h-16 sm:w-16 shrink-0 place-items-center rounded-2xl text-base sm:text-lg font-black text-white shadow-xs select-none"
            style={{ backgroundColor: color || "#b86a2e" }}
          >
            {short}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#718279]">
              GESTÃO DO PRODUTO · {category}
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-[#142821]">
              {name}
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-[#5a6d63] leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Indicadores de status, clientes e progresso */}
        <div className="flex flex-col gap-3 self-start border-t border-[#163e32]/8 pt-4 lg:self-center lg:border-t-0 lg:pt-0 lg:items-end">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-bold text-[#b45309]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
              {status}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#5a6d63]">
              {clients} {clients === 1 ? "cliente" : "clientes"}
            </span>
          </div>

          <div className="w-full lg:w-48">
            <div className="flex items-center justify-between text-xs font-bold text-[#142821]">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#e5ebe7] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#163e32] transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
