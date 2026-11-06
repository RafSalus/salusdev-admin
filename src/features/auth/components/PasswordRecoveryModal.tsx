import { useState, type FormEvent } from "react"
import { Icon } from "@/components/ui/Icon"

export interface PasswordRecoveryModalProps {
  onClose: () => void
  defaultEmail?: string
}

export function PasswordRecoveryModal({
  onClose,
  defaultEmail = "",
}: PasswordRecoveryModalProps) {
  const [email, setEmail] = useState(defaultEmail || "rafael@salusdev.com")
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSending(false)
    setSubmitted(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recovery-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d17]/40 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#173e32]/10 bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between border-b border-[#173e32]/8 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#eaf3ee] text-[#173e32]">
              <Icon name="key" size={18} />
            </div>
            <div>
              <h2 id="recovery-modal-title" className="text-base font-bold text-[#18342a]">
                Recuperação de Senha
              </h2>
              <p className="text-[11px] text-[#697a73]">
                Envio seguro de token de uso único (AUTH-07)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-[#71827b] hover:bg-[#f2f4ef]"
            aria-label="Fechar modal"
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Icon name="check" size={24} />
            </div>
            <h3 className="text-sm font-bold text-[#18342a]">
              Instruções de recuperação enviadas
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#5a6c64]">
              Se o e-mail informado estiver cadastrado, um link de uso único com expiração curta de segurança foi encaminhado para a sua caixa de entrada.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-[#173e32] text-xs font-bold text-white shadow-sm hover:bg-[#123127]"
            >
              Retornar ao Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-xs leading-relaxed text-[#5c6f66]">
              Informe seu e-mail corporativo cadastrado. Você receberá um token temporário para redefinir sua senha com segurança.
            </p>

            <div>
              <label htmlFor="recovery-email" className="block text-xs font-semibold text-[#18342a]">
                E-mail cadastrado
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#72837b]">
                  <Icon name="mail" size={17} />
                </div>
                <input
                  id="recovery-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@salusdev.com"
                  className="w-full rounded-xl border border-[#173e32]/15 bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#18342a] focus:border-[#173e32] focus:ring-2 focus:ring-[#173e32]/10 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#173e32]/15 bg-white text-xs font-semibold text-[#5a6c64] hover:bg-[#f9faf7]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#173e32] text-xs font-bold text-white shadow-sm hover:bg-[#123127] disabled:opacity-50"
              >
                {isSending ? "Enviando..." : "Enviar instruções"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
