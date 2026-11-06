import { MobileDashboardHub } from "./components/MobileDashboardHub"
import { DesktopDashboardView } from "./components/DesktopDashboardView"
import type { Product } from "@/features/products/types/product.types"

export interface DashboardModuleProps {
  products: Product[]
  userName?: string
  onSelectSection: (section: string) => void
  onOpenNewProduct: () => void
}

export function DashboardModule({
  products,
  userName = "Rafael Salustiano",
  onSelectSection,
  onOpenNewProduct,
}: DashboardModuleProps) {
  return (
    <div>
      {/* Visualização Mobile: Fiel a Dashboard - M.png */}
      <div className="lg:hidden">
        <MobileDashboardHub
          products={products}
          userName={userName}
          onSelectSection={onSelectSection}
        />
      </div>

      {/* Visualização Desktop: Fiel a Dashboard - D.png (Visão Executiva) */}
      <div className="hidden lg:block">
        <DesktopDashboardView
          products={products}
          userName={userName}
          onSelectSection={onSelectSection}
          onOpenNewProduct={onOpenNewProduct}
        />
      </div>
    </div>
  )
}
