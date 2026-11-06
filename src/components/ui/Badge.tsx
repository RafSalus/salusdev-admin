import type { ReactNode } from "react"

export interface BadgeProps {
  children: ReactNode
  className?: string
  dot?: boolean
}

export function Badge({ children, className = "", dot = true }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-extrabold ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  )
}
