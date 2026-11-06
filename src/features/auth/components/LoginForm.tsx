import { useState, type FormEvent } from "react"
import { Icon } from "@/components/ui/Icon"

export interface LoginFormProps {
  onSubmit: (email: string, pass: string) => Promise<boolean>
  onForgotPassword: () => void
  isLoading: boolean
  error: string | null
  isLocked: boolean
}

export function LoginForm({
  onSubmit,
  onForgotPassword,
  isLoading,
  error,
  isLocked,
}: LoginFormProps) {
  const [email, setEmail] = useState("rafael@salusdev.com")
  const [password, setPassword] = useState("salusdev@2026")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isLoading || isLocked) return
    await onSubmit(email, password)
  }

  const fillTestCredentials = () => {
    setEmail("rafael@salusdev.com")
    setPassword("salusdev@2026")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Alerta de Erro em tela (Conformidade GER-07) */}
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

      {/* Campo E-mail */}
      <div>
        <label
          htmlFor="auth-email"
          className="block text-xs font-semibold text-[#18342a]"
        >
          E-mail de acesso
        </label>
        <div className="relative mt-1.5">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#72837b]">
            <Icon name="mail" size={17} />
          </div>
          <input
            id="auth-email"
            type="email"
            autoComplete="username"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isLocked}
            placeholder="seu.email@salusdev.com"
            className="w-full rounded-xl border border-[#173e32]/15 bg-white py-2.5 pl-10 pr-3.5 text-sm text-[#18342a] placeholder-[#9ca6a1] transition focus:border-[#173e32] focus:ring-2 focus:ring-[#173e32]/10 focus:outline-hidden disabled:bg-[#f5f6f2] disabled:opacity-60"
          />
        </div>
      </div>

      {/* Campo Senha */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="auth-password"
            className="block text-xs font-semibold text-[#18342a]"
          >
            Senha
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs font-semibold text-[#2563eb] hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>
        <div className="relative mt-1.5">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#72837b]">
            <Icon name="lock" size={17} />
          </div>
          <input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || isLocked}
            placeholder="Digite sua senha"
            className="w-full rounded-xl border border-[#173e32]/15 bg-white py-2.5 pl-10 pr-10 text-sm text-[#18342a] placeholder-[#9ca6a1] transition focus:border-[#173e32] focus:ring-2 focus:ring-[#173e32]/10 focus:outline-hidden disabled:bg-[#f5f6f2] disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#72837b] hover:text-[#18342a]"
            aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
          >
            <Icon name={showPassword ? "eye-off" : "eye"} size={17} />
          </button>
        </div>
      </div>

      {/* Lembrar acesso */}
      <div className="flex items-center gap-2 pt-1">
        <input
          id="auth-remember"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-[#173e32]/20 text-[#173e32] focus:ring-[#173e32]"
        />
        <label
          htmlFor="auth-remember"
          className="text-xs font-medium text-[#50635b]"
        >
          Lembrar este navegador (sessão protegida)
        </label>
      </div>

      {/* Botão de Envio (Alvo de toque >= 44px) */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || isLocked}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173e32] px-4 text-sm font-bold text-white shadow-md transition hover:bg-[#123127] focus:ring-2 focus:ring-[#173e32] focus:ring-offset-2 focus:outline-hidden disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Validando credenciais...</span>
            </>
          ) : (
            <>
              <span>Avançar para Verificação</span>
              <Icon name="arrow" size={16} />
            </>
          )}
        </button>
      </div>

      {/* Dica para demonstração no protótipo */}
      <div className="mt-4 rounded-xl border border-dashed border-[#173e32]/20 bg-[#f9faf7] p-3 text-center">
        <p className="text-[11px] text-[#60736a]">
          Demonstração de protótipo: senha padrão de teste configurada
        </p>
        <button
          type="button"
          onClick={fillTestCredentials}
          className="mt-1.5 text-xs font-bold text-[#173e32] hover:underline"
        >
          Preencher dados do administrador
        </button>
      </div>
    </form>
  )
}
