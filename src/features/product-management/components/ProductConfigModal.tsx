import { useState, useRef, useEffect } from "react"
import { X, Check } from "lucide-react"
import { useDismiss } from "@/shared/hooks/useDismiss"

export interface ProductConfigModalProps {
  open: boolean
  title: string
  label: string
  initialValue: string
  placeholder?: string
  onClose: () => void
  onSave: (value: string) => void
}

export function ProductConfigModal({
  open,
  title,
  label,
  initialValue,
  placeholder,
  onClose,
  onSave,
}: ProductConfigModalProps) {
  const [value, setValue] = useState(initialValue)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(initialValue)
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open, initialValue])

  useDismiss({
    enabled: open,
    ref: modalRef,
    onDismiss: onClose,
  })

  if (!open) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(value.trim())
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1a15]/45 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl border border-[#163e32]/12 bg-white p-6 shadow-2xl transition-all"
      >
        <div className="flex items-center justify-between border-b border-[#163e32]/8 pb-4">
          <h2
            id="config-modal-title"
            className="text-base font-black text-[#142821]"
          >
            {title}
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
              htmlFor="config-field-input"
              className="block text-xs font-bold text-[#45574f] mb-1.5"
            >
              {label}
            </label>
            <input
              ref={inputRef}
              id="config-field-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder || "Digite o valor..."}
              className="w-full min-h-[44px] rounded-xl border border-[#163e32]/14 bg-white px-3.5 text-base sm:text-xs font-semibold text-[#142821] placeholder:text-[#a0aaa5] focus:border-[#23634e] focus:outline-none focus:ring-3 focus:ring-[#23634e]/10 transition"
            />
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
              <span>Salvar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
