import type { LucideIcon } from "lucide-react"

export interface KpiCardProps {
  label: string
  value: string | number
  icon: LucideIcon
}

export function KpiCard({ label, value, icon: IconComponent }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-[#163e32]/8 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#718279]">
          {label}
        </span>
        <span className="text-[#23634e]">
          <IconComponent size={19} />
        </span>
      </div>
      <div className="mt-4">
        <p className="text-2xl sm:text-3xl font-black tracking-tight text-[#142821] truncate">
          {value}
        </p>
      </div>
    </div>
  )
}
