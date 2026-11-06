import type { FormEvent } from "react"
import { Icon } from "@/components/ui/Icon"
import { statusStyles, type Product, type ProductStatus } from "../types/product.types"

export interface ProductModalProps {
  product?: Product
  onClose: () => void
  onSave: (product: Product) => void
}

export function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") || "").trim()

    onSave({
      id: product?.id ?? Date.now(),
      name,
      short: name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "SD",
      category: String(data.get("category")),
      status: String(data.get("status")) as ProductStatus,
      description: String(data.get("description")),
      clients: product?.clients ?? 0,
      updated: "Agora",
      progress: Number(data.get("progress")),
      color: product?.color ?? "#367e65",
      appUrl: String(data.get("appUrl") || ""),
      repoUrl: String(data.get("repoUrl") || ""),
    })
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-[#10251e]/40 p-4 backdrop-blur-[3px]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Fechar formulário"
      />
      <form
        onSubmit={handleSubmit}
        className="relative my-5 w-full max-w-[590px] rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-[#39836a]">
              {product ? "Editar cadastro" : "Novo cadastro"}
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-[-.04em]">
              {product ? "Editar produto" : "Cadastrar produto"}
            </h2>
            <p className="mt-2 text-[10px] text-[#7b8983]">
              Organize as informações principais do sistema.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#173e32]/8 text-[#6f7e78] hover:bg-[#f3f5f0]"
            aria-label="Fechar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="admin-label sm:col-span-2">
            Nome do produto
            <input
              name="name"
              required
              defaultValue={product?.name}
              placeholder="Ex.: Salus Oficina"
              className="admin-input"
            />
          </label>
          <label className="admin-label">
            Categoria
            <select
              name="category"
              required
              defaultValue={product?.category ?? ""}
              className="admin-input"
            >
              <option value="" disabled>
                Selecione
              </option>
              <option>Site institucional</option>
              <option>SaaS para oficinas</option>
              <option>Aplicação web</option>
              <option>Sistema de gestão</option>
              <option>E-commerce</option>
            </select>
          </label>
          <label className="admin-label">
            Situação
            <select
              name="status"
              defaultValue={product?.status ?? "Planejamento"}
              className="admin-input"
            >
              {Object.keys(statusStyles).map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="admin-label sm:col-span-2">
            Descrição
            <textarea
              name="description"
              required
              defaultValue={product?.description}
              rows={3}
              placeholder="Descreva o objetivo principal do produto"
              className="admin-input resize-none"
            />
          </label>
          <label className="admin-label">
            Progresso estimado
            <div className="relative">
              <input
                name="progress"
                type="number"
                min="0"
                max="100"
                defaultValue={product?.progress ?? 0}
                className="admin-input pr-9"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#84918b]">
                %
              </span>
            </div>
          </label>
          <div />
          <label className="admin-label">
            Link da aplicação
            <input
              name="appUrl"
              defaultValue={product?.appUrl}
              placeholder="app.salusdev.com"
              className="admin-input"
            />
          </label>
          <label className="admin-label">
            Link do repositório
            <input
              name="repoUrl"
              defaultValue={product?.repoUrl}
              placeholder="github.com/..."
              className="admin-input"
            />
          </label>
        </div>
        <div className="mt-7 flex flex-col-reverse gap-2 border-t border-[#173e32]/8 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#173e32]/10 px-5 py-3 text-[10px] font-extrabold text-[#62736c] hover:bg-[#f5f7f3]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#173e32] px-6 py-3 text-[10px] font-extrabold text-white hover:bg-[#235343] transition"
          >
            {product ? "Salvar alterações" : "Cadastrar produto"}
          </button>
        </div>
      </form>
    </div>
  )
}
