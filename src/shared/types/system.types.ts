export type SystemStatus =
  | "Planejamento"
  | "Desenvolvimento"
  | "Piloto"
  | "Ativo"
  | "Descontinuado"

export interface SystemContract {
  id: string
  name: string
  short: string
  category: string
  status: SystemStatus
  description: string
  clients: number
  updated: string
  progress: number
  color: string
  appUrl?: string
  stagingUrl?: string
  repoUrl?: string
  healthCheckUrl?: string
  version: string
}
