import type {
  Plan,
  Entitlement,
  Subscription,
  SubscriptionSummary,
  PlanCode,
} from "../types/subscription.types"

export const initialPlans: Plan[] = [
  {
    id: "plan-free",
    productId: 4, // KartControl
    code: "free",
    name: "Gratuito",
    description: "Perfil do piloto, inscrição em corridas e acesso aos resultados públicos básicos.",
    priceCents: 0,
    currency: "BRL",
    interval: "mensal",
    features: [
      "Perfil e dados básicos do piloto",
      "Inscrição em baterias e corridas",
      "Resultados públicos e calendário oficial",
      "Estatísticas básicas de participação",
      "Histórico simplificado de etapas",
    ],
    subscriberCount: 28,
    active: true,
  },
  {
    id: "plan-pro",
    productId: 4, // KartControl
    code: "pro",
    name: "Pro",
    description: "Para pilotos dedicados que desejam evolução contínua, histórico completo e comparativos.",
    priceCents: null, // "Em breve"
    currency: "BRL",
    interval: "mensal",
    features: [
      "Tudo incluído no plano Gratuito",
      "Estatísticas avançadas de telemetria",
      "Comparação direta com outros pilotos",
      "Exportação oficial de relatórios em PDF",
      "Histórico completo com filtros por pista",
      "Selo exclusivo Pro no perfil do piloto",
    ],
    subscriberCount: 19,
    active: true,
    highlight: true,
  },
  {
    id: "plan-premium",
    productId: 4, // KartControl
    code: "premium",
    name: "Premium",
    description: "Experiência de ponta com insights táticos por etapa, análise de voltas e suporte VIP.",
    priceCents: null, // "Em breve"
    currency: "BRL",
    interval: "mensal",
    features: [
      "Tudo incluído no plano Pro",
      "Análise profunda de desempenho por volta",
      "Alertas e recomendações inteligentes de ritmo",
      "Comparativo de setores e melhores parciais",
      "Suporte técnico prioritário direto",
      "Selo dourado Premium no perfil oficial",
    ],
    subscriberCount: 10,
    active: true,
  },
]

export const initialEntitlements: Entitlement[] = [
  {
    id: "ent-1",
    featureKey: "profile.basic",
    name: "Perfil básico",
    description: "Perfil e dados cadastrais básicos do piloto",
    plans: ["free", "pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-2",
    featureKey: "races.registration",
    name: "Inscrição em corridas",
    description: "Inscrição regular em etapas e baterias de kartódromo",
    plans: ["free", "pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-3",
    featureKey: "results.public",
    name: "Resultados públicos",
    description: "Acesso a classificações e calendário da temporada",
    plans: ["free", "pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-4",
    featureKey: "stats.basic",
    name: "Estatísticas básicas",
    description: "Métricas básicas de média de tempo e participações",
    plans: ["free", "pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-5",
    featureKey: "stats.advanced",
    name: "Estatísticas avançadas",
    description: "Gráficos de consistência, evolução e desvio padrão",
    plans: ["pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-6",
    featureKey: "stats.comparison",
    name: "Comparação de pilotos",
    description: "Cruzamento de métricas e voltas entre adversários",
    plans: ["pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-7",
    featureKey: "export.pdf",
    name: "Exportação em PDF",
    description: "Emissão de relatórios técnicos em formato para impressão",
    plans: ["pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-8",
    featureKey: "history.full",
    name: "Histórico completo",
    description: "Registro de todas as etapas passadas sem limite de tempo",
    plans: ["pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-9",
    featureKey: "performance.analysis",
    name: "Análise por etapa",
    description: "Decomposição técnica do rendimento volta a volta",
    plans: ["premium"],
    unlimited: true,
  },
  {
    id: "ent-10",
    featureKey: "performance.insights",
    name: "Insights e alertas",
    description: "Sugestões de melhoria de traçado e ritmo de prova",
    plans: ["premium"],
    unlimited: true,
  },
  {
    id: "ent-11",
    featureKey: "support.priority",
    name: "Suporte prioritário",
    description: "Canal direto de atendimento via WhatsApp dedicado",
    plans: ["premium"],
    unlimited: true,
  },
  {
    id: "ent-12",
    featureKey: "badge.pro",
    name: "Selo Pro",
    description: "Destaque visual Pro no aplicativo e na classificação",
    plans: ["pro", "premium"],
    unlimited: true,
  },
  {
    id: "ent-13",
    featureKey: "badge.premium",
    name: "Selo Premium",
    description: "Destaque dourado Premium com prioridade na visualização",
    plans: ["premium"],
    unlimited: true,
  },
]

export const initialSubscriptions: Subscription[] = [
  {
    id: "sub-01",
    customerId: "cust-01",
    customerName: "Cesar Amaral",
    customerEmail: "cesar.a@gmail.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-premium",
    planCode: "premium",
    planName: "Premium",
    status: "Ativo",
    startedAt: "24/07/2026",
    currentPeriodEnd: "24/08/2026",
    provider: "Em breve (Gateway)",
  },
  {
    id: "sub-02",
    customerId: "cust-02",
    customerName: "Lucas Morais",
    customerEmail: "lucas.m88@gmail.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-pro",
    planCode: "pro",
    planName: "Pro",
    status: "Ativo",
    startedAt: "27/04/2026",
    currentPeriodEnd: "27/08/2026",
    provider: "Em breve (Gateway)",
  },
  {
    id: "sub-03",
    customerId: "cust-03",
    customerName: "Thales Toledo",
    customerEmail: "thales.t@hotmail.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-pro",
    planCode: "pro",
    planName: "Pro",
    status: "Ativo",
    startedAt: "27/04/2026",
    currentPeriodEnd: "27/08/2026",
    provider: "Em breve (Gateway)",
  },
  {
    id: "sub-04",
    customerId: "cust-04",
    customerName: "Douglas Prado",
    customerEmail: "douglas.p@gmail.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-free",
    planCode: "free",
    planName: "Gratuito",
    status: "Ativo",
    startedAt: "25/04/2026",
    currentPeriodEnd: "25/08/2026",
    provider: "Plano Base",
  },
  {
    id: "sub-05",
    customerId: "cust-05",
    customerName: "Patricia Alcantara",
    customerEmail: "patricia.a@tempkartapucarana.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-pro",
    planCode: "pro",
    planName: "Pro",
    status: "Em teste",
    startedAt: "25/09/2026",
    currentPeriodEnd: "09/10/2026",
    provider: "Degustação Promocional",
  },
  {
    id: "sub-06",
    customerId: "cust-06",
    customerName: "Reinaldo Hoffmann",
    customerEmail: "reinaldo.h@tempkartapucarana.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-free",
    planCode: "free",
    planName: "Gratuito",
    status: "Em teste",
    startedAt: "25/09/2026",
    currentPeriodEnd: "10/10/2026",
    provider: "Plano Base",
  },
  {
    id: "sub-07",
    customerId: "cust-07",
    customerName: "Ana Julia Silveira",
    customerEmail: "ana.julia@tempkartapucarana.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-pro",
    planCode: "pro",
    planName: "Pro",
    status: "Inadimplente",
    startedAt: "25/09/2026",
    currentPeriodEnd: "25/09/2026",
    provider: "Em breve (Gateway)",
  },
  {
    id: "sub-08",
    customerId: "cust-08",
    customerName: "Villa Kart Racing",
    customerEmail: "villa@tempkartapucarana.com",
    productId: 4, // KartControl
    productName: "KartControl",
    productShort: "KC",
    productColor: "#b86a2e",
    planId: "plan-premium",
    planCode: "premium",
    planName: "Premium",
    status: "Cancelado",
    startedAt: "24/07/2026",
    currentPeriodEnd: "24/08/2026",
    provider: "Cancelamento Solicitado",
  },
  {
    id: "sub-09",
    customerId: "cust-09",
    customerName: "Auto Mecânica Apucarana",
    customerEmail: "contato@automecanicaapucarana.com.br",
    productId: 2, // Salus Oficina
    productName: "Salus Oficina",
    productShort: "SO",
    productColor: "#2f8064",
    planId: "plan-pro",
    planCode: "pro",
    planName: "Pro",
    status: "Ativo",
    startedAt: "10/05/2026",
    currentPeriodEnd: "10/11/2026",
    provider: "Em breve (B2B)",
  },
  {
    id: "sub-10",
    customerId: "cust-10",
    customerName: "Centro Automotivo Estrela",
    customerEmail: "gerencia@autoestrela.com.br",
    productId: 2, // Salus Oficina
    productName: "Salus Oficina",
    productShort: "SO",
    productColor: "#2f8064",
    planId: "plan-premium",
    planCode: "premium",
    planName: "Premium",
    status: "Em teste",
    startedAt: "01/10/2026",
    currentPeriodEnd: "15/10/2026",
    provider: "Piloto Comercial",
  },
]

export function getSubscriptionSummaryByProduct(
  subscriptions: Subscription[],
  productId?: number | null
): SubscriptionSummary {
  const filtered = productId
    ? subscriptions.filter((s) => s.productId === productId)
    : subscriptions

  const summary: SubscriptionSummary = {
    activeCount: 0,
    trialingCount: 0,
    pastDueCount: 0,
    canceledCount: 0,
    totalCount: filtered.length,
    planDistribution: {
      free: 0,
      pro: 0,
      premium: 0,
    },
  }

  for (const sub of filtered) {
    if (sub.status === "Ativo") summary.activeCount++
    else if (sub.status === "Em teste") summary.trialingCount++
    else if (sub.status === "Inadimplente") summary.pastDueCount++
    else if (sub.status === "Cancelado") summary.canceledCount++

    if (summary.planDistribution[sub.planCode] !== undefined) {
      summary.planDistribution[sub.planCode]++
    }
  }

  return summary
}

export function getLatestSubscribersByProduct(
  subscriptions: Subscription[],
  productId: number,
  limit = 4
): Subscription[] {
  return subscriptions
    .filter((s) => s.productId === productId)
    .slice(0, limit)
}
