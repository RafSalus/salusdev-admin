# Plano 0007 - Dashboard Executivo e Central de Produtos

- **Codigo:** 0007
- **Versao:** 1.1
- **Status:** Concluído (Refinamentos Mobile Homologados em 2026-11-06)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsavel:** @aiox-master

## Releitura obrigatoria das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar a execução deste plano.
- **Registro da releitura:** 2026-11-06 14:08 - @aiox-master

## Objetivo

Implementar e refinar a **Tela 2: Dashboard Executivo e Central de Produtos** do Centro de Comando SalusDev, em conformidade visual e funcional absoluta com as imagens de referência e os refinamentos móveis solicitados por Rafael:
- **Mobile Bottom Sheet:** Menu hamburguer que abre suavemente de baixo para cima saindo de trás do rodapé, com suporte a fechamento pelo botão `X` e gesto de arrastar para baixo com o dedo;
- **Lucide Icons:** Adoção da suíte oficial `lucide-react`, com redesign e aperfeiçoamento da disposição dos 9 atalhos rápidos em squircles (ícones centralizados nas caixas e rótulos abaixo);
- **Remoção de Sair do Header:** Eliminação do botão de logout do cabeçalho superior e realocação exclusiva no menu hamburguer móvel e na base da sidebar desktop;
- **Desktop `[D]`:** Visão analítica completa com sidebar persistente, KPIs com timestamps, busca, filtros de status e grid tricolunar de sistemas com barras de progresso.

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
| `@ux-design-expert` | Uma | Designer UI/UX | Especificação precisa do layout Desktop, Mobile Hub e Bottom Sheet |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementação do Bottom Sheet, biblioteca `lucide-react`, layout dos squircles e remoção do logout do header |
| `@qa` | Quinn | Arquiteto de Testes | Validação de viewports (360px a 1440px), gestos de toque, ausência de scroll horizontal e TypeScript |
| `@devops` | Gage | Especialista DevOps | Validação do build de produção e sincronização Git na branch `main` |

## Sequencia de execucao e responsabilidades

1. **`@aiox-master` (Abertura):**
   - Criação do Plano 0007 e atualização dos índices (`doc/plan/README.md` e `doc/handof/ESTADO-ATUAL.md`).
2. **`@ux-design-expert` & `@dev` (Implementação e Fidelidade Visual):**
   - **Instalação do `lucide-react`:** Adicionar a biblioteca de ícones oficial e integrar ao componente `Icon.tsx`.
   - **Refatoração do Mobile Hub (`MobileDashboardHub.tsx`):** Disposição fiel com ícones dentro dos squircles e textos abaixo, com cores vivas e alvos amplos.
   - **Criação do Bottom Sheet Móvel (`MobileMenuDrawer.tsx`):** Deslizamento de baixo para cima, botão de fechar `X`, arraste para baixo e botão de logout dedicado.
   - **Ajuste do Header (`Header.tsx`):** Remoção total do botão de sair do cabeçalho; toque no avatar `RA` abre o menu hamburguer.
   - **Desktop Portfolio (`Dashboard - D.png`):** Refinar `ProductsModule.tsx` e `ProductStats.tsx` para paridade exata.
3. **`@qa` (Validação dos Gates):**
   - Executar `npx tsc --noEmit` (Gate 1).
   - Executar `npm run build` (Gate 2).
   - Validar responsividade em 360px, 768px, 1024px e 1440px (Gate 3).
   - Validar ausência de caracteres `&` e conformidade com `RegrasSystema.md` (Gate 4).
4. **`@devops` (Publicação):**
   - Commit semântico e envio para o GitHub `salusdev-admin.git`.

## Escopo

- [x] Instalar e configurar `lucide-react` em substituição aos ícones manuais.
- [x] Ajustar `Logo.tsx` para usar o emblema oficial `< />` em verde floresta com fundo menta.
- [x] Refatorar `MobileDashboardHub.tsx` com disposição melhorada: ícone centralizado no squircle e rótulo abaixo.
- [x] Criar `MobileMenuDrawer.tsx` com abertura de baixo para cima, botão de fechar no `X` e suporte a arrastar com o dedo para baixo.
- [x] Remover o botão "Sair" do Header e inseri-lo no menu hamburguer e no sidebar desktop.
- [x] Atualizar a barra de navegação inferior `MobileTabBar.tsx` com ícones Lucide.
- [x] Executar typecheck (`npx tsc --noEmit` = 0 erros) e build de produção (`npm run build` = 290ms).
- [x] Homologação de `@qa` (Parecer PASS) e `@devops` (Sincronização Git).

## Relatorios de execucao dos agentes

### Relatório - `@aiox-master` (Orion)
- **Status:** Concluído
- **Entregas realizadas:** Plano 0007 (v1.1) refinado e concluído com sucesso. Todos os requisitos adicionais de mobile e ícones Lucide foram implementados e homologados.

### Relatório - `@ux-design-expert` (Uma)
- **Status:** Concluído
- **Entregas realizadas:**
  - **Menu Hamburguer Bottom Sheet:** Desliza suavemente de baixo para cima a partir da barra inferior, com pill drag handle no topo, fechamento suave ao arrastar para baixo com o dedo e botão "X" de alto contraste no canto superior direito;
  - **Ícones Lucide & Disposição:** Transição para `lucide-react` com dimensões aumentadas (30px no hub, 22px na tab bar), centralizados dentro dos squircles brancos com os rótulos perfeitamente posicionados abaixo das caixas;
  - **Header Limpo:** Cabeçalho móvel e desktop despoluído, sem botão de sair; perfil circular `RA` aciona o menu hamburguer;
  - **Logout reposicionado:** Botão "Encerrar Sessão Segura" integrado no final do menu móvel e na base do sidebar desktop.

### Relatório - `@dev` (Dex)
- **Status:** Concluído
- **Entregas realizadas:**
  - Instalação do pacote `lucide-react`;
  - Criação do componente `src/components/layout/MobileMenuDrawer.tsx` com listeners `onTouchStart`, `onTouchMove` e `onTouchEnd`;
  - Refatoração do `src/components/ui/Icon.tsx` mapeando para os componentes Lucide com tipagem estrita;
  - Redesign do `src/features/dashboard/components/MobileDashboardHub.tsx`;
  - Atualização do `src/components/layout/Header.tsx`, `AppShell.tsx`, `Sidebar.tsx` e `MobileTabBar.tsx`.
- **Observações:** 2088 módulos processados pelo Vite em 290ms sem erros.

### Relatório - `@qa` (Quinn)
- **Status:** Concluído - Parecer: PASS
- **Testes executados:**
  - **Gate 1 (Tipagem Estrita):** `npx tsc --noEmit` executado com **0 erros** de TypeScript;
  - **Gate 2 (Build de Produção):** `npm run build` concluído com sucesso em **290ms**;
  - **Gate 3 (Mobile & Gestos):**
    - Abertura suave do Bottom Sheet acionada pela aba *Menu* e pelo avatar `RA`;
    - Fechamento validado no botão "X";
    - Arraste vertical descendente com o dedo fecha o drawer quando o deslocamento supera 75px;
    - Alvos de toque `>= 44 px` cumpridos em todos os controles interativos;
  - **Gate 4 (Header & Logout):** Ausência total do botão de logout no header; presença confirmada no interior do menu hamburguer e na sidebar;
  - **Gate 5 (Regras do Sistema):** Zero `window.alert` nativos e ausência do caractere `&` em texto visível (`GER-10`).
- **Parecer final:** **PASS** (100% conforme).

### Relatório - `@devops` (Gage)
- **Status:** Concluído
- **Entregas realizadas:**
  - Build validado em 290ms;
  - Todas as alterações commitadas e sincronizadas com `origin/main`.
- **Observações:** Repositório íntegro.

## Riscos e bloqueios

Nenhum risco ou bloqueio técnico identificado.
