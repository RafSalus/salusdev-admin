export type ProductStatus =
  | "Planejamento"
  | "Desenvolvimento"
  | "Piloto"
  | "Ativo"
  | "Descontinuado"

export interface ProductAdmin {
  id: string
  name: string
  email: string
  role: string
  mfaStatus: "Ativo" | "Pendente" | "Inativo"
  lastAccessAt: string
  status: "Ativo" | "Revogado"
}

export interface ProductHealth {
  status: "Operacional" | "Degradado" | "Indisponível"
  uptime: string
  latencyMs: number
  version: string
  lastCheckedAt: string
}

export interface ProductAuditLog {
  id: string
  actor: string
  action: string
  target: string
  timestamp: string
}

export interface Product {
  id: number
  name: string
  short: string
  category: string
  status: ProductStatus
  description: string
  clients: number
  updated: string
  progress: number
  color: string
  appUrl?: string
  repoUrl?: string
  // Campos de Gestão Técnica e Acessos (ADM-04)
  repositoryUrl?: string
  databaseName?: string
  webUrl?: string
  adminConfigured?: boolean
  adminPanelConfigured?: boolean
  adminPanelUrl?: string
  adminEmail?: string
  adminPasswordMasked?: string
  // Governança de Produto (Plano 0012)
  admins?: ProductAdmin[]
  health?: ProductHealth
  auditLogs?: ProductAuditLog[]
}

export const statusStyles: Record<ProductStatus, string> = {
  Planejamento: "bg-[#eef0ed] text-[#596b64]",
  Desenvolvimento: "bg-[#fff2d7] text-[#96631d]",
  Piloto: "bg-[#e9e8ff] text-[#5c56a4]",
  Ativo: "bg-[#dff4e8] text-[#287353]",
  Descontinuado: "bg-[#f3e4e2] text-[#9b4e45]",
}
