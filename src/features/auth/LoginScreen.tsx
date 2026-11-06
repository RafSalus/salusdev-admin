import { useState } from "react"
import { AuthCard } from "./components/AuthCard"
import { LoginForm } from "./components/LoginForm"
import { MfaChallenge } from "./components/MfaChallenge"
import { PasswordRecoveryModal } from "./components/PasswordRecoveryModal"
import type { useAuth } from "./hooks/useAuth"

export interface LoginScreenProps {
  auth: ReturnType<typeof useAuth>
}

export function LoginScreen({ auth }: LoginScreenProps) {
  const [showRecovery, setShowRecovery] = useState(false)

  const isMfa = auth.stage === "mfa"

  return (
    <>
      <AuthCard
        title={isMfa ? "Verificação em 2 Fatores" : "Acesse o Centro de Comando"}
        subtitle={
          isMfa
            ? "Autenticação em duas etapas obrigatória via aplicativo TOTP (AUTH-02)"
            : "Insira suas credenciais corporativas para gerenciar o ecossistema"
        }
      >
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
            isLoading={auth.isLoading}
            error={auth.error}
            isLocked={auth.isLocked}
          />
        )}
      </AuthCard>

      {showRecovery && (
        <PasswordRecoveryModal
          defaultEmail={auth.tempEmail}
          onClose={() => setShowRecovery(false)}
        />
      )}
    </>
  )
}
