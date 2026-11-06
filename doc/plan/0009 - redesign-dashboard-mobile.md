# Plano 0009 - Redesign do Dashboard Mobile e Ajustes de Header e Menu

- **Codigo:** 0009
- **Versao:** 1.0
- **Status:** Rascunho (aguardando leitura e aprovacao de Rafael)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsavel:** @aiox-master

> **Regra de execucao:** este plano deve ser lido e aprovado por Rafael antes de qualquer alteracao de codigo. Nenhuma implementacao comeca enquanto o status nao passar para `Aprovado`.

## Releitura obrigatoria das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar este plano.
- **Registro da releitura:** 2026-11-06 14:56 - @aiox-master

## Objetivo

Refazer o design da tela Dashboard na visao Mobile `[M]` para um padrao visual proporcional e profissional, corrigir o gesto de arraste do menu hamburguer, remover o nome do usuario e o logout do menu hamburguer e entregar o menu de perfil e o painel de notificacoes funcionando no Header.

## Problemas identificados

1. Os icones dos 9 atalhos mobile estao grandes e desproporcionais (squarcles de ate 96 px com icone de 30 px).
2. O formato atual dos atalhos (grid de squarcles grandes com rotulos soltos) nao transmite um visual profissional.
3. O menu hamburguer fecha quando o usuario arrasta o conteudo para baixo; o fechamento por gesto deve funcionar somente ao arrastar a alca no topo.
4. O menu hamburguer exibe o nome/avatar do usuario, o que e desnecessario.
5. O logout nao deve mais aparecer no menu hamburguer; o icone de usuario no Header deve abrir o menu de perfil com a acao de sair.
6. O icone de notificacoes nao executa nenhuma acao hoje; deve ficar funcional.

## Decisoes de design aprovadas

1. **Atalhos em grade compacta de 3 colunas**, com tiles de aproximadamente 56 px e icones de 20 a 22 px.
2. **Dashboard mobile com metricas (KPIs) e status dos sistemas** acima dos atalhos.
3. **Sino de notificacoes funcional**, com painel de notificacoes ficticias, contador de nao lidas e acao de marcar todas como lidas.

## Referencias

- Regras do Sistema: `doc/produto/RegrasSystema.md` (`GER-03`, `GER-04`, `GER-07`, `GER-08`, `GER-10`, `BTN-*`, `A11Y-*`, `PWA-*`)
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md` (R1, R9, R11, R16, R18, R20)
- Inventario de Telas: `docs/design/SCREEN-INVENTORY.md` (ADM-02)
- Design System: `docs/design/DESIGN-SYSTEM.md`
- Referencia visual atual: `docs/design/img/Dashboard - M.png` (sera substituida pelo novo layout aprovado)
- Codigo atual:
  - `src/features/dashboard/components/MobileDashboardHub.tsx`
  - `src/components/layout/MobileMenuDrawer.tsx`
  - `src/components/layout/MobileTabBar.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/AppShell.tsx`
  - `src/components/layout/Sidebar.tsx`
  - `src/App.tsx`

## Agentes participantes

| Agente | Persona | Papel no plano | Entregavel esperado |
| --- | --- | --- | --- |
| `@aiox-master` | Orion | Orquestracao | Registro do plano, coordenacao, consolidacao e fechamento |
| `@ux-design-expert` | Uma | Designer UI/UX | Especificacao visual do novo dashboard mobile, menu e paineis do Header |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementacao dos componentes, correcao do gesto e integracao no Header |
| `@qa` | Quinn | Arquiteto de Testes | Validacao de viewports, gestos, acessibilidade, typecheck e build |
| `@devops` | Gage | Especialista DevOps | Conferencia de build e sincronizacao Git ao final |

## Sequencia de execucao e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governanca):**
   - O que e esperado: registrar este plano em `doc/plan/` e no indice `doc/plan/README.md`, e abrir o registro de bug do gesto de arraste.
   - Criterio de passagem: plano legivel, indexado e aprovado por Rafael.
2. **`@ux-design-expert` (Etapa 2 - Especificacao visual):**
   - O que e esperado: consolidar o layout final do dashboard mobile, do profile menu, do painel de notificacoes e da tab bar.
   - Criterio de passagem: especificacao aprovada e sem divergencia com os tokens do design system.
3. **`@dev` (Etapa 3 - Implementacao):**
   - O que e esperado: implementar os itens de escopo com TypeScript estrito, sem `any` injustificado e com componentes pequenos e de responsabilidade unica.
   - Criterio de passagem: `npx tsc --noEmit` com 0 erros.
4. **`@qa` (Etapa 4 - Validacao):**
   - O que e esperado: validar 360 px, 768 px, 1024 px e 1440 px; validar gesto da alca, scroll do conteudo, perfil/logout, sino/marcar lidas e ausencia de rolagem horizontal.
   - Criterio de passagem: parecer PASS e `npm run build` com sucesso.
5. **`@devops` (Etapa 5 - Fechamento tecnico):**
   - O que e esperado: conferir build e manter a arvore de trabalho organizada; push somente se Rafael solicitar.
   - Criterio de passagem: repositorio integro.
6. **`@aiox-master` (Etapa 6 - Fechamento):**
   - O que e esperado: consolidar relatorios, atualizar `ESTADO-ATUAL.md`, o handoff do dia e o `SCREEN-INVENTORY.md`.

## Escopo

- [ ] Redesenhar o dashboard mobile com saudacao compacta, KPIs e status dos sistemas.
- [ ] Reformatar os atalhos para grade compacta de 3 colunas, com icones proporcionais e semanticamente corretos.
- [ ] Extrair dados de atalhos, status e notificacoes para arquivos de dados/mocks tipados.
- [ ] Corrigir o gesto do menu hamburguer para fechar somente ao arrastar a alca superior.
- [ ] Remover o cartao com nome/avatar do usuario do menu hamburguer.
- [ ] Remover o botao de logout do menu hamburguer.
- [ ] Criar o menu de perfil acionado pelo avatar/bloco de usuario do Header, contendo nome, e-mail, papel, selo MFA e acao de encerrar sessao.
- [ ] Implementar o painel de notificacoes acionado pelo sino, com dados ficticios, contador de nao lidas e acao de marcar todas como lidas.
- [ ] Ajustar `MobileTabBar` para icone correto de Inicio, `aria-current` e safe area inferior.
- [ ] Registrar o defeito do gesto em `docs/bugs/` antes da correcao.
- [ ] Atualizar a documentacao afetada (`SCREEN-INVENTORY.md`, `ESTADO-ATUAL.md` e handoff do dia).

## Fora de escopo

- Redesenhar o dashboard desktop.
- Criar telas novas de Clientes, Sistemas, Contratos ou Pagamentos.
- Conectar notificacoes a backend real (permanecem ficticias no prototipo).
- Alterar autenticacao, fluxo MFA ou `useAuth`.
- Remover o logout da sidebar desktop (a solicitacao trata do menu hamburguer mobile).
- Instalar novas dependencias.

## Premissas e dependencias

- A base atual usa React 19, Vite 8, Tailwind CSS v4 e `lucide-react`.
- O `DashboardModule` ja recebe `products`, que sera repassado ao componente mobile para calcular os KPIs.
- O Header recebe dados do usuario a partir de `App` e `AppShell`; sera estendido com e-mail e papel.
- Nao ha componente de notificacoes ou de perfil existente; ambos serao criados.

## Tarefas

- [ ] `@aiox-master`: Registrar o Plano 0009 e a entrada em `doc/plan/README.md`.
- [ ] `@aiox-master`: Registrar `docs/bugs/BUG-0001` referente ao fechamento indevido do drawer ao arrastar o conteudo.
- [ ] `@ux-design-expert`: Especificar o layout final mobile e os estados dos paineis do Header.
- [ ] `@dev`: Criar `src/features/dashboard/data/dashboardActions.ts` com os atalhos tipados.
- [ ] `@dev`: Criar `src/features/dashboard/data/dashboard.mock.ts` e reutilizar no desktop e no mobile.
- [ ] `@dev`: Redesenhar `src/features/dashboard/components/MobileDashboardHub.tsx`.
- [ ] `@dev`: Atualizar `DashboardModule.tsx` para repassar `products` ao mobile.
- [ ] `@dev`: Criar `src/shared/types/notification.types.ts` e `src/shared/data/notifications.mock.ts`.
- [ ] `@dev`: Criar `src/shared/hooks/useDismiss.ts` (clique fora e `Esc`).
- [ ] `@dev`: Criar `src/components/layout/NotificationsMenu.tsx`.
- [ ] `@dev`: Criar `src/components/layout/ProfileMenu.tsx`.
- [ ] `@dev`: Atualizar `Header.tsx` para acionar perfil e notificacoes.
- [ ] `@dev`: Atualizar `AppShell.tsx` e `App.tsx` para repassar e-mail, papel e logout ao Header.
- [ ] `@dev`: Remover usuario e logout de `MobileMenuDrawer.tsx` e corrigir o gesto.
- [ ] `@dev`: Ajustar `MobileTabBar.tsx` e `src/index.css` (safe area).
- [ ] `@qa`: Validar viewports, gestos, acessibilidade, typecheck e build.
- [ ] `@devops`: Conferir build e estado do Git.
- [ ] `@aiox-master`: Consolidar relatorios e atualizar documentacao/handoff.

## Rotas e arquivos afetados

### Novos

- `src/features/dashboard/data/dashboardActions.ts`
- `src/features/dashboard/data/dashboard.mock.ts`
- `src/shared/types/notification.types.ts`
- `src/shared/data/notifications.mock.ts`
- `src/shared/hooks/useDismiss.ts`
- `src/components/layout/NotificationsMenu.tsx`
- `src/components/layout/ProfileMenu.tsx`
- `docs/bugs/BUG-0001 - drawer-fecha-ao-arrastar-conteudo.md`
- `doc/plan/0009 - redesign-dashboard-mobile.md`

### Alterados

- `src/features/dashboard/components/MobileDashboardHub.tsx`
- `src/features/dashboard/DashboardModule.tsx`
- `src/features/dashboard/components/DesktopDashboardView.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/layout/MobileMenuDrawer.tsx`
- `src/components/layout/MobileTabBar.tsx`
- `src/App.tsx`
- `src/index.css`
- `doc/plan/README.md`
- `docs/design/SCREEN-INVENTORY.md`
- `docs/bugs/INDEX.md`
- `doc/handof/ESTADO-ATUAL.md`

## Especificacao funcional e visual

### 1. Dashboard mobile (`MobileDashboardHub.tsx`)

**1.1 Saudacao compacta**
- Titulo "Ola, {primeiroNome}" com hierarquia menor que a atual (evitar 30 px).
- Subtitulo curto em uma linha, com cor de texto secundaria.

**1.2 Resumo em 2x2 (KPIs)**
- Quatro cartoes compactos: Total de produtos, Em construcao, Ativos e Clientes vinculados.
- Calculados a partir de `products` recebido por prop.
- Cada cartao: icone pequeno em container tonalizado, valor em destaque e rotulo curto.

**1.3 Status dos sistemas**
- Cartao unico com 3 linhas: Site Institucional, Salus Oficina e Supabase Auth MFA.
- Cada linha: ponto de status colorido, nome, tipo e latencia.
- Dados em `src/features/dashboard/data/dashboard.mock.ts`, reutilizados pelo desktop.

**1.4 Acesso rapido em grade compacta 3 colunas**
- Tiles de aproximadamente 56 px, com icone de 20 a 22 px em container de 44-48 px.
- Rotulo de 11 a 12 px, centralizado, com quebra controlada (no maximo 2 linhas).
- Grupos preservados como rotulos discretos: PRINCIPAL, COMERCIAL, OPERACIONAL.
- Icones semanticamente corretos:
  - Dashboard: `LayoutDashboard`
  - Produtos: `Package`
  - Atendimentos: `Headphones`
  - Clientes: `Users`
  - Leads: `UserPlus`
  - Contratos: `FileText`
  - Assinaturas: `CalendarCheck`
  - Pagamentos: `CreditCard`
  - Configuracoes: `Settings`
- Configuracao dos atalhos em `src/features/dashboard/data/dashboardActions.ts`.

**1.5 Espacamento**
- Padding inferior suficiente para nao colidir com a `MobileTabBar`.
- Sem rolagem horizontal em 360 px (`GER-04`).

### 2. Menu hamburguer (`MobileMenuDrawer.tsx`)

- Remover o cartao de usuario (nome e avatar) e o selo MFA.
- Remover o bloco de logout do drawer.
- Mover os handlers de toque do painel inteiro para **apenas a alca superior** (drag handle), com `touch-action: none` nessa area.
- O conteudo interno continua rolando normalmente e nao dispara fechamento.
- Fechar ao arrastar a alca mais de 75 px para baixo, mantendo o fechamento por backdrop, botao "X" e tecla `Esc`.
- Manter navegacao, Configuracoes e Ajuda.

### 3. Menu de perfil (`ProfileMenu.tsx`)

- Acionado pelo avatar no mobile e pelo bloco de usuario no desktop/tablet.
- Conteudo: avatar com iniciais, nome completo, e-mail, papel (Administrador) e selo "MFA Ativo".
- Acao: botao "Encerrar sessao" que chama `onLogout` e fecha o menu.
- Fecha ao clicar fora, ao pressionar `Esc` e apos o logout.
- `aria-haspopup="menu"` e `aria-expanded` no gatilho.

### 4. Painel de notificacoes (`NotificationsMenu.tsx`)

- Acionado pelo sino no Header.
- Lista de notificacoes ficticias com titulo, descricao, horario e indicador de nao lida.
- Contador de nao lidas no badge do sino.
- Acao "Marcar todas como lidas" que zera o indicador.
- Estado vazio tratado quando nao houver notificacoes.
- Fecha ao clicar fora, ao pressionar `Esc` e ao selecionar uma notificacao.
- Apenas um painel (perfil ou notificacoes) aberto por vez.

### 5. Tab bar (`MobileTabBar.tsx`) e safe area

- Trocar o icone de "Inicio" de `Search` para `Home`.
- Aplicar `aria-current="page"` na aba ativa.
- Respeitar `safe-area-inset-bottom` por meio de utilitario `pb-safe` em `src/index.css`.
- Manter altura visual da tab bar e alvos de toque `>= 44 px`.

## Criterios de aceite

- [ ] Atalhos mobile proporcionais, com icones de 20 a 22 px e tiles compactos.
- [ ] Dashboard mobile exibe saudacao, KPIs e status dos sistemas antes dos atalhos.
- [ ] Nenhuma rolagem horizontal em 360 px.
- [ ] Menu hamburguer fecha apenas ao arrastar a alca superior; arrastar o conteudo nao fecha.
- [ ] Menu hamburguer nao exibe nome/avatar do usuario nem botao de logout.
- [ ] Avatar do Header (mobile) e bloco de usuario (desktop) abrem o menu de perfil com botao de sair.
- [ ] Logout pelo menu de perfil retorna a tela de login.
- [ ] Sino abre painel de notificacoes, permite marcar todas como lidas e atualiza o badge.
- [ ] Painel de notificacoes e menu de perfil fecham com clique fora e `Esc`.
- [ ] `[D]` Desktop validado em 1024 px e 1440 px sem regressao.
- [ ] `[M]` Mobile validado em 360 px e 768 px.
- [ ] `npx tsc --noEmit` com 0 erros.
- [ ] `npm run build` concluido com sucesso.
- [ ] Sem `alert`/`confirm`/`prompt` nativos, sem `&` em texto visivel e com textos em PT-BR.
- [ ] Bug do drawer registrado em `docs/bugs/` antes da correcao.

## Riscos e bloqueios

| Risco | Impacto | Mitigacao |
| --- | --- | --- |
| Posicionamento dos dropdowns em telas estreitas | Medio | Ancorar a direita e limitar a largura a `min(92vw, 360px)` |
| Conflito entre gesto da alca e scroll do conteudo | Alto | `touch-action: none` apenas na alca e handlers restritos a ela |
| Remocao de props quebrar outros componentes | Medio | Verificar usos de `MobileMenuDrawer` e `Header` antes da alteracao |
| Divergencia entre dados do desktop e mobile | Baixo | Extrair status e atividades para um unico mock tipado |
| Perda de fidelidade visual aprovada | Medio | Validar com Rafael antes de fechar o plano |

## Relatorios finais dos agentes

### Relatorio - `@aiox-master` (Orion)

- **Status:** Pendente
- **Entregas realizadas:** Plano registrado e indexado.
- **Observacoes:** Aguardando leitura e aprovacao de Rafael.

### Relatorio - `@ux-design-expert` (Uma)

- **Status:** Pendente
- **Entregas realizadas:** â€”
- **Observacoes:** â€”

### Relatorio - `@dev` (Dex)

- **Status:** Pendente
- **Arquivos modificados:** â€”
- **Observacoes:** â€”

### Relatorio - `@qa` (Quinn)

- **Status:** Pendente
- **Testes executados:** â€”
- **Observacoes:** â€”

### Relatorio - `@devops` (Gage)

- **Status:** Pendente
- **Entregas realizadas:** â€”
- **Observacoes:** â€”

## Historico de versoes

| Versao | Data | Alteracao | Agente |
| --- | --- | --- | --- |
| 1.0 | 2026-11-06 | Criacao do plano de redesign do dashboard mobile e ajustes de Header e menu | @aiox-master |
