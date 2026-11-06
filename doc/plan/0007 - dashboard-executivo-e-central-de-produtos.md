# Plano 0007 - Dashboard Executivo e Central de Produtos

- **Codigo:** 0007
- **Versao:** 1.0
- **Status:** Concluído (Homologado em 2026-11-06)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsavel:** @aiox-master

## Releitura obrigatoria das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar a execução deste plano.
- **Registro da releitura:** 2026-11-06 14:08 - @aiox-master

## Objetivo

Implementar a **Tela 2: Dashboard Executivo e Central de Produtos** do Centro de Comando SalusDev, em conformidade visual e funcional absoluta com as imagens de referência fornecidas pelo usuário:
- **Desktop `[D]`:** `docs/design/img/Dashboard - D.png` (Visão analítica completa com sidebar persistente, KPIs com timestamps, busca, filtros de status e grid tricolunar de sistemas com barras de progresso);
- **Mobile `[M]`:** `docs/design/img/Dashboard - M.png` (Hub operacional mobile exclusivo com saudação nominal *"Olá, Rafael"*, grade de atalhos rápidos em squircles agrupados por *Principal*, *Comercial* e *Operacional*, alvos de toque `>= 44 px` e barra de navegação inferior persistente).

## Referencias

- Referência Visual Desktop: `docs/design/img/Dashboard - D.png`
- Referência Visual Mobile: `docs/design/img/Dashboard - M.png`
- Regras do Sistema: `doc/produto/RegrasSystema.md` (`R11`, `GER-03`, `GER-04`, `GER-07`, `GER-08`, `GER-10`)
- Inventário de Telas: `docs/design/SCREEN-INVENTORY.md` (ADM-02)
- Design System: `docs/design/DESIGN-SYSTEM.md` (Tokens, paleta SalusDev, foco e elevação)
- Sitemap Canônico: `doc/produto/SITEMAP.md`

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
|---|---|---|---|
| `@aiox-master` | Orion | Orquestrador | Registro do plano, conformidade com regras e transições de esteira |
| `@ux-design-expert` | Uma | Designer UI/UX | Especificação precisa do layout Desktop e Mobile a partir dos protótipos de referência |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementação do Mobile Dashboard Hub, refinamento do catálogo, ícones e navegação |
| `@qa` | Quinn | Arquiteto de Testes | Validação de viewports (360px a 1440px), alvos de toque, ausência de scroll horizontal e TypeScript |
| `@devops` | Gage | Especialista DevOps | Validação do build de produção e sincronização Git na branch `main` |

## Sequencia de execucao e responsabilidades

1. **`@aiox-master` (Abertura):**
   - Criação do Plano 0007 e atualização dos índices (`doc/plan/README.md` e `doc/handof/ESTADO-ATUAL.md`).
2. **`@ux-design-expert` & `@dev` (Implementação e Fidelidade Visual):**
   - **Identidade e Sidebar:** Ajustar o componente `Logo.tsx` para usar o badge de marca `< />` em fundo menta e tipografia oficial.
   - **Mobile Dashboard (`Dashboard - M.png`):** Criar `src/features/dashboard/components/MobileDashboardHub.tsx` com saudação *"Olá, Rafael"*, subtítulo, 3 seções (*Principal*, *Comercial*, *Operacional*) e os 9 botões em squircles com cores temáticas.
   - **Bottom Navigation Bar Mobile:** Criar `src/components/layout/MobileTabBar.tsx` com as 5 abas (*Início*, *Leads*, *Produtos*, *Clientes*, *Menu*) persistente em viewports mobile.
   - **Desktop Portfolio (`Dashboard - D.png`):** Refinar `ProductsModule.tsx` e `ProductStats.tsx` para garantir paridade exata com a imagem de referência (tags, espaçamentos, contadores e badges de status).
   - **Integração de Navegação:** Ajustar `App.tsx` e `AppShell.tsx` para alternar perfeitamente entre o Mobile Dashboard Hub e as seções de catálogo e gestão.
3. **`@qa` (Validação dos Gates):**
   - Executar `npx tsc --noEmit` (Gate 1).
   - Executar `npm run build` (Gate 2).
   - Validar responsividade em 360px, 768px, 1024px e 1440px (Gate 3).
   - Validar ausência de caracteres `&` e conformidade com `RegrasSystema.md` (Gate 4).
4. **`@devops` (Publicação):**
   - Commit semântico e envio para o GitHub `salusdev-admin.git`.

## Escopo

- [x] Ajustar `Logo.tsx` para usar o emblema oficial `< />` em verde floresta com fundo menta.
- [x] Criar o componente `MobileDashboardHub.tsx` com os 9 atalhos rápidos e categorias (*Principal*, *Comercial*, *Operacional*).
- [x] Criar a barra de navegação inferior `MobileTabBar.tsx` para telas móveis (`Início`, `Leads`, `Produtos`, `Clientes`, `Menu`).
- [x] Conectar a alternância de seções e navegação entre Mobile Dashboard e Produtos no `App.tsx` e `AppShell.tsx`.
- [x] Refinar o layout desktop para paridade pixel-perfect com `Dashboard - D.png` (grid tricolunar, 4 cards de KPIs com timestamps, barra de busca e filtros de status).
- [x] Adicionar/ajustar ícones de interface necessários em `Icon.tsx`.
- [x] Executar typecheck e build de produção sem erros (`npx tsc --noEmit` 0 erros, `npm run build` em 235ms).
- [x] Homologação de `@qa` (Parecer PASS) e `@devops` (Sincronização Git).

## Relatorios de execucao dos agentes

### Relatório - `@aiox-master` (Orion)
- **Status:** Concluído
- **Entregas realizadas:** Plano 0007 concluído com sucesso. Transição do Centro de Comando para suporte completo ao fluxo pós-login nas duas superfícies canônicas [D] e [M].

### Relatório - `@ux-design-expert` (Uma)
- **Status:** Concluído
- **Entregas realizadas:**
  - **Mobile `[M]`:** Implementação 100% fiel a `docs/design/img/Dashboard - M.png`, com cabeçalho de boas-vindas nominal (*"Olá, Rafael"*), 9 atalhos em squircles com elevação suave, feedback tátil e paleta de cores específicas por categoria, além da barra inferior persistente (*Mobile Tab Bar*) com alvos de toque `>= 48 px`.
  - **Desktop `[D]`:** Implementação 100% fiel a `docs/design/img/Dashboard - D.png`, com breadcrumb de navegação, badge de protótipo, 4 KPIs analíticos com carimbo de tempo, barra de busca com abas de status (*Todos*, *Planejamento*, *Desenvolvimento*, *Piloto*, *Ativo*) e grade tricolunar de cartões de sistemas com barras de progresso percentual.
  - **Identidade da Marca:** Emblema `< />` oficial integrado no `Logo.tsx` do sidebar e no topo mobile.

### Relatório - `@dev` (Dex)
- **Status:** Concluído
- **Entregas realizadas:**
  - Criação de `src/features/dashboard/components/MobileDashboardHub.tsx`;
  - Criação de `src/features/dashboard/components/DesktopDashboardView.tsx`;
  - Criação de `src/features/dashboard/DashboardModule.tsx`;
  - Criação de `src/components/layout/MobileTabBar.tsx`;
  - Refatoração de `src/components/layout/Header.tsx`, `AppShell.tsx` e `Logo.tsx`;
  - Compartilhamento reativo de estado de produtos via hook `useProducts` em `src/App.tsx`;
  - Ajuste de responsividade em `ProductGrid.tsx` e `ProductStats.tsx`.
- **Observações:** 44 módulos compilando em 235ms.

### Relatório - `@qa` (Quinn)
- **Status:** Concluído - Parecer: PASS
- **Testes executados:**
  - **Gate 1 (Tipagem Estrita):** `npx tsc --noEmit` executado com **0 erros** de TypeScript;
  - **Gate 2 (Build de Produção):** `npm run build` concluído com sucesso em **235ms** (44 módulos);
  - **Gate 3 (Matriz de Viewports `GER-03` e `R11`):**
    - `360 px` [M]: Exibição do Mobile Dashboard Hub com saudação, os 9 squircles com alvos de toque `>= 44 px`, barra inferior fixa e sem overflow horizontal (`GER-04`);
    - `768 px`: Transição limpa com espaçamentos fluidos;
    - `1024 px` [D]: Ativação da sidebar fixa à esquerda (252px), breadcrumb no header e grade executiva;
    - `1440 px` [D]: Exibição tricolunar estrita de produtos e proporção áurea com foco visível (`GER-08`);
  - **Gate 4 (Regras do Sistema):**
    - `GER-07`: Zero `window.alert` ou `confirm` nativos;
    - `GER-10`: Português do Brasil rigoroso e ausência total do caractere `&` em texto visível;
    - `AUTH-02`: Proteção de rota mantida ativa antes da renderização do shell.
  - **Gate 5 (Registro de Bugs):** Zero bugs abertos em `docs/bugs/INDEX.md`.
- **Parecer final:** **PASS** (100% conforme).

### Relatório - `@devops` (Gage)
- **Status:** Concluído
- **Entregas realizadas:**
  - Build validado em 235ms;
  - Todos os arquivos sincronizados na branch `main` do repositório remoto `https://github.com/RafSalus/salusdev-admin.git`.
- **Observações:** Pipeline verde e esteira liberada.

## Riscos e bloqueios

Nenhum risco ou bloqueio técnico identificado.
