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
    <div className="w-full">
      {/* Badge de cabeçalho do card */}
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-md bg-[#eef7f2] px-2.5 py-1 text-xs font-semibold text-[#1e4638]">
        <span className="font-mono text-[11px] font-bold text-[#2d6a4f]">&lt;/&gt;</span>
        <span>SalusDev</span>
      </div>

      {/* Título e Subtítulo exatos da imagem */}
      <h1 className="text-2xl font-bold tracking-tight text-[#101828] sm:text-3xl">
        Boas-vindas de volta
      </h1>
      <p className="mt-1.5 text-xs text-[#667085] sm:text-sm">
        Entre com seu e-mail para acessar sua conta.
      </p>

      {/* Alerta de Erro em tela se houver (GER-07) */}
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

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {/* Campo E-mail */}
        <div>
          <label
            htmlFor="auth-email"
            className="block text-xs font-semibold text-[#344054]"
          >
            E-mail
          </label>
          <div className="mt-1.5">
            <input
              id="auth-email"
              type="email"
              autoComplete="username"
              inputMode="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isLocked}
              placeholder="seuemail@exemplo.com"
              className="w-full rounded-xl border border-[#d0d5dd] bg-white px-3.5 py-2.5 text-sm text-[#101828] placeholder-[#98a2b3] shadow-2xs transition focus:border-[#285b49] focus:ring-2 focus:ring-[#285b49]/15 focus:outline-hidden disabled:bg-[#f8faf9] disabled:opacity-60"
            />
          </div>
        </div>

        {/* Campo Senha */}
        <div>
          <label
            htmlFor="auth-password"
            className="block text-xs font-semibold text-[#344054]"
          >
            Senha
          </label>
          <div className="relative mt-1.5">
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || isLocked}
              placeholder="Digite sua senha"
              className="w-full rounded-xl border border-[#d0d5dd] bg-white px-3.5 py-2.5 pr-10 text-sm text-[#101828] placeholder-[#98a2b3] shadow-2xs transition focus:border-[#285b49] focus:ring-2 focus:ring-[#285b49]/15 focus:outline-hidden disabled:bg-[#f8faf9] disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#667085] hover:text-[#101828]"
              aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
            >
              <Icon name={showPassword ? "eye" : "eye-off"} size={18} />
            </button>
          </div>
        </div>

        {/* Legenda de campos obrigatórios */}
        <p className="text-xs text-[#667085]">
          Todos os campos são obrigatórios.
        </p>

        {/* Linha: Lembrar de mim + Esqueci minha senha */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[#d0d5dd] text-[#285b49] focus:ring-[#285b49]"
            />
            <span className="text-xs font-medium text-[#344054]">
              Lembrar de mim
            </span>
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs font-semibold text-[#285b49] hover:underline"
          >
            Esqueci minha senha
          </button>
        </div>

        {/* Botão Entrar -> */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || isLocked}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#285b49] px-4 text-sm font-bold text-white shadow-xs transition hover:bg-[#1f4739] focus:ring-2 focus:ring-[#285b49] focus:ring-offset-2 focus:outline-hidden disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <span>Entrar</span>
                <span className="text-base font-bold leading-none">→</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Dica para teste rápido de protótipo */}
      <div className="mt-5 rounded-xl border border-dashed border-[#285b49]/20 bg-[#f7faf8] p-3 text-center">
        <p className="text-[11px] text-[#60736a]">
          Demonstração de protótipo: clique para preencher o e-mail e senha de teste
        </p>
        <button
          type="button"
          onClick={fillTestCredentials}
          className="mt-1 text-xs font-bold text-[#285b49] hover:underline"
        >
          Preencher dados do administrador
        </button>
      </div>
    </div>
  )
}
