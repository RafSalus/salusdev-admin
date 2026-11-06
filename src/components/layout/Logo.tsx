export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef7f2] border border-[#163e32]/12 text-[12px] font-black tracking-tighter text-[#163e32] shadow-xs">
        &lt; / &gt;
      </span>
      <div>
        <p className="text-[17px] font-extrabold leading-none tracking-[-0.035em] text-[#142821]">
          Salus<span className="text-[#23634e]">Dev</span>
        </p>
        <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[.18em] text-[#87948e]">
          Centro de comando
        </p>
      </div>
    </div>
  )
}
