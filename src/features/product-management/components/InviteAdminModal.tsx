import { useEffect, useState } from "react"
import { X, UserPlus, CheckCircle2 } from "lucide-react"
import type { ProductAdmin } from "@/features/products/types/product.types"

interface InviteAdminModalProps {
  open: boolean
  onClose: () => void
  onInvite: (admin: ProductAdmin) => void
}

export function InviteAdminModal({
  open,
  onClose,
  onInvite,
}: InviteAdminModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("Operador de Pista")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    const newAdmin: ProductAdmin = {
      id: `adm-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      mfaStatus: "Pendente",
      lastAccessAt: "Nunca acessou",
      status: "Ativo",
    }

    onInvite(newAdmin)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-admin-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d2218]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-[#163e32]/15 bg-white shadow-2xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-[#163e32]/10 px-6 py-4.5 bg-[#fbfdfc]">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#dff4e8] text-[#163e32]">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 id="invite-admin-title" className="text-base font-bold text-[#142821]">
                Convidar Administrador
              </h2>
              <p className="text-xs text-[#63766d]">
                Atribuição de papel e solicitação de MFA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-xl text-[#61746c] hover:bg-[#eef4f0] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="admin-name" className="block text-xs font-bold text-[#4c6057] uppercase mb-1">
              Nome Completo
            </label>
            <input
              id="admin-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Carlos Ferreira"
              className="w-full rounded-xl border border-[#163e32]/20 bg-[#fbfdfc] px-3.5 py-2.5 text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="admin-email" className="block text-xs font-bold text-[#4c6057] uppercase mb-1">
              E-mail Profissional
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: carlos@kartapucarana.com.br"
              className="w-full rounded-xl border border-[#163e32]/20 bg-[#fbfdfc] px-3.5 py-2.5 text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label htmlFor="admin-role" className="block text-xs font-bold text-[#4c6057] uppercase mb-1">
              Papel de Autorização
            </label>
            <select
              id="admin-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-[#163e32]/20 bg-[#fbfdfc] px-3.5 py-2.5 text-sm font-semibold text-[#142821] focus:border-[#163e32] focus:bg-white focus:outline-hidden"
            >
              <option value="Operador de Pista">Operador de Pista</option>
              <option value="Suporte Técnico">Suporte Técnico</option>
              <option value="Gestor Comercial">Gestor Comercial</option>
              <option value="Administrador Geral">Administrador Geral</option>
            </select>
          </div>

          <div className="rounded-xl border border-[#163e32]/10 bg-[#f5f8f6] p-3 text-[11px] font-semibold text-[#4e6359]">
            Um convite seguro com token e obrigatoriedade de configuração de MFA (aplicativo autenticador TOTP) será enviado para o e-mail informado.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] rounded-xl border border-[#163e32]/20 px-4 py-2 text-xs font-bold text-[#163e32] hover:bg-[#eef4f0] transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="min-h-[44px] flex items-center gap-1.5 rounded-xl bg-[#163e32] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#0f2d24] transition cursor-pointer active:scale-95"
            >
              <CheckCircle2 size={16} />
              <span>Enviar Convite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
