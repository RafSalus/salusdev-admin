export type KartPilotStatus = "Pendente" | "Ativo"

export interface KartPilot {
  id: number
  name: string
  email: string
  phone: string
  status: KartPilotStatus
  date: string
}

export interface KartDashboardMetrics {
  pilots: number
  nextRegistrations: number
  lastResult: string
  events: number
}

export type KartSection = "Início" | "Pilotos" | "Calendário" | "Resultados" | "Mesclar"

export interface KartUnit {
  id: string
  name: string
}
