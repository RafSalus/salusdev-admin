import { Icon } from "@/components/ui/Icon"
import { Badge } from "@/components/ui/Badge"
import { statusStyles, type Product } from "../types/product.types"

export interface ProductCardProps {
  product: Product
  onOpen: () => void
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#173e32]/8 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#2f8064]/25 hover:shadow-[0_14px_38px_rgba(25,53,43,.07)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xs font-extrabold text-white"
            style={{ background: product.color }}
          >
            {product.short}
          </span>
          <div>
            <h3 className="text-[14px] font-extrabold leading-tight tracking-[-.025em] text-[#1a352b]">
              {product.name}
            </h3>
            <p className="mt-1 text-[9px] font-bold text-[#8a9892]">
              {product.category}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#7a8983] hover:bg-[#f2f4ef]"
          aria-label={`Mais opções para ${product.name}`}
        >
          <Icon name="dots" size={17} />
        </button>
      </div>

      <p className="mt-5 flex-1 text-[11px] leading-[1.65] text-[#6d7b75]">
        {product.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[9px] font-bold">
          <span className="text-[#82908a]">Progresso</span>
          <span className="text-[#344e44]">{product.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#edf0eb]">
          <div
            className="h-full rounded-full bg-[#459276]"
            style={{ width: `${product.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#173e32]/7 pt-4">
        <Badge className={statusStyles[product.status]}>
          {product.status}
        </Badge>
        <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#7b8983]">
          <Icon name="clients" size={14} />
          {product.clients} {product.clients === 1 ? "cliente" : "clientes"}
        </span>
      </div>
    </article>
  )
}
