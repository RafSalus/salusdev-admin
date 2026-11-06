import { AlertTriangle, Check } from "lucide-react"
import type { KartPilotStatus } from "../types/kartControl.types"

export interface StatusBadgeProps {
  status: KartPilotStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isPending = status === "Pendente"

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
        isPending
          ? "bg-[#fff6e8] border border-[#fae3c3] text-[#b46517]"
          : "bg-[#eaf5ee] border border-[#d2ebd9] text-[#1e6149]"
      }`}
    >
      {isPending ? (
        <AlertTriangle size={11} className="stroke-[2.5]" />
      ) : (
        <Check size={11} className="stroke-[3]" />
      )}
      <span>{isPending ? "Pendente" : "Ativo"}</span>
    </span>
  )
}
