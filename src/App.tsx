import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { ProductsModule } from "@/features/products/ProductsModule"
import { DashboardModule } from "@/features/dashboard/DashboardModule"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { LoginScreen } from "@/features/auth/LoginScreen"
import { useProducts } from "@/features/products/hooks/useProducts"
import { Icon } from "@/components/ui/Icon"

export default function App() {
  const auth = useAuth()
  const productsState = useProducts()
  const [currentSection, setCurrentSection] = useState<string>("Dashboard")

  // Se não estiver autenticado (ou estiver aguardando o segundo fator MFA), exibe o portal de Login
  if (!auth.isAuthenticated) {
    return <LoginScreen auth={auth} />
  }

  return (
    <AppShell
      currentSection={currentSection}
      userName={auth.user?.name}
      userEmail={auth.user?.email}
      userRole={auth.user?.role}
      userInitials={auth.user?.avatarInitials}
      onSelectSection={setCurrentSection}
      onLogout={auth.logout}
    >
      {currentSection === "Dashboard" ? (
        <DashboardModule
          products={productsState.products}
          userName={auth.user?.name}
          onSelectSection={setCurrentSection}
          onOpenNewProduct={() => {
            setCurrentSection("Produtos")
            productsState.openNewProduct()
          }}
        />
      ) : currentSection === "Produtos" ? (
        <ProductsModule productsState={productsState} />
      ) : (
        <div className="rounded-2xl border border-[#173e32]/10 bg-white p-8 text-center shadow-xs sm:p-12">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#eaf3ee] text-[#173e32]">
            <Icon name="apps" size={28} />
          </div>
          <h2 className="text-xl font-bold text-[#18342a]">
            Módulo: {currentSection}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#60736a]">
            Este módulo faz parte da matriz lógica de telas do Centro de Comando e será implementado na sequência do roadmap.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentSection("Dashboard")}
              className="flex items-center gap-2 rounded-xl border border-[#163e32]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#163e32] shadow-xs hover:bg-[#f6f8f5]"
            >
              <span>Ir para o Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentSection("Produtos")}
              className="flex items-center gap-2 rounded-xl bg-[#173e32] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#123127]"
            >
              <span>Ver Portfólio de Produtos</span>
            </button>
          </div>
        </div>
      )}
    </AppShell>
  )
}
