import { useState } from "react"
import { LoginForm } from "./components/LoginForm"
import { MfaChallenge } from "./components/MfaChallenge"
import { PasswordRecoveryModal } from "./components/PasswordRecoveryModal"
import { HelpModal } from "./components/HelpModal"
import { Icon } from "@/components/ui/Icon"
import type { useAuth } from "./hooks/useAuth"

export interface LoginScreenProps {
  auth: ReturnType<typeof useAuth>
}

export function LoginScreen({ auth }: LoginScreenProps) {
  const [showRecovery, setShowRecovery] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showSignUpHint, setShowSignUpHint] = useState(false)
  const [legalModal, setLegalModal] = useState<"privacidade" | "termos" | null>(null)

  const isMfa = auth.stage === "mfa"

  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      {/* PAINEL ESQUERDO (Desktop apenas, oculto em Mobile como em Login - M.png) */}
      <section className="hidden lg:flex flex-col justify-between bg-[#163e32] p-10 text-white lg:w-[46%] lg:min-h-screen lg:p-14 xl:w-[44%] xl:p-20">
        {/* Topo: Logo SalusDev com badge verde */}
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#245846] font-mono text-xs font-bold text-[#34d399] select-none shadow-xs">
            &lt;/&gt;
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white">
            SalusDev
          </span>
        </div>

        {/* Centro: Mensagem de autoridade e posicionamento */}
        <div className="my-auto py-10 lg:py-0">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
            Sua operação,<br />
            em um só lugar.
          </h2>
          <p className="mt-4 text-xs sm:text-sm lg:text-base text-[#9ab3a6] leading-relaxed max-w-sm sm:max-w-md">
            Acompanhe produtos, clientes, contratos e o crescimento da SalusDev com clareza e segurança.
          </p>
        </div>

        {/* Rodapé do painel esquerdo: Links Legais */}
        <div className="flex items-center gap-3 text-xs font-medium text-[#7d998c]">
          <button
            type="button"
            onClick={() => setLegalModal("privacidade")}
            className="hover:text-white transition cursor-pointer"
          >
            Privacidade
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setLegalModal("termos")}
            className="hover:text-white transition cursor-pointer"
          >
            Termos de uso
          </button>
        </div>
      </section>

      {/* PAINEL DIREITO: Fundo branco no Mobile, Fundo suave no Desktop */}
      <section className="flex flex-1 flex-col justify-between bg-white px-5 py-6 sm:px-8 lg:bg-[#f8faf8] lg:p-12">
        {/* Topo Mobile: Logotipo SalusDev (exibido apenas em mobile conforme Login - M.png) */}
        <div className="flex items-center justify-between lg:hidden pt-2 pb-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef7f2] font-mono text-xs font-bold text-[#2d6a4f] select-none">
              &lt;/&gt;
            </span>
            <span className="text-xl font-bold tracking-tight text-[#101828]">
              SalusDev
            </span>
          </div>
        </div>

        {/* Topo Desktop: Selo discreto de acesso seguro */}
        <div className="hidden lg:flex items-center justify-end w-full">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#5f7369]">
            <Icon name="lock" size={14} />
            <span>Acesso seguro</span>
          </div>
        </div>

        {/* Centro: Formulário de Autenticação */}
        <div className="my-auto flex w-full justify-center py-4 sm:py-8">
          <div className="w-full max-w-[460px] rounded-2xl border-0 bg-transparent p-0 shadow-none lg:border lg:border-[#eaecf0] lg:bg-white lg:p-10 lg:shadow-sm">
            {isMfa ? (
              <MfaChallenge
                email={auth.tempEmail}
                onVerify={auth.verifyMfa}
                onCancel={auth.cancelMfa}
                isLoading={auth.isLoading}
                error={auth.error}
              />
            ) : (
              <LoginForm
                onSubmit={auth.submitCredentials}
                onForgotPassword={() => setShowRecovery(true)}
                onSignUpClick={() => setShowSignUpHint(true)}
                isLoading={auth.isLoading}
                error={auth.error}
                isLocked={auth.isLocked}
              />
            )}
          </div>
        </div>

        {/* Rodapé: Links de Ajuda e Conformidade Legal */}
        <div className="text-center pt-4 pb-2">
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="text-xs sm:text-sm font-semibold text-[#285b49] hover:underline cursor-pointer"
          >
            Precisa de ajuda?
          </button>

          {/* Links legais exibidos no rodapé inferior em Mobile conforme Login - M.png */}
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-[#667085] lg:hidden">
            <button
              type="button"
              onClick={() => setLegalModal("privacidade")}
              className="hover:text-[#101828] cursor-pointer"
            >
              Privacidade
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalModal("termos")}
              className="hover:text-[#101828] cursor-pointer"
            >
              Termos de uso
            </button>
          </div>
        </div>
      </section>

      {/* Modais de Suporte e Legais */}
      {showRecovery && (
        <PasswordRecoveryModal
          defaultEmail={auth.tempEmail}
          onClose={() => setShowRecovery(false)}
        />
      )}

      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)} />
      )}

      {showSignUpHint && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d17]/45 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#173e32]/10 bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between border-b border-[#173e32]/8 pb-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef7f2] font-mono text-xs font-bold text-[#2d6a4f]">
                  &lt;/&gt;
                </span>
                <h3 className="text-base font-bold text-[#18342a]">
                  Criação de Conta
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSignUpHint(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-[#71827b] hover:bg-[#f2f4ef]"
              >
                <Icon name="close" size={17} />
              </button>
            </div>
            <div className="mt-4 text-xs text-[#52655d] leading-relaxed space-y-3">
              <p>
                O Centro de Comando SalusDev é um portal restrito de governança corporativa.
              </p>
              <p>
                O provisionamento de novas contas de operadores administrativos é realizado internamente pela equipe de segurança. Caso necessite de acesso, solicite diretamente ao administrador principal.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSignUpHint(false)}
                className="h-10 rounded-xl bg-[#285b49] px-4 text-xs font-bold text-white hover:bg-[#1f4739] cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d17]/45 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#173e32]/10 bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between border-b border-[#173e32]/8 pb-3">
              <h3 className="text-base font-bold text-[#18342a]">
                {legalModal === "privacidade" ? "Política de Privacidade (LGPD)" : "Termos de Uso"}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="grid h-8 w-8 place-items-center rounded-lg text-[#71827b] hover:bg-[#f2f4ef]"
              >
                <Icon name="close" size={17} />
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] overflow-y-auto text-xs text-[#52655d] leading-relaxed space-y-3">
              <p>
                O ecossistema SalusDev opera sob estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) e as diretrizes do OWASP Top 10:2025.
              </p>
              <p>
                Este Centro de Comando é de uso restrito e exclusivo dos administradores autorizados. Todos os acessos, tentativas e sessões são auditados e protegidos por autenticação de múltiplos fatores (MFA/2FA via TOTP).
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="h-10 rounded-xl bg-[#285b49] px-4 text-xs font-bold text-white hover:bg-[#1f4739] cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
