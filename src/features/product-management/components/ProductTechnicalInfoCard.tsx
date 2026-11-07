import { GitBranch, Database, Globe, Copy, ExternalLink, Pencil } from "lucide-react"

export interface ProductTechnicalInfoCardProps {
  repositoryUrl?: string
  databaseName?: string
  webUrl?: string
  onCopy: (text: string, label: string) => void
  onOpenExternal: (url: string) => void
  onEditField: (field: "repositoryUrl" | "databaseName" | "webUrl", title: string, label: string, currentValue: string) => void
}

export function ProductTechnicalInfoCard({
  repositoryUrl = "Não configurado",
  databaseName = "Não informado",
  webUrl = "Não configurado",
  onCopy,
  onOpenExternal,
  onEditField,
}: ProductTechnicalInfoCardProps) {
  return (
    <section className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h2 className="text-base sm:text-lg font-black text-[#142821]">
          Informações técnicas
        </h2>
        <p className="mt-0.5 text-xs text-[#62736b]">
          Referências de desenvolvimento e endereço do produto.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {/* Linha 1: Repositório */}
        <div className="flex flex-col gap-2.5 border-b border-[#163e32]/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f3f0] text-[#4d5e56]">
              <GitBranch size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#839189]">
                Repositório
              </p>
              <p className="truncate text-xs sm:text-sm font-extrabold text-[#142821] mt-0.5">
                {repositoryUrl}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => onCopy(repositoryUrl, "Repositório")}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Copiar repositório"
            >
              <Copy size={13} />
              <span>Copiar</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenExternal(repositoryUrl)}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Abrir no GitHub"
            >
              <ExternalLink size={13} />
              <span>Abrir</span>
            </button>
            <button
              type="button"
              onClick={() => onEditField("repositoryUrl", "Editar Repositório", "Endereço do repositório Git", repositoryUrl)}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Editar repositório"
            >
              <Pencil size={13} />
              <span>Editar</span>
            </button>
          </div>
        </div>

        {/* Linha 2: Nome do banco de dados */}
        <div className="flex flex-col gap-2.5 border-b border-[#163e32]/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f3f0] text-[#4d5e56]">
              <Database size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#839189]">
                Nome do banco de dados
              </p>
              <p className="truncate text-xs sm:text-sm font-extrabold text-[#142821] mt-0.5">
                {databaseName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => onEditField("databaseName", "Configurar Banco de Dados", "Nome do banco de dados ou instância", databaseName === "Não informado" ? "" : databaseName)}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Configurar banco de dados"
            >
              <Pencil size={13} />
              <span>Configurar</span>
            </button>
          </div>
        </div>

        {/* Linha 3: Endereço web */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f3f0] text-[#4d5e56]">
              <Globe size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#839189]">
                Endereço web
              </p>
              <p className="truncate text-xs sm:text-sm font-extrabold text-[#142821] mt-0.5">
                {webUrl}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => onCopy(webUrl, "Endereço web")}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Copiar endereço web"
            >
              <Copy size={13} />
              <span>Copiar</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenExternal(webUrl)}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Abrir endereço web"
            >
              <ExternalLink size={13} />
              <span>Abrir</span>
            </button>
            <button
              type="button"
              onClick={() => onEditField("webUrl", "Editar Endereço Web", "URL pública da aplicação", webUrl)}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Editar endereço web"
            >
              <Pencil size={13} />
              <span>Editar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
