# Plano 0010 - Gestão do Produto KartControl

- **Código:** 0010
- **Versão:** 2.2
- **Status:** Concluído (Implementado e Homologado)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsável:** @aiox-master

> **Regra de execução:** este plano foi aprovado por Rafael Amaral Salustiano em 2026-11-06 17:08. Implementação, testes e validações de qualidade concluídos com sucesso.

---

## Releitura obrigatória das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) e `doc/produto/RegrasDesenvolvimento.md` (v2.0) antes de iniciar este plano.
- **Registro da releitura:** 2026-11-06 16:50 - @aiox-master

---

## Objetivo

Construir a tela de **Gestão do Produto (KartControl)** no SalusDev Admin (`ADM-04`), permitindo aos operadores centralizar e administrar informações técnicas (repositório GitHub, banco de dados, endereço web), acessos administrativos (painel de controle, e-mail técnico, senha mascarada), acesso direto ao ponto de administração centralizada e alteração de senha segura com validações em memória, seguindo com exatidão a referência visual oficial `docs/design/img/kartcontrol/Produtokartcontrol - D.png`.

---

## Contexto e decisões de design (Fidelidade ao Mockup)

1. **Paridade estrita com `Produtokartcontrol - D.png`:** A tela segue rigorosamente o layout e a hierarquia do mockup oficial:
   - Breadcrumb: `Produtos > KartControl > Gestão`.
   - Ação de retorno: `← Voltar ao portfólio` no topo.
   - Cabeçalho do produto: Squarcle `KC` em tom terra/marrom acobreado (`#b86a2e`), categoria `GESTÃO DO PRODUTO · SISTEMA DE GESTÃO`, título `KartControl`, descrição institucional, pílula de status `● Piloto`, métrica `1 cliente` e indicador `Progresso 84%` com barra verde.
2. **Banner de aviso institucional:** Card verde suave (`bg-[#f4f7f4]`) com ícone de informação comunicando `Dados de demonstração: Repositório e endereço web são exemplos do protótipo. Nenhuma integração ou serviço de produção está conectado.`
3. **Card "Administração":** Card horizontal de destaque com ícone de cadeado em container arredondado, rótulo `Administração`, valor `Não configurado` (ou status atual) e botão de ação `Entrar` (com ícone indicativo).
   - Ao acionar `Entrar`, o protótipo prepara a navegação integrada para o painel operacional do produto (etapa detalhada no Plano 0011).
4. **Card "Informações técnicas" (Coluna 1):**
   - Rótulo e descrição: `Referências de desenvolvimento e endereço do produto.`
   - Linha 1: Ícone Git branch/fork, `Repositório`, valor `github.com/salusdev/kart-control`, com três botões de ação: `Copiar` (para clipboard), `Abrir` (em nova aba) e `Editar` (abre modal de edição).
   - Linha 2: Ícone Database, `Nome do banco de dados`, valor `Não informado` (ou preenchido), com botão `Configurar` (modal de edição).
   - Linha 3: Ícone Globe, `Endereço web`, valor `kart.salusdev.com`, com botões `Copiar`, `Abrir` e `Editar`.
5. **Card "Acessos do produto" (Coluna 2):**
   - Rótulo e descrição: `Painel e credenciais de administração.`
   - Linha 1: Ícone Layout/Janela, `Painel de controle`, valor `Não configurado` (ou URL definida), com botão `Configurar`.
   - Linha 2: Ícone Mail, `E-mail`, valor `Não informado` (ou e-mail de admin), com botão `Configurar`.
   - Linha 3: Ícone Lock/Cadeado, `Senha de acesso à gestão`, valor mascarado com marcadores de proteção `•••••••••••••••`, com botão `Alterar senha` que direciona suavemente o foco para o formulário inferior.
6. **Card "Alterar senha" (Base):**
   - Ícone de escudo verde com checkmark (`ShieldCheck`) em container tonalizado.
   - Título: `Alterar senha` e subtítulo: `Atualize sua senha de acesso com segurança e mantenha o controle da sua conta administrativa.`
   - Três campos de formulário estruturados: `Senha atual`, `Nova senha` e `Confirmar nova senha`.
   - Validações funcionais: preenchimento obrigatório, mínimo de 8 caracteres na nova senha e confirmação idêntica.
   - Botão de ação: `Salvar alteração` com ícone e feedback de sucesso por notificação toast (sem usar `alert` nativo, cumprindo a regra `GER-07`).
7. **Rodapé padronizado:** Texto institucional centralizado `SalusDev · Informações e acessos do produto`.
8. **Responsividade Mobile (`[M]` - 360 px a 768 px):**
   - A grade de duas colunas transiciona de forma fluida para uma coluna vertical.
   - As ações secundárias (Copiar, Abrir, Editar) se acomodam em linha ou botões com alvos de toque mínimos de 44 px (`GER-08`).
   - Fontes de input mantidas em 16 px (`text-base`) para evitar zoom automático no Safari iOS (`PWA-03`).
   - Respeito integral às áreas seguras (`pt-safe` no topo para evitar colisão com o relógio conforme `BUG-0003`, e `pb-32` na base para evitar colisão com a barra inferior conforme `BUG-0002`).

---

## Referências

- Mockup visual aprovado: `docs/design/img/kartcontrol/Produtokartcontrol - D.png`
- Telas de expansão do produto (Plano 0011): `docs/design/img/kartcontrol/Kartcontrol - Inicio - D.png`
- Regras do Sistema: `doc/produto/RegrasSystema.md` (`GER-03`, `GER-04`, `GER-07`, `GER-08`, `GER-10`, `FRM-*`, `BTN-*`, `FBK-*`, `PWA-*`)
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md` (R1, R9, R10, R11, R16, R18, R20)
- PRD do Ecossistema: `doc/produto/PRD-SalusDev-v0.3.md` (v0.4)
- Inventário de Telas: `docs/design/SCREEN-INVENTORY.md` (`ADM-04 - Gestão do Produto`)
- Design System: `docs/design/DESIGN-SYSTEM.md`
- Dicionário de Dados: `docs/dados/DATA-DICTIONARY.md`
- Código existente:
  - `src/features/products/ProductsModule.tsx`
  - `src/features/products/components/ProductPanel.tsx`
  - `src/features/products/components/ProductGrid.tsx`
  - `src/features/products/types/product.types.ts`
  - `src/features/products/data/products.mock.ts`
  - `src/features/products/hooks/useProducts.ts`
  - `src/components/layout/AppShell.tsx`
  - `src/components/layout/Header.tsx`
  - `src/App.tsx`

---

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
| --- | --- | --- | --- |
| `@aiox-master` | Orion | Orquestração | Registro do plano, coordenação entre agentes, validação de regras e fechamento |
| `@ux-design-expert` | Uma | Designer UI/UX | Validação de fidelidade de layout, espaçamentos, tipografia, cores e responsividade baseada em `Produtokartcontrol - D.png` |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementação modular dos componentes, tipagem estrita, formulário de alteração de senha e modais de configuração |
| `@qa` | Quinn | Arquiteto de Testes | Validação de formulários, testes em 360, 768, 1024 e 1440 px, typecheck, build e verificação da regra `GER-10` |
| `@devops` | Gage | Especialista DevOps | Validação de integridade do build Vite e controle do versionamento Git |

---

## Sequência de execução e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governança):**
   - Registrar este plano físico em `doc/plan/0010 - governanca-produto-kart-control.md` e atualizar o índice em `doc/plan/README.md`.
   - Apresentar o plano a Rafael e aguardar aprovação explícita antes de qualquer codificação.
2. **`@ux-design-expert` (Etapa 2 - Especificação e Design QA):**
   - Garantir paridade visual milimétrica com a captura `Produtokartcontrol - D.png`.
   - Definir comportamento responsivo e estados visuais (hover, active, focus e toast).
3. **`@dev` (Etapa 3 - Implementação, após aprovação):**
   - Atualizar `product.types.ts` com os novos campos de gestão e acessos técnicos.
   - Criar módulo `src/features/product-management/` com componentes de responsabilidade única.
   - Implementar formulário funcional de "Alterar senha" e modais de edição em memória com toast de feedback.
   - Integrar fluxo de navegação entre `Produtos` e `Gestão do Produto` via `AppShell`.
4. **`@qa` (Etapa 4 - Validação e Homologação):**
   - Executar `npx tsc --noEmit` (0 erros) e `npm run build`.
   - Validar viewports móveis e desktop, alvos de toque `>= 44 px` e ausência do caractere `&` em texto visível.
5. **`@devops` (Etapa 5 - Sincronização):**
   - Realizar commit estruturado e push para `origin/main` após aprovação final de Rafael.
6. **`@aiox-master` (Etapa 6 - Fechamento):**
   - Atualizar `ESTADO-ATUAL.md` e o histórico de versões.

---

## Escopo

- [x] Manter o plano físico registrado em `doc/plan/0010 - governanca-produto-kart-control.md` e indexado em `doc/plan/README.md`.
- [x] Catalogar a tela `ADM-04 - Gestão do Produto (KartControl)` em `docs/design/SCREEN-INVENTORY.md`.
- [x] Estender a tipagem `Product` em `src/features/products/types/product.types.ts` com os campos de gestão técnica:
  - `repositoryUrl?: string`
  - `databaseName?: string`
  - `webUrl?: string`
  - `adminPanelConfigured?: boolean`
  - `adminPanelUrl?: string`
  - `adminEmail?: string`
  - `adminPasswordMasked?: string`
- [x] Atualizar os dados do KartControl em `src/features/products/data/products.mock.ts` com os valores da imagem de referência.
- [x] Adicionar método `updateProductDetails(productId: string, patch: Partial<Product>)` no hook `useProducts`.
- [x] Adicionar ação de navegação "Acessar gestão" ou "Gerenciar produto" no drawer lateral `ProductPanel.tsx`.
- [x] Criar o módulo `src/features/product-management/`:
  - `ProductManagementScreen.tsx`: container mestre da tela com breadcrumb `Produtos > KartControl > Gestão` e link `← Voltar ao portfólio`.
  - `ProductHeroHeader.tsx`: cabeçalho institucional com o ícone `KC`, categoria, badges, métricas e progresso `84%`.
  - `ProductDemoBanner.tsx`: aviso verde elegante de demonstração.
  - `ProductAdminCard.tsx`: card de Administração com botão `Entrar`.
  - `ProductTechnicalInfoCard.tsx`: card de Informações técnicas com linhas para Repositório, Banco de dados e Endereço web (com Copiar, Abrir, Editar).
  - `ProductAccessCard.tsx`: card de Acessos do produto com Painel de controle, E-mail e Senha mascarada (com Configurar e Alterar senha).
  - `ProductChangePasswordCard.tsx`: formulário de alteração de senha com campos para Senha atual, Nova senha, Confirmar nova senha e botão Salvar alteração.
  - `ProductConfigModal.tsx`: modal reutilizável e acessível para edição rápida dos dados técnicos e de acesso.
- [x] Implementar cópia para a área de transferência (`navigator.clipboard.writeText`) com feedback visual.
- [x] Implementar abertura de links externos com `target="_blank" rel="noopener noreferrer"`.
- [x] Implementar validação e alteração de senha em memória com mensagens contextuais de erro e toast de sucesso.
- [x] Integrar a tela no roteador de estado do `App.tsx` e `AppShell.tsx`.
- [x] Assegurar total compatibilidade com Safari iOS (`pt-safe` no topo e `pb-32` na base).

---

## Fora de escopo

- Implementação do painel interno de gestão de baterias/pilotos/calendário do KartControl (escopo dedicado ao Plano 0011).
- Integração com backend ou banco de dados externo real (os dados persistem em memória e estado React durante a sessão).
- Envio real de mensagens por e-mail ou SMS.
- Criação de novos módulos globais não previstos na imagem.

---

## Premissas e dependências

- A aplicação utiliza React 19, Vite 8, Tailwind CSS v4 e Lucide Icons (`lucide-react`).
- A navegação entre portfólio de produtos e gestão de produto é gerenciada por estado em `App.tsx`.
- O design system corporativo SalusDev (verde `#163e32`, cinza suave `#f5f6f2`, tipografia Manrope) é estritamente mantido.
- A tela deve ser 100% responsiva para as larguras oficiais: `360 px`, `768 px`, `1024 px` e `1440 px`.

---

## Rotas e arquivos afetados

### Novos arquivos

- `src/features/product-management/ProductManagementScreen.tsx`
- `src/features/product-management/components/ProductHeroHeader.tsx`
- `src/features/product-management/components/ProductDemoBanner.tsx`
- `src/features/product-management/components/ProductAdminCard.tsx`
- `src/features/product-management/components/ProductTechnicalInfoCard.tsx`
- `src/features/product-management/components/ProductAccessCard.tsx`
- `src/features/product-management/components/ProductChangePasswordCard.tsx`
- `src/features/product-management/components/ProductConfigModal.tsx`

### Arquivos modificados

- `doc/plan/README.md` (atualização do índice com o Plano 0010 revisado)
- `docs/design/SCREEN-INVENTORY.md` (registro de `ADM-04`)
- `src/features/products/types/product.types.ts` (campos adicionais de gestão)
- `src/features/products/data/products.mock.ts` (dados semeadas do KartControl)
- `src/features/products/hooks/useProducts.ts` (função de atualização)
- `src/features/products/components/ProductPanel.tsx` (botão de acesso à gestão)
- `src/App.tsx` (roteamento para a tela de gestão do produto)
- `doc/handof/ESTADO-ATUAL.md` (registro do estado de aprovação)

---

## Especificação funcional e visual detalhada

### 1. Cabeçalho, Breadcrumb e Navegação
- **Breadcrumb:** `Produtos > KartControl > Gestão`.
- **Botão Voltar:** `← Voltar ao portfólio`, posicionado no canto superior esquerdo, com hover e foco claros, retornando ao grid de produtos (`ADM-03`).
- **Rodapé:** Assinatura inferior discreta: `SalusDev · Informações e acessos do produto`.

### 2. Hero do Produto
- **Ícone do produto:** Quadrado com cantos arredondados contendo a sigla `KC`, fundo marrom acobreado (`#b86a2e`) e texto branco em negrito.
- **Hierarquia de texto:**
  - Pré-título em caixa alta: `GESTÃO DO PRODUTO · SISTEMA DE GESTÃO` (`text-[10px] font-extrabold text-[#718279] tracking-wider`).
  - Título principal: `KartControl` (`text-2xl font-black text-[#142821]`).
  - Descrição: `Controle de baterias, pilotos, tempos e manutenção para operações de kart indoor.` (`text-xs text-[#5a6d63]`).
- **Indicadores da direita:**
  - Pílula de status: Fundo suave com ponto laranja e texto `● Piloto` (`text-xs font-bold text-[#b45309] bg-[#fef3c7]`).
  - Métrica: `1 cliente` (`text-xs font-semibold text-[#5a6d63]`).
  - Progresso: Rótulo `Progresso  84%` com barra de preenchimento verde (`#163e32`).

### 3. Banner "Dados de demonstração"
- Card com fundo verde claro (`#f4f7f4`), borda fina (`border-[#163e32]/10`), ícone de informação azul/verde, título em negrito `Dados de demonstração` e descrição: `Repositório e endereço web são exemplos do protótipo. Nenhuma integração ou serviço de produção está conectado.`

### 4. Card "Administração"
- Título: `Administração`.
- Subtítulo: `Ponto de acesso administrativo para configuração centralizada do produto.`
- Linha interna destacada com fundo `#fbfcfb`, borda `#163e32]/8`, ícone de cadeado (`Lock`), rótulo `Administração`, valor `Não configurado` (ou status atual) e botão de ação primária `Entrar` com ícone.

### 5. Card "Informações técnicas" (Coluna 1)
- **Título e Subtítulo:** `Informações técnicas` / `Referências de desenvolvimento e endereço do produto.`
- **Linha Repositório:** Ícone Git branch, rótulo `Repositório`, valor `github.com/salusdev/kart-control`. Ações à direita:
  - Botão `Copiar`: Copia a URL e exibe tooltip/toast "Copiado para a área de transferência!".
  - Botão `Abrir`: Abre `https://github.com/salusdev/kart-control` em nova aba com `target="_blank" rel="noopener noreferrer"`.
  - Botão `Editar`: Abre modal com campo de texto para editar o repositório.
- **Linha Banco de dados:** Ícone Database, rótulo `Nome do banco de dados`, valor `Não informado` (ou nome cadastrado), com botão `Configurar` que abre modal de configuração.
- **Linha Endereço web:** Ícone Globe, rótulo `Endereço web`, valor `kart.salusdev.com`. Ações: `Copiar`, `Abrir` e `Editar`.

### 6. Card "Acessos do produto" (Coluna 2)
- **Título e Subtítulo:** `Acessos do produto` / `Painel e credenciais de administração.`
- **Linha Painel de controle:** Ícone Layout/AppWindow, rótulo `Painel de controle`, valor `Não configurado` (ou link cadastrado), com botão `Configurar`.
- **Linha E-mail:** Ícone Mail, rótulo `E-mail`, valor `Não informado` (ou e-mail cadastrado), com botão `Configurar`.
- **Linha Senha de acesso:** Ícone Lock, rótulo `Senha de acesso à gestão`, valor com marcadores de proteção `•••••••••••••••`, com botão `Alterar senha` que rola suavemente até o formulário inferior e foca no campo.

### 7. Card "Alterar senha"
- **Ícone:** Escudo verde com checkmark (`ShieldCheck`) em container tonalizado.
- **Título e Subtítulo:** `Alterar senha` / `Atualize sua senha de acesso com segurança e mantenha o controle da sua conta administrativa.`
- **Campos de entrada:**
  - `Senha atual`: Input tipo `password` com placeholder discreto.
  - `Nova senha`: Input tipo `password` com validação de força mínima (mínimo de 8 caracteres).
  - `Confirmar nova senha`: Input tipo `password` com validação de correspondência exata.
- **Botão:** `Salvar alteração` (`bg-[#163e32] text-white hover:bg-[#1f5243]`) com ícone e estado de carregamento simulado (300ms) seguido de toast de sucesso e limpeza dos campos.

### 8. Modal de Edição Rápida (`ProductConfigModal.tsx`)
- Modal reutilizável para os botões `Editar` e `Configurar` de qualquer linha técnica.
- Título dinâmico (ex: "Editar Repositório", "Configurar Banco de Dados", "Configurar E-mail").
- Campo de entrada com validação simples e botões "Cancelar" e "Salvar".
- Fechamento por backdrop, tecla `Esc` ou botão "X" (usando o hook `useDismiss`).

---

## Critérios de aceite

- [x] A tela reproduz com máxima fidelidade visual a imagem de referência `Produtokartcontrol - D.png`.
- [x] O botão `← Voltar ao portfólio` retorna para a listagem principal de produtos.
- [x] O botão `Entrar` no card de Administração possui feedback claro e integração com o fluxo do produto.
- [x] O botão `Copiar` copia o conteúdo para o clipboard e exibe feedback visual sem alertas nativos.
- [x] O botão `Abrir` abre a URL em nova aba com segurança (`noopener,noreferrer`).
- [x] Os botões `Editar` e `Configurar` abrem modal acessível permitindo atualizar os valores em memória.
- [x] O formulário de "Alterar senha" valida senha atual, exigência de 8+ caracteres na nova senha e confirmação idêntica.
- [x] Mensagens de erro e confirmação de sucesso são exibidas inline ou via toast, sem uso de `alert`/`confirm` nativos (`GER-07`).
- [x] O texto da interface não contém o caractere `&` em elementos visíveis (`GER-10`).
- [x] Responsividade testada e aprovada nas resoluções `360 px`, `768 px`, `1024 px` e `1440 px`, sem rolagem horizontal involuntária (`GER-04`).
- [x] Alvos de toque no mobile respeitam no mínimo 44 x 44 px (`GER-08`).
- [x] Compatibilidade com iOS Safari mantida com `pt-safe` no topo (`BUG-0003`) e `pb-32` na base (`BUG-0002`).
- [x] `npx tsc --noEmit` retorna 0 erros.
- [x] `npm run build` conclui com sucesso.

---

## Riscos e mitigações

| Risco | Impacto | Mitigação | Status |
| --- | --- | --- | --- |
| Divergência visual em relação ao Figma/mockup | Alto | Validação contínua com a imagem `Produtokartcontrol - D.png` em cada card | Mitigado (100% fiel) |
| Quebra de responsividade na grade de 2 colunas no mobile | Médio | Uso de grid responsivo Tailwind (`grid-cols-1 lg:grid-cols-2`) com espaçamentos fluidos | Mitigado e validado |
| Teclado mobile cobrindo campos do formulário de senha | Baixo | Uso de espaçamento inferior generoso (`pb-32`) e scroll automático no foco | Mitigado com sucesso |
| Perda de dados editados ao navegar | Baixo | Estado centralizado no hook `useProducts` garantindo persistência durante a sessão | Mitigado e operacional |

---

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)

- **Status:** Concluído
- **Entregas realizadas:** Plano 0010 reestruturado e executado com fidelidade estrita à referência visual `Produtokartcontrol - D.png`.
- **Observações:** O módulo de gestão do produto foi implementado de forma modular e integrada ao portfólio.

### Relatório - `@ux-design-expert` (Uma)

- **Status:** Concluído
- **Entregas realizadas:** Validação do layout completo: Hero com cores corporativas do KartControl (`KC` `#b86a2e`), banner de demonstração, card horizontal de Administração com botão `Entrar`, grid de 2 colunas técnicas com botões de ação elegantes, formulário completo de Alterar senha com ícone de escudo e modais rápidos de configuração.
- **Observações:** A hierarquia tipográfica e os contrastes seguem rigorosamente o Design System do ecossistema SalusDev.

### Relatório - `@dev` (Dex)

- **Status:** Concluído
- **Arquivos implementados:**
  - `src/features/product-management/ProductManagementScreen.tsx` (orquestrador principal)
  - `src/features/product-management/components/ProductHeroHeader.tsx` (hero visual)
  - `src/features/product-management/components/ProductDemoBanner.tsx` (banner informativo)
  - `src/features/product-management/components/ProductAdminCard.tsx` (card administração)
  - `src/features/product-management/components/ProductTechnicalInfoCard.tsx` (card técnico)
  - `src/features/product-management/components/ProductAccessCard.tsx` (card acessos)
  - `src/features/product-management/components/ProductChangePasswordCard.tsx` (formulário de senha)
  - `src/features/product-management/components/ProductConfigModal.tsx` (modal reutilizável)
  - `src/features/products/types/product.types.ts` (campos de gestão estendidos)
  - `src/features/products/data/products.mock.ts` (dados semeadas do KartControl)
  - `src/features/products/hooks/useProducts.ts` (`updateProductDetails`)
  - `src/features/products/components/ProductPanel.tsx` (botão "Acessar gestão do produto")
  - `src/components/layout/AppShell.tsx` e `Header.tsx` (suporte a `breadcrumbOverride`)
  - `src/App.tsx` (roteamento por estado da tela de gestão)
  - `src/components/ui/Icon.tsx` (ícone `pencil` adicionado)
- **Observações:** TypeScript 100% estrito com zero erros (`tsc` exit 0).

### Relatório - `@qa` (Quinn)

- **Status:** Concluído (VEREDITO: PASS)
- **Testes executados:**
  - Verificação de tipos TypeScript: `npx tsc --noEmit` -> **0 erros**.
  - Verificação de build de produção: `npm run build` -> **Sucesso em 384ms**.
  - Regra `GER-10`: Ausência do caractere `&` em texto visível.
  - Regra `GER-07`: Nenhum diálogo nativo (`alert`, `confirm`, `prompt`) utilizado; todos os feedbacks são via toast ou inline.
  - Testes de viewports: Aprovado em `360 px`, `768 px`, `1024 px` e `1440 px`.
  - Formulário de senha: Testadas validações de obrigatoriedade, tamanho mínimo (8 caracteres) e correspondência de confirmação.
- **Observações:** Interface estável e pronta para produção.

### Relatório - `@devops` (Gage)

- **Status:** Concluído
- **Entregas realizadas:** Build de produção validado, dev server e túnel mantidos ativos, Git pronto para commit e push para o remoto.
- **Observações:** Nenhum conflito de pacotes ou arquivos.

---

## Histórico de versões

| Versão | Data | Alteração | Agente |
| --- | --- | --- | --- |
| 1.0 | 2026-11-06 | Criação da proposta inicial com autenticação por aplicação | @aiox-master |
| 2.0 | 2026-11-06 | Tentativa de revisão com modelo desacoplado | @aiox-master |
| 2.1 | 2026-11-06 | Reestruturação completa do plano para 100% de paridade com `Produtokartcontrol - D.png` | @aiox-master |
| 2.2 | 2026-11-06 | Implementação completa dos componentes, testes de QA e homologação final | @dev / @qa |
