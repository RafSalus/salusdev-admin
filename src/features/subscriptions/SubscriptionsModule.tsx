import { useState, useMemo, useEffect } from "react"
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"
import type {
  Subscription,
  SubscriptionFilterState,
  PlanCode,
  SubscriptionStatus,
} from "./types/subscription.types"
import {
  initialPlans,
  initialEntitlements,
  initialSubscriptions,
  getSubscriptionSummaryByProduct,
} from "./data/subscriptions.mock"
import { SubscriptionKpis } from "./components/SubscriptionKpis"
import { SubscriptionFilters } from "./components/SubscriptionFilters"
import { PlansCatalog } from "./components/PlansCatalog"
import { SubscribersTable } from "./components/SubscribersTable"
import { SubscriptionActionModal } from "./components/SubscriptionActionModal"
import { EntitlementsModal } from "./components/EntitlementsModal"
import type { Product } from "@/features/products/types/product.types"

interface SubscriptionsModuleProps {
  products: Product[]
  initialProductId?: number | null
  onClearProductFilter?: () => void
}

export function SubscriptionsModule({
  products,
  initialProductId,
  onClearProductFilter,
}: SubscriptionsModuleProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions)
  const [filters, setFilters] = useState<SubscriptionFilterState>({
    productId: initialProductId || "all",
    planCode: "all",
    status: "all",
    searchQuery: "",
  })

  // Sincroniza se o prop inicial mudar
  useEffect(() => {
    if (initialProductId) {
      setFilters((prev) => ({ ...prev, productId: initialProductId }))
    }
  }, [initialProductId])

  const [activeSubForAction, setActiveSubForAction] = useState<Subscription | null>(null)
  const [isEntitlementsOpen, setIsEntitlementsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev))
    }, 3200)
  }

  // Resumo de KPIs baseado no produto selecionado
  const selectedProduct = useMemo(() => {
    if (filters.productId === "all") return null
    return products.find((p) => p.id === filters.productId) || null
  }, [filters.productId, products])

  const summary = useMemo(() => {
    const prodId = filters.productId === "all" ? null : filters.productId
    return getSubscriptionSummaryByProduct(subscriptions, prodId)
  }, [subscriptions, filters.productId])

  // Filtragem dos assinantes
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      if (filters.productId !== "all" && sub.productId !== filters.productId) {
        return false
      }
      if (filters.planCode !== "all" && sub.planCode !== filters.planCode) {
        return false
      }
      if (filters.status !== "all" && sub.status !== filters.status) {
        return false
      }
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase()
        const matchesName = sub.customerName.toLowerCase().includes(query)
        const matchesEmail = sub.customerEmail.toLowerCase().includes(query)
        if (!matchesName && !matchesEmail) return false
      }
      return true
    })
  }, [subscriptions, filters])

  function handleSaveSubscription(
    subscriptionId: string,
    newStatus: SubscriptionStatus,
    newPlanCode: PlanCode
  ) {
    const planNameMap: Record<PlanCode, "Gratuito" | "Pro" | "Premium"> = {
      free: "Gratuito",
      pro: "Pro",
      premium: "Premium",
    }

    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: newStatus,
              planCode: newPlanCode,
              planName: planNameMap[newPlanCode],
            }
          : sub
      )
    )

    setActiveSubForAction(null)
    showToast("Assinatura e entitlements atualizados com sucesso!")
  }

  function handleResetFilters() {
    setFilters({
      productId: "all",
      planCode: "all",
      status: "all",
      searchQuery: "",
    })
    if (onClearProductFilter) {
      onClearProductFilter()
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Módulo */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2f8064]">
              Centro de Comando Comercial
            </span>
            <span className="rounded-full bg-[#dff4e8] px-2.5 py-0.5 text-[10px] font-black text-[#163e32]">
              Cross-Product B2C
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#142821] tracking-tight">
            Gestão de Assinaturas e Planos
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#5d7168] max-w-2xl">
            Fonte canônica da verdade comercial do ecossistema SalusDev. Gerencie planos, assinantes e entitlements liberados em cada produto.
          </p>
        </div>

        {/* Banner de Demonstração / Cobrança Futura */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-[#163e32]/12 bg-[#f4f9f6] p-3 text-xs">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#163e32] text-[#a4e2c6] shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="font-extrabold text-[#142821]">Módulo Comercial Ativo</div>
            <div className="text-[11px] text-[#556960]">
              Cobrança automatizada via gateway em fase de integração
            </div>
          </div>
        </div>
      </div>

      {/* 1. KPIs Comerciais */}
      <SubscriptionKpis
        summary={summary}
        selectedProductName={selectedProduct?.name}
      />

      {/* 2. Filtros Dinâmicos */}
      <SubscriptionFilters
        filters={filters}
        products={products}
        totalFiltered={filteredSubscriptions.length}
        totalCount={subscriptions.length}
        onFilterChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
        onResetFilters={handleResetFilters}
      />

      {/* 3. Tabela de Assinantes */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-[#142821]">
            Assinantes Cadastrados
          </h2>
          <span className="text-xs font-semibold text-[#667a70]">
            Total filtrado: <strong>{filteredSubscriptions.length}</strong>
          </span>
        </div>
        <SubscribersTable
          subscriptions={filteredSubscriptions}
          onManageSubscription={(sub) => setActiveSubForAction(sub)}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* 4. Catálogo Canônico de Planos B2C e Entitlements */}
      <div className="border-t border-[#163e32]/10 pt-6">
        <PlansCatalog
          plans={initialPlans}
          onOpenEntitlements={() => setIsEntitlementsOpen(true)}
        />
      </div>

      {/* Modal de Ação de Assinatura */}
      <SubscriptionActionModal
        subscription={activeSubForAction}
        open={Boolean(activeSubForAction)}
        onClose={() => setActiveSubForAction(null)}
        onSave={handleSaveSubscription}
      />

      {/* Modal de Matriz de Entitlements */}
      <EntitlementsModal
        open={isEntitlementsOpen}
        entitlements={initialEntitlements}
        onClose={() => setIsEntitlementsOpen(false)}
      />

      {/* Notificação Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-[#163e32]/12 bg-[#163e32] px-4 py-3 text-xs font-bold text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <CheckCircle2 size={16} className="text-[#a4e2c6] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
