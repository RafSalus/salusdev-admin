import type { ReactNode } from "react"
import { Logo } from "@/components/layout/Logo"
import { Icon } from "@/components/ui/Icon"

export interface AuthCardProps {
  children: ReactNode
  title: string
  subtitle: string
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f5f6f2] px-4 py-8 sm:px-6 lg:px-8">
      {/* Topo com indicador de segurança */}
      <header className="mx-auto flex w-full max-w-[440px] items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1.5 rounded-full border border-[#173e32]/10 bg-white px-3 py-1 text-[11px] font-bold text-[#173e32] shadow-xs">
          <Icon name="shield" size={14} />
          <span>Acesso Seguro</span>
        </div>
      </header>

      {/* Conteúdo Central: Card de Autenticação */}
      <main className="mx-auto my-auto w-full max-w-[440px]">
        <div className="rounded-2xl border border-[#173e32]/10 bg-white p-6 shadow-xl sm:p-9">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold tracking-tight text-[#18342a] sm:text-2xl">
              {title}
            </h1>
            <p className="mt-1.5 text-xs text-[#60736a] sm:text-sm">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </main>

      {/* Rodapé com conformidade LGPD e versão */}
      <footer className="mx-auto mt-6 text-center text-[11px] text-[#7a8a83]">
        <p>Centro de Comando SalusDev — Plataforma de Gestão Integrada</p>
        <p className="mt-1">
          Protegido por autenticação de múltiplos fatores (MFA/2FA) em conformidade com a LGPD
        </p>
      </footer>
    </div>
  )
}
