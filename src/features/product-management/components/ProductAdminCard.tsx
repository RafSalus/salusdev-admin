import { Lock, LogIn } from "lucide-react"

export interface ProductAdminCardProps {
  adminConfigured?: boolean
  adminStatusLabel?: string
  onEnterAdmin?: () => void
}

export function ProductAdminCard({
  adminConfigured = false,
  adminStatusLabel = "Não configurado",
  onEnterAdmin,
}: ProductAdminCardProps) {
  return (
    <section className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs">
      <div>
        <h2 className="text-base sm:text-lg font-black text-[#142821]">
          Administração
        </h2>
        <p className="mt-0.5 text-xs text-[#62736b]">
          Ponto de acesso administrativo para configuração centralizada do produto.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#163e32]/8 bg-[#fbfcfb] p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f3f0] text-[#4d5e56]">
            <Lock size={18} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#839189]">
              Administração
            </p>
            <p className="mt-0.5 text-xs sm:text-sm font-extrabold text-[#142821]">
              {adminConfigured ? "Configurado e operacional" : adminStatusLabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEnterAdmin}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white border border-[#163e32]/14 px-4 py-2 text-xs font-bold text-[#163e32] shadow-xs transition hover:bg-[#f6f8f5] hover:border-[#163e32]/25 active:scale-95"
        >
          <LogIn size={15} />
          <span>Entrar</span>
        </button>
      </div>
    </section>
  )
}
