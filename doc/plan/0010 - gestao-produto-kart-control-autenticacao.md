# Plano 0010 - Gestão do Produto com Acesso Autenticado (Kart Control)

- **Código:** 0010
- **Versão:** 1.0
- **Status:** Rascunho (aguardando revisão de Rafael Amaral Salustiano)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsável:** @aiox-master

> **Regra de execução:** este plano foi criado somente para revisão. Nenhum código deve ser implementado até a aprovação explícita de Rafael.

## Releitura obrigatória das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar este plano.
- **Registro da releitura:** 2026-11-06 15:08 - @aiox-master

## Objetivo

Planejar a tela de gestão do produto, usando o Kart Control como referência visual, com uma porta de entrada própria por e-mail, senha, recuperação de senha e autenticação em dois fatores (2FA). Nenhum dado sigiloso do produto deve ser exibido antes da autenticação.

## Contexto e decisões aprovadas

1. **Tela reutilizável para todo o portfólio.** O módulo de gestão será orientado pelos dados do produto; o Kart Control entra com dados completos e os demais produtos com estado "Não configurado".
2. **Credenciais por aplicação.** Cada aplicação terá seu próprio e-mail, senha e 2FA. A motivação é de segurança: se houver um acesso não autorizado ao sistema SalusDev, será necessário gerar uma nova senha para acessar cada aplicação.
3. **Sempre pedir login.** O acesso à gestão do produto exige e-mail, senha e 2FA a cada entrada, mesmo com a sessão administrativa ativa. Nada será persistido em `sessionStorage` ou `localStorage`.
4. **Entrada pelo painel de detalhes.** O `ProductPanel` ganha o CTA "Acessar gestão". Dados sigilosos (repositório, banco, endereço web, e-mail e senha) saem do painel pré-login e passam a existir apenas dentro da gestão autenticada.
5. **Ações funcionais simuladas.** Copiar, Abrir, Editar, Configurar e Alterar senha terão comportamento real em memória, com feedback por toast.
6. **Entrega atual.** Criar somente este plano e registrá-lo no índice, sem alterar código.

## Referências

- Regras do Sistema: `doc/produto/RegrasSystema.md` (`AUTH-02`, `AUTH-03`, `AUTH-07`, `AUTH-09`, `AUTH-10`, `GER-03`, `GER-04`, `GER-07`, `GER-08`, `GER-10`, `BTN-*`, `A11Y-*`, `PWA-*`)
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md` (R1, R9, R11, R16, R18, R20)
- PRD: `doc/produto/PRD-SalusDev-v0.3.md` (v0.4)
- Inventário de Telas: `docs/design/SCREEN-INVENTORY.md` (ADM-03 e nova ADM-04)
- Design System: `docs/design/DESIGN-SYSTEM.md`
- Dicionário de Dados: `docs/dados/DATA-DICTIONARY.md`
- Referência visual: `docs/design/img/Produtokartcontrol - D.png`
- Código atual:
  - `src/App.tsx`
  - `src/components/layout/AppShell.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/ui/Icon.tsx`
  - `src/features/products/ProductsModule.tsx`
  - `src/features/products/components/ProductPanel.tsx`
  - `src/features/products/components/ProductGrid.tsx`
  - `src/features/products/hooks/useProducts.ts`
  - `src/features/products/data/products.mock.ts`
  - `src/features/products/types/product.types.ts`
  - `src/features/auth/hooks/useAuth.ts`
  - `src/features/auth/components/LoginForm.tsx`
  - `src/features/auth/components/MfaChallenge.tsx`
  - `src/features/auth/components/PasswordRecoveryModal.tsx`

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
| --- | --- | --- | --- |
| `@aiox-master` | Orion | Orquestração | Registro do plano, coordenação, consolidação e fechamento |
| `@ux-design-expert` | Uma | Designer UI/UX | Especificação visual da tela de gestão e do gate de acesso em `[D]` e `[M]` |
| `@architect` | Aria | Arquiteto | Revisão do modelo de dados, navegação e isolamento do gate |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementação dos tipos, mocks, hooks e componentes |
| `@qa` | Quinn | Arquiteto de Testes | Validação de viewports, autenticação, acessibilidade, typecheck e build |
| `@devops` | Gage | Especialista DevOps | Conferência de build e sincronização Git ao final |

## Sequência de execução e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governança):**
   - O que é esperado: registrar este plano em `doc/plan/` e no índice `doc/plan/README.md`.
   - Critério de passagem: plano legível, indexado e disponível para revisão de Rafael.
2. **`@ux-design-expert` (Etapa 2 - Especificação visual):**
   - O que é esperado: consolidar a tela de gestão e o gate de acesso em `[D]` e `[M]`, incluindo estados vazios, mascaramento de senha e mensagens de erro.
   - Critério de passagem: especificação aprovada e alinhada aos tokens do design system.
3. **`@architect` (Etapa 3 - Revisão técnica):**
   - O que é esperado: revisar o modelo de dados, a navegação por estado e o isolamento do gate em relação à sessão administrativa.
   - Critério de passagem: nenhuma dependência circular e nenhuma exposição de dados antes do login.
4. **`@dev` (Etapa 4 - Implementação):**
   - O que é esperado: implementar os itens de escopo com TypeScript estrito, componentes pequenos e responsabilidade única.
   - Critério de passagem: `npx tsc --noEmit` com 0 erros.
5. **`@qa` (Etapa 5 - Validação):**
   - O que é esperado: validar 360 px, 768 px, 1024 px e 1440 px; validar login, recuperação, 2FA, bloqueio progressivo, mascaramento, ações dos cards e ausência de rolagem horizontal.
   - Critério de passagem: parecer PASS e `npm run build` com sucesso.
6. **`@devops` (Etapa 6 - Fechamento técnico):**
   - O que é esperado: conferir build e manter a árvore de trabalho organizada; push somente se Rafael solicitar.
   - Critério de passagem: repositório íntegro.
7. **`@aiox-master` (Etapa 7 - Fechamento):**
   - O que é esperado: consolidar relatórios, atualizar `ESTADO-ATUAL.md`, o handoff do dia e a documentação afetada.

## Escopo

- [ ] Criar o Plano 0010 e registrá-lo em `doc/plan/README.md`.
- [ ] Atualizar o PRD com a regra de credenciais e 2FA por aplicação.
- [ ] Adicionar a tela ADM-04 em `docs/design/SCREEN-INVENTORY.md`.
- [ ] Estender o tipo `Product` com os campos de gestão e acesso.
- [ ] Semear o Kart Control em `products.mock.ts` com credenciais e dados técnicos.
- [ ] Adicionar `updateProductManagement` ao hook `useProducts`.
- [ ] Remover dados sigilosos do `ProductPanel` pré-login e inserir o CTA "Acessar gestão".
- [ ] Criar o gate de acesso do produto com e-mail, senha, recuperação e 2FA.
- [ ] Garantir que o login seja exigido a cada entrada, sem persistência.
- [ ] Criar a tela de gestão com os cards Administração, Informações técnicas, Acessos do produto e Alterar senha.
- [ ] Implementar Copiar, Abrir, Editar, Configurar e Alterar senha de forma simulada e funcional.
- [ ] Integrar a navegação em `App.tsx` e o breadcrumb em `AppShell`/`Header`.
- [ ] Adicionar os ícones `database`, `globe` e `pencil` ao `Icon.tsx`.
- [ ] Atualizar o dicionário de dados com os novos campos.
- [ ] Validar responsividade, acessibilidade e textos em PT-BR.

## Fora de escopo

- Implementar backend, Supabase, TOTP real, envio real de e-mail ou persistência de credenciais.
- Alterar o login administrativo existente ou o `useAuth`.
- Preencher a gestão completa dos demais produtos do portfólio.
- Executar o redesign do dashboard mobile do Plano 0009.
- Implementar notificações, perfil ou outros módulos.
- Instalar novas dependências.

## Premissas e dependências

- A base atual usa React 19, Vite 8, Tailwind CSS v4 e `lucide-react`.
- A navegação é controlada por estado em `App.tsx`, sem router.
- O gate do produto será exibido em tela cheia, sem a sidebar administrativa; após a autenticação, a gestão será exibida dentro do `AppShell`, como na referência visual.
- As credenciais do produto existirão apenas no mock do protótipo. Em produção, a validação deve ocorrer no servidor.
- O `ProductPanel` continuará abrindo os detalhes do produto, agora sem dados sensíveis.

## Tarefas

- [ ] `@aiox-master`: Registrar o Plano 0010 e a entrada em `doc/plan/README.md`.
- [ ] `@ux-design-expert`: Especificar `[D]` e `[M]` da gestão e do gate; adicionar ADM-04 ao inventário.
- [ ] `@architect`: Revisar o modelo de dados, a máquina de estados do gate e a navegação.
- [ ] `@dev`: Estender `Product` com `adminEmail`, `adminPassword`, `databaseName`, `adminPanelConfigured` e `adminAccessConfigured`.
- [ ] `@dev`: Semear o Kart Control com `gestao@kartcontrol.com`, senha de demonstração, banco e URLs.
- [ ] `@dev`: Adicionar `updateProductManagement` ao `useProducts`.
- [ ] `@dev`: Ajustar `ProductPanel` para ocultar dados sensíveis e expor "Acessar gestão".
- [ ] `@dev`: Criar `src/features/product-management/types/productManagement.types.ts`.
- [ ] `@dev`: Criar `src/features/product-management/hooks/useProductAccess.ts`.
- [ ] `@dev`: Criar `src/features/product-management/hooks/useProductManagement.ts`.
- [ ] `@dev`: Criar `src/features/product-management/components/ProductAccessGate.tsx`.
- [ ] `@dev`: Criar `ProductLoginForm.tsx`, `ProductMfaChallenge.tsx` e `ProductPasswordRecoveryModal.tsx`.
- [ ] `@dev`: Criar `ProductManagementScreen.tsx` e os cards `ProductAdminCard.tsx`, `ProductTechnicalCard.tsx`, `ProductAccessCard.tsx`, `ChangePasswordCard.tsx` e `InfoRow.tsx`.
- [ ] `@dev`: Criar `ProductManagementModule.tsx` e integrar em `App.tsx`.
- [ ] `@dev`: Estender `AppShell` e `Header` com breadcrumb opcional.
- [ ] `@dev`: Adicionar `database`, `globe` e `pencil` ao `Icon.tsx`.
- [ ] `@qa`: Validar login, recuperação, 2FA, bloqueio, mascaramento, ações, viewports, acessibilidade, typecheck e build.
- [ ] `@devops`: Conferir build e estado do Git.
- [ ] `@aiox-master`: Consolidar relatórios e atualizar documentação e handoff.

## Rotas e arquivos afetados

### Novos

- `doc/plan/0010 - gestao-produto-kart-control-autenticacao.md`
- `src/features/product-management/types/productManagement.types.ts`
- `src/features/product-management/hooks/useProductAccess.ts`
- `src/features/product-management/hooks/useProductManagement.ts`
- `src/features/product-management/components/ProductManagementModule.tsx`
- `src/features/product-management/components/ProductAccessGate.tsx`
- `src/features/product-management/components/ProductLoginForm.tsx`
- `src/features/product-management/components/ProductMfaChallenge.tsx`
- `src/features/product-management/components/ProductPasswordRecoveryModal.tsx`
- `src/features/product-management/components/ProductManagementScreen.tsx`
- `src/features/product-management/components/ProductAdminCard.tsx`
- `src/features/product-management/components/ProductTechnicalCard.tsx`
- `src/features/product-management/components/ProductAccessCard.tsx`
- `src/features/product-management/components/ChangePasswordCard.tsx`
- `src/features/product-management/components/InfoRow.tsx`

### Alterados

- `doc/plan/README.md`
- `doc/produto/PRD-SalusDev-v0.3.md`
- `docs/design/SCREEN-INVENTORY.md`
- `docs/dados/DATA-DICTIONARY.md`
- `src/features/products/types/product.types.ts`
- `src/features/products/data/products.mock.ts`
- `src/features/products/hooks/useProducts.ts`
- `src/features/products/components/ProductPanel.tsx`
- `src/App.tsx`
- `src/components/layout/AppShell.tsx`
- `src/components/layout/Header.tsx`
- `src/components/ui/Icon.tsx`
- `doc/handof/ESTADO-ATUAL.md`

## Especificação funcional e visual

### 1. Fluxo do usuário

1. Em `Produtos`, o usuário abre o card do Kart Control e vê o painel de detalhes sem dados sensíveis.
2. O CTA "Acessar gestão" abre o gate em tela cheia, sem sidebar administrativa.
3. Etapa 1: e-mail e senha do produto, com "Esqueci minha senha" e botão de preenchimento de demonstração.
4. Etapa 2: código TOTP de 6 dígitos.
5. Sucesso: a tela de gestão é exibida dentro do `AppShell`, com o breadcrumb `Produtos > <Produto> > Gestão`.
6. "Voltar ao portfólio" encerra o acesso. Ao entrar novamente, o login é exigido outra vez.

### 2. Gate de acesso do produto (`ProductAccessGate`)

- Cabeçalho com selo colorido do produto, nome e aviso de área restrita.
- **Etapa 1 - Credenciais:**
  - Campo de e-mail com `inputMode="email"` e `autoComplete="username"`.
  - Campo de senha com mostrar e ocultar e `autoComplete="current-password"`.
  - Link "Esqueci minha senha" que abre a recuperação simulada.
  - Botão "Entrar" com estado de carregamento.
  - Botão "Preencher dados de demonstração".
- **Recuperação de senha:**
  - Modal com e-mail cadastrado, envio simulado e mensagem genérica de confirmação.
  - Não revela se o e-mail existe.
- **Etapa 2 - 2FA:**
  - Grade de 6 dígitos com avanço automático, colar e `autoComplete="one-time-code"`.
  - Código válido de demonstração: `123456`. Falha simulada: `000000`.
  - Botões "Confirmar e entrar" e "Voltar para login".
- **Bloqueio progressivo:**
  - Após 5 tentativas incorretas, bloqueio de 30 segundos com contagem regressiva.
  - Mensagem genérica que não confirma a existência do e-mail.
- **Sessão:**
  - Sem `sessionStorage` e sem `localStorage`.
  - O estado de acesso vive apenas em memória e é descartado ao voltar ao portfólio.
- **Credenciais semeadas do Kart Control:**
  - E-mail: `gestao@kartcontrol.com`
  - Senha: `kartcontrol@2026`
  - Código 2FA: `123456`

### 3. Tela de gestão - Desktop `[D]` (1024 px e 1440 px)

- Breadcrumb `Produtos > <Produto> > Gestão`.
- Link "Voltar ao portfólio".
- Cabeçalho do produto com selo colorido, nome, descrição, status, quantidade de clientes e progresso.
- Aviso "Dados de demonstração" informando que a tela não está conectada a serviços reais.
- Grade de 2 colunas:
  - **Administração:** ícone, título, descrição, situação e botão "Entrar". Sem configuração, o botão exibe toast informativo; com configuração, abre o endereço do produto em nova aba.
  - **Informações técnicas:** linhas de Repositório, Nome do banco de dados e Endereço web, cada uma com valor, situação e ações Copiar, Abrir e Editar ou Configurar.
  - **Acessos do produto:** linhas de Painel de controle, E-mail e Senha de acesso à gestão. A senha é sempre mascarada. Ações Configurar e Alterar senha.
  - **Alterar senha:** campos Senha atual, Nova senha e Confirmar nova senha, com botão "Salvar alteração".
- Rodapé: `SalusDev · Informações e acessos do produto`.
- Observação: para permitir o login no protótipo, o Kart Control terá credenciais semeadas; portanto, a linha de e-mail exibirá o valor cadastrado e a senha aparecerá mascarada, em vez do estado vazio da imagem de referência.

### 4. Tela de gestão - Mobile `[M]` (360 px e 768 px)

- Cabeçalho compacto com selo, nome, status e progresso.
- Cards empilhados em coluna única, com largura total.
- Campos e botões com alvo de toque de no mínimo 44 px.
- Sem rolagem horizontal em 360 px.
- Ações secundárias agrupadas para não espremer os rótulos.

### 5. Segurança e privacidade

- Nenhuma senha em texto puro na interface, em toast ou em log.
- Dados sensíveis só são renderizados após a autenticação do produto.
- O `ProductPanel` pré-login mostra apenas resumo, status, progresso e o CTA de acesso.
- O gate nunca reaproveita a sessão administrativa.
- O protótipo não implementa validação no servidor; essa limitação deve ficar explícita no PRD e na tela.

### 6. Modelo de dados

Estender `Product` com campos opcionais:

```ts
export interface Product {
  // campos atuais preservados
  adminEmail?: string
  adminPassword?: string
  databaseName?: string
  adminPanelConfigured?: boolean
  adminAccessConfigured?: boolean
}
```

Regras:

- `useProducts` recebe `updateProductManagement(id, patch)` e mantém a fonte única de verdade.
- "Alterar senha" valida a senha atual, exige nova senha com 8 ou mais caracteres, confirma a digitação, atualiza o estado em memória e exibe toast.
- "Copiar" usa `navigator.clipboard` e exibe toast.
- "Abrir" normaliza o endereço com `https://` e abre em nova aba com `noopener,noreferrer`.
- "Editar" e "Configurar" abrem modal com campo único, salvam em memória e exibem toast.

## Critérios de aceite

- [ ] O CTA "Acessar gestão" abre o login do produto sempre, sem reaproveitar sessão.
- [ ] O login aceita as credenciais semeadas e rejeita senhas inválidas com mensagem genérica.
- [ ] A recuperação de senha envia instruções simuladas sem revelar se o e-mail existe.
- [ ] O 2FA aceita `123456`, rejeita `000000` e exige 6 dígitos.
- [ ] Após 5 falhas, o acesso é bloqueado por 30 segundos com contagem regressiva.
- [ ] A tela de gestão reproduz a referência: breadcrumb, cabeçalho, quatro cards e rodapé.
- [ ] Nenhum dado sigiloso aparece antes da autenticação.
- [ ] Nenhuma senha é exibida em texto puro.
- [ ] Copiar, Abrir, Editar, Configurar e Alterar senha funcionam com feedback por toast.
- [ ] "Voltar ao portfólio" retorna a Produtos e o próximo acesso pede login novamente.
- [ ] `[D]` validado em 1024 px e 1440 px.
- [ ] `[M]` validado em 360 px e 768 px, sem rolagem horizontal e com alvos de toque de 44 px ou mais.
- [ ] `npx tsc --noEmit` com 0 erros.
- [ ] `npm run build` concluído com sucesso.
- [ ] Sem `alert`, `confirm` ou `prompt` nativos, sem `&` em texto visível e com textos em PT-BR.
- [ ] PRD atualizado com a regra de credenciais e 2FA por aplicação.

## Riscos e bloqueios

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Navegação por estado ficar complexa | Médio | Isolar a gestão em um módulo e manter apenas dois estados em `App.tsx` |
| Exposição de dados antes do login | Alto | Renderizar a tela de gestão somente após a autenticação; remover dados sensíveis do `ProductPanel` |
| Credenciais no front-end parecerem seguras | Alto | Documentar no PRD e na tela que é protótipo; validação real deve ocorrer no servidor |
| Extensão do tipo `Product` quebrar o `ProductModal` | Médio | Campos opcionais e revisão dos pontos de uso |
| Divergência entre a referência visual e o estado real | Médio | Validar com Rafael antes de fechar o plano |
| Remoção de links do painel pré-login impactar a navegação | Baixo | Manter no painel o resumo e o CTA; mover os detalhes para a gestão |

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)

- **Status:** Pendente
- **Entregas realizadas:** Plano 0010 criado e indexado.
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
| 1.0 | 2026-11-06 | Criação do plano de gestão do produto com acesso autenticado por aplicação | @aiox-master |
