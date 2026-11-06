import { Icon, type IconName } from "@/components/ui/Icon"

export interface MobileTabBarProps {
  currentSection: string
  onSelectSection: (section: string) => void
  onOpenMenu: () => void
}

interface TabDef {
  key: string
  label: string
  icon: IconName
  isAction?: boolean
}

export function MobileTabBar({
  currentSection,
  onSelectSection,
  onOpenMenu,
}: MobileTabBarProps) {
  const tabs: TabDef[] = [
    { key: "Dashboard", label: "Início", icon: "search" },
    { key: "Leads", label: "Leads", icon: "plus" },
    { key: "Produtos", label: "Produtos", icon: "code" },
    { key: "Clientes", label: "Clientes", icon: "clients" },
    { key: "menu", label: "Menu", icon: "menu", isAction: true },
  ]

  return (
    <nav
      aria-label="Navegação inferior mobile"
      className="fixed bottom-0 inset-x-0 z-40 flex h-16 items-center justify-around border-t border-[#163e32]/8 bg-white/95 px-2 pb-safe backdrop-blur-md lg:hidden"
    >
      {tabs.map((tab) => {
        const isActive =
          !tab.isAction &&
          (currentSection === tab.key ||
            (tab.key === "Dashboard" && currentSection === "Início"))

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              if (tab.isAction) {
                onOpenMenu()
              } else {
                onSelectSection(tab.key)
              }
            }}
            className={`flex min-h-[48px] min-w-[56px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 transition-colors ${
              isActive
                ? "text-[#163e32]"
                : "text-[#7a8a83] hover:text-[#163e32]"
            }`}
          >
            <span
              className={`grid h-6 w-6 place-items-center transition-transform ${
                isActive ? "scale-110 font-bold" : ""
              }`}
            >
              <Icon name={tab.icon} size={19} />
            </span>
            <span
              className={`text-[10px] tracking-tight ${
                isActive ? "font-extrabold text-[#163e32]" : "font-semibold text-[#7a8a83]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
