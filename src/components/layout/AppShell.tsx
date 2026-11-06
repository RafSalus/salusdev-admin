import { useState, type ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

export interface AppShellProps {
  children: ReactNode
  currentSection?: string
}

export function AppShell({
  children,
  currentSection = "Produtos",
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f6f2] text-[#18342a]">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={currentSection}
      />

      <div className="lg:pl-[252px]">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          currentSection={currentSection}
        />
        <main className="mx-auto max-w-[1400px] px-4 py-7 sm:px-7 sm:py-9">
          {children}
        </main>
      </div>
    </div>
  )
}
