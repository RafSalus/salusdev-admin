import {
  LayoutDashboard,
  Package,
  Headphones,
  Users,
  UserPlus,
  FileText,
  CalendarCheck,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react"

export interface DashboardAction {
  id: string
  label: string
  icon: LucideIcon
  section: string
  color: string
  bgLight: string
}

export interface DashboardActionGroup {
  category: string
  items: DashboardAction[]
}

export const dashboardActionGroups: DashboardActionGroup[] = [
  {
    category: "PRINCIPAL",
    items: [
      {
        id: "dash",
        label: "Dashboard",
        icon: LayoutDashboard,
        section: "Dashboard",
        color: "#1e6149",
        bgLight: "#eaf5ee",
      },
      {
        id: "prod",
        label: "Produtos",
        icon: Package,
        section: "Produtos",
        color: "#c07f2b",
        bgLight: "#fef4e8",
      },
      {
        id: "atend",
        label: "Atendimentos",
        icon: Headphones,
        section: "Atendimentos",
        color: "#2c77aa",
        bgLight: "#eef5fc",
      },
    ],
  },
  {
    category: "COMERCIAL",
    items: [
      {
        id: "cli",
        label: "Clientes",
        icon: Users,
        section: "Clientes",
        color: "#714fb0",
        bgLight: "#f4effc",
      },
      {
        id: "leads",
        label: "Leads",
        icon: UserPlus,
        section: "Leads",
        color: "#248263",
        bgLight: "#eaf6f2",
      },
      {
        id: "cont",
        label: "Contratos",
        icon: FileText,
        section: "Contratos",
        color: "#b87c2b",
        bgLight: "#fef6ea",
      },
    ],
  },
  {
    category: "OPERACIONAL",
    items: [
      {
        id: "ass",
        label: "Assinaturas",
        icon: CalendarCheck,
        section: "Assinaturas",
        color: "#2c77aa",
        bgLight: "#eef5fc",
      },
      {
        id: "pag",
        label: "Pagamentos",
        icon: CreditCard,
        section: "Pagamentos",
        color: "#714fb0",
        bgLight: "#f4effc",
      },
      {
        id: "conf",
        label: "Configurações",
        icon: Settings,
        section: "Configurações",
        color: "#426154",
        bgLight: "#eef2ee",
      },
    ],
  },
]
