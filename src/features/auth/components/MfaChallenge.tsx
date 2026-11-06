import { useState, useRef, useEffect, type FormEvent, type ClipboardEvent, type KeyboardEvent } from "react"
import { Icon } from "@/components/ui/Icon"

export interface MfaChallengeProps {
  email: string
  onVerify: (code: string) => Promise<boolean>
  onCancel: () => void
  isLoading: boolean
  error: string | null
}

export function MfaChallenge({
  email,
  onVerify,
  onCancel,
  isLoading,
  error,
}: MfaChallengeProps) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Foco automático no primeiro campo ao carregar
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    // Aceita apenas dígitos numéricos
    const clean = value.replace(/\D/g, "")
    if (!clean) {
      const next = [...digits]
      next[index] = ""
      setDigits(next)
      return
    }

    const next = [...digits]
    next[index] = clean[clean.length - 1] // pega o último caractere digitado
    setDigits(next)

    // Avanço automático para o próximo campo
    if (index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return

    const next = [...digits]
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] || ""
    }
    setDigits(next)

    // Move foco para a última caixa preenchida ou a sexta
    const targetIndex = Math.min(pasted.length, 5)
    inputRefs.current[targetIndex]?.focus()

    // Se preencheu os 6 dígitos via colar, pode enviar automaticamente
    if (pasted.length === 6) {
      onVerify(pasted)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    const fullCode = digits.join("")
    await onVerify(fullCode)
  }

  const fillQuickCode = (code: string) => {
    const arr = code.split("")
    setDigits(arr)
    inputRefs.current[5]?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Alerta de Erro */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
        >
          <div className="mt-0.5 shrink-0 text-rose-600">
            <Icon name="close" size={14} />
          </div>
          <p className="flex-1 font-medium leading-relaxed">{error}</p>
        </div>
      )}

      {/* Instruções contextuais */}
      <div className="rounded-xl border border-[#173e32]/10 bg-[#f7f9f6] p-3.5 text-center">
        <p className="text-xs text-[#52655d]">
          Enviamos uma solicitação de autenticação para:
        </p>
        <p className="mt-0.5 font-bold text-[#18342a]">{email}</p>
        <p className="mt-2 text-[11px] text-[#71827a]">
          Abra seu aplicativo autenticador (TOTP) e digite o código temporário de 6 dígitos.
        </p>
      </div>

      {/* Grade de 6 Dígitos OTP */}
      <div>
        <label className="mb-2 block text-center text-xs font-semibold text-[#18342a]">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete="one-time-code"
              disabled={isLoading}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="h-12 w-11 rounded-xl border-2 border-[#173e32]/15 bg-white text-center text-xl font-extrabold text-[#18342a] shadow-xs transition focus:border-[#173e32] focus:ring-2 focus:ring-[#173e32]/15 focus:outline-hidden sm:h-13 sm:w-12 disabled:bg-[#f5f6f2] disabled:opacity-60"
              aria-label={`Dígito ${idx + 1} do código de verificação`}
            />
          ))}
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="space-y-2 pt-2">
        <button
          type="submit"
          disabled={isLoading || digits.join("").length !== 6}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173e32] px-4 text-sm font-bold text-white shadow-md transition hover:bg-[#123127] focus:ring-2 focus:ring-[#173e32] focus:ring-offset-2 focus:outline-hidden disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Validando código MFA...</span>
            </>
          ) : (
            <>
              <Icon name="check" size={17} />
              <span>Confirmar e Entrar</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-[#173e32]/15 bg-white text-xs font-semibold text-[#5a6c64] hover:bg-[#f9faf7]"
        >
          <span>Voltar para alteração de credenciais</span>
        </button>
      </div>

      {/* Atalhos para teste de protótipo */}
      <div className="rounded-xl border border-dashed border-[#173e32]/20 bg-[#f9faf7] p-3 text-center">
        <p className="text-[11px] font-semibold text-[#60736a]">
          Atalhos de teste do desafio MFA:
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => fillQuickCode("123456")}
            className="rounded-lg bg-[#eaf3ee] px-2.5 py-1 text-xs font-bold text-[#1f5a43] hover:bg-[#dbece1]"
          >
            Código válido (123456)
          </button>
          <button
            type="button"
            onClick={() => fillQuickCode("000000")}
            className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100"
          >
            Simular erro (000000)
          </button>
        </div>
      </div>
    </form>
  )
}
