import { Icon } from "./Icon"

export interface ToastProps {
  message: string
}

export function Toast({ message }: ToastProps) {
  if (!message) return null

  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#173e32] px-5 py-3 text-[10px] font-extrabold text-white shadow-xl transition-all"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#d8f06b] text-[#173e32]">
        <Icon name="check" size={12} />
      </span>
      {message}
    </div>
  )
}
