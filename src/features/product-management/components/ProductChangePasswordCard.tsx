import { useState, useRef } from "react"
import { ShieldCheck, Settings, Eye, EyeOff } from "lucide-react"

export interface ProductChangePasswordCardProps {
  onSavePassword: (newPassword: string) => void
}

export function ProductChangePasswordCard({
  onSavePassword,
}: ProductChangePasswordCardProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentPasswordInputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!currentPassword.trim()) {
      setError("Informe a senha atual.")
      currentPasswordInputRef.current?.focus()
      return
    }

    if (newPassword.length < 8) {
      setError("A nova senha deve ter no mínimo 8 caracteres.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("A confirmação de senha não confere.")
      return
    }

    setIsSubmitting(true)

    // Simulação com feedback imediato
    window.setTimeout(() => {
      onSavePassword(newPassword)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setIsSubmitting(false)
      setError(null)
    }, 350)
  }

  return (
    <section
      id="alterar-senha-section"
      className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-7 shadow-xs"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eef7f2] border border-[#163e32]/10 text-[#1e6149]">
          <ShieldCheck size={22} />
        </span>
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#142821]">
            Alterar senha
          </h2>
          <p className="mt-0.5 text-xs text-[#62736b]">
            Atualize sua senha de acesso com segurança e mantenha o controle da sua conta administrativa.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-2.5 text-xs font-bold text-red-700 animate-in fade-in duration-200"
          >
            {error}
          </div>
        )}

        {/* Campo 1: Senha atual */}
        <div>
          <label
            htmlFor="current-password"
            className="block text-[11px] font-bold text-[#45574f] mb-1.5"
          >
            Senha atual
          </label>
          <div className="relative">
            <input
              ref={currentPasswordInputRef}
              id="current-password"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="•••••••••••••"
              className="w-full min-h-[46px] rounded-xl border border-[#163e32]/14 bg-white px-3.5 pr-11 text-base sm:text-xs font-semibold text-[#142821] placeholder:text-[#a0aaa5] focus:border-[#23634e] focus:outline-none focus:ring-3 focus:ring-[#23634e]/10 transition"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowCurrent((prev) => !prev)}
              aria-label={showCurrent ? "Ocultar senha atual" : "Exibir senha atual"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7f8f88] hover:text-[#163e32]"
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Campo 2: Nova senha */}
        <div>
          <label
            htmlFor="new-password"
            className="block text-[11px] font-bold text-[#45574f] mb-1.5"
          >
            Nova senha
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="•••••••••••••"
              className="w-full min-h-[46px] rounded-xl border border-[#163e32]/14 bg-white px-3.5 pr-11 text-base sm:text-xs font-semibold text-[#142821] placeholder:text-[#a0aaa5] focus:border-[#23634e] focus:outline-none focus:ring-3 focus:ring-[#23634e]/10 transition"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              aria-label={showNew ? "Ocultar nova senha" : "Exibir nova senha"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7f8f88] hover:text-[#163e32]"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Campo 3: Confirmar nova senha */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-[11px] font-bold text-[#45574f] mb-1.5"
          >
            Confirmar nova senha
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="•••••••••••••"
              className="w-full min-h-[46px] rounded-xl border border-[#163e32]/14 bg-white px-3.5 pr-11 text-base sm:text-xs font-semibold text-[#142821] placeholder:text-[#a0aaa5] focus:border-[#23634e] focus:outline-none focus:ring-3 focus:ring-[#23634e]/10 transition"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              aria-label={showConfirm ? "Ocultar confirmação" : "Exibir confirmação"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7f8f88] hover:text-[#163e32]"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Botão Salvar alteração */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white border border-[#163e32]/16 px-5 py-2.5 text-xs font-extrabold text-[#163e32] shadow-xs transition hover:bg-[#f6f8f5] hover:border-[#163e32]/30 active:scale-95 disabled:opacity-50"
          >
            <Settings size={15} className={isSubmitting ? "animate-spin" : ""} />
            <span>{isSubmitting ? "Salvando..." : "Salvar alteração"}</span>
          </button>
        </div>
      </form>
    </section>
  )
}
