export interface SystemNode {
  name: string
  domain: string
  status: "Online" | "Operacional" | "Piloto" | "Em Construção"
  latency: string
  type: string
  uptime: string
}

export interface GovernanceEvent {
  id: string
  title: string
  desc: string
  time: string
  type: "auth" | "health" | "product"
}

export const initialSystemNodes: SystemNode[] = [
  {
    name: "SalusDev Institucional",
    domain: "salusdev.com",
    status: "Online",
    latency: "42ms",
    type: "Site Público",
    uptime: "99.98%",
  },
  {
    name: "Salus Oficina (SaaS)",
    domain: "oficina.salusdev.com",
    status: "Online",
    latency: "58ms",
    type: "SaaS Multi-tenant",
    uptime: "99.95%",
  },
  {
    name: "Supabase Auth e MFA",
    domain: "auth.salusdev.com",
    status: "Operacional",
    latency: "31ms",
    type: "Autenticação TOTP",
    uptime: "100.0%",
  },
  {
    name: "Kart Control (Piloto)",
    domain: "kart.salusdev.com",
    status: "Piloto",
    latency: "64ms",
    type: "Gestão Esportiva",
    uptime: "99.40%",
  },
  {
    name: "Finanças Pessoais",
    domain: "financas.salusdev.com",
    status: "Em Construção",
    latency: "-",
    type: "Aplicação Web",
    uptime: "Ambiente Dev",
  },
]

export const initialRecentEvents: GovernanceEvent[] = [
  {
    id: "ev1",
    title: "Sessão MFA Aprovada",
    desc: "Autenticação TOTP bem-sucedida para administrador",
    time: "Hoje, 14:05",
    type: "auth",
  },
  {
    id: "ev2",
    title: "Healthcheck Periódico",
    desc: "5 nós operacionais com latência média de 48ms",
    time: "Hoje, 13:30",
    type: "health",
  },
  {
    id: "ev3",
    title: "Atualização de Portfólio",
    desc: "Módulo de Produtos sincronizado com catálogo canônico",
    time: "Ontem, 18:20",
    type: "product",
  },
]
