import type { LucideIcon } from "lucide-react"

export interface KartPlaceholderViewProps {
  sectionTitle: string
  description: string
  icon: LucideIcon
  onBackToHome: () => void
}

export function KartPlaceholderView({
  sectionTitle,
  description,
  icon: IconComponent,
  onBackToHome,
}: KartPlaceholderViewProps) {
  return (
    <div className="rounded-2xl border border-[#163e32]/8 bg-white p-8 sm:p-14 text-center shadow-xs">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-[#eef7f2] text-[#23634e]">
        <IconComponent size={28} />
      </div>
      <h1 className="text-xl sm:text-2xl font-black text-[#142821]">
        {sectionTitle}
      </h1>
      <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-[#60736a] leading-relaxed">
        {description}
      </p>
      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#163e32] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#235343] transition active:scale-95"
        >
          <span>Voltar ao Início</span>
        </button>
      </div>
    </div>
  )
}
