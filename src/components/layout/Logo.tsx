export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#173e32] text-white shadow-sm">
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18.5 6.5c-2-2.3-5.8-2.7-8.5-1.1-2.8 1.7-2.7 4.5.4 5.3l3.2.8c3.1.8 3.2 3.7.4 5.3-2.7 1.6-6.5 1.2-8.5-1.1"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M12 3v18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity=".55"
          />
        </svg>
      </span>
      <div>
        <p className="text-[18px] font-extrabold leading-none tracking-[-0.04em] text-[#142821]">
          Salus<span className="text-[#31866b]">Dev</span>
        </p>
        <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[.17em] text-[#87948e]">
          Centro de comando
        </p>
      </div>
    </div>
  )
}
