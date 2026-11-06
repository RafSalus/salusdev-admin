import { useState, useEffect, useRef } from "react"
import { X, Check } from "lucide-react"
import type { KartPilot, KartPilotStatus } from "../types/kartControl.types"
import { useDismiss } from "@/shared/hooks/useDismiss"

export interface PilotEditModalProps {
  pilot: KartPilot | null
  open: boolean
  onClose: () => void
  onSave: (updated: KartPilot) => void
}

export function PilotEditModal({
  pilot,
  open,
  onClose,
  onSave,
}: PilotEditModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<KartPilotStatus>("Pendente")
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pilot) {
      setName(pilot.name)
      setEmail(pilot.email)
      setPhone(pilot.phone)
      setStatus(pilot.status)
    }
  }, [pilot])

  useDismiss({
    enabled: open,
    ref: modalRef,
    onDismiss: onClose,
  })

  if (!open || !pilot) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({
      ...pilot!,
      name: name.trim() || pilot!.name,
      email: email.trim() || pilot!.email,
      phone: phone.trim() || pilot!.phone,
      status,
    })
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pilot-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1a15]/45 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl border border-[#163e32]/12 bg-white p-6 shadow-2xl transition-all"
      >
        <div className="flex items-center justify-between border-b border-[#163e32]/8 pb-4">
          <h2
            id="pilot-modal-title"
            className="text-base font-black text-[#142821]"
          >
            Editar Piloto
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-[#667770] hover:bg-[#f4f6f3] hover:text-[#163e32] transition"
            aria-label="Fechar janela"
          >
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="pilot-name"
              className="block text-xs font-bold text-[#45574f] mb-1.5"
            >
              Nome completo
            </label>
            <input
              id="pilot-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-[#163e32]/14 bg-white px-3.5 text-base sm:text-xs font-semibold text-[#142821] focus:border-[#23634e] focus:outline-none focus:ring-3 focus:ring-[#23634e]/10 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pilot-email"
              className="block text-xs font-bold text-[#45574f] mb-1.5"
            >
              E-mail
            </label>
            <input
              id="pilot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-[#163e32]/14 bg-white px-3.5 text-base sm:text-xs font-semibold text-[#142821] focus:border-[#23634e] focus:outline-none focus:ring-3 focus:ring-[#23634e]/10 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pilot-phone"
              className="block text-xs font-bold text-[#45574f] mb-1.5"
            >
              Telefone
            </label>
            <input
              id="pilot-phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full min-h-[44px] rounded-xl border border-[#163e32]/14 bg-white px-3.5 text-base sm:text-xs font-semibold text-[#142821] focus:border-[#23634e] focus:outline-none focus:ring-3 focus:ring-[#23634e]/10 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#45574f] mb-1.5">
              Status da inscrição
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setStatus("Pendente")}
                className={`min-h-[42px] rounded-xl border text-xs font-bold transition ${
                  status === "Pendente"
                    ? "border-[#b46517] bg-[#fff6e8] text-[#b46517]"
                    : "border-[#163e32]/12 bg-white text-[#55675f] hover:bg-[#f6f8f5]"
                }`}
              >
                Pendente
              </button>
              <button
                type="button"
                onClick={() => setStatus("Ativo")}
                className={`min-h-[42px] rounded-xl border text-xs font-bold transition ${
                  status === "Ativo"
                    ? "border-[#1e6149] bg-[#eaf5ee] text-[#1e6149]"
                    : "border-[#163e32]/12 bg-white text-[#55675f] hover:bg-[#f6f8f5]"
                }`}
              >
                Ativo
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#163e32]/8">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[42px] rounded-xl px-4 py-2 text-xs font-bold text-[#5e6f66] hover:bg-[#f6f8f5] transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-[#163e32] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1f5243] transition active:scale-95"
            >
              <Check size={14} />
              <span>Salvar alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
