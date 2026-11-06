import { useState } from "react"
import { Activity, RefreshCw, CheckCircle2, Wifi } from "lucide-react"
import type { ProductHealth } from "@/features/products/types/product.types"

interface ProductHealthCardProps {
  health?: ProductHealth
  onTestHealth?: () => void
}

export function ProductHealthCard({
  health = {
    status: "Operacional",
    uptime: "99.98%",
    latencyMs: 38,
    version: "v1.2.0",
    lastCheckedAt: "Há poucos instantes",
  },
  onTestHealth,
}: ProductHealthCardProps) {
  const [isTesting, setIsTesting] = useState(false)
  const [currentLatency, setCurrentLatency] = useState(health.latencyMs)
  const [lastCheck, setLastCheck] = useState(health.lastCheckedAt)

  function handleRunTest() {
    setIsTesting(true)
    window.setTimeout(() => {
      setIsTesting(false)
      setCurrentLatency(Math.floor(30 + Math.random() * 20))
      setLastCheck("Agora mesmo")
      if (onTestHealth) onTestHealth()
    }, 550)
  }

  return (
    <div className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      {/* Topo */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#dff4e8] text-[#163e32]">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#142821]">
              Saúde Operacional e Telemetria
            </h3>
            <p className="text-xs text-[#63766d]">
              Monitoramento automatizado de disponibilidade e latência do serviço
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRunTest}
          disabled={isTesting}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#163e32]/20 bg-white px-3.5 py-2 text-xs font-bold text-[#163e32] shadow-2xs hover:bg-[#eaf3ee] transition active:scale-95 disabled:opacity-60 cursor-pointer"
        >
          <RefreshCw size={14} className={isTesting ? "animate-spin" : ""} />
          <span>{isTesting ? "Verificando..." : "Testar agora"}</span>
        </button>
      </div>

      {/* Grid de Métricas de Saúde */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Status */}
        <div className="rounded-xl border border-[#163e32]/8 bg-[#fbfdfc] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Estado do Sistema
          </span>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
            </span>
            <span className="text-sm font-extrabold text-[#10754e]">
              {health.status}
            </span>
          </div>
        </div>

        {/* Uptime */}
        <div className="rounded-xl border border-[#163e32]/8 bg-[#fbfdfc] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Uptime Mensal
          </span>
          <div className="mt-1 flex items-center justify-center gap-1">
            <CheckCircle2 size={14} className="text-[#287353]" />
            <span className="text-sm font-extrabold text-[#142821]">
              {health.uptime}
            </span>
          </div>
        </div>

        {/* Latência */}
        <div className="rounded-xl border border-[#163e32]/8 bg-[#fbfdfc] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Latência do Edge
          </span>
          <div className="mt-1 flex items-center justify-center gap-1">
            <Wifi size={14} className="text-[#2563eb]" />
            <span className="text-sm font-extrabold text-[#142821]">
              {currentLatency} ms
            </span>
          </div>
        </div>

        {/* Versão Ativa */}
        <div className="rounded-xl border border-[#163e32]/8 bg-[#fbfdfc] p-3 text-center">
          <span className="block text-[10px] font-bold text-[#64796e] uppercase">
            Compilação
          </span>
          <div className="mt-1">
            <span className="rounded-md bg-[#163e32]/10 px-2 py-0.5 font-mono text-xs font-bold text-[#163e32]">
              {health.version}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#6d8177] pt-1">
        <span>Última checagem automatizada: <strong>{lastCheck}</strong></span>
        <span>Endpoint: <code className="font-mono text-[#163e32]">/api/health</code></span>
      </div>
    </div>
  )
}
