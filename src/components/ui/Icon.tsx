import type { ComponentType } from "react"
import {
  LayoutGrid,
  ArrowRight,
  Bell,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Users,
  X,
  Code2,
  FileText,
  Copy,
  MoreHorizontal,
  ExternalLink,
  Eye,
  EyeOff,
  CircleDollarSign,
  Grid2X2,
  CircleHelp,
  Home,
  KeyRound,
  UserPlus,
  Lock,
  LogOut,
  Mail,
  Menu,
  CreditCard,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Headphones,
  TrendingUp,
  type LucideProps,
} from "lucide-react"

export type IconName =
  | "apps"
  | "arrow"
  | "bell"
  | "briefcase"
  | "calendar"
  | "check"
  | "chevron"
  | "clients"
  | "close"
  | "code"
  | "contract"
  | "copy"
  | "dots"
  | "external"
  | "eye"
  | "eye-off"
  | "finance"
  | "grid"
  | "help"
  | "home"
  | "key"
  | "leads"
  | "lock"
  | "logout"
  | "mail"
  | "menu"
  | "payments"
  | "plus"
  | "refresh"
  | "search"
  | "settings"
  | "shield"
  | "support"
  | "trend"

const iconMap: Record<IconName, ComponentType<LucideProps>> = {
  apps: LayoutGrid,
  arrow: ArrowRight,
  bell: Bell,
  briefcase: Briefcase,
  calendar: Calendar,
  check: Check,
  chevron: ChevronRight,
  clients: Users,
  close: X,
  code: Code2,
  contract: FileText,
  copy: Copy,
  dots: MoreHorizontal,
  external: ExternalLink,
  eye: Eye,
  "eye-off": EyeOff,
  finance: CircleDollarSign,
  grid: Grid2X2,
  help: CircleHelp,
  home: Home,
  key: KeyRound,
  leads: UserPlus,
  lock: Lock,
  logout: LogOut,
  mail: Mail,
  menu: Menu,
  payments: CreditCard,
  plus: Plus,
  refresh: RefreshCw,
  search: Search,
  settings: Settings,
  shield: ShieldCheck,
  support: Headphones,
  trend: TrendingUp,
}

export interface IconProps {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}

export function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) {
  const Component = iconMap[name] || LayoutGrid

  return (
    <Component
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  )
}
