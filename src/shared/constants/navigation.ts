import type { IconName } from "@/components/ui/Icon"

export interface NavItem {
  label: string
  icon: IconName
  count?: number
  href?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "Visão geral",
    items: [
      { label: "Dashboard", icon: "home" },
      { label: "Leads", icon: "leads", count: 4 },
    ],
  },
  {
    label: "Gestão",
    items: [
      { label: "Produtos", icon: "apps" },
      { label: "Clientes", icon: "clients" },
      { label: "Contratos", icon: "contract" },
      { label: "Assinaturas", icon: "calendar" },
      { label: "Pagamentos", icon: "payments" },
      { label: "Atendimentos", icon: "support" },
    ],
  },
]
