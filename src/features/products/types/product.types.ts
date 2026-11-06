export type ProductStatus =
  | "Planejamento"
  | "Desenvolvimento"
  | "Piloto"
  | "Ativo"
  | "Descontinuado"

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
}

export const statusStyles: Record<ProductStatus, string> = {
  Planejamento: "bg-[#eef0ed] text-[#596b64]",
  Desenvolvimento: "bg-[#fff2d7] text-[#96631d]",
  Piloto: "bg-[#e9e8ff] text-[#5c56a4]",
  Ativo: "bg-[#dff4e8] text-[#287353]",
  Descontinuado: "bg-[#f3e4e2] text-[#9b4e45]",
}
