import { Pencil } from "lucide-react"
import type { KartPilot } from "../types/kartControl.types"
import { StatusBadge } from "./StatusBadge"

export interface PilotRowProps {
  pilot: KartPilot
  onEdit: (pilot: KartPilot) => void
}

export function PilotRow({ pilot, onEdit }: PilotRowProps) {
  // Formatar telefone se tiver 10 ou 11 dígitos
  const formattedPhone = pilot.phone.length === 11
    ? `(${pilot.phone.slice(0, 2)}) ${pilot.phone.slice(2, 7)}-${pilot.phone.slice(7)}`
    : pilot.phone

  return (
    <div className="flex flex-col gap-3 py-3.5 border-b border-[#163e32]/6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between transition hover:bg-[#fcfdfc] px-3 -mx-3 rounded-xl">
      {/* Dados do Piloto */}
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-extrabold text-[#142821]">
          {pilot.name}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-[#718279]">
          {pilot.email}
        </p>
        <p className="text-[10px] text-[#8fa097]">
          {formattedPhone}
        </p>
      </div>

      {/* Status, Data e Ação */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0">
        <StatusBadge status={pilot.status} />

        <span className="text-[11px] font-semibold text-[#87948e]">
          {pilot.date}
        </span>

        <button
          type="button"
          onClick={() => onEdit(pilot)}
          className="grid h-8 w-8 place-items-center rounded-lg border border-[#163e32]/10 bg-white text-[#55675f] hover:bg-[#eef4f0] hover:text-[#163e32] transition active:scale-95"
          title={`Editar piloto ${pilot.name}`}
          aria-label={`Editar ${pilot.name}`}
        >
          <Pencil size={14} />
        </button>
      </div>
    </div>
  )
}
