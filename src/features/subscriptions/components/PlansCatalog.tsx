import { Check, Sparkles, Layers, ShieldCheck } from "lucide-react"
import type { Plan } from "../types/subscription.types"

interface PlansCatalogProps {
  plans: Plan[]
  onOpenEntitlements: () => void
}

export function PlansCatalog({ plans, onOpenEntitlements }: PlansCatalogProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#142821]">
            Catálogo de Planos B2C e Entitlements
          </h3>
          <p className="text-xs sm:text-sm text-[#61746b]">
            Estrutura unificada de planos e recursos com liberação automatizada por perfil.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenEntitlements}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#163e32]/20 bg-white px-3.5 py-2 text-xs font-bold text-[#163e32] shadow-xs hover:bg-[#eaf3ee] transition active:scale-95"
        >
          <Layers size={15} />
          <span>Ver matriz de entitlements</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const isPro = plan.code === "pro"
          const isPremium = plan.code === "premium"

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 shadow-xs transition ${
                isPro
                  ? "border-[#163e32] bg-linear-to-b from-white to-[#f4faf7] ring-2 ring-[#163e32]/20 shadow-md"
                  : isPremium
                  ? "border-[#b86a2e]/30 bg-linear-to-b from-white to-[#fdfaf6]"
                  : "border-[#163e32]/10 bg-white"
              }`}
            >
              {/* Selo de Destaque */}
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-[#163e32] px-3 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm">
                  <Sparkles size={11} className="text-[#a4e2c6]" />
                  <span>Mais Popular</span>
                </div>
              )}

              {isPremium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-[#b86a2e] px-3 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm">
                  <ShieldCheck size={11} className="text-[#ffe0c2]" />
                  <span>Experiência VIP</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-extrabold ${
                      isPremium
                        ? "bg-[#fff2e5] text-[#b86a2e]"
                        : isPro
                        ? "bg-[#e2f3eb] text-[#163e32]"
                        : "bg-[#edf2ef] text-[#556960]"
                    }`}
                  >
                    {plan.name}
                  </span>
                  <span className="text-[11px] font-bold text-[#64786e]">
                    {plan.subscriberCount} assinantes
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline gap-1.5">
                    {plan.priceCents === 0 ? (
                      <span className="text-2xl font-black text-[#142821]">
                        Grátis
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-[#142821]">
                          Sob Consulta
                        </span>
                        <span className="rounded-md bg-[#163e32]/10 px-2 py-0.5 text-[10px] font-bold text-[#163e32] uppercase">
                          Em breve
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#5f736a]">
                    {plan.description}
                  </p>
                </div>

                {/* Lista de Features */}
                <div className="mt-4 border-t border-[#163e32]/10 pt-4">
                  <span className="block text-[11px] font-bold text-[#6b7f75] uppercase tracking-wider mb-2.5">
                    Recursos incluídos
                  </span>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#2b4138]">
                        <Check
                          size={14}
                          className={`mt-0.5 shrink-0 ${
                            isPro ? "text-[#163e32]" : isPremium ? "text-[#b86a2e]" : "text-[#556960]"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#163e32]/8">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#667a70]">
                  <span>Faturamento:</span>
                  <span className="font-bold text-[#142821]">Recorrente mensal</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
