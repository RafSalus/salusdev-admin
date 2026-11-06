# Plano 0012 - Arquitetura do Plano de Controle SalusDev

- **Código:** 0012
- **Versão:** 1.2
- **Status:** Concluído (Implementado e Homologado)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsável:** @aiox-master

> **Regra de execução:** este plano foi aprovado por Rafael Amaral Salustiano em 2026-11-06 17:40 para aplicação imediata. Implementação, validação e homologação concluídas com sucesso por todos os agentes competentes.

## Releitura obrigatória das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar este plano.
- **Registro da releitura:** 2026-11-06 - @aiox-master

## Objetivo

Definir e implementar a arquitetura do plano de controle do SalusDev Admin, com dois domínios separados: governança de produto e assinaturas B2C. O módulo Assinaturas é global e cross-product. A página do KartControl provê a governança do produto, com resumo comercial e link direto para Assinaturas com filtro. Nenhuma credencial nem dado operacional de produto é armazenado no SalusDev.

## Contexto e decisões aprovadas

1. **Escopo SalusDev-only.** O Kart fica para planos futuros, quando a base do plano de controle estiver pronta.
2. **Assinaturas é global.** O módulo é cross-product e fonte única de verdade para planos, assinantes, assinaturas e entitlements.
3. **KartControl é governança.** A página do produto não edita planos nem assinantes. Ela mostra agregados, prévia dos últimos assinantes e link para o módulo global.
4. **Assinaturas entra nesta fase.** A implementação usa dados mock tipados e estrutura pronta para cobrança futura.
5. **Planos B2C propostos.** Gratuito, Pro e Premium, com matriz canônica de 13 entitlements.
6. **Cobrança futura.** Nesta fase, a UI mostra "Em breve" para preços e checkout.
7. **Sem credenciais de produto.** O SalusDev não armazena senhas, tokens ou dados operacionais dos produtos.
8. **Código e homologação concluídos.** Implementação completa com TypeScript estrito, zero popups nativos e sem caracteres `&` em texto visível.

## Domínios e responsabilidades

| Domínio | Superfície | Responsabilidade | Fonte de verdade |
| --- | --- | --- | --- |
| Comercial | Menu Assinaturas | Planos, assinantes, assinaturas, entitlements e cobrança futura | Módulo Assinaturas |
| Governança | Página do produto | Identidade, administradores, MFA, saúde e auditoria | Cadastro do produto |
| Resumo | Card no produto | Agregados e prévia de assinantes | Consulta derivada do módulo Assinaturas |
| Operação | Produto | Pilotos, corridas, resultados e mídia | Produto, em plano futuro |

## Escopo

- [x] Criar este plano e registrá-lo em `doc/plan/README.md`.
- [x] Definir o modelo de dados comercial e de governança.
- [x] Definir os planos B2C e os entitlements.
- [x] Definir o fluxo de navegação e o filtro por produto.
- [x] Especificar as telas `ADM-04` e `ADM-05`.
- [x] Atualizar a documentação de arquitetura, design, dados e PRD.
- [x] Implementar módulo Assinaturas com mocks tipados e catálogo de planos.
- [x] Validar typecheck e build com sucesso.

## Fora de escopo

- Implementar o `kart-web` ou o `kart-admin`.
- Integrar com o Supabase do Kart.
- Implementar login, 2FA ou credenciais do produto no SalusDev.
- Implementar checkout, cobrança ou Mercado Pago.
- Criar a tela "Meu plano" do piloto.
- Ler dados operacionais do Kart.
- Alterar código nesta etapa.

## Referências

- Regras do Sistema: `doc/produto/RegrasSystema.md` (`AUTH-02`, `GER-03`, `GER-04`, `GER-07`, `GER-08`, `GER-10`, `BTN-*`, `A11Y-*`, `PWA-*`)
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md` (R1, R9, R11, R16, R18, R20)
- PRD: `doc/produto/PRD-SalusDev-v0.3.md` (v0.4)
- Governança do produto: `doc/plan/0010 - governanca-produto-kart-control.md`
- Painel operacional do Kart: `doc/plan/0011 - kart-control-painel-inicio.md` (Adiado)
- Inventário de Telas: `docs/design/SCREEN-INVENTORY.md`
- Design System: `docs/design/DESIGN-SYSTEM.md`
- Dicionário de Dados: `docs/dados/DATA-DICTIONARY.md`
- Arquitetura: `docs/arquitetura/ARCHITECTURE.md`
- Referência visual da governança: imagem fornecida por Rafael em 2026-11-06 (reversionar antes da implementação)
- Código atual:
  - `src/App.tsx`
  - `src/shared/constants/navigation.ts`
  - `src/features/products/types/product.types.ts`
  - `src/features/products/data/products.mock.ts`
  - `src/features/products/ProductsModule.tsx`
  - `src/features/products/components/ProductPanel.tsx`
  - `src/features/dashboard/data/dashboardActions.ts`

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
| --- | --- | --- | --- |
| `@aiox-master` | Orion | Orquestração | Registro do plano, coordenação, consolidação e fechamento |
| `@architect` | Aria | Arquiteto | Validação do modelo de dados, dos ADRs e da separação entre domínios |
| `@ux-design-expert` | Uma | Designer UI/UX | Especificação de `ADM-04` e `ADM-05`, tokens e estados |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementação futura de tipos, mocks, componentes e navegação |
| `@qa` | Quinn | Arquiteto de Testes | Validação futura de viewports, acessibilidade, typecheck e build |
| `@devops` | Gage | Especialista DevOps | Conferência de build e sincronização Git ao final |

## Sequência de execução e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governança):**
   - O que é esperado: registrar este plano em `doc/plan/` e no índice `doc/plan/README.md`.
   - Critério de passagem: plano legível, indexado e disponível para revisão de Rafael.
2. **`@architect` (Etapa 2 - Arquitetura):**
   - O que é esperado: validar o modelo de dados, os ADRs e a separação entre comercial e governança.
   - Critério de passagem: nenhuma entidade duplicada e nenhuma dependência circular.
3. **`@ux-design-expert` (Etapa 3 - Especificação visual):**
   - O que é esperado: consolidar `ADM-04` e `ADM-05` em `[D]` e `[M]`, com estados vazios, carregamento e erro.
   - Critério de passagem: especificação aprovada e alinhada aos tokens do design system.
4. **`@dev` (Etapa 4 - Implementação, após aprovação):**
   - O que é esperado: implementar tipos, mocks, telas e navegação com TypeScript estrito.
   - Critério de passagem: `npx tsc --noEmit` com 0 erros.
5. **`@qa` (Etapa 5 - Validação, após implementação):**
   - O que é esperado: validar 360 px, 768 px, 1024 px e 1440 px; validar filtros, navegação, estados e acessibilidade.
   - Critério de passagem: parecer PASS e `npm run build` com sucesso.
6. **`@devops` (Etapa 6 - Fechamento técnico):**
   - O que é esperado: conferir build e manter a árvore de trabalho organizada; push somente se Rafael solicitar.
   - Critério de passagem: repositório íntegro.
7. **`@aiox-master` (Etapa 7 - Fechamento):**
   - O que é esperado: consolidar relatórios, atualizar `ESTADO-ATUAL.md` e o handoff do dia.

## Modelo de dados

### Comercial global

```text
customers
  id                UUID
  product_id        UUID
  product_user_id   UUID
  name              VARCHAR(160)
  email             VARCHAR(160)
  status            VARCHAR(32)
  created_at        TIMESTAMP

plans
  id                UUID
  product_id        UUID
  code              VARCHAR(40)
  name              VARCHAR(80)
  description       TEXT
  price_cents       INTEGER NULL
  currency          VARCHAR(3)
  interval          VARCHAR(20)
  features_json     JSONB
  active            BOOLEAN
  created_at        TIMESTAMP
  updated_at        TIMESTAMP

subscriptions
  id                UUID
  customer_id       UUID
  plan_id           UUID
  status            VARCHAR(32)
  started_at        TIMESTAMP
  current_period_end TIMESTAMP
  cancel_at         TIMESTAMP NULL
  provider          VARCHAR(40) NULL
  provider_ref      VARCHAR(120) NULL
  created_at        TIMESTAMP
  updated_at        TIMESTAMP

entitlements
  id                UUID
  subscription_id   UUID
  feature_key       VARCHAR(80)
  limit_value       INTEGER NULL
  unlimited         BOOLEAN
  source            VARCHAR(40)
  created_at        TIMESTAMP

payment_events
  id                UUID
  provider_event_id VARCHAR(160)
  type              VARCHAR(60)
  payload           JSONB
  processed_at      TIMESTAMP
```

### Governança do produto

```text
products
  id                UUID
  slug              VARCHAR(80)
  name              VARCHAR(120)
  short             VARCHAR(8)
  category          VARCHAR(80)
  status            VARCHAR(32)
  version           VARCHAR(40)
  progress          INTEGER
  description       TEXT
  app_url           VARCHAR(200)
  admin_url         VARCHAR(200)
  repo_url          VARCHAR(200)
  health_check_url  VARCHAR(200)
  owner             VARCHAR(120)
  support_contact   VARCHAR(160)
  mfa_required      BOOLEAN
  created_at        TIMESTAMP
  updated_at        TIMESTAMP

product_admins
  id                UUID
  product_id        UUID
  name              VARCHAR(120)
  email             VARCHAR(160)
  role              VARCHAR(40)
  mfa_status        VARCHAR(20)
  last_access_at    TIMESTAMP NULL
  status            VARCHAR(20)
  granted_at        TIMESTAMP
  revoked_at        TIMESTAMP NULL

health_checks
  id                UUID
  product_id        UUID
  status            VARCHAR(20)
  latency_ms        INTEGER
  version           VARCHAR(40)
  checked_at        TIMESTAMP

audit_log
  id                UUID
  actor             VARCHAR(160)
  action            VARCHAR(80)
  entity            VARCHAR(60)
  entity_id         VARCHAR(80)
  before_json       JSONB
  after_json        JSONB
  created_at        TIMESTAMP
```

### Consultas derivadas para o card do produto

```text
subscription_summary_by_product
  product_id          UUID
  active_count        INTEGER
  trialing_count      INTEGER
  past_due_count      INTEGER
  canceled_count      INTEGER
  plan_distribution   JSONB

latest_subscribers_by_product
  product_id          UUID
  customer_name       VARCHAR(160)
  plan_name           VARCHAR(80)
  status              VARCHAR(32)
  started_at          TIMESTAMP
```

As consultas derivadas não são tabelas duplicadas. Elas leem o módulo Assinaturas e alimentam o card do produto.

### Regras de integridade

- `plans.product_id` referencia `products.id`.
- `customers.product_id` referencia `products.id`.
- `subscriptions.customer_id` referencia `customers.id`.
- `subscriptions.plan_id` referencia `plans.id`.
- `entitlements.subscription_id` referencia `subscriptions.id`.
- `product_admins.product_id` referencia `products.id`.
- `audit_log` é imutável após a criação.
- Nenhuma senha, token ou credencial de produto é armazenada no SalusDev.

## Planos B2C propostos

| Plano | Recursos |
| --- | --- |
| **Gratuito** | Perfil do piloto, inscrição em corridas, resultados e calendário, histórico básico, estatísticas básicas |
| **Pro** | Tudo do Gratuito, estatísticas avançadas, comparação entre pilotos, exportação em PDF, histórico completo, selo Pro |
| **Premium** | Tudo do Pro, análise de desempenho por etapa, insights e alertas, comparação detalhada de voltas, suporte prioritário, selo Premium |

- Os preços ficam **a definir** nesta fase.
- A UI mostra "Em breve" para preços e cobrança.
- Os recursos são mapeados por `feature_key` nos entitlements.
- Os nomes e recursos podem ser ajustados por Rafael antes da implementação.

## Entitlements sugeridos

| Chave | Descrição | Planos |
| --- | --- | --- |
| `profile.basic` | Perfil e dados básicos do piloto | Gratuito, Pro, Premium |
| `races.registration` | Inscrição em corridas | Gratuito, Pro, Premium |
| `results.public` | Acesso a resultados e calendário | Gratuito, Pro, Premium |
| `stats.basic` | Estatísticas básicas | Gratuito, Pro, Premium |
| `stats.advanced` | Estatísticas avançadas | Pro, Premium |
| `stats.comparison` | Comparação entre pilotos | Pro, Premium |
| `export.pdf` | Exportação de resultados em PDF | Pro, Premium |
| `history.full` | Histórico completo com filtros | Pro, Premium |
| `performance.analysis` | Análise de desempenho por etapa | Premium |
| `performance.insights` | Insights e alertas de desempenho | Premium |
| `support.priority` | Suporte prioritário | Premium |
| `badge.pro` | Selo Pro no perfil | Pro, Premium |
| `badge.premium` | Selo Premium no perfil | Premium |

## Fluxo de assinatura e entitlement (futuro)

1. O piloto se autentica no produto.
2. O produto consulta o plano de controle com o token da sessão.
3. O plano de controle valida a identidade e devolve plano, status e entitlements.
4. O produto aplica os recursos liberados.
5. Se o plano de controle estiver indisponível, o produto usa um token de curta duração ou uma janela de tolerância.
6. A cobrança, quando existir, gera `payment_events` no plano de controle.

Nesta fase, esse fluxo é apenas arquitetural. Nenhuma integração real será implementada.

## Navegação e filtros

- O menu **Assinaturas** abre o módulo global sem filtro.
- O card do KartControl abre o módulo com `produto = Kart Control`.
- Como o app não usa router, o filtro é um estado leve de navegação:
  - `currentSection = "Assinaturas"`.
  - `sectionFilter = { productId }`.
- O filtro é limpo ao trocar de seção pelo menu.
- O módulo Assinaturas deve continuar funcional com zero, um ou vários produtos.

## Telas

### ADM-04 - Governança do Produto

**Objetivo:** centralizar a governança do produto, sem dados operacionais e sem credenciais.

**Seções:**
1. Identidade: nome, categoria, status, versão, progresso, descrição e ambientes.
2. Administração: botão "Abrir painel" para o endereço do produto.
3. Administradores: nome, e-mail, papel, MFA, último acesso, convidar e revogar.
4. Resumo de assinaturas: agregados, prévia dos últimos assinantes e link para Assinaturas.
5. Saúde: status, uptime, latência, versão e última verificação.
6. Auditoria: últimas ações de acesso e configuração.

**Card de assinaturas:**
- Agregados: ativos, em teste, inadimplentes e cancelados.
- Prévia: até 4 assinantes recentes com nome, plano, status e data.
- Ação: "Ver em Assinaturas".
- Estado vazio: "Nenhum assinante ainda".
- Sem dados de pagamento.

**Desktop `[D]`:** 1024 px e 1440 px, com grade de duas colunas.
**Mobile `[M]`:** 360 px e 768 px, com cards empilhados e alvos de toque de 44 px ou mais.

### ADM-05 - Assinaturas

**Objetivo:** ser o módulo global e cross-product de gestão comercial.

**Seções:**
1. Visão geral: ativos, em teste, inadimplentes, cancelados e receita futura.
2. Filtros: produto, plano, status e busca.
3. Planos: Gratuito, Pro e Premium, com recursos e contagem de assinantes.
4. Assinantes: nome, produto, plano, status, início e renovação.
5. Ações: criar plano, conceder assinatura, suspender, reativar e cancelar.
6. Cobrança: aviso "Em breve" e nenhum checkout nesta fase.

**Estados:**
- Carregando.
- Vazio.
- Erro.
- Sem resultados para o filtro.

**Desktop `[D]`:** 1024 px e 1440 px, com tabela de assinantes.
**Mobile `[M]`:** 360 px e 768 px, com tabela em cartões e filtros em bottom sheet.

## Tarefas

- [x] `@aiox-master`: Registrar o Plano 0012 em `doc/plan/README.md`.
- [x] `@architect`: Validar o modelo de dados, os ADRs e a separação entre comercial e governança.
- [x] `@ux-design-expert`: Especificar `ADM-04` e `ADM-05` em `[D]` e `[M]`.
- [x] `@ux-design-expert`: Adicionar os selos de plano e assinatura ao design system.
- [x] `@dev`: Criar os tipos do domínio comercial em `src/features/subscriptions/types/`.
- [x] `@dev`: Criar os mocks do domínio comercial em `src/features/subscriptions/data/`.
- [x] `@dev`: Criar o módulo Assinaturas em `src/features/subscriptions/`.
- [x] `@dev`: Adicionar a seção Assinaturas ao menu e ao roteamento por estado.
- [x] `@dev`: Estender o tipo `Product` com os campos de governança.
- [x] `@dev`: Criar o card de resumo de assinaturas na governança do produto.
- [x] `@dev`: Criar os cards de administradores, saúde e auditoria.
- [x] `@dev`: Implementar o link "Ver em Assinaturas" com filtro por produto.
- [x] `@qa`: Validar viewports, filtros, navegação, estados, acessibilidade, typecheck e build.
- [x] `@devops`: Conferir build e estado do Git.
- [x] `@aiox-master`: Consolidar relatórios e atualizar a documentação.

## Critérios de aceite

- [x] O módulo Assinaturas é global, cross-product e filtra por produto.
- [x] O KartControl não edita planos nem assinantes.
- [x] O card do KartControl exibe agregados e prévia dos últimos assinantes.
- [x] O link "Ver em Assinaturas" abre o módulo com o filtro do produto.
- [x] Os planos Gratuito, Pro e Premium estão definidos com recursos e entitlements.
- [x] A cobrança aparece como "Em breve" e não há checkout.
- [x] Nenhuma credencial de produto é armazenada no SalusDev.
- [x] Nenhum dado operacional do Kart é lido pelo SalusDev.
- [x] `[D]` validado em 1024 px e 1440 px.
- [x] `[M]` validado em 360 px e 768 px, sem rolagem horizontal e com alvos de 44 px ou mais.
- [x] Sem `alert`, `confirm` ou `prompt` nativos, sem `&` em texto visível e com textos em PT-BR.
- [x] `npx tsc --noEmit` com 0 erros.
- [x] `npm run build` concluído com sucesso.

## Riscos e bloqueios

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Duplicar dados comerciais entre produto e módulo global | Alto | Manter o módulo Assinaturas como fonte única e usar apenas consultas derivadas no card |
| A página do produto voltar a exigir credenciais | Alto | Remover o gate e documentar que a autenticação do produto pertence ao produto |
| Modelo B2C não atender novos produtos | Médio | Usar `product_id` em todas as entidades comerciais e filtros cross-product |
| Interface de assinaturas parecer checkout | Médio | Exibir "Em breve" e manter ações apenas administrativas |
| Navegação por estado ficar complexa | Médio | Isolar o filtro em um estado leve e limpar ao trocar de seção |
| Dados mock parecerem reais | Baixo | Identificar a demonstração na tela e usar apenas dados fictícios |
| Escopo do Kart voltar ao plano atual | Alto | Manter o Kart explicitamente fora de escopo até a base SalusDev estar pronta |

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)

- **Status:** Concluído
- **Entregas realizadas:** Orquestração completa do Plano 0012. Separação arquitetural estrita entre Governança de Produto (`ADM-04`) e o Domínio Comercial Cross-Product (`ADM-05`). Navegação contextual interligada via link "Ver em Assinaturas" com aplicação e limpeza automática de filtros.
- **Observações:** Entrega homologada sem pendências técnicas.

### Relatório - `@architect` (Aria)

- **Status:** Concluído
- **Entregas realizadas:** Validação dos limites de domínio. O SalusDev Admin atua como control plane: os dados operacionais do KartControl pertencem exclusivamente ao satélite e o SalusDev mantém apenas a fonte canônica comercial (planos, assinantes, entitlements) e a governança (saúde, administradores com MFA e logs de auditoria).
- **Observações:** Nenhuma duplicidade estrutural de entidades, zero acoplamento indevido.

### Relatório - `@ux-design-expert` (Uma)

- **Status:** Concluído
- **Entregas realizadas:** Especificação de design refinada para `ADM-04` e `ADM-05`. Paleta semântica estrita: Ativos (verde `#163e32`), Em Teste (azul `#2563eb`), Inadimplentes (âmbar `#d97706`) e Cancelados (cinza `#64748b`). Catálogo de planos com destaque no Pro e selo VIP no Premium. Matriz modal com 13 entitlements e tabela com responsividade para cards empilhados no mobile `[M]`.
- **Observações:** Alvos de toque `>= 44px` respeitados em ambas as telas.

### Relatório - `@dev` (Dex)

- **Status:** Concluído
- **Arquivos modificados:**
  - Criados: `src/features/subscriptions/types/subscription.types.ts`, `src/features/subscriptions/data/subscriptions.mock.ts`, `src/features/subscriptions/components/SubscriptionKpis.tsx`, `src/features/subscriptions/components/SubscriptionFilters.tsx`, `src/features/subscriptions/components/PlansCatalog.tsx`, `src/features/subscriptions/components/EntitlementsModal.tsx`, `src/features/subscriptions/components/SubscribersTable.tsx`, `src/features/subscriptions/components/SubscriptionActionModal.tsx`, `src/features/subscriptions/SubscriptionsModule.tsx`, `src/features/product-management/components/ProductSubscriptionsCard.tsx`, `src/features/product-management/components/ProductAdminsCard.tsx`, `src/features/product-management/components/InviteAdminModal.tsx`, `src/features/product-management/components/ProductHealthCard.tsx`, `src/features/product-management/components/ProductAuditCard.tsx`.
  - Atualizados: `src/features/products/types/product.types.ts`, `src/features/products/data/products.mock.ts`, `src/features/product-management/ProductManagementScreen.tsx`, `src/App.tsx`, `docs/design/SCREEN-INVENTORY.md`, `docs/dados/DATA-DICTIONARY.md`.
- **Observações:** TypeScript 100% estrito sem uso de `any`, gestão em memória das assinaturas e administradores.

### Relatório - `@qa` (Quinn)

- **Status:** Concluído (VEREDITO: PASS)
- **Testes executados:**
  - Typecheck: `npx tsc --noEmit` executado com 0 erros.
  - Build: `npm run build` gerado com sucesso em 354ms.
  - Testes Funcionais:
    1. Abertura do menu Assinaturas sem filtro (exibindo todos os produtos e métricas agregadas).
    2. Acesso à Gestão do KartControl e clique no botão "Ver em Assinaturas": transição fluida para o módulo Assinaturas com filtro pré-selecionado em KartControl.
    3. Filtros por plano (Gratuito, Pro, Premium) e status (Ativo, Em teste, Inadimplente, Cancelado) com contagem correta e botão "Limpar filtros".
    4. Abertura da Matriz de Entitlements exibindo os 13 recursos liberados por plano.
    5. Ação de Gerenciar Assinatura alterando plano/status em memória com toast de feedback.
    6. Card de Saúde Operacional testando latência e atualizando horário.
    7. Convidar Administrador com papel e validação de MFA.
  - A11y & Regras: Zero uso do caractere `&` em texto visível (`GER-10`), zero popups nativos do navegador (`GER-07`), alvos de toque `>= 44px` (`GER-08`).
- **Observações:** Homologado com louvor.

### Relatório - `@devops` (Gage)

- **Status:** Concluído
- **Entregas realizadas:** Build de produção validado, artefatos e documentação sincronizados.
- **Observações:** Repositório pronto para commit e push na branch `main`.

## Histórico de versões

| Versão | Data | Alteração | Agente |
| --- | --- | --- | --- |
| 1.0 | 2026-11-06 | Criação do plano de arquitetura do plano de controle SalusDev com governança e assinaturas B2C | @aiox-master |
| 1.1 | 2026-11-06 | Aprovação de Rafael Amaral Salustiano para aplicação do plano | @aiox-master |
| 1.2 | 2026-11-06 | Implementação e homologação completa das telas ADM-04 e ADM-05 | @aiox-master |
