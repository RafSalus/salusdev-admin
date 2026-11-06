import { Icon } from "@/components/ui/Icon"

export interface ProductFilterProps {
  query: string
  onQueryChange: (query: string) => void
  status: string
  onStatusChange: (status: string) => void
  count: number
}

const statusOptions = [
  "Todos",
  "Planejamento",
  "Desenvolvimento",
  "Piloto",
  "Ativo",
]

export function ProductFilter({
  query,
  onQueryChange,
  status,
  onStatusChange,
  count,
}: ProductFilterProps) {
  return (
    <section className="mt-7">
      <div className="flex flex-col gap-3 rounded-2xl border border-[#173e32]/7 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative min-w-0 flex-1 sm:max-w-[360px]">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88958f]">
            <Icon name="search" size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar por produto ou categoria..."
            className="h-10 w-full rounded-xl bg-[#f5f6f2] pl-10 pr-4 text-[10px] font-semibold outline-none placeholder:text-[#9aa49f] focus:ring-2 focus:ring-[#3d8b6e]/15"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
          {statusOptions.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => onStatusChange(item)}
              className={`shrink-0 rounded-lg px-3 py-2.5 text-[9px] font-extrabold transition ${
                status === item
                  ? "bg-[#173e32] text-white"
                  : "text-[#718078] hover:bg-[#f1f3ee]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-[10px] font-bold text-[#7c8a84]">
          <span className="font-extrabold text-[#304b40]">{count}</span>{" "}
          {count === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
        <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#87938e]">
          <Icon name="grid" size={14} /> Visualização em grade
        </span>
      </div>
    </section>
  )
}
