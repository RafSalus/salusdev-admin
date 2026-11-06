import { useState, type ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { MobileTabBar } from "./MobileTabBar"

export interface AppShellProps {
  children: ReactNode
  currentSection?: string
  userName?: string
  userInitials?: string
  onSelectSection?: (section: string) => void
  onLogout?: () => void
}

export function AppShell({
  children,
  currentSection = "Dashboard",
  userName,
  userInitials,
  onSelectSection,
  onLogout,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f6f2] text-[#18342a]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={currentSection}
        onSelectSection={onSelectSection}
      />

      <div className="lg:pl-[252px]">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          currentSection={currentSection}
          userName={userName}
          userInitials={userInitials}
          onLogout={onLogout}
        />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-7 sm:py-9 pb-24 lg:pb-9">
          {children}
        </main>
      </div>

      {/* Barra de navegação inferior persistente no Mobile (fiel a Dashboard - M.png) */}
      <MobileTabBar
        currentSection={currentSection}
        onSelectSection={(sec) => onSelectSection?.(sec)}
        onOpenMenu={() => setSidebarOpen(true)}
      />
    </div>
  )
}
