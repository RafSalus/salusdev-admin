import { Icon, type IconName } from "@/components/ui/Icon"
import type { Product } from "../types/product.types"

export interface ProductStatsProps {
  products: Product[]
}

export function ProductStats({ products }: ProductStatsProps) {
  const stats = [
    {
      label: "Total de produtos",
      value: products.length,
      detail: "em todo o portfólio",
      icon: "apps" as IconName,
      tone: "green",
    },
    {
      label: "Em desenvolvimento",
      value: products.filter((p) => p.status === "Desenvolvimento").length,
      detail: "produto em construção",
      icon: "code" as IconName,
      tone: "amber",
    },
    {
      label: "Produtos ativos",
      value: products.filter((p) => p.status === "Ativo").length,
      detail: "disponível em produção",
      icon: "check" as IconName,
      tone: "blue",
    },
    {
      label: "Clientes vinculados",
      value: products.reduce((sum, p) => sum + p.clients, 0),
      detail: "em todos os produtos",
      icon: "clients" as IconName,
      tone: "purple",
    },
  ]

  return (
    <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-[#173e32]/8 bg-white p-4 sm:p-5 shadow-xs"
        >
          <div className="flex items-start justify-between">
            <span className={`stat-icon stat-icon--${stat.tone}`}>
              <Icon name={stat.icon} size={18} />
            </span>
            <span className="hidden text-[9px] font-bold text-[#9ca7a2] sm:inline">
              Atualizado agora
            </span>
          </div>
          <p className="mt-4 text-[26px] font-extrabold tracking-[-.04em] text-[#18372c] sm:text-[30px]">
            {stat.value.toString().padStart(2, "0")}
          </p>
          <p className="mt-1 text-[11px] font-extrabold text-[#324f44]">
            {stat.label}
          </p>
          <p className="mt-0.5 hidden text-[9px] font-semibold text-[#8a9690] sm:block">
            {stat.detail}
          </p>
        </article>
      ))}
    </section>
  )
}
