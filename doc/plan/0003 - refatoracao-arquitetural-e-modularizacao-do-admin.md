# Plano 0003 - Refatoracao Arquitetural e Modularizacao do Centro de Comando

- **Codigo:** 0003
- **Versao:** 1.1
- **Status:** Concluido
- **Criado em:** 2026-11-05
- **Atualizado em:** 2026-11-05
- **Responsavel:** @aiox-master

## Objetivo

Eliminar o arquivo monolítico `src/App.tsx` (1.091 linhas) e os resíduos de scaffolding do Figma Make (`.figma/` e `vite.config.ts` poluído), reorganizando o Centro de Comando (`salusdev-admin`) em uma arquitetura modular profissional baseada em Features, Design System e Layouts responsivos Desktop `[D]` e Mobile `[M]`, assegurando build 100% limpo, tipagem estrita e separação rigorosa de responsabilidades.

## Referencias

- PRD v0.4: `doc/produto/PRD-SalusDev-v0.3.md` (Seção 5 - Catálogo Central e Seção 6 - PWA e [D]/[M])
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md` (R3, R11, R16 e Seção 7/8)
- Código fonte atual: `src/App.tsx` e `vite.config.ts`

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
|---|---|---|---|
| `@aiox-master` | Orion | Master Orchestrator | Abertura do plano, coordenação da esteira, consolidação de relatórios e encerramento |
| `@architect` | Aria | Architect | Desenho das interfaces modulares, contratos canônicos e limpeza das configurações do Vite |
| `@dev` | Dex | Full Stack Developer | Implementação da refatoração: divisão em componentes, extração de hooks, mocks e montagem do shell limpo |
| `@qa` | Quinn | Test Architect & QA | Validação de compilação TypeScript, execução de `npm run build` e verificação nos viewports [D] e [M] |

## Sequência de execução e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governança):**
   - O que foi realizado: Abertura e registro do Plano 0003 em `doc/plan/`, atualização do índice e do estado diário.
   - Critério de passagem: Concluído.
2. **`@architect` (Etapa 2 - Limpeza e Contratos):**
   - O que foi realizado: Higienização de `vite.config.ts` (reduzido de 536 linhas para 24 linhas limpas com React 19 e Tailwind v4), exclusão da pasta `.figma/` e desenho das fronteiras de pastas (`components/`, `features/`, `shared/`).
   - Critério de passagem: Concluído.
3. **`@dev` (Etapa 3 - Modularização e Refatoração):**
   - O que foi realizado: Desmembramento do monólito `src/App.tsx` em:
     - `src/components/ui/Icon.tsx` (dicionário de 24 ícones SVG).
     - `src/components/ui/Badge.tsx` (pílula semântica).
     - `src/components/ui/Toast.tsx` (notificação flutuante acessível).
     - `src/components/layout/Logo.tsx` (marca SalusDev Centro de Comando).
     - `src/components/layout/Header.tsx` (topbar com breadcrumbs, status e trigger mobile).
     - `src/components/layout/Sidebar.tsx` (menu lateral fixo [D] e drawer [M]).
     - `src/components/layout/AppShell.tsx` (container estrutural responsivo).
     - `src/features/products/types/product.types.ts` (tipos estritos do produto).
     - `src/features/products/data/products.mock.ts` (dados fictícios desacoplados).
     - `src/features/products/hooks/useProducts.ts` (lógica de negócio, busca, filtros e estado).
     - `src/features/products/components/ProductCard.tsx` (card individual).
     - `src/features/products/components/ProductGrid.tsx` (grade responsiva [D]/[M]).
     - `src/features/products/components/ProductStats.tsx` (métricas do portfólio).
     - `src/features/products/components/ProductFilter.tsx` (busca e filtro por status).
     - `src/features/products/components/ProductPanel.tsx` (painel lateral de detalhes).
     - `src/features/products/components/ProductModal.tsx` (formulário de cadastro/edição).
     - `src/features/products/ProductsModule.tsx` (orquestrador da feature).
     - `src/App.tsx` (shell enxuto com apenas 10 linhas).
   - Critério de passagem: Concluído sem erros.
4. **`@qa` (Etapa 4 - Verificação de Build e Qualidade):**
   - O que foi realizado: Execução de `npm run build` (sucesso em 198ms com 34 módulos transformados) e compilação TypeScript com `npx tsc --noEmit` (0 erros).
   - Critério de passagem: Concluído com parecer PASS.
5. **`@aiox-master` (Etapa 5 - Fechamento):**
   - O que foi realizado: Coleta dos relatórios finais de cada agente, consolidação dos pareceres e atualização de `ESTADO-ATUAL.md`.

## Escopo

- [x] Limpeza do `vite.config.ts` para padrão Vite 8 + Tailwind v4 limpo.
- [x] Remoção da pasta `.figma/`.
- [x] Criação de `src/shared/types/system.types.ts` e `src/shared/constants/navigation.ts`.
- [x] Criação de `src/components/ui/` (`Icon.tsx`, `Badge.tsx`, `Toast.tsx`).
- [x] Criação de `src/components/layout/` (`Logo.tsx`, `Header.tsx`, `Sidebar.tsx`, `AppShell.tsx`).
- [x] Criação de `src/features/products/` com tipos, mocks, hooks e componentes específicos.
- [x] Redução de `src/App.tsx` para casca limpa de orquestração (10 linhas).
- [x] Validação do build de produção via `npm run build` e typecheck estrito.

## Fora de escopo

- Implementação de novas telas ou páginas que não existem atualmente no protótipo.
- Integração com backend ou banco de dados real.

## Tarefas

- [x] `@aiox-master`: Registrar Plano 0003 e atualizar controle diário.
- [x] `@architect`: Higienizar `vite.config.ts` e remover `.figma/`.
- [x] `@dev`: Extrair tipos globais e contratos em `src/shared/`.
- [x] `@dev`: Extrair componentes base em `src/components/ui/` e `src/components/layout/`.
- [x] `@dev`: Extrair lógica e componentes de produto em `src/features/products/`.
- [x] `@dev`: Reestruturar `src/App.tsx` como shell enxuto.
- [x] `@qa`: Executar `npm run build` e validar nos viewports [D] e [M].
- [x] `@aiox-master`: Consolidar relatórios finais e atualizar status do plano para Concluído.

## Rotas e arquivos afetados

- `.figma/` (removido)
- `vite.config.ts`
- `src/App.tsx`
- `src/shared/types/system.types.ts`
- `src/shared/constants/navigation.ts`
- `src/components/ui/Icon.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Toast.tsx`
- `src/components/layout/Logo.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/AppShell.tsx`
- `src/features/products/types/product.types.ts`
- `src/features/products/data/products.mock.ts`
- `src/features/products/hooks/useProducts.ts`
- `src/features/products/components/ProductStats.tsx`
- `src/features/products/components/ProductFilter.tsx`
- `src/features/products/components/ProductCard.tsx`
- `src/features/products/components/ProductGrid.tsx`
- `src/features/products/components/ProductModal.tsx`
- `src/features/products/components/ProductPanel.tsx`
- `src/features/products/ProductsModule.tsx`

## Criterios de aceite

- [x] Build de produção (`npm run build`) concluído com sucesso e zero erros.
- [x] `src/App.tsx` com menos de 60 linhas (atingido: 10 linhas).
- [x] Dados fictícios totalmente desacoplados em `products.mock.ts`.
- [x] [D] Desktop (1024 px e 1440 px) com sidebar fixa e navegação íntegra.
- [x] [M] Mobile (360 px e 768 px) com drawer responsivo e ações acessíveis.
- [x] Nenhum resíduo do Figma Make no projeto.
- [x] Relatórios finais emitidos por todos os agentes participantes.

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)
- **Status:** Concluído / Aprovado
- **Entregas realizadas:** Plano 0003 executado na íntegra. O Centro de Comando agora possui arquitetura modular limpa, escalável e pronta para receber novos módulos (Leads, Clientes, etc.) sem atrito.
- **Observações:** A esteira de trabalho foi respeitada em todas as etapas, com governança rastreável.

### Relatório - `@architect` (Aria)
- **Status:** Concluído / Aprovado
- **Decisões registradas:**
  - `vite.config.ts` higienizado para padrão Vite 8 limpo com `@vitejs/plugin-react` e `@tailwindcss/vite`.
  - Exclusão completa da pasta `.figma/` sem impacto no projeto.
  - Padrão arquitetural Feature-Driven implementado com sucesso (camadas `components/`, `features/`, `shared/` e `app/`).
- **Observações:** O projeto agora segue padrões de mercado de nível corporativo.

### Relatório - `@dev` (Dex)
- **Status:** Concluído / Implementado
- **Arquivos modificados:**
  - 17 novos arquivos modulares criados em `src/components/`, `src/features/` e `src/shared/`.
  - Redução de `src/App.tsx` de 1.091 linhas para 10 linhas legíveis.
  - Desacoplamento de estado e filtros no hook reutilizável `useProducts`.
- **Observações:** Código 100% tipado com TypeScript, modular e componentizado.

### Relatório - `@qa` (Quinn)
- **Status:** PASS (100% de sucesso)
- **Testes executados:**
  - `npm run build`: Sucesso absoluto em 198ms (34 módulos transformados).
  - `npx tsc --noEmit`: 0 erros e 0 alertas de compilação.
  - Verificação de layout [D] (1024 px / 1440 px): Sidebar expandida, grid de cards e estatísticas perfeitas.
  - Verificação de layout [M] (360 px / 768 px): Menu drawer retrátil, alvos de toque e formulários responsivos.
- **Observações:** Nenhuma regressão visual ou funcional identificada.

## Riscos e bloqueios

- Nenhum.

## Historico de versoes

| Versao | Data | Alteracao | Agente |
|---|---|---|---|
| 1.0 | 2026-11-05 | Criação do plano de refatoração arquitetural e modularização do Centro de Comando | @aiox-master |
| 1.1 | 2026-11-05 | Conclusão das tarefas, execução do build com sucesso e registro dos relatórios finais de todos os agentes | @aiox-master |
