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
    <section className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-[#173e32]/7 bg-white p-4 sm:p-5"
        >
          <div className="flex items-start justify-between">
            <span className={`stat-icon stat-icon--${stat.tone}`}>
              <Icon name={stat.icon} size={18} />
            </span>
            <span className="hidden text-[8px] font-bold text-[#9ca7a2] sm:inline">
              Atualizado agora
            </span>
          </div>
          <p className="mt-5 text-[24px] font-extrabold tracking-[-.05em] text-[#18372c] sm:text-[28px]">
            {stat.value.toString().padStart(2, "0")}
          </p>
          <p className="mt-1 text-[10px] font-extrabold text-[#425b51]">
            {stat.label}
          </p>
          <p className="mt-1 hidden text-[8px] font-semibold text-[#9aa49f] sm:block">
            {stat.detail}
          </p>
        </article>
      ))}
    </section>
  )
}
