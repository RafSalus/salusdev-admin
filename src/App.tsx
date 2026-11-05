import { useMemo, useState, type FormEvent, type ReactNode } from "react"

type IconName = "apps" | "arrow" | "bell" | "briefcase" | "calendar" | "check" | "chevron" | "clients" | "close" | "code" | "contract" | "copy" | "dots" | "external" | "finance" | "grid" | "help" | "home" | "leads" | "menu" | "payments" | "plus" | "search" | "settings" | "support" | "trend"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    apps: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clients: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    code: (
      <>
        <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
      </>
    ),
    contract: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    dots: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    external: (
      <>
        <path d="M15 3h6v6M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </>
    ),
    finance: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8M12 6v12" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.7 2.7 0 1 1 4.7 1.8c-1.1 1-2.2 1.4-2.2 3.2M12 18h.01" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    leads: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    payments: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    support: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="m5.6 5.6 4.3 4.3m4.2 4.2 4.3 4.3m0-12.8-4.3 4.3m-4.2 4.2-4.3 4.3" />
      </>
    ),
    trend: <path d="m3 17 6-6 4 4 8-9M15 6h6v6" />,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

type ProductStatus = "Planejamento" | "Desenvolvimento" | "Piloto" | "Ativo" | "Descontinuado"

type Product = {
  id: number
  name: string
  short: string
  category: string
  status: ProductStatus
  description: string
  clients: number
  updated: string
  progress: number
  color: string
  appUrl?: string
  repoUrl?: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "SalusDev Institucional",
    short: "SD",
    category: "Site institucional",
    status: "Ativo",
    description:
      "Presença digital, captação de leads e apresentação do portfólio da SalusDev.",
    clients: 1,
    updated: "Hoje, 09:42",
    progress: 100,
    color: "#173e32",
    appUrl: "salusdev.com",
    repoUrl: "github.com/salusdev/site",
  },
  {
    id: 2,
    name: "Salus Oficina",
    short: "SO",
    category: "SaaS para oficinas",
    status: "Desenvolvimento",
    description:
      "Gestão de ordens de serviço, clientes, veículos e rotina financeira para oficinas.",
    clients: 2,
    updated: "Ontem, 16:20",
    progress: 62,
    color: "#2f8064",
    appUrl: "oficina.salusdev.com",
    repoUrl: "github.com/salusdev/oficina",
  },
  {
    id: 3,
    name: "Finanças Pessoais",
    short: "FP",
    category: "Aplicação web",
    status: "Planejamento",
    description:
      "Organização financeira pessoal com visão clara de despesas, metas e evolução mensal.",
    clients: 0,
    updated: "02 nov, 2026",
    progress: 18,
    color: "#6d7e76",
    repoUrl: "github.com/salusdev/financas",
  },
  {
    id: 4,
    name: "Kart Control",
    short: "KC",
    category: "Sistema de gestão",
    status: "Piloto",
    description:
      "Controle de baterias, pilotos, tempos e manutenção para operações de kart indoor.",
    clients: 1,
    updated: "30 out, 2026",
    progress: 84,
    color: "#c18442",
    appUrl: "kart.salusdev.com",
    repoUrl: "github.com/salusdev/kart-control",
  },
  {
    id: 5,
    name: "Salus Commerce",
    short: "SC",
    category: "E-commerce",
    status: "Planejamento",
    description:
      "Base de comércio eletrônico adaptável para lojas e pequenos negócios da região.",
    clients: 0,
    updated: "26 out, 2026",
    progress: 8,
    color: "#6d7093",
  },
]

const statusStyles: Record<ProductStatus, string> = {
  Planejamento: "bg-[#eef0ed] text-[#596b64]",
  Desenvolvimento: "bg-[#fff2d7] text-[#96631d]",
  Piloto: "bg-[#e9e8ff] text-[#5c56a4]",
  Ativo: "bg-[#dff4e8] text-[#287353]",
  Descontinuado: "bg-[#f3e4e2] text-[#9b4e45]",
}

const navGroups = [
  {
    label: "Visão geral",
    items: [
      { label: "Dashboard", icon: "home" as IconName },
      { label: "Leads", icon: "leads" as IconName, count: 4 },
    ],
  },
  {
    label: "Gestão",
    items: [
      { label: "Produtos", icon: "apps" as IconName },
      { label: "Clientes", icon: "clients" as IconName },
      { label: "Contratos", icon: "contract" as IconName },
      { label: "Assinaturas", icon: "calendar" as IconName },
      { label: "Pagamentos", icon: "payments" as IconName },
      { label: "Atendimentos", icon: "support" as IconName },
    ],
  },
]

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#173e32] text-white">
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

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0c1d17]/35 backdrop-blur-sm lg:hidden"
          aria-label="Fechar menu"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col border-r border-[#173e32]/8 bg-white px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-[#687871] hover:bg-[#f0f2ed] lg:hidden"
            aria-label="Fechar menu"
          >
            <Icon name="close" size={19} />
          </button>
        </div>

        <nav className="mt-9 flex-1" aria-label="Navegação administrativa">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-7">
              <p className="mb-2 px-3 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#9ca6a1]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = item.label === "Produtos"
                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={onClose}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-bold transition ${
                        active
                          ? "bg-[#eaf3ed] text-[#206348]"
                          : "text-[#61716b] hover:bg-[#f5f6f2] hover:text-[#243f35]"
                      }`}
                    >
                      <span
                        className={active ? "text-[#2e8062]" : "text-[#7b8983]"}
                      >
                        <Icon name={item.icon} size={18} />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.count && (
                        <span className="grid min-w-5 place-items-center rounded-full bg-[#d8f06b] px-1.5 py-0.5 text-[9px] font-extrabold text-[#314027]">
                          {item.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-1 border-t border-[#173e32]/8 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-bold text-[#687871] hover:bg-[#f5f6f2]"
          >
            <Icon name="settings" size={18} /> Configurações
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-bold text-[#687871] hover:bg-[#f5f6f2]"
          >
            <Icon name="help" size={18} /> Ajuda
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#f5f6f2] p-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#173e32] text-[10px] font-extrabold text-white">
            RA
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-extrabold text-[#243d34]">
              Rafael Salustiano
            </p>
            <p className="mt-0.5 text-[9px] font-semibold text-[#8a9791]">
              Administrador
            </p>
          </div>
          <Icon name="dots" size={17} />
        </div>
      </aside>
    </>
  )
}

function ProductCard({
  product,
  onOpen,
}: {
  product: Product
  onOpen: () => void
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#173e32]/8 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#2f8064]/25 hover:shadow-[0_14px_38px_rgba(25,53,43,.07)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xs font-extrabold text-white"
            style={{ background: product.color }}
          >
            {product.short}
          </span>
          <div>
            <h3 className="text-[14px] font-extrabold leading-tight tracking-[-.025em] text-[#1a352b]">
              {product.name}
            </h3>
            <p className="mt-1 text-[9px] font-bold text-[#8a9892]">
              {product.category}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#7a8983] hover:bg-[#f2f4ef]"
          aria-label={`Mais opções para ${product.name}`}
        >
          <Icon name="dots" size={17} />
        </button>
      </div>

      <p className="mt-5 flex-1 text-[11px] leading-[1.65] text-[#6d7b75]">
        {product.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-[9px] font-bold">
          <span className="text-[#82908a]">Progresso</span>
          <span className="text-[#344e44]">{product.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#edf0eb]">
          <div
            className="h-full rounded-full bg-[#459276]"
            style={{ width: `${product.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#173e32]/7 pt-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-extrabold ${statusStyles[product.status]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {product.status}
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#7b8983]">
          <Icon name="clients" size={14} />
          {product.clients} {product.clients === 1 ? "cliente" : "clientes"}
        </span>
      </div>
    </article>
  )
}

function ProductPanel({
  product,
  onClose,
  onEdit,
}: {
  product: Product
  onClose: () => void
  onEdit: () => void
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-[#10251e]/30 backdrop-blur-[2px]"
        aria-label="Fechar detalhes"
      />
      <aside className="fixed inset-y-0 right-0 z-[70] w-full max-w-[440px] overflow-y-auto bg-white p-6 shadow-[-20px_0_60px_rgba(20,40,33,.12)] sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#87948e]">
            Detalhes do produto
          </p>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#173e32]/8 text-[#6f7e78] hover:bg-[#f4f6f1]"
            aria-label="Fechar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-8 flex items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-sm font-extrabold text-white"
            style={{ background: product.color }}
          >
            {product.short}
          </span>
          <div>
            <h2 className="text-xl font-extrabold tracking-[-.04em] text-[#18342a]">
              {product.name}
            </h2>
            <p className="mt-1 text-[10px] font-bold text-[#85928d]">
              {product.category}
            </p>
          </div>
        </div>
        <span
          className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-extrabold ${statusStyles[product.status]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{" "}
          {product.status}
        </span>

        <p className="mt-6 text-xs leading-6 text-[#62736c]">
          {product.description}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#f5f7f3] p-4">
            <span className="text-[#3f866d]">
              <Icon name="clients" size={18} />
            </span>
            <p className="mt-3 text-xl font-extrabold tracking-[-.04em]">
              {product.clients}
            </p>
            <p className="mt-1 text-[9px] font-bold text-[#83908b]">
              Clientes vinculados
            </p>
          </div>
          <div className="rounded-xl bg-[#f5f7f3] p-4">
            <span className="text-[#3f866d]">
              <Icon name="trend" size={18} />
            </span>
            <p className="mt-3 text-xl font-extrabold tracking-[-.04em]">
              {product.progress}%
            </p>
            <p className="mt-1 text-[9px] font-bold text-[#83908b]">
              Progresso atual
            </p>
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#87948e]">
            Links do projeto
          </h3>
          <div className="mt-3 space-y-2">
            {product.appUrl ? (
              <div className="flex items-center gap-3 rounded-xl border border-[#173e32]/8 p-3.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e8f3ec] text-[#2f8064]">
                  <Icon name="external" size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-bold text-[#94a09b]">
                    Aplicação
                  </p>
                  <p className="truncate text-[10px] font-extrabold">
                    {product.appUrl}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-[#7b8a84]"
                  aria-label="Copiar link"
                >
                  <Icon name="copy" size={16} />
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#173e32]/14 p-3.5 text-center text-[9px] font-bold text-[#8d9994]">
                Link da aplicação ainda não cadastrado
              </div>
            )}
            {product.repoUrl && (
              <div className="flex items-center gap-3 rounded-xl border border-[#173e32]/8 p-3.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef0ed] text-[#51655c]">
                  <Icon name="code" size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-bold text-[#94a09b]">
                    Repositório
                  </p>
                  <p className="truncate text-[10px] font-extrabold">
                    {product.repoUrl}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-[#7b8a84]"
                  aria-label="Copiar link"
                >
                  <Icon name="copy" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-7 border-t border-[#173e32]/8 pt-6">
          <div className="flex items-center justify-between text-[9px] font-bold text-[#83908b]">
            <span>Última atualização</span>
            <span className="text-[#50645b]">{product.updated}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#173e32] px-5 py-3.5 text-[11px] font-extrabold text-white hover:bg-[#235343]"
        >
          Editar produto <Icon name="arrow" size={16} />
        </button>
      </aside>
    </>
  )
}

function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product?: Product
  onClose: () => void
  onSave: (product: Product) => void
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name"))
    onSave({
      id: product?.id ?? Date.now(),
      name,
      short: name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      category: String(data.get("category")),
      status: String(data.get("status")) as ProductStatus,
      description: String(data.get("description")),
      clients: product?.clients ?? 0,
      updated: "Agora",
      progress: Number(data.get("progress")),
      color: product?.color ?? "#367e65",
      appUrl: String(data.get("appUrl") || ""),
      repoUrl: String(data.get("repoUrl") || ""),
    })
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-[#10251e]/40 p-4 backdrop-blur-[3px]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Fechar formulário"
      />
      <form
        onSubmit={submit}
        className="relative my-5 w-full max-w-[590px] rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-[#39836a]">
              {product ? "Editar cadastro" : "Novo cadastro"}
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-[-.04em]">
              {product ? "Editar produto" : "Cadastrar produto"}
            </h2>
            <p className="mt-2 text-[10px] text-[#7b8983]">
              Organize as informações principais do sistema.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#173e32]/8 text-[#6f7e78]"
            aria-label="Fechar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="admin-label sm:col-span-2">
            Nome do produto
            <input
              name="name"
              required
              defaultValue={product?.name}
              placeholder="Ex.: Salus Oficina"
              className="admin-input"
            />
          </label>
          <label className="admin-label">
            Categoria
            <select
              name="category"
              required
              defaultValue={product?.category ?? ""}
              className="admin-input"
            >
              <option value="" disabled>
                Selecione
              </option>
              <option>Site institucional</option>
              <option>SaaS para oficinas</option>
              <option>Aplicação web</option>
              <option>Sistema de gestão</option>
              <option>E-commerce</option>
            </select>
          </label>
          <label className="admin-label">
            Situação
            <select
              name="status"
              defaultValue={product?.status ?? "Planejamento"}
              className="admin-input"
            >
              {Object.keys(statusStyles).map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="admin-label sm:col-span-2">
            Descrição
            <textarea
              name="description"
              required
              defaultValue={product?.description}
              rows={3}
              placeholder="Descreva o objetivo principal do produto"
              className="admin-input resize-none"
            />
          </label>
          <label className="admin-label">
            Progresso estimado
            <div className="relative">
              <input
                name="progress"
                type="number"
                min="0"
                max="100"
                defaultValue={product?.progress ?? 0}
                className="admin-input pr-9"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#84918b]">
                %
              </span>
            </div>
          </label>
          <div />
          <label className="admin-label">
            Link da aplicação
            <input
              name="appUrl"
              defaultValue={product?.appUrl}
              placeholder="app.salusdev.com"
              className="admin-input"
            />
          </label>
          <label className="admin-label">
            Link do repositório
            <input
              name="repoUrl"
              defaultValue={product?.repoUrl}
              placeholder="github.com/..."
              className="admin-input"
            />
          </label>
        </div>
        <div className="mt-7 flex flex-col-reverse gap-2 border-t border-[#173e32]/8 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#173e32]/10 px-5 py-3 text-[10px] font-extrabold text-[#62736c] hover:bg-[#f5f7f3]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#173e32] px-6 py-3 text-[10px] font-extrabold text-white hover:bg-[#235343]"
          >
            {product ? "Salvar alterações" : "Cadastrar produto"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function App() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("Todos")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesStatus = status === "Todos" || product.status === status
      return matchesQuery && matchesStatus
    })
  }, [products, query, status])

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

  function openNewProduct() {
    setEditingProduct(undefined)
    setModalOpen(true)
  }

  function saveProduct(product: Product) {
    setProducts((current) => {
      const exists = current.some((item) => item.id === product.id)
      return exists
        ? current.map((item) => (item.id === product.id ? product : item))
        : [product, ...current]
    })
    setSelectedProduct(null)
    setModalOpen(false)
    setToast(
      editingProduct
        ? "Produto atualizado com sucesso."
        : "Produto cadastrado com sucesso.",
    )
    window.setTimeout(() => setToast(""), 3200)
  }

  return (
    <div className="min-h-screen bg-[#f5f6f2] text-[#18342a]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#173e32]/8 bg-white/90 px-4 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#173e32]/9 text-[#5e7168] lg:hidden"
              aria-label="Abrir menu"
            >
              <Icon name="menu" size={19} />
            </button>
            <div className="hidden items-center gap-2 text-[10px] font-bold text-[#95a09b] sm:flex">
              Centro de Comando <Icon name="chevron" size={13} />{" "}
              <span className="text-[#476057]">Produtos</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-[#eff4ef] px-3 py-2 text-[9px] font-extrabold text-[#39735d] sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#48a27e]" />{" "}
              Ambiente de protótipo
            </div>
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#173e32]/8 bg-white text-[#60736a]"
              aria-label="Notificações"
            >
              <Icon name="bell" size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#ef795f]" />
            </button>
            <div className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-[#173e32] text-[10px] font-extrabold text-white lg:hidden">
              RA
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 py-7 sm:px-7 sm:py-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#3c846b]">
                Portfólio de sistemas
              </p>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-[-.05em] text-[#17372b] sm:text-[34px]">
                Produtos
              </h1>
              <p className="mt-2 text-[11px] leading-5 text-[#75837d]">
                Gerencie todos os sistemas e produtos desenvolvidos pela
                SalusDev.
              </p>
            </div>
            <button
              type="button"
              onClick={openNewProduct}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#173e32] px-5 py-3.5 text-[10px] font-extrabold text-white shadow-[0_8px_20px_rgba(23,62,50,.16)] transition hover:-translate-y-0.5 hover:bg-[#235343]"
            >
              <Icon name="plus" size={16} /> Novo produto
            </button>
          </div>

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

          <section className="mt-7">
            <div className="flex flex-col gap-3 rounded-2xl border border-[#173e32]/7 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative min-w-0 flex-1 sm:max-w-[360px]">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88958f]">
                  <Icon name="search" size={16} />
                </span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por produto ou categoria..."
                  className="h-10 w-full rounded-xl bg-[#f5f6f2] pl-10 pr-4 text-[10px] font-semibold outline-none placeholder:text-[#9aa49f] focus:ring-2 focus:ring-[#3d8b6e]/15"
                />
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
                {[
                  "Todos",
                  "Planejamento",
                  "Desenvolvimento",
                  "Piloto",
                  "Ativo",
                ].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setStatus(item)}
                    className={`shrink-0 rounded-lg px-3 py-2.5 text-[9px] font-extrabold transition ${
                      status === item
                        ? "bg-[#173e32] text-white"
                        : "text-[#718078] hover:bg-[#f1f3ee]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-[10px] font-bold text-[#7c8a84]">
                <span className="font-extrabold text-[#304b40]">
                  {filteredProducts.length}
                </span>{" "}
                produtos encontrados
              </p>
              <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#87938e]">
                <Icon name="grid" size={14} /> Visualização em grade
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-[#173e32]/15 bg-white px-6 py-16 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#edf2ed] text-[#6b8177]">
                  <Icon name="search" size={20} />
                </span>
                <h3 className="mt-4 text-sm font-extrabold">
                  Nenhum produto encontrado
                </h3>
                <p className="mt-2 text-[10px] text-[#84918b]">
                  Tente ajustar sua busca ou os filtros selecionados.
                </p>
              </div>
            )}
          </section>

          <p className="mt-8 text-center text-[8px] font-semibold text-[#9aa49f]">
            Dados fictícios para validação do protótipo • Nenhuma integração de
            produção está ativa
          </p>
        </main>
      </div>

      {selectedProduct && (
        <ProductPanel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEdit={() => {
            setEditingProduct(selectedProduct)
            setSelectedProduct(null)
            setModalOpen(true)
          }}
        />
      )}
      {modalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={saveProduct}
        />
      )}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-[#173e32] px-5 py-3 text-[10px] font-extrabold text-white shadow-xl"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#d8f06b] text-[#173e32]">
            <Icon name="check" size={12} />
          </span>
          {toast}
        </div>
      )}
    </div>
  )
}
