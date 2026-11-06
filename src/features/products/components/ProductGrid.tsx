import { Icon } from "@/components/ui/Icon"
import { ProductCard } from "./ProductCard"
import type { Product } from "../types/product.types"

export interface ProductGridProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-[#173e32]/15 bg-white px-6 py-16 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#edf2ed] text-[#6b8177]">
          <Icon name="search" size={20} />
        </span>
        <h3 className="mt-4 text-sm font-extrabold text-[#18342a]">
          Nenhum produto encontrado
        </h3>
        <p className="mt-2 text-[10px] text-[#84918b]">
          Tente ajustar sua busca ou os filtros selecionados.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpen={() => onSelectProduct(product)}
        />
      ))}
    </div>
  )
}
