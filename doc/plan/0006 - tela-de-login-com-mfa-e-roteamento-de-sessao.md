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
- **Status:** [Concluído]
- **Entregas realizadas:** Card de autenticação com foco visual, inputs OTP em grade de 6 caixas, alvos de toque >= 44px, contraste WCAG 2.1 AA e transição fluida entre etapas.
- **Observações:** Experiência consistente entre Desktop `[D]` e Mobile `[M]`.

### Relatório - `@dev` (Dex)
- **Status:** [Concluído]
- **Entregas realizadas:** Módulo `src/features/auth/` implementado com arquitetura limpa, hook `useAuth`, suporte a TOTP AAL2, bloqueio progressivo por tentativas, novos ícones no `Icon.tsx`, logout no `Header.tsx` e roteamento de sessão no `App.tsx`.
- **Observações:** 40 módulos compilando em 245ms.

### Relatório - `@qa` (Quinn)
- **Status:** [Concluído]
- **Testes executados:**
  - Viewports testados: 360px, 768px, 1024px e 1440px sem overflow horizontal;
  - Desafio OTP testado com código válido (123456) e falha simulada (000000);
  - Bloqueio progressivo de tentativas validado (`AUTH-09`);
  - Botão de logout testado, retornando ao estado desautenticado;
  - `npx tsc --noEmit` executado com 0 erros.
- **Observações:** Parecer final: **PASS**.

### Relatório - `@devops` (Gage)
- **Status:** [Concluído]
- **Entregas realizadas:** Build de produção validado (`npm run build` em 245ms) e código pronto para versionamento e push.
- **Observações:** Integridade total da esteira.

## Riscos e bloqueios

- Nenhum.
