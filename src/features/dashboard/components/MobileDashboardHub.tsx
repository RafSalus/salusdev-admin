import {
  Grid2X2,
  Code2,
  Check,
  Users,
  Plus,
  Bell,
  type LucideIcon,
} from "lucide-react"

export interface MobileDashboardHubProps {
  userName?: string
  onSelectSection: (section: string) => void
}

interface ActionItem {
  id: string
  label: string
  icon: LucideIcon
  color: string
  section: string
}

interface ActionGroup {
  category: string
  items: ActionItem[]
}

export function MobileDashboardHub({
  userName = "Rafael",
  onSelectSection,
}: MobileDashboardHubProps) {
  const firstName = userName.split(" ")[0] || "Rafael"

  const groups: ActionGroup[] = [
    {
      category: "PRINCIPAL",
      items: [
        {
          id: "dash",
          label: "Dashboard",
          icon: Grid2X2,
          color: "#1f644e",
          section: "Dashboard",
        },
        {
          id: "prod",
          label: "Produtos",
          icon: Code2,
          color: "#c07f2b",
          section: "Produtos",
        },
        {
          id: "atend",
          label: "Atendimentos",
          icon: Check,
          color: "#2c77aa",
          section: "Atendimentos",
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
          color: "#714fb0",
          section: "Clientes",
        },
        {
          id: "leads",
          label: "Leads",
          icon: Plus,
          color: "#248263",
          section: "Leads",
        },
        {
          id: "cont",
          label: "Contratos",
          icon: Bell,
          color: "#b87c2b",
          section: "Contratos",
        },
      ],
    },
    {
      category: "OPERACIONAL",
      items: [
        {
          id: "ass",
          label: "Assinaturas",
          icon: Check,
          color: "#2c77aa",
          section: "Assinaturas",
        },
        {
          id: "pag",
          label: "Pagamentos",
          icon: Users,
          color: "#714fb0",
          section: "Pagamentos",
        },
        {
          id: "conf",
          label: "Configurações",
          icon: Grid2X2,
          color: "#1f644e",
          section: "Configurações",
        },
      ],
    },
  ]

  return (
    <div className="pt-2 pb-24 lg:hidden max-w-[420px] mx-auto">
      {/* Saudação Nominal Mobile */}
      <header className="mb-7 px-1">
        <h1 className="text-[30px] font-black tracking-[-0.04em] text-[#142821]">
          Olá, {firstName}
        </h1>
        <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-[#60736a]">
          Acesse rapidamente as principais áreas do seu portfólio.
        </p>
      </header>

      {/* Categorias e Disposição dos Squircles (Fiel a Dashboard - M.png) */}
      <div className="space-y-7">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="mb-3.5 px-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#85948c]"
            >
              {group.category}
            </h2>

            <div className="grid grid-cols-3 gap-x-3.5 gap-y-2">
              {group.items.map((item) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center"
                  >
                    {/* Botão Squircle Branco (Ícone centralizado no squircle) */}
                    <button
                      type="button"
                      onClick={() => onSelectSection(item.section)}
                      aria-label={`Acessar ${item.label}`}
                      className="group flex aspect-square w-full max-w-[96px] items-center justify-center rounded-[28px] border border-[#163e32]/6 bg-white shadow-[0_6px_20px_rgba(20,40,33,0.05)] transition-all duration-200 active:scale-90 active:shadow-xs hover:border-[#163e32]/15 hover:shadow-[0_8px_24px_rgba(20,40,33,0.08)]"
                    >
                      <IconComponent
                        size={30}
                        strokeWidth={2.2}
                        style={{ color: item.color }}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                    </button>

                    {/* Rótulo abaixo do squircle */}
                    <span className="mt-2 text-center text-[12px] font-bold tracking-tight text-[#142821]">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
