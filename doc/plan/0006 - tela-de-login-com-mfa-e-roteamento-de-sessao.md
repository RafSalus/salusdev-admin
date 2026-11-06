# Plano 0006 - Tela de Login com MFA e Roteamento de Sessao

- **Codigo:** 0006
- **Versao:** 1.0
- **Status:** Concluído (Homologado por Rafael Amaral Salustiano em 2026-11-06)
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsavel:** @aiox-master

## Releitura obrigatoria das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar a execução deste plano.
- **Registro da releitura:** 2026-11-06 13:24 - @aiox-master

## Objetivo

Implementar a **Tela de Login do Centro de Comando** com suporte obrigatório a **dois fatores de autenticação (MFA / 2FA via TOTP)** conforme a regra `AUTH-02`, estabelecendo o controle de sessão no frontend e a arquitetura de roteamento entre a tela pública de login e a área administrativa restrita (`AppShell`), com distinção estrita entre Desktop `[D]` e Mobile `[M]`.

## Referencias

- Regras do Sistema: `doc/produto/RegrasSystema.md` (`AUTH-01` a `AUTH-15`, `GER-03`, `GER-07`, `GER-10`)
- Inventário de Telas: `docs/design/SCREEN-INVENTORY.md` (Seção 2.1 - ADM-01)
- Design System: `docs/design/DESIGN-SYSTEM.md` (Tokens, foco visível, alvos >= 44px)
- Arquitetura: `docs/arquitetura/ARCHITECTURE.md` (ADR-004 - Autenticação multifator Supabase)

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
|---|---|---|---|
| `@aiox-master` | Orion | Orquestrador | Registro do plano, coordenação e controle de esteira |
| `@ux-design-expert` | Uma | Designer UI/UX | Especificação visual do card de login e inputs OTP [D] e [M] |
| `@dev` | Dex | Desenvolvedor Full Stack | Implementação modular em `src/features/auth/`, hook e controle de rotas |
| `@qa` | Quinn | Arquiteto de Testes | Validação de fluxo (credenciais + OTP), viewports e quality gates |
| `@devops` | Gage | Especialista DevOps | Validação de build, integridade e commit/push ao término |

## Sequencia de execucao e responsabilidades

1. **`@aiox-master` (Etapa 1 - Abertura e Alinhamento):**
   - Registrar o Plano 0006 e atualizar os índices de governança.
2. **`@ux-design-expert` (Etapa 2 - Design da Tela [D] e [M]):**
   - Projetar o layout do card de autenticação, feedback de segurança, estado de carregamento e campos OTP de 6 dígitos.
3. **`@dev` (Etapa 3 - Implementação):**
   - Criar `src/features/auth/` com `types/auth.types.ts`, `hooks/useAuth.ts`, `components/AuthCard.tsx`, `components/LoginForm.tsx`, `components/MfaChallenge.tsx`, `components/PasswordRecoveryModal.tsx` e `LoginScreen.tsx`.
   - Atualizar `src/components/ui/Icon.tsx` com ícones de segurança (`lock`, `mail`, `key`, `shield`, `logout`, `refresh`, `eye`, `eye-off`).
   - Integrar logout no `Header.tsx` e navegação no `AppShell.tsx`.
   - Configurar o roteamento no `App.tsx` para alternar entre `LoginScreen` e `AppShell`.
4. **`@qa` (Etapa 4 - Testes e Validação):**
   - Executar testes nos 4 viewports (360px, 768px, 1024px, 1440px), validar regras anti-força bruta (`AUTH-09`) e ausência de mensagens que revelem existência de e-mail (`AUTH-10`).
5. **`@devops` (Etapa 5 - Build e Publicação):**
   - Garantir `npm run build` < 500ms e `tsc --noEmit` com 0 erros.
6. **`@aiox-master` (Etapa 6 - Fechamento):**
   - Consolidar relatórios finais e atualizar `ESTADO-ATUAL.md`.

## Escopo

- [x] Criação de novos ícones de autenticação em `src/components/ui/Icon.tsx`.
- [x] Implementação do módulo `src/features/auth/` com tipos, hook e componentes.
- [x] Implementação da Etapa 1 do Login: Credenciais (e-mail e senha) com validação visual.
- [x] Implementação da Etapa 2 do Login: Desafio MFA (código de 6 dígitos numéricos com avanço automático).
- [x] Modal de recuperação de senha segura (sem perguntas secretas per `AUTH-08`).
- [x] Roteamento de sessão autenticada em `src/App.tsx`.
- [x] Botão de logout no `Header.tsx` para encerramento de sessão.
- [x] Suporte responsivo a Desktop `[D]` (card centralizado) e Mobile `[M]` (teclado numérico, largura total).

## Fora de escopo

- Conexão com banco de dados real em produção (o protótipo opera com estado simulado do Supabase Auth).
- Multi-tenancy no login (o Centro de Comando atende exclusivamente ao operador administrativo).

## Tarefas

- [x] `@aiox-master`: Abertura e registro do plano.
- [x] `@dev`: Adicionar ícones de autenticação em `Icon.tsx`.
- [x] `@dev`: Implementar hook `useAuth.ts` e tipos em `auth.types.ts`.
- [x] `@dev`: Implementar componentes `AuthCard`, `LoginForm`, `MfaChallenge` e `PasswordRecoveryModal`.
- [x] `@dev`: Implementar `LoginScreen.tsx` e integrar no `App.tsx`.
- [x] `@dev`: Adicionar botão de logout e dados do usuário no `Header.tsx`.
- [x] `@qa`: Validar viewports `[D]` e `[M]`, fluxo com código correto e incorreto, typecheck e build.
- [x] `@aiox-master`: Fechar plano e atualizar relatórios.

## Rotas e arquivos afetados

- `src/components/ui/Icon.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/AppShell.tsx`
- `src/features/auth/types/auth.types.ts`
- `src/features/auth/hooks/useAuth.ts`
- `src/features/auth/components/AuthCard.tsx`
- `src/features/auth/components/LoginForm.tsx`
- `src/features/auth/components/MfaChallenge.tsx`
- `src/features/auth/components/PasswordRecoveryModal.tsx`
- `src/features/auth/LoginScreen.tsx`
- `src/App.tsx`
- `doc/plan/0006 - tela-de-login-com-mfa-e-roteamento-de-sessao.md`
- `doc/plan/README.md`
- `doc/handof/ESTADO-ATUAL.md`

## Criterios de aceite

- [x] Tela de Login renderizada com padrão visual e tokens do SalusDev Design System.
- [x] Obrigatório segundo fator (código TOTP de 6 dígitos) após credenciais válidas (`AUTH-02`).
- [x] Campo de código com avanço automático entre os 6 inputs e suporte a colar (`paste`).
- [x] Ativação de `inputMode="numeric"` no mobile `[M]` para teclado numérico confortável.
- [x] Alvos de toque >= 44px no mobile `[M]`.
- [x] Mensagens de erro seguras e genéricas (`AUTH-10`).
- [x] Botão de logout no `Header` restaura a tela de login.
- [x] Zero erros de compilação no TypeScript (`tsc --noEmit`) e build de produção aprovado.

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)
- **Status:** [Concluído]
- **Entregas realizadas:** Plano 0006 executado com sucesso pleno, abrindo a sequência lógica de telas do sistema a partir do portal de acesso com duplo fator de autenticação.
- **Observações:** Esteira pronta para as próximas telas da matriz (Dashboard e Clientes).

### Relatório - `@ux-design-expert` (Uma)
- **Status:** [Concluído e Aprovado por Rafael]
- **Entregas realizadas:** Especificação visual e refinamento 100% fiel às imagens de referência:
  - **Desktop `[D]`:** `docs/design/img/login - D .png` (Split-screen 45/55 com painel institucional verde floresta `#163e32` e card flutuante à direita);
  - **Mobile `[M]`:** `docs/design/img/Login - M.png` (Superfície branca limpa, logo `< /> SalusDev` no topo, formulário fluido sem bordas externas, chamada "Ainda não tem uma conta? Criar conta", "Precisa de ajuda?" e rodapé legal);
  - Alvos de toque `>= 44 px` e ativação de teclado numérico no OTP;
  - Aprovado formalmente pelo usuário em 2026-11-06.
- **Observações:** Experiência consistente e validada para Desktop `[D]` e Mobile `[M]`.

### Relatório - `@dev` (Dex)
- **Status:** [Concluído]
- **Entregas realizadas:**
  - Implementação modular de `src/features/auth/` com `LoginScreen`, `LoginForm`, `MfaChallenge`, `HelpModal`, `PasswordRecoveryModal`, `useAuth` e `auth.types.ts`;
  - Criação do favicon SVG oficial em `public/favicon.svg` com o emblema da marca SalusDev `< />`;
  - Atualização do título da aba do navegador para `SalusDev | Centro de Comando` e metadados no `index.html`;
  - Desafio OTP de 6 dígitos com avanço automático, foco ágil e suporte a colar (`paste`);
  - Roteamento de sessão no `App.tsx` e botão de logout seguro no `Header.tsx`.
- **Observações:** 40 módulos compilando em 227ms sem dependências legadas.

### Relatório - `@qa` (Quinn)
- **Status:** [Concluído - Parecer: PASS]
- **Testes executados:**
  - **Gate 1 (Tipagem Estrita):** `npx tsc --noEmit` executado com **0 erros** de TypeScript;
  - **Gate 2 (Build de Produção):** `npm run build` concluído com sucesso em **227ms** (40 módulos);
  - **Gate 3 (Matriz de Viewports `GER-03` e `R11`):**
    - `360 px` [M]: Fundo branco, sem scroll horizontal (`GER-04`), alvos de toque >= 44px, teclado numérico ativado no OTP (`inputMode="numeric"`);
    - `768 px`: Transição equilibrada com formulário centralizado;
    - `1024 px` [D]: Ativação do split-screen com painel verde e card flutuante;
    - `1440 px` [D]: Proporção áurea 45/55 simétrica, com foco visível e navegação por teclado (`GER-08`);
  - **Gate 4 (Segurança e Regras do Sistema):**
    - `AUTH-02`: Obrigatoriedade do segundo fator TOTP antes de liberar a sessão (AAL1 -> AAL2);
    - `AUTH-09`: Bloqueio temporário progressivo testado após 5 tentativas consecutivas;
    - `AUTH-10`: Mensagens genéricas de erro ("Credenciais inválidas") sem revelar existência de conta;
    - `GER-07`: Ausência total de `window.alert` ou `confirm` nativos;
    - `GER-10`: Português do Brasil com acentuação correta e ausência do caractere `&` em texto visível.
  - **Gate 5 (Registro de Bugs):** Nenhum bug aberto em `docs/bugs/INDEX.md`.
- **Parecer final:** **PASS** (100% conforme).

### Relatório - `@devops` (Gage)
- **Status:** [Concluído]
- **Entregas realizadas:**
  - Pipeline de compilação validado (< 300ms);
  - Repositório remoto configurado para a URL canônica `https://github.com/RafSalus/salusdev-admin.git`;
  - Todos os artefatos, imagens de referência e documentação sincronizados na branch `main`;
  - Árvore de trabalho limpa (`working tree clean`).
- **Observações:** Esteira de deploy íntegra e pronta para a próxima fase.

## Riscos e bloqueios

- Nenhum.
