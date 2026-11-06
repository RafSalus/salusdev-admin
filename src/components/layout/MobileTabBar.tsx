import { Home, Plus, Code2, Users, Menu, type LucideIcon } from "lucide-react"

export interface MobileTabBarProps {
  currentSection: string
  onSelectSection: (section: string) => void
  onOpenMenu: () => void
}

interface TabDef {
  key: string
  label: string
  icon: LucideIcon
  isAction?: boolean
}

export function MobileTabBar({
  currentSection,
  onSelectSection,
  onOpenMenu,
}: MobileTabBarProps) {
  const tabs: TabDef[] = [
    { key: "Dashboard", label: "Início", icon: Home },
    { key: "Leads", label: "Leads", icon: Plus },
    { key: "Produtos", label: "Produtos", icon: Code2 },
    { key: "Clientes", label: "Clientes", icon: Users },
    { key: "menu", label: "Menu", icon: Menu, isAction: true },
  ]

  return (
    <nav
      aria-label="Navegação inferior mobile"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-[#163e32]/8 bg-white/95 pb-safe backdrop-blur-xl lg:hidden shadow-[0_-4px_20px_rgba(20,40,33,0.04)]"
    >
      <div className="flex h-16 w-full items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive =
            !tab.isAction &&
            (currentSection === tab.key ||
              (tab.key === "Dashboard" && currentSection === "Início"))
          const IconComponent = tab.icon

          return (
            <button
              key={tab.key}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (tab.isAction) {
                  onOpenMenu()
                } else {
                  onSelectSection(tab.key)
                }
              }}
              className={`flex h-[52px] min-w-[54px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1 transition-all active:scale-95 ${
                isActive
                  ? "text-[#163e32]"
                  : "text-[#7a8a83] hover:text-[#163e32]"
              }`}
            >
              <span
                className={`grid h-7 w-7 place-items-center transition-transform ${
                  isActive ? "scale-110" : ""
                }`}
              >
                <IconComponent
                  size={21}
                  strokeWidth={isActive ? 2.4 : 2}
                  className={isActive ? "text-[#163e32]" : "text-[#7a8a83]"}
                />
              </span>
              <span
                className={`text-[10px] leading-tight tracking-tight ${
                  isActive ? "font-black text-[#163e32]" : "font-bold text-[#7a8a83]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
