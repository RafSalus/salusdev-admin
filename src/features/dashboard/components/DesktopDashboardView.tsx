import { Icon } from "@/components/ui/Icon"
import type { Product } from "@/features/products/types/product.types"
import { initialSystemNodes, initialRecentEvents } from "../data/dashboard.mock"

export interface DesktopDashboardViewProps {
  products: Product[]
  userName?: string
  onSelectSection: (section: string) => void
  onOpenNewProduct: () => void
}

export function DesktopDashboardView({
  products,
  userName = "Rafael Salustiano",
  onSelectSection,
  onOpenNewProduct,
}: DesktopDashboardViewProps) {
  const activeProducts = products.filter((p) => p.status === "Ativo").length
  const devProducts = products.filter((p) => p.status === "Desenvolvimento").length
  const totalClients = products.reduce((acc, p) => acc + p.clients, 0)

  const systemNodes = initialSystemNodes
  const recentEvents = initialRecentEvents

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Dashboard */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#23634e]">
            Centro de Comando SalusDev
          </p>
          <h1 className="mt-2 text-[28px] font-black tracking-[-.05em] text-[#142821] sm:text-[34px]">
            Dashboard Executivo
          </h1>
          <p className="mt-1.5 text-xs text-[#60736a]">
            Visão consolidada de operações, saúde dos sistemas e atalhos rápidos de governança.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSelectSection("Produtos")}
            className="flex items-center gap-2 rounded-xl border border-[#163e32]/15 bg-white px-4 py-3 text-xs font-bold text-[#163e32] shadow-xs transition hover:bg-[#f6f8f5]"
          >
            <Icon name="code" size={16} />
            <span>Ver Portfólio</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewProduct}
            className="flex items-center gap-2 rounded-xl bg-[#163e32] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#123127]"
          >
            <Icon name="plus" size={16} />
            <span>Novo Produto</span>
          </button>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <article className="rounded-2xl border border-[#163e32]/8 bg-white p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <span className="stat-icon stat-icon--green">
              <Icon name="apps" size={18} />
            </span>
            <span className="text-[9px] font-bold text-[#8c9992]">Atualizado agora</span>
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-[#142821]">
            {products.length.toString().padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold text-[#18372c]">Total de Produtos</p>
          <p className="mt-0.5 text-[10px] text-[#7a8a83]">Em todo o ecossistema</p>
        </article>

        <article className="rounded-2xl border border-[#163e32]/8 bg-white p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <span className="stat-icon stat-icon--amber">
              <Icon name="code" size={18} />
            </span>
            <span className="text-[9px] font-bold text-[#8c9992]">Atualizado agora</span>
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-[#142821]">
            {devProducts.toString().padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold text-[#18372c]">Em Construção</p>
          <p className="mt-0.5 text-[10px] text-[#7a8a83]">Fase de engenharia ativa</p>
        </article>

        <article className="rounded-2xl border border-[#163e32]/8 bg-white p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <span className="stat-icon stat-icon--blue">
              <Icon name="check" size={18} />
            </span>
            <span className="text-[9px] font-bold text-[#8c9992]">Atualizado agora</span>
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-[#142821]">
            {activeProducts.toString().padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold text-[#18372c]">Sistemas Ativos</p>
          <p className="mt-0.5 text-[10px] text-[#7a8a83]">Em produção estável</p>
        </article>

        <article className="rounded-2xl border border-[#163e32]/8 bg-white p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <span className="stat-icon stat-icon--purple">
              <Icon name="clients" size={18} />
            </span>
            <span className="text-[9px] font-bold text-[#8c9992]">Atualizado agora</span>
          </div>
          <p className="mt-4 text-3xl font-black tracking-tight text-[#142821]">
            {totalClients.toString().padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold text-[#18372c]">Clientes Vinculados</p>
          <p className="mt-0.5 text-[10px] text-[#7a8a83]">Distribuição em contratos</p>
        </article>
      </section>

      {/* Grid Principal do Dashboard: Painel de Saúde + Ações Rápidas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Coluna Esquerda: Monitoramento de Sistemas (7 colunas) */}
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-2xl border border-[#163e32]/8 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#163e32]/8 pb-4">
              <div>
                <h2 className="text-base font-bold text-[#142821]">
                  Status Operacional dos Sistemas
                </h2>
                <p className="mt-0.5 text-xs text-[#7a8a83]">
                  Healthcheck contínuo das aplicações e microsserviços SalusDev
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-[#eef7f2] px-3 py-1 text-[10px] font-extrabold text-[#23634e]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#23634e]" />
                Todos os nós saudáveis
              </span>
            </div>

            <div className="mt-4 divide-y divide-[#163e32]/6">
              {systemNodes.map((node) => (
                <div
                  key={node.name}
                  className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <p className="truncate text-xs font-bold text-[#142821]">
                      {node.name}
                    </p>
                    <p className="text-[10px] text-[#7a8a83]">{node.domain} • {node.type}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden text-[10px] font-semibold text-[#8c9992] sm:inline">
                      {node.uptime}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        node.status === "Online" || node.status === "Operacional"
                          ? "bg-[#eef7f2] text-[#23634e]"
                          : node.status === "Piloto"
                          ? "bg-[#fff6e6] text-[#c18442]"
                          : "bg-[#f2f4f2] text-[#60736a]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          node.status === "Online" || node.status === "Operacional"
                            ? "bg-[#23634e]"
                            : node.status === "Piloto"
                            ? "bg-[#c18442]"
                            : "bg-[#8c9992]"
                        }`}
                      />
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Atividades e Auditoria Recente */}
          <section className="rounded-2xl border border-[#163e32]/8 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#142821]">
              Atividades Recentes de Governança
            </h2>
            <div className="mt-4 space-y-3">
              {recentEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-start gap-3 rounded-xl bg-[#f8faf7] p-3 text-xs"
                >
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#eef7f2] text-[#23634e]">
                    <Icon name={ev.type === "auth" ? "shield" : ev.type === "health" ? "check" : "apps"} size={14} />
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-[#142821]">{ev.title}</p>
                    <p className="text-[11px] text-[#60736a]">{ev.desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#8c9992]">{ev.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Coluna Direita: Atalhos Rápidos e Resumo Comercial (5 colunas) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Ações Rápidas */}
          <section className="rounded-2xl border border-[#163e32]/8 bg-white p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#142821]">
              Atalhos de Operação
            </h2>
            <p className="mt-0.5 text-xs text-[#7a8a83]">
              Acesso direto às ações frequentes de gestão
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={onOpenNewProduct}
                className="flex flex-col items-start rounded-xl border border-[#163e32]/8 bg-[#f8faf7] p-3.5 text-left transition hover:border-[#163e32]/20 hover:bg-[#eef7f2]/50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef7f2] text-[#23634e]">
                  <Icon name="plus" size={16} />
                </span>
                <span className="mt-2.5 text-xs font-bold text-[#142821]">Novo Produto</span>
                <span className="text-[10px] text-[#7a8a83]">Cadastrar no catálogo</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectSection("Clientes")}
                className="flex flex-col items-start rounded-xl border border-[#163e32]/8 bg-[#f8faf7] p-3.5 text-left transition hover:border-[#163e32]/20 hover:bg-[#eef7f2]/50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f0eef9] text-[#7d5ba6]">
                  <Icon name="clients" size={16} />
                </span>
                <span className="mt-2.5 text-xs font-bold text-[#142821]">Gerir Clientes</span>
                <span className="text-[10px] text-[#7a8a83]">Empresas vinculadas</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectSection("Leads")}
                className="flex flex-col items-start rounded-xl border border-[#163e32]/8 bg-[#f8faf7] p-3.5 text-left transition hover:border-[#163e32]/20 hover:bg-[#eef7f2]/50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef7f2] text-[#23634e]">
                  <Icon name="leads" size={16} />
                </span>
                <span className="mt-2.5 text-xs font-bold text-[#142821]">Funil de Leads</span>
                <span className="text-[10px] text-[#7a8a83]">4 contatos pendentes</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectSection("Configurações")}
                className="flex flex-col items-start rounded-xl border border-[#163e32]/8 bg-[#f8faf7] p-3.5 text-left transition hover:border-[#163e32]/20 hover:bg-[#eef7f2]/50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f3f4f1] text-[#60736a]">
                  <Icon name="settings" size={16} />
                </span>
                <span className="mt-2.5 text-xs font-bold text-[#142821]">Configurações</span>
                <span className="text-[10px] text-[#7a8a83]">Parâmetros gerais</span>
              </button>
            </div>
          </section>

          {/* Card de Autoridade Regional */}
          <section className="rounded-2xl border border-[#163e32]/10 bg-gradient-to-br from-[#163e32] to-[#0f2d24] p-6 text-white shadow-sm">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-[#a4dbc6]">
              Centro de Operações
            </span>
            <h3 className="mt-3 text-lg font-bold leading-snug">
              SalusDev Software House
            </h3>
            <p className="mt-1 text-xs text-emerald-100/80 leading-relaxed">
              Hub unificado para administração de aplicações proprietárias, contratos e infraestrutura técnica de Apucarana e região.
            </p>
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3 text-[11px] text-emerald-200/90 font-medium">
              <span className="h-2 w-2 rounded-full bg-[#48a27e]" />
              <span>Ambiente Protegido por MFA (TOTP)</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
