import { useState, useCallback, useEffect } from "react"
import type { AuthStage, UserSession } from "../types/auth.types"

const DEFAULT_ADMIN_USER: UserSession = {
  id: "usr_admin_salusdev_01",
  name: "Rafael Amaral Salustiano",
  email: "rafael@salusdev.com",
  role: "admin",
  aal: "aal2",
  avatarInitials: "RA",
  lastSignIn: "2026-11-06T12:00:00Z",
}

const STORAGE_KEY = "salusdev_admin_session"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored).isAuthenticated === true : false
    } catch {
      return false
    }
  })

  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored).user : null
    } catch {
      return null
    }
  })

  const [stage, setStage] = useState<AuthStage>("credentials")
  const [tempEmail, setTempEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [failedAttempts, setFailedAttempts] = useState<number>(0)
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0)

  // Controle de contagem regressiva para bloqueio temporário
  useEffect(() => {
    if (!isLocked || lockoutSeconds <= 0) return

    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          setIsLocked(false)
          setFailedAttempts(0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isLocked, lockoutSeconds])

  // Passo 1: Validação de E-mail e Senha (Credenciais)
  const submitCredentials = useCallback(
    async (email: string, pass: string): Promise<boolean> => {
      if (isLocked) {
        setError(`Muitas tentativas incorretas. Aguarde ${lockoutSeconds} segundos.`)
        return false
      }

      setError(null)
      setIsLoading(true)

      // Simulação de latência de rede segura (proteção contra timing attacks)
      await new Promise((resolve) => setTimeout(resolve, 600))

      const normalizedEmail = email.trim().toLowerCase()

      // Validação básica de preenchimento
      if (!normalizedEmail || !pass) {
        setIsLoading(false)
        setError("Preencha todos os campos para continuar.")
        return false
      }

      // Regra AUTH-03: Senha mínima de 8 caracteres
      if (pass.length < 8) {
        setIsLoading(false)
        setError("Credenciais inválidas. Verifique seu e-mail e senha.")
        return false
      }

      // Validação de credencial (aceita o e-mail do administrador ou qualquer teste válido)
      const isValid = pass.length >= 8 && normalizedEmail.includes("@")

      if (!isValid) {
        const nextAttempts = failedAttempts + 1
        setFailedAttempts(nextAttempts)
        setIsLoading(false)

        // Regra AUTH-09: Bloqueio progressivo após 5 tentativas consecutivas
        if (nextAttempts >= 5) {
          setIsLocked(true)
          setLockoutSeconds(30)
          setError("Limite de tentativas atingido. Acesso bloqueado por 30 segundos.")
        } else {
          // Regra AUTH-10: Mensagem genérica sem revelar existência do e-mail
          setError("Credenciais inválidas. Verifique seu e-mail e senha.")
        }
        return false
      }

      // Sucesso na Etapa 1: avança para o desafio MFA (AAL1 aguardando AAL2)
      setTempEmail(normalizedEmail)
      setStage("mfa")
      setIsLoading(false)
      setError(null)
      return true
    },
    [failedAttempts, isLocked, lockoutSeconds]
  )

  // Passo 2: Desafio MFA / 2FA (TOTP de 6 dígitos)
  const verifyMfa = useCallback(
    async (code: string): Promise<boolean> => {
      setError(null)
      setIsLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 500))

      const cleanCode = code.replace(/\D/g, "")

      // Código deve ter exatamente 6 dígitos numéricos
      if (cleanCode.length !== 6) {
        setIsLoading(false)
        setError("O código de verificação deve conter 6 números.")
        return false
      }

      // Para o protótipo: aceita "123456" ou qualquer código simulado não nulo
      // Se for "000000", simula falha proposital para teste do QA
      if (cleanCode === "000000") {
        setIsLoading(false)
        setError("Código de verificação incorreto ou expirado. Tente novamente.")
        return false
      }

      // Sucesso no MFA: emite sessão com garantia AAL2
      const activeUser: UserSession = {
        ...DEFAULT_ADMIN_USER,
        email: tempEmail || DEFAULT_ADMIN_USER.email,
        lastSignIn: new Date().toISOString(),
      }

      setUser(activeUser)
      setIsAuthenticated(true)
      setStage("credentials")
      setIsLoading(false)
      setError(null)

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ isAuthenticated: true, user: activeUser })
        )
      } catch {
        // Ignora erro de storage restrito
      }

      return true
    },
    [tempEmail]
  )

  const cancelMfa = useCallback(() => {
    setStage("credentials")
    setError(null)
  }, [])

  const openRecovery = useCallback(() => {
    setStage("recovery")
    setError(null)
  }, [])

  const closeRecovery = useCallback(() => {
    setStage("credentials")
    setError(null)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(null)
    setStage("credentials")
    setTempEmail("")
    setError(null)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignora erro
    }
  }, [])

  return {
    isAuthenticated,
    user,
    stage,
    tempEmail,
    isLoading,
    error,
    isLocked,
    lockoutSeconds,
    submitCredentials,
    verifyMfa,
    cancelMfa,
    openRecovery,
    closeRecovery,
    logout,
  }
}
