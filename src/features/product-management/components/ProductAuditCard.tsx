import { History, Shield, CheckCircle } from "lucide-react"
import type { ProductAuditLog } from "@/features/products/types/product.types"

interface ProductAuditCardProps {
  logs?: ProductAuditLog[]
}

export function ProductAuditCard({
  logs = [
    {
      id: "aud-01",
      actor: "Rafael Amaral",
      action: "Atualizou credencial técnica",
      target: "Senha Administrativa",
      timestamp: "Hoje, 17:12",
    },
    {
      id: "aud-02",
      actor: "Sistema SalusDev",
      action: "Health check executado",
      target: "kart.salusdev.com",
      timestamp: "Hoje, 17:05",
    },
    {
      id: "aud-03",
      actor: "Rafael Amaral",
      action: "Concedeu permissão de operador",
      target: "operador@kartapucarana.com.br",
      timestamp: "Ontem, 16:40",
    },
  ],
}: ProductAuditCardProps) {
  return (
    <div className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      {/* Topo */}
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eaf3ee] text-[#163e32]">
          <History size={20} />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-[#142821]">
            Trilha de Auditoria e Conformidade
          </h3>
          <p className="text-xs text-[#63766d]">
            Registro imutável de ações administrativas e eventos do produto
          </p>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="divide-y divide-[#163e32]/8 rounded-xl border border-[#163e32]/10 bg-[#fbfdfc] overflow-hidden">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-3.5 text-xs hover:bg-white transition"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#dff4e8] text-[#163e32] shrink-0">
                <Shield size={14} />
              </div>
              <div>
                <div className="font-bold text-[#142821]">{log.action}</div>
                <div className="text-[11px] text-[#6d8076]">
                  Por: <strong className="text-[#3c5046]">{log.actor}</strong> · Alvo: <span className="font-mono text-[#163e32]">{log.target}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-semibold text-[#8a9b92] shrink-0">
              {log.timestamp}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#667a70]">
        <CheckCircle size={13} className="text-[#287353]" />
        <span>Conformidade com AUTH-02: retenção estrita de logs de acesso e alteração de parâmetros.</span>
      </div>
    </div>
  )
}
