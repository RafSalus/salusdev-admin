import { Info } from "lucide-react"

export function ProductDemoBanner() {
  return (
    <aside
      role="status"
      aria-label="Aviso de ambiente de demonstração"
      className="flex items-start gap-3.5 rounded-2xl border border-[#163e32]/10 bg-[#f4f7f4] p-4 sm:p-5"
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#e2ece5] text-[#1c5541]">
        <Info size={17} />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-xs sm:text-sm font-black text-[#163e32]">
          Dados de demonstração
        </h2>
        <p className="mt-0.5 text-xs text-[#52655b] leading-relaxed">
          Repositório e endereço web são exemplos do protótipo. Nenhuma integração ou serviço de produção está conectado.
        </p>
      </div>
    </aside>
  )
}
