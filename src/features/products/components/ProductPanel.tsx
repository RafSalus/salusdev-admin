import { Icon } from "@/components/ui/Icon"
import { Badge } from "@/components/ui/Badge"
import { statusStyles, type Product } from "../types/product.types"

export interface ProductPanelProps {
  product: Product
  onClose: () => void
  onEdit: () => void
  onOpenManagement?: () => void
}

export function ProductPanel({
  product,
  onClose,
  onEdit,
  onOpenManagement,
}: ProductPanelProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-[#10251e]/30 backdrop-blur-[2px]"
        aria-label="Fechar detalhes"
      />
      <aside className="fixed inset-y-0 right-0 z-[70] w-full max-w-[440px] overflow-y-auto bg-white p-6 shadow-[-20px_0_60px_rgba(20,40,33,.12)] sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#87948e]">
            Detalhes do produto
          </p>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#173e32]/8 text-[#6f7e78] hover:bg-[#f4f6f1]"
            aria-label="Fechar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-8 flex items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-sm font-extrabold text-white"
            style={{ background: product.color }}
          >
            {product.short}
          </span>
          <div>
            <h2 className="text-xl font-extrabold tracking-[-.04em] text-[#18342a]">
              {product.name}
            </h2>
            <p className="mt-1 text-[10px] font-bold text-[#85928d]">
              {product.category}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <Badge className={statusStyles[product.status]}>
            {product.status}
          </Badge>
        </div>

        <p className="mt-6 text-xs leading-6 text-[#62736c]">
          {product.description}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#f5f7f3] p-4">
            <span className="text-[#3f866d]">
              <Icon name="clients" size={18} />
            </span>
            <p className="mt-3 text-xl font-extrabold tracking-[-.04em]">
              {product.clients}
            </p>
            <p className="mt-1 text-[9px] font-bold text-[#83908b]">
              Clientes vinculados
            </p>
          </div>
          <div className="rounded-xl bg-[#f5f7f3] p-4">
            <span className="text-[#3f866d]">
              <Icon name="trend" size={18} />
            </span>
            <p className="mt-3 text-xl font-extrabold tracking-[-.04em]">
              {product.progress}%
            </p>
            <p className="mt-1 text-[9px] font-bold text-[#83908b]">
              Progresso atual
            </p>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#87948e]">
            Links do projeto
          </h3>
          <div className="mt-3 space-y-2">
            {product.appUrl ? (
              <div className="flex items-center gap-3 rounded-xl border border-[#173e32]/8 p-3.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e8f3ec] text-[#2f8064]">
                  <Icon name="external" size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-bold text-[#94a09b]">
                    Aplicação
                  </p>
                  <p className="truncate text-[10px] font-extrabold">
                    {product.appUrl}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(product.appUrl || "")}
                  className="text-[#7b8a84] hover:text-[#173e32]"
                  aria-label="Copiar link"
                >
                  <Icon name="copy" size={16} />
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#173e32]/14 p-3.5 text-center text-[9px] font-bold text-[#8d9994]">
                Link da aplicação ainda não cadastrado
              </div>
            )}
            {product.repoUrl && (
              <div className="flex items-center gap-3 rounded-xl border border-[#173e32]/8 p-3.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef0ed] text-[#51655c]">
                  <Icon name="code" size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-bold text-[#94a09b]">
                    Repositório
                  </p>
                  <p className="truncate text-[10px] font-extrabold">
                    {product.repoUrl}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(product.repoUrl || "")}
                  className="text-[#7b8a84] hover:text-[#173e32]"
                  aria-label="Copiar link"
                >
                  <Icon name="copy" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-7 border-t border-[#173e32]/8 pt-6">
          <div className="flex items-center justify-between text-[9px] font-bold text-[#83908b]">
            <span>Última atualização</span>
            <span className="text-[#50645b]">{product.updated}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          {onOpenManagement && (
            <button
              type="button"
              onClick={onOpenManagement}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173e32] px-5 py-3.5 text-[11px] font-extrabold text-white hover:bg-[#235343] transition shadow-xs"
            >
              Abrir governança <Icon name="arrow" size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onEdit}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[11px] font-extrabold transition ${
              onOpenManagement
                ? "border border-[#173e32]/12 bg-white text-[#173e32] hover:bg-[#f7f9f7]"
                : "bg-[#173e32] text-white hover:bg-[#235343]"
            }`}
          >
            Editar informações <Icon name="pencil" size={15} />
          </button>
        </div>
      </aside>
    </>
  )
}
