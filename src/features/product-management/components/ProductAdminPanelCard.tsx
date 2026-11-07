import { ExternalLink, ShieldCheck, AlertCircle } from "lucide-react"

interface ProductAdminPanelCardProps {
  adminPanelUrl?: string
  productName: string
  onNotice: (message: string) => void
}

export function ProductAdminPanelCard({
  adminPanelUrl,
  productName,
  onNotice,
}: ProductAdminPanelCardProps) {
  const isConfigured =
    Boolean(adminPanelUrl) &&
    adminPanelUrl !== "Não configurado" &&
    adminPanelUrl !== "Não informado"

  function handleOpenPanel() {
    if (isConfigured && adminPanelUrl) {
      const normalizedUrl =
        adminPanelUrl.startsWith("http://") || adminPanelUrl.startsWith("https://")
          ? adminPanelUrl
          : `https://${adminPanelUrl}`
      window.open(normalizedUrl, "_blank", "noopener,noreferrer")
    } else {
      onNotice(
        `Painel administrativo em construção. O acesso será liberado quando o ${productName.toLowerCase().replace(/\s+/g, "-")}-admin estiver disponível.`
      )
    }
  }

  return (
    <section className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eaf3ee] text-[#163e32]">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-[#142821]">
                Painel administrativo
              </h2>
              {!isConfigured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7ed] px-2.5 py-0.5 text-[10px] font-extrabold text-[#c26200]">
                  <AlertCircle size={11} />
                  <span>Em construção</span>
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-[#62736b]">
              Acesso ao painel operacional do produto, com login e 2FA próprios.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenPanel}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#163e32] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0f2d24] transition active:scale-95 cursor-pointer self-start sm:self-center"
        >
          <span>Abrir painel</span>
          <ExternalLink size={15} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#163e32]/8 pt-3.5 text-xs">
        <span className="font-semibold text-[#667a70]">
          Endereço do painel:
        </span>
        <span className="font-mono text-xs font-bold text-[#142821]">
          {isConfigured ? adminPanelUrl : "Não configurado"}
        </span>
      </div>
    </section>
  )
}
