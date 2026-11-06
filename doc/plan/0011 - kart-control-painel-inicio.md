# Plano 0011 - Painel Administrativo do KartControl (Início)

- **Código:** 0011
- **Versão:** 1.1
- **Status:** Adiado (aguardando a base do plano de controle SalusDev)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsável:** @aiox-master

> **Regra de execução:** este plano foi criado somente para revisão. Nenhum código deve ser implementado até a aprovação explícita de Rafael.

> **Plano adiado em 2026-11-06.** Por decisão de Rafael, o painel operacional do KartControl será tratado em planos futuros, após a base do plano de controle SalusDev estar pronta. O conteúdo abaixo fica preservado como referência e não deve ser executado agora.

## Releitura obrigatória das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar este plano.
- **Registro da releitura:** 2026-11-06 15:26 - @aiox-master

## Objetivo

Planejar a implementação da tela **Início** do painel administrativo do KartControl, com shell próprio (sidebar e topbar), quatro indicadores, lista dos últimos pilotos cadastrados e navegação para as demais seções. O acesso deve ocorrer somente após o login do produto definido no Plano 0010.

## Contexto e decisões aprovadas

1. **Módulo neste repositório.** O painel será implementado em `src/features/kart-control/`, reaproveitando o build atual (React 19, Vite 8, Tailwind CSS v4 e `lucide-react`).
2. **Acesso após login do produto.** O botão "Entrar" do card Administração, criado no Plano 0010, abre o painel do KartControl. O Plano 0011 não implementa login nem 2FA.
3. **Escopo de seções.** Apenas **Início** fica funcional. Pilotos, Calendário, Resultados e Mídia aparecem no menu e abrem telas de placeholder.
4. **Mobile incluído.** A tela será adaptada para `[M]` em 360 px e 768 px, além do `[D]` em 1024 px e 1440 px.
5. **Entrega atual.** Criar somente este plano e registrá-lo no índice, sem alterar código.

> Observação da referência visual: a moldura escura, o título "KartControl - Início desktop" e o retângulo pontilhado azul são artefatos da ferramenta de captura e não fazem parte da interface.

## Dependência com o Plano 0010

> **Atualização em 2026-11-06:** o Plano 0010 v2.0 removeu o gate de acesso e as credenciais do produto. Quando este plano for retomado, a dependência deverá ser revista para usar a governança do produto e um login próprio do `kart-admin`, com 2FA, em plano futuro.

- O Plano 0011 dependia do gate de acesso da versão 1.0 do Plano 0010.
- Na retomada, a integração deverá ocorrer a partir da governança do produto e do login próprio do `kart-admin`, com 2FA.
- Enquanto o login próprio não existir, o módulo pode ser validado com um harness interno temporário, removido antes do fechamento.
- Nenhuma credencial ou fluxo de autenticação será duplicado no Plano 0011.

## Referências

- Regras do Sistema: `doc/produto/RegrasSystema.md` (`GER-03`, `GER-04`, `GER-07`, `GER-08`, `GER-10`, `BTN-*`, `A11Y-*`, `PWA-*`)
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md` (R1, R9, R11, R16, R18, R20)
- Governança do produto: `doc/plan/0010 - governanca-produto-kart-control.md`
- PRD: `doc/produto/PRD-SalusDev-v0.3.md` (v0.4)
- Inventário de Telas: `docs/design/SCREEN-INVENTORY.md` (nova entrada `KART-01`)
- Design System: `docs/design/DESIGN-SYSTEM.md`
- Dicionário de Dados: `docs/dados/DATA-DICTIONARY.md`
- Referência visual: imagem fornecida por Rafael em 2026-11-06 (reversionar antes da implementação)
- Código atual:
  - `src/App.tsx`
  - `src/components/ui/Icon.tsx`
  - `src/features/products/types/product.types.ts`
  - `src/features/products/data/products.mock.ts`
  - `src/features/product-management/` (criado pelo Plano 0010)

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
| --- | --- | --- | --- |
| `@aiox-master` | Orion | Orquestração | Registro do plano, coordenação, consolidação e fechamento |
| `@ux-design-expert` | Uma | Designer UI/UX | Especificação visual `[D]` e `[M]`, tokens do produto e entrada `KART-01` no inventário |
| `@architect` | Aria | Arquiteto | Revisão da integração com o Plano 0010, estado de navegação e limites dos componentes |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementação dos tipos, mocks, ícones, componentes e integração |
| `@qa` | Quinn | Arquiteto de Testes | Validação de viewports, interações, acessibilidade, typecheck e build |
| `@devops` | Gage | Especialista DevOps | Conferência de build e sincronização Git ao final |

## Sequência de execução e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governança):**
   - O que é esperado: registrar este plano em `doc/plan/` e no índice `doc/plan/README.md`.
   - Critério de passagem: plano legível, indexado e disponível para revisão de Rafael.
2. **`@ux-design-expert` (Etapa 2 - Especificação visual):**
   - O que é esperado: consolidar `[D]` e `[M]`, definir os tokens do produto e adicionar `KART-01` ao inventário.
   - Critério de passagem: especificação aprovada e alinhada ao design system.
3. **`@architect` (Etapa 3 - Revisão técnica):**
   - O que é esperado: revisar a integração com o Plano 0010, o estado de navegação e a separação entre o shell do SalusDev e o shell do KartControl.
   - Critério de passagem: nenhum shell duplicado, nenhuma dependência circular e nenhuma credencial no módulo.
4. **`@dev` (Etapa 4 - Implementação):**
   - O que é esperado: implementar os itens de escopo com TypeScript estrito, componentes pequenos e responsabilidade única.
   - Critério de passagem: `npx tsc --noEmit` com 0 erros.
5. **`@qa` (Etapa 5 - Validação):**
   - O que é esperado: validar 360 px, 768 px, 1024 px e 1440 px; validar navegação, atualização, edição, menus, placeholders e ausência de rolagem horizontal.
   - Critério de passagem: parecer PASS e `npm run build` com sucesso.
6. **`@devops` (Etapa 6 - Fechamento técnico):**
   - O que é esperado: conferir build e manter a árvore de trabalho organizada; push somente se Rafael solicitar.
   - Critério de passagem: repositório íntegro.
7. **`@aiox-master` (Etapa 7 - Fechamento):**
   - O que é esperado: consolidar relatórios, atualizar `ESTADO-ATUAL.md` e o handoff do dia.

## Escopo

- [ ] Criar o Plano 0011 e registrá-lo em `doc/plan/README.md`.
- [ ] Adicionar a entrada `KART-01 - Início` em `docs/design/SCREEN-INVENTORY.md`.
- [ ] Documentar os campos de piloto e as métricas em `docs/dados/DATA-DICTIONARY.md`.
- [ ] Criar os tipos e o mock do KartControl.
- [ ] Adicionar os ícones necessários ao `Icon.tsx`.
- [ ] Implementar o shell com sidebar e topbar próprios.
- [ ] Implementar o conteúdo de Início com quatro KPIs e a lista de pilotos.
- [ ] Implementar os placeholders de Pilotos, Calendário, Resultados e Mídia.
- [ ] Implementar atualização simulada, edição de piloto, seletor de unidade e menu do administrador.
- [ ] Integrar o painel ao callback do Plano 0010 em `App.tsx`.
- [ ] Adaptar o layout para `[M]` em 360 px e 768 px.
- [ ] Validar acessibilidade, textos em PT-BR e ausência de `&` em texto visível.

## Fora de escopo

- Implementar login, recuperação de senha ou 2FA do produto (responsabilidade do Plano 0010).
- Construir as telas internas de Pilotos, Calendário, Resultados e Mídia.
- Backend, persistência, integração real, envio de e-mail ou banco de dados.
- Alterar o shell do SalusDev Admin ou o fluxo de autenticação administrativa.
- Executar o Plano 0009 ou o Plano 0010.
- Criar dados de outras unidades além de Kart Apucarana.
- Instalar novas dependências.

## Premissas e dependências

- A base atual usa React 19, Vite 8, Tailwind CSS v4 e `lucide-react`.
- A navegação é controlada por estado em `App.tsx`, sem router.
- O `KartControlApp` será renderizado em tela cheia, substituindo o `AppShell` do SalusDev, para evitar duas sidebars simultâneas.
- O Plano 0010 fornecerá o acesso autenticado e o callback de entrada no painel.
- Todos os dados de pilotos, métricas e unidades são fictícios e existem apenas no protótipo.

## Tarefas

- [ ] `@aiox-master`: Registrar o Plano 0011 e a entrada em `doc/plan/README.md`.
- [ ] `@ux-design-expert`: Especificar `[D]` e `[M]`, definir tokens do produto e adicionar `KART-01` ao inventário.
- [ ] `@architect`: Revisar a integração com o Plano 0010 e o estado de navegação.
- [ ] `@dev`: Criar `src/features/kart-control/types/kartControl.types.ts`.
- [ ] `@dev`: Criar `src/features/kart-control/data/kartControl.mock.ts` com KPIs, pilotos, unidades e navegação.
- [ ] `@dev`: Criar `src/features/kart-control/hooks/useKartControl.ts`.
- [ ] `@dev`: Adicionar `flag`, `upload`, `image`, `pencil`, `chart`, `chevron-down`, `alert` e `dots-vertical` ao `Icon.tsx`.
- [ ] `@dev`: Criar `KartSidebar.tsx`, `KartTopbar.tsx`, `KartUnitSelector.tsx` e `KartUserMenu.tsx`.
- [ ] `@dev`: Criar `KartDashboardView.tsx`, `KpiCard.tsx`, `PilotsList.tsx`, `PilotRow.tsx`, `PilotCard.tsx` e `StatusBadge.tsx`.
- [ ] `@dev`: Criar `PilotEditModal.tsx` e `KartPlaceholderView.tsx`.
- [ ] `@dev`: Criar `KartControlApp.tsx` e integrar em `App.tsx` pelo callback do Plano 0010.
- [ ] `@dev`: Adaptar o layout para 360 px e 768 px.
- [ ] `@qa`: Validar navegação, atualização, edição, menus, placeholders, viewports, acessibilidade, typecheck e build.
- [ ] `@devops`: Conferir build e estado do Git.
- [ ] `@aiox-master`: Consolidar relatórios e atualizar documentação e handoff.

## Rotas e arquivos afetados

### Novos

- `doc/plan/0011 - kart-control-painel-inicio.md`
- `src/features/kart-control/KartControlApp.tsx`
- `src/features/kart-control/types/kartControl.types.ts`
- `src/features/kart-control/data/kartControl.mock.ts`
- `src/features/kart-control/hooks/useKartControl.ts`
- `src/features/kart-control/components/KartSidebar.tsx`
- `src/features/kart-control/components/KartTopbar.tsx`
- `src/features/kart-control/components/KartDashboardView.tsx`
- `src/features/kart-control/components/KpiCard.tsx`
- `src/features/kart-control/components/PilotsList.tsx`
- `src/features/kart-control/components/PilotRow.tsx`
- `src/features/kart-control/components/PilotCard.tsx`
- `src/features/kart-control/components/StatusBadge.tsx`
- `src/features/kart-control/components/PilotEditModal.tsx`
- `src/features/kart-control/components/KartUnitSelector.tsx`
- `src/features/kart-control/components/KartUserMenu.tsx`
- `src/features/kart-control/components/KartPlaceholderView.tsx`

### Alterados

- `doc/plan/README.md`
- `docs/design/SCREEN-INVENTORY.md`
- `docs/dados/DATA-DICTIONARY.md`
- `src/App.tsx`
- `src/components/ui/Icon.tsx`
- `src/features/product-management/components/ProductAdminCard.tsx` (callback de entrada, criado pelo Plano 0010)
- `doc/handof/ESTADO-ATUAL.md`

## Especificação funcional e visual

### 1. Fluxo de acesso

1. O usuário entra no SalusDev Admin e abre a gestão do Kart Control pelo Plano 0010.
2. No card Administração, o botão "Entrar" chama `onEnterProductApp(product)`.
3. `App.tsx` renderiza `KartControlApp` em tela cheia, sem o shell do SalusDev.
4. O usuário navega pelo painel do KartControl.
5. "Sair do painel" encerra o painel e retorna à gestão do produto.

### 2. Shell do KartControl

**Sidebar (`KartSidebar`)**
- Topo com a marca `</> SalusDev` e o selo "CENTRO DE COMANDO".
- Card do produto com selo âmbar `KC`, "KartControl" e "Kart Apucarana".
- Seção "ADMINISTRAÇÃO" com os itens Início, Pilotos, Calendário, Resultados e Mídia.
- Item ativo em pill verde-escuro com texto branco e `aria-current="page"`.
- Rodapé com "Administrador", "Kart Apucarana" e menu de três pontos.

**Topbar (`KartTopbar`)**
- Marca "KartControl" à esquerda e breadcrumb `KartControl > Início`.
- Seletor de unidade "Kart Apucarana".
- Botão "Voltar ao Site" com ícone externo.
- Avatar `A` que abre o menu do administrador.
- No mobile, botão de menu que abre a sidebar em drawer.

### 3. Conteúdo de Início (`KartDashboardView`)

- Eyebrow "PAINEL ADMINISTRATIVO", título "Status geral" e botão "Atualizar".
- Quatro KPIs em uma linha no desktop e em grade 2x2 no mobile:
  - Pilotos: `57`, ícone de pessoas.
  - Inscritos (próxima): `11`, ícone de novo usuário.
  - Último resultado: `ETAPA - 10 - OUTUBRO`, ícone de bandeira.
  - Eventos: `20`, ícone de calendário.
- Card "Últimos pilotos cadastrados" com ícone de pessoas no cabeçalho.
- Cada linha exibe avatar com inicial, nome, e-mail, telefone, selo de status, data e botão de editar.
- Status `PENDENTE` em âmbar com ícone de alerta; `ATIVO` em verde com ícone de confirmação.
- Estado vazio tratado caso a lista não tenha pilotos.

### 4. Placeholders

- Pilotos, Calendário, Resultados e Mídia exibem o mesmo layout de "Em construção", com ícone, título da seção e mensagem curta.
- O shell permanece visível durante a navegação.
- Início retorna ao conteúdo principal.

### 5. Interações

- **Atualizar:** spinner simulado de 600 ms, atualização do horário e toast de confirmação.
- **Editar piloto:** modal com nome, e-mail, telefone e status; salva em memória e exibe toast.
- **Seletor de unidade:** dropdown com "Kart Apucarana" e indicação de que outras unidades serão adicionadas depois.
- **Voltar ao Site:** abre o endereço público do produto em nova aba quando configurado; caso contrário, exibe toast.
- **Menu do administrador:** "Sair do painel" retorna à gestão do produto; "Encerrar sessão" encerra o acesso ao SalusDev.
- Fechar menus e modais com clique fora e tecla `Esc`.

### 6. Dados mock

**KPIs**
- Pilotos: 57
- Inscritos (próxima): 11
- Último resultado: ETAPA - 10 - OUTUBRO
- Eventos: 20

**Pilotos (10 linhas)**

| Nome | E-mail | Telefone | Status | Data |
| --- | --- | --- | --- | --- |
| Patricia A | patricia.a@tempkartapucarana.com | (43) 99999-9999 | Pendente | 25/09/2026 |
| Reinaldo H | reinaldo.h@tempkartapucarana.com | (43) 99999-9999 | Pendente | 25/09/2026 |
| Ana Julia | ana.julia@tempkartapucarana.com | (43) 99999-9999 | Pendente | 25/09/2026 |
| Villa | villa@tempkartapucarana.com | (43) 99999-9999 | Pendente | 24/07/2026 |
| Cesar A | cesar.a@gmail.com | (43) 99999-9999 | Ativo | 24/07/2026 |
| Elielton R | elielton.r@tempkartapucarana.com | (43) 99999-9999 | Pendente | 29/05/2026 |
| Luis E | luis.e@tempkartapucarana.com | (43) 99999-9999 | Pendente | 29/05/2026 |
| Lucas M | lucas.m88@gmail.com | (43) 99999-9999 | Ativo | 27/04/2026 |
| Thales T | thales.t@hotmail.com | (43) 99999-9999 | Ativo | 27/04/2026 |
| Douglas P | douglas.p@gmail.com | (43) 99999-9999 | Ativo | 25/04/2026 |

- Todos os dados são fictícios e servem apenas para a demonstração do protótipo.

### 7. Modelo de dados

```ts
export type KartPilotStatus = "Pendente" | "Ativo"

export interface KartPilot {
  id: number
  name: string
  initials: string
  email: string
  phone: string
  status: KartPilotStatus
  registeredAt: string
  color: string
}

export interface KartDashboardMetrics {
  pilots: number
  nextRegistrations: number
  lastResult: string
  events: number
}

export interface KartUnit {
  id: string
  name: string
}

export type KartSection = "Início" | "Pilotos" | "Calendário" | "Resultados" | "Mídia"
```

### 8. Responsividade

**Desktop `[D]` - 1024 px e 1440 px**
- Sidebar fixa de aproximadamente 240 px.
- Topbar fixa com breadcrumb, unidade, "Voltar ao Site" e avatar.
- KPIs em 4 colunas e lista em linhas.
- Conteúdo com largura máxima confortável e respiro lateral.

**Mobile `[M]` - 360 px e 768 px**
- Sidebar em drawer, acionada por hambúrguer.
- Topbar compacta com marca, unidade e avatar.
- KPIs em grade 2x2.
- Pilotos em cartões empilhados.
- "Voltar ao Site" no drawer ou menu do usuário.
- Alvos de toque de no mínimo 44 px e nenhuma rolagem horizontal em 360 px.

### 9. Acessibilidade e padrões

- Contraste adequado, foco visível e navegação por teclado.
- `aria-current="page"` no item ativo da sidebar.
- `aria-label` nos botões de ícone.
- Sem `alert`, `confirm` ou `prompt` nativos.
- Sem `&` em texto visível.
- Textos em PT-BR com acentuação correta.
- Dados fictícios identificados como demonstração.

## Critérios de aceite

- [ ] A tela só abre após o login do produto pelo Plano 0010.
- [ ] O layout reproduz a referência: sidebar, topbar, quatro KPIs, lista com 10 pilotos e rodapé do administrador.
- [ ] Os KPIs exibem 57, 11, ETAPA - 10 - OUTUBRO e 20.
- [ ] Os pilotos exibem nome, e-mail, telefone, status, data e ação de editar.
- [ ] "Atualizar" simula a atualização e atualiza o horário.
- [ ] Editar piloto salva em memória e exibe toast.
- [ ] As seções Pilotos, Calendário, Resultados e Mídia abrem placeholders e Início retorna ao painel.
- [ ] O seletor de unidade e o menu do administrador funcionam.
- [ ] "Voltar ao Site" abre o endereço do produto ou exibe toast.
- [ ] `[D]` validado em 1024 px e 1440 px.
- [ ] `[M]` validado em 360 px e 768 px, sem rolagem horizontal e com alvos de 44 px ou mais.
- [ ] Sem dados reais, sem `alert`/`confirm`/`prompt`, sem `&` em texto visível e com PT-BR.
- [ ] `npx tsc --noEmit` com 0 erros.
- [ ] `npm run build` concluído com sucesso.
- [ ] Inventário de telas e dicionário de dados atualizados.

## Riscos e bloqueios

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Dependência do Plano 0010 ainda em rascunho | Alto | Desenvolver o módulo isolado e integrar somente pelo callback; não duplicar autenticação |
| Dois shells concorrentes | Médio | Renderizar o KartControl em tela cheia, fora do `AppShell` do SalusDev |
| Divergência de fonte e cores | Médio | Reutilizar Manrope e definir tokens do produto antes de codar |
| Mobile sem referência visual | Médio | Derivar do `[D]`, seguir as regras de acessibilidade e validar com Rafael |
| Dados pessoais fictícios parecerem reais | Baixo | Manter aviso de demonstração e usar apenas dados de protótipo |
| Novos ícones quebrarem a tipagem | Baixo | Estender a união `IconName` e o `iconMap` juntos |
| Referência visual ainda não versionada | Médio | Adicionar `docs/design/img/KartControl - Inicio - D.png` antes do fechamento |

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)

- **Status:** Pendente
- **Entregas realizadas:** Plano 0011 criado e indexado.
- **Observações:** Aguardando leitura e aprovação de Rafael.

### Relatório - `@ux-design-expert` (Uma)

- **Status:** Pendente
- **Entregas realizadas:** —
- **Observações:** —

### Relatório - `@architect` (Aria)

- **Status:** Pendente
- **Entregas realizadas:** —
- **Observações:** —

### Relatório - `@dev` (Dex)

- **Status:** Pendente
- **Arquivos modificados:** —
- **Observações:** —

### Relatório - `@qa` (Quinn)

- **Status:** Pendente
- **Testes executados:** —
- **Observações:** —

### Relatório - `@devops` (Gage)

- **Status:** Pendente
- **Entregas realizadas:** —
- **Observações:** —

## Histórico de versões

| Versão | Data | Alteração | Agente |
| --- | --- | --- | --- |
| 1.0 | 2026-11-06 | Criação do plano do painel administrativo do KartControl com a tela Início | @aiox-master |
| 1.1 | 2026-11-06 | Plano adiado por decisão de Rafael; dependência com o Plano 0010 v2.0 registrada | @aiox-master |
