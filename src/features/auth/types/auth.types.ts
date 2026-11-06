export type AuthStage = "credentials" | "mfa" | "recovery"

export interface UserSession {
  id: string
  name: string
  email: string
  role: "admin" | "operator"
  aal: "aal1" | "aal2" // Authenticator Assurance Level (Supabase Auth)
  avatarInitials: string
  lastSignIn: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface MfaVerification {
  code: string
}

export interface AuthState {
  isAuthenticated: boolean
  stage: AuthStage
  user: UserSession | null
  isLoading: boolean
  error: string | null
  failedAttempts: number
  isLocked: boolean
  lockoutSecondsRemaining: number
}
