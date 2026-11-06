export type SubscriptionStatus = "Ativo" | "Em teste" | "Inadimplente" | "Cancelado"

export type PlanCode = "free" | "pro" | "premium"

export type PlanName = "Gratuito" | "Pro" | "Premium"

export interface Plan {
  id: string
  productId?: number
  code: PlanCode
  name: PlanName
  description: string
  priceCents: number | null // null indica "Em breve" (sem cobrança ativa nesta fase)
  currency: string
  interval: "mensal" | "anual"
  features: string[]
  subscriberCount: number
  active: boolean
  highlight?: boolean
}

export interface Customer {
  id: string
  productId: number
  productName: string
  productShort: string
  productColor: string
  name: string
  email: string
  status: SubscriptionStatus
  createdAt: string
}

export interface Subscription {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  productId: number
  productName: string
  productShort: string
  productColor: string
  planId: string
  planCode: PlanCode
  planName: PlanName
  status: SubscriptionStatus
  startedAt: string
  currentPeriodEnd: string
  cancelAt?: string | null
  provider: string // ex: "Em breve (Gateway)"
}

export interface Entitlement {
  id: string
  featureKey: string
  name: string
  description: string
  plans: PlanCode[]
  unlimited: boolean
  limitValue?: number | null
}

export interface SubscriptionSummary {
  activeCount: number
  trialingCount: number
  pastDueCount: number
  canceledCount: number
  totalCount: number
  planDistribution: Record<PlanCode, number>
}

export interface SubscriptionFilterState {
  productId: number | "all"
  planCode: PlanCode | "all"
  status: SubscriptionStatus | "all"
  searchQuery: string
}
