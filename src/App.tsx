import { AppShell } from "@/components/layout/AppShell"
import { ProductsModule } from "@/features/products/ProductsModule"

export default function App() {
  return (
    <AppShell currentSection="Produtos">
      <ProductsModule />
    </AppShell>
  )
}
