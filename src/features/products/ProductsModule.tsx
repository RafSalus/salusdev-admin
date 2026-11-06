import { Icon } from "@/components/ui/Icon"
import { Toast } from "@/components/ui/Toast"
import { ProductStats } from "./components/ProductStats"
import { ProductFilter } from "./components/ProductFilter"
import { ProductGrid } from "./components/ProductGrid"
import { ProductPanel } from "./components/ProductPanel"
import { ProductModal } from "./components/ProductModal"
import { useProducts } from "./hooks/useProducts"
import type { Product } from "./types/product.types"

export interface ProductsModuleProps {
  productsState?: ReturnType<typeof useProducts>
  onOpenProductManagement?: (product: Product) => void
}

export function ProductsModule({
  productsState: externalState,
  onOpenProductManagement,
}: ProductsModuleProps = {}) {
  const localState = useProducts()
  const {
    products,
    filteredProducts,
    query,
    setQuery,
    status,
    setStatus,
    selectedProduct,
    setSelectedProduct,
    editingProduct,
    modalOpen,
    setModalOpen,
    toast,
    openNewProduct,
    openEditProduct,
    saveProduct,
  } = externalState || localState

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#3c846b]">
            Portfólio de sistemas
          </p>
          <h1 className="mt-2 text-[28px] font-extrabold tracking-[-.05em] text-[#17372b] sm:text-[34px]">
            Produtos
          </h1>
          <p className="mt-2 text-[11px] leading-5 text-[#75837d]">
            Gerencie todos os sistemas e produtos desenvolvidos pela SalusDev.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewProduct}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#173e32] px-5 py-3.5 text-[10px] font-extrabold text-white shadow-[0_8px_20px_rgba(23,62,50,.16)] transition hover:-translate-y-0.5 hover:bg-[#235343]"
        >
          <Icon name="plus" size={16} /> Novo produto
        </button>
      </div>

      <ProductStats products={products} />

      <ProductFilter
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
        count={filteredProducts.length}
      />

      <ProductGrid
        products={filteredProducts}
        onSelectProduct={setSelectedProduct}
      />

      <p className="mt-8 text-center text-[8px] font-semibold text-[#9aa49f]">
        Dados fictícios para validação do protótipo • Nenhuma integração de produção está ativa
      </p>

      {selectedProduct && (
        <ProductPanel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEdit={() => openEditProduct(selectedProduct)}
          onOpenManagement={() => {
            const prod = selectedProduct
            setSelectedProduct(null)
            onOpenProductManagement?.(prod)
          }}
        />
      )}

      {modalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={saveProduct}
        />
      )}

      <Toast message={toast} />
    </div>
  )
}
