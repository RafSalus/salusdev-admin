import { AppWindow, Mail, Lock, Pencil } from "lucide-react"

export interface ProductAccessCardProps {
  adminPanelUrl?: string
  adminEmail?: string
  adminPasswordMasked?: string
  onEditField: (field: "adminPanelUrl" | "adminEmail", title: string, label: string, currentValue: string) => void
  onRequestChangePassword: () => void
}

export function ProductAccessCard({
  adminPanelUrl = "Não configurado",
  adminEmail = "Não informado",
  adminPasswordMasked = "•••••••••••••••",
  onEditField,
  onRequestChangePassword,
}: ProductAccessCardProps) {
  return (
    <section className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h2 className="text-base sm:text-lg font-black text-[#142821]">
          Acessos do produto
        </h2>
        <p className="mt-0.5 text-xs text-[#62736b]">
          Painel e credenciais de administração.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {/* Linha 1: Painel de controle */}
        <div className="flex flex-col gap-2.5 border-b border-[#163e32]/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f3f0] text-[#4d5e56]">
              <AppWindow size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#839189]">
                Painel de controle
              </p>
              <p className="truncate text-xs sm:text-sm font-extrabold text-[#142821] mt-0.5">
                {adminPanelUrl}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => onEditField("adminPanelUrl", "Configurar Painel de Controle", "Endereço URL do painel administrativo", adminPanelUrl === "Não configurado" ? "" : adminPanelUrl)}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Configurar painel de controle"
            >
              <Pencil size={13} />
              <span>Configurar</span>
            </button>
          </div>
        </div>

        {/* Linha 2: E-mail */}
        <div className="flex flex-col gap-2.5 border-b border-[#163e32]/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f3f0] text-[#4d5e56]">
              <Mail size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#839189]">
                E-mail
              </p>
              <p className="truncate text-xs sm:text-sm font-extrabold text-[#142821] mt-0.5">
                {adminEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => onEditField("adminEmail", "Configurar E-mail Administrativo", "E-mail de contato técnico e alertas", adminEmail === "Não informado" ? "" : adminEmail)}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Configurar e-mail"
            >
              <Pencil size={13} />
              <span>Configurar</span>
            </button>
          </div>
        </div>

        {/* Linha 3: Senha de acesso à gestão */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0f3f0] text-[#4d5e56]">
              <Lock size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#839189]">
                Senha de acesso à gestão
              </p>
              <p className="text-xs sm:text-sm font-black tracking-widest text-[#142821] mt-0.5">
                {adminPasswordMasked}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={onRequestChangePassword}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#55675f] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
              title="Alterar senha de acesso"
            >
              <Pencil size={13} />
              <span>Alterar senha</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
