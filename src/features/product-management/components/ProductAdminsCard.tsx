import { useState } from "react"
import { ShieldCheck, UserPlus, KeyRound, Clock, UserX } from "lucide-react"
import type { ProductAdmin } from "@/features/products/types/product.types"
import { InviteAdminModal } from "./InviteAdminModal"

interface ProductAdminsCardProps {
  admins?: ProductAdmin[]
  onAddAdmin?: (newAdmin: ProductAdmin) => void
  onRevokeAdmin?: (adminId: string) => void
}

export function ProductAdminsCard({
  admins = [],
  onAddAdmin,
  onRevokeAdmin,
}: ProductAdminsCardProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-[#163e32]/10 bg-white p-5 sm:p-6 shadow-xs space-y-4">
      {/* Topo do Card */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eaf3ee] text-[#163e32]">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#142821]">
              Administradores do Produto
            </h3>
            <p className="text-xs text-[#63766d]">
              Controle de acessos, papéis de autorização e conformidade MFA
            </p>
          </div>
        </div>

        {onAddAdmin && (
          <button
            type="button"
            onClick={() => setIsInviteOpen(true)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#163e32]/20 bg-white px-3.5 py-2 text-xs font-bold text-[#163e32] shadow-2xs hover:bg-[#eaf3ee] transition active:scale-95 cursor-pointer"
          >
            <UserPlus size={15} />
            <span>Convidar Administrador</span>
          </button>
        )}
      </div>

      {/* Lista de Administradores */}
      <div className="divide-y divide-[#163e32]/8 rounded-xl border border-[#163e32]/10 bg-[#fbfdfc] overflow-hidden">
        {admins.map((adm) => (
          <div
            key={adm.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 gap-2 hover:bg-white transition"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#163e32] font-black text-xs text-white shrink-0">
                {adm.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#142821]">{adm.name}</span>
                  <span className="rounded bg-[#163e32]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#163e32]">
                    {adm.role}
                  </span>
                </div>
                <div className="text-xs text-[#64786f]">{adm.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-11 sm:pl-0">
              {/* Selo MFA */}
              <div className="flex items-center gap-1.5 text-xs">
                {adm.mfaStatus === "Ativo" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#dff4e8] px-2 py-0.5 text-[10px] font-extrabold text-[#1f6b4a]">
                    <ShieldCheck size={11} />
                    <span>MFA Ativo</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7ed] px-2 py-0.5 text-[10px] font-extrabold text-[#c26200]">
                    <Clock size={11} />
                    <span>MFA Pendente</span>
                  </span>
                )}
              </div>

              <div className="text-[11px] text-[#71857b]">
                Acesso: <strong className="text-[#3c5046]">{adm.lastAccessAt}</strong>
              </div>

              {onRevokeAdmin && adm.role !== "Administrador Geral" && (
                <button
                  type="button"
                  onClick={() => onRevokeAdmin(adm.id)}
                  aria-label={`Revogar acesso de ${adm.name}`}
                  className="grid h-8 w-8 place-items-center rounded-lg text-[#9b4e45] hover:bg-[#fdedeb] transition cursor-pointer"
                >
                  <UserX size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Convidar */}
      {isInviteOpen && onAddAdmin && (
        <InviteAdminModal
          open={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          onInvite={(newAdmin) => {
            onAddAdmin(newAdmin)
            setIsInviteOpen(false)
          }}
        />
      )}
    </div>
  )
}
