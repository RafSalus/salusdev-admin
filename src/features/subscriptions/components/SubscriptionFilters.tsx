import { Search, RotateCcw } from "lucide-react"
import type {
  SubscriptionFilterState,
  PlanCode,
  SubscriptionStatus,
} from "../types/subscription.types"
import type { Product } from "@/features/products/types/product.types"

interface SubscriptionFiltersProps {
  filters: SubscriptionFilterState
  products: Product[]
  totalFiltered: number
  totalCount: number
  onFilterChange: (patch: Partial<SubscriptionFilterState>) => void
  onResetFilters: () => void
}

export function SubscriptionFilters({
  filters,
  products,
  totalFiltered,
  totalCount,
  onFilterChange,
  onResetFilters,
}: SubscriptionFiltersProps) {
  const hasActiveFilters =
    filters.productId !== "all" ||
    filters.planCode !== "all" ||
    filters.status !== "all" ||
    filters.searchQuery.trim() !== ""

  return (
    <div className="rounded-2xl border border-[#163e32]/10 bg-white p-4 sm:p-5 shadow-xs">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Busca por nome ou e-mail */}
        <div className="relative">
          <label htmlFor="search-subscribers" className="block text-[11px] font-bold text-[#64786e] uppercase mb-1">
            Buscar assinante
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7f9389]"
            />
            <input
              id="search-subscribers"
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Nome ou e-mail..."
              className="w-full rounded-xl border border-[#163e32]/15 bg-[#fbfdfc] py-2.5 pl-10 pr-3 text-xs sm:text-sm font-semibold text-[#142821] placeholder-[#8a9d94] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* 2. Filtro por Produto */}
        <div>
          <label htmlFor="filter-product" className="block text-[11px] font-bold text-[#64786e] uppercase mb-1">
            Filtrar por produto
          </label>
          <select
            id="filter-product"
            value={filters.productId}
            onChange={(e) =>
              onFilterChange({
                productId: e.target.value === "all" ? "all" : Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-[#163e32]/15 bg-[#fbfdfc] py-2.5 px-3 text-xs sm:text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
          >
            <option value="all">Todos os produtos ({totalCount})</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.short})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Filtro por Plano */}
        <div>
          <label htmlFor="filter-plan" className="block text-[11px] font-bold text-[#64786e] uppercase mb-1">
            Filtrar por plano
          </label>
          <select
            id="filter-plan"
            value={filters.planCode}
            onChange={(e) =>
              onFilterChange({
                planCode: e.target.value as PlanCode | "all",
              })
            }
            className="w-full rounded-xl border border-[#163e32]/15 bg-[#fbfdfc] py-2.5 px-3 text-xs sm:text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
          >
            <option value="all">Todos os planos</option>
            <option value="free">Gratuito</option>
            <option value="pro">Pro</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {/* 4. Filtro por Status */}
        <div>
          <label htmlFor="filter-status" className="block text-[11px] font-bold text-[#64786e] uppercase mb-1">
            Filtrar por status
          </label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value as SubscriptionStatus | "all",
              })
            }
            className="w-full rounded-xl border border-[#163e32]/15 bg-[#fbfdfc] py-2.5 px-3 text-xs sm:text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
          >
            <option value="all">Todos os status</option>
            <option value="Ativo">Ativo</option>
            <option value="Em teste">Em teste</option>
            <option value="Inadimplente">Inadimplente</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Barra de status de filtragem */}
      {hasActiveFilters && (
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#163e32]/8 pt-3 text-xs">
          <span className="font-semibold text-[#5a6e64]">
            Exibindo <strong className="text-[#142821]">{totalFiltered}</strong> de{" "}
            {totalCount} assinaturas encontradas
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold text-[#163e32] hover:bg-[#eaf3ee] transition active:scale-95"
          >
            <RotateCcw size={13} />
            <span>Limpar filtros</span>
          </button>
        </div>
      )}
    </div>
  )
}
