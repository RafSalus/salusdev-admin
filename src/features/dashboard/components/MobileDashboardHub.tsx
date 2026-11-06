import { Icon, type IconName } from "@/components/ui/Icon"

export interface MobileDashboardHubProps {
  userName?: string
  onSelectSection: (section: string) => void
}

interface ActionItem {
  id: string
  label: string
  icon: IconName
  colorClass: string
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
  // Extrai o primeiro nome para saudação cordial
  const firstName = userName.split(" ")[0] || "Rafael"

  const groups: ActionGroup[] = [
    {
      category: "PRINCIPAL",
      items: [
        {
          id: "dash",
          label: "Dashboard",
          icon: "grid",
          colorClass: "text-[#23634e]",
          section: "Dashboard",
        },
        {
          id: "prod",
          label: "Produtos",
          icon: "code",
          colorClass: "text-[#c18442]",
          section: "Produtos",
        },
        {
          id: "atend",
          label: "Atendimentos",
          icon: "check",
          colorClass: "text-[#3d7ca8]",
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
          icon: "clients",
          colorClass: "text-[#7d5ba6]",
          section: "Clientes",
        },
        {
          id: "leads",
          label: "Leads",
          icon: "plus",
          colorClass: "text-[#2f8064]",
          section: "Leads",
        },
        {
          id: "cont",
          label: "Contratos",
          icon: "bell",
          colorClass: "text-[#c18442]",
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
          icon: "check",
          colorClass: "text-[#3d7ca8]",
          section: "Assinaturas",
        },
        {
          id: "pag",
          label: "Pagamentos",
          icon: "clients",
          colorClass: "text-[#7d5ba6]",
          section: "Pagamentos",
        },
        {
          id: "conf",
          label: "Configurações",
          icon: "grid",
          colorClass: "text-[#23634e]",
          section: "Configurações",
        },
      ],
    },
  ]

  return (
    <div className="pb-20 pt-2 lg:hidden">
      {/* Cabeçalho de Boas-Vindas Mobile */}
      <header className="mb-6">
        <h1 className="text-[26px] font-black tracking-[-0.04em] text-[#142821] sm:text-[30px]">
          Olá, {firstName}
        </h1>
        <p className="mt-1 text-[12px] font-medium leading-relaxed text-[#60736a]">
          Acesse rapidamente as principais áreas do seu portfólio.
        </p>
      </header>

      {/* Categorias com Squircles de Atalhos */}
      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#8c9992]"
            >
              {group.category}
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.section)}
                  className="group flex flex-col items-center justify-center rounded-[24px] border border-[#163e32]/8 bg-white p-3.5 shadow-[0_2px_8px_rgba(20,40,33,0.04)] transition-all duration-200 active:scale-95 active:bg-[#f6f8f5] hover:border-[#163e32]/20 hover:shadow-md"
                  style={{ minHeight: "100px" }}
                  aria-label={`Acessar ${item.label}`}
                >
                  <span
                    className={`grid h-11 w-11 place-items-center transition-transform group-hover:scale-110 ${item.colorClass}`}
                  >
                    <Icon name={item.icon} size={28} />
                  </span>

                  <span className="mt-2 text-center text-[11px] font-bold tracking-tight text-[#18372c]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
