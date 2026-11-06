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

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "")
    if (!clean) {
      const next = [...digits]
      next[index] = ""
      setDigits(next)
      return
    }

    const next = [...digits]
    next[index] = clean[clean.length - 1]
    setDigits(next)

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

    const targetIndex = Math.min(pasted.length, 5)
    inputRefs.current[targetIndex]?.focus()

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
    <div className="w-full">
      {/* Badge de cabeçalho do card */}
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-md bg-[#eef7f2] px-2.5 py-1 text-xs font-semibold text-[#1e4638]">
        <span className="font-mono text-[11px] font-bold text-[#2d6a4f]">&lt;/&gt;</span>
        <span>SalusDev</span>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-[#101828] sm:text-3xl">
        Verificação em 2 Fatores
      </h1>
      <p className="mt-1.5 text-xs text-[#667085] sm:text-sm">
        Insira o código TOTP de 6 dígitos gerado no seu celular para o e-mail:
      </p>
      <p className="mt-0.5 text-xs font-bold text-[#101828] sm:text-sm">{email}</p>

      {/* Alerta de Erro */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
        >
          <div className="mt-0.5 shrink-0 text-rose-600">
            <Icon name="close" size={14} />
          </div>
          <p className="flex-1 font-medium leading-relaxed">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label className="mb-2.5 block text-center text-xs font-semibold text-[#344054]">
            Código de segurança temporário
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
                className="h-12 w-11 rounded-xl border border-[#d0d5dd] bg-white text-center text-xl font-extrabold text-[#101828] shadow-2xs transition focus:border-[#285b49] focus:ring-2 focus:ring-[#285b49]/15 focus:outline-hidden sm:h-13 sm:w-12 disabled:bg-[#f8faf9] disabled:opacity-60"
                aria-label={`Dígito ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-[#667085]">
          O código é renovado a cada 30 segundos no seu app autenticador.
        </p>

        {/* Botão de Envio */}
        <div className="space-y-2 pt-2">
          <button
            type="submit"
            disabled={isLoading || digits.join("").length !== 6}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#285b49] px-4 text-sm font-bold text-white shadow-xs transition hover:bg-[#1f4739] focus:ring-2 focus:ring-[#285b49] focus:ring-offset-2 focus:outline-hidden disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Validando código MFA...</span>
              </>
            ) : (
              <>
                <span>Confirmar e Entrar</span>
                <span className="text-base font-bold leading-none">→</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-[#d0d5dd] bg-white text-xs font-semibold text-[#344054] hover:bg-[#f8faf9]"
          >
            <span>← Voltar para login</span>
          </button>
        </div>

        {/* Atalhos para teste de protótipo */}
        <div className="rounded-xl border border-dashed border-[#285b49]/20 bg-[#f7faf8] p-3 text-center">
          <p className="text-[11px] font-semibold text-[#60736a]">
            Atalhos para demonstração:
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
    </div>
  )
}
