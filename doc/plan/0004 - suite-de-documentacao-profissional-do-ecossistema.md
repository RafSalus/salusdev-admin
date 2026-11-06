# Plano 0004 - Suite de Documentacao Profissional do Ecossistema SalusDev

- **Codigo:** 0004
- **Versao:** 1.1
- **Status:** Concluído (Homologado por Rafael Amaral Salustiano em 2026-11-06)
- **Criado em:** 2026-11-05
- **Atualizado em:** 2026-11-06
- **Responsavel:** @aiox-master

## Releitura obrigatoria das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) antes de iniciar a execução deste plano.
- **Registro da releitura:** 2026-11-06 12:20 - @aiox-master

## Objetivo

Estruturar, produzir e publicar a suíte completa de documentação de engenharia e produto do ecossistema SalusDev, garantindo rastreabilidade, governança técnica, segurança de ponta a ponta e clareza para o desenvolvimento do Site Institucional (`salusdev-site`) e do Centro de Comando (`salusdev-admin`), acionando os agentes especializados do framework AIOX para cada domínio técnico.

## Referencias

- PRD v0.4: `doc/produto/PRD-SalusDev-v0.3.md` (Fonte única da verdade de produto)
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md` (R3, R11, R16)
- Código fonte modular: `src/` (Arquitetura Feature-Driven implementada)

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
|---|---|---|---|
| `@aiox-master` | Orion | Master Orchestrator | Abertura do plano, coordenação entre agentes, controle de esteira e fechamento |
| `@pm` | Morgan | Product Manager | Homologação final do PRD v0.4, Sitemap e Guia de Conteúdo Institucional |
| `@architect` | Aria | Architect | Especificação de Arquitetura do Sistema (`ARCHITECTURE.md`) e ADRs de Decisão |
| `@ux-design-expert` | Uma | UX/UI Designer & Design System | Especificação do Design System (`DESIGN-SYSTEM.md`) e Inventário de Telas [D] e [M] |
| `@data-engineer` | Dara | Database Architect | Dicionário de Dados (`DATA-DICTIONARY.md`) e Diretrizes de Isolamento de Banco |
| `@qa` | Quinn | Test Architect & QA | Plano de Qualidade e Testes (`TEST-PLAN.md`) com critérios [D], [M] e PWA |
| `@devops` | Gage | DevOps Specialist | Guia de Deploy e Ambientes no Netlify (`DEPLOYMENT.md`) para Site e Admin |

## Sequência de execução e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governança e Abertura):**
   - O que é esperado: Criação e registro do Plano 0004, estruturação das pastas de documentação (`docs/arquitetura/`, `docs/design/`, `docs/dados/`, `docs/qualidade/`, `docs/devops/`, `docs/seguranca/`).
   - Critério de passagem: Plano 0004 ativo e estrutura pronta.
2. **`@pm` (Etapa 2 - Homologação do PRD e Documentação de Produto):**
   - O que é esperado: Revisão conclusiva do PRD v0.4 confirmando completude sem dúvidas e produção do `SITEMAP.md` e `CONTENT-GUIDE.md`.
   - Critério de passagem: PRD homologado como base estável.
3. **`@architect` (Etapa 3 - Arquitetura de Sistemas):**
   - O que é esperado: Redigir `docs/arquitetura/ARCHITECTURE.md` (topologia Multi-repo, contratos canônicos, fronteiras de segurança, arquitetura PWA e comunicação entre sistemas).
   - Critério de passagem: Documento de arquitetura detalhado e sem pontas soltas.
4. **`@ux-design-expert` (Etapa 4 - Design System e Telas [D] e [M]):**
   - O que é esperado: Redigir `docs/design/DESIGN-SYSTEM.md` (tokens de cores, tipografia, escala, componentes atômicos) e `SCREEN-INVENTORY.md` (telas mapeadas para Desktop `[D]` e Mobile `[M]`).
   - Critério de passagem: Guia visual completo para replicação em código.
5. **`@data-engineer` (Etapa 5 - Dicionário e Modelagem de Dados):**
   - O que é esperado: Redigir `docs/dados/DATA-DICTIONARY.md` (modelo de dados do Catálogo Central, entidades de clientes e premissas de isolamento para SaaS satélites).
   - Critério de passagem: Schemas conceituais e lógicos formalizados.
6. **`@qa` (Etapa 6 - Plano de Testes e Qualidade):**
   - O que é esperado: Redigir `docs/qualidade/TEST-PLAN.md` (estratégia de testes, matriz de viewports [D] e [M], validação de PWA e quality gates).
   - Critério de passagem: Critérios de teste rastreáveis.
7. **`@devops` (Etapa 7 - Infraestrutura e Deploy):**
   - O que é esperado: Redigir `docs/devops/DEPLOYMENT.md` (pipeline no Netlify, configuração de subdomínios e variáveis de ambiente seguras).
   - Critério de passagem: Guia de deploy reprodutível.
8. **`@aiox-master` (Etapa 8 - Consolidação e Fechamento):**
   - O que é esperado: Coletar os relatórios de todos os agentes, registrar no plano, atualizar `ESTADO-ATUAL.md` e apresentar a suíte completa a Rafael.

## Escopo

- [x] Estruturação das pastas de documentação sob `docs/`.
- [x] Homologação do PRD v0.4 por `@pm` e publicação de `doc/produto/SITEMAP.md`.
- [x] Criação de `docs/arquitetura/ARCHITECTURE.md` por `@architect`.
- [x] Criação de `docs/design/DESIGN-SYSTEM.md` e `SCREEN-INVENTORY.md` por `@ux-design-expert`.
- [x] Criação de `docs/dados/DATA-DICTIONARY.md` por `@data-engineer`.
- [x] Criação de `docs/qualidade/TEST-PLAN.md` por `@qa`.
- [x] Criação de `docs/devops/DEPLOYMENT.md` por `@devops`.
- [x] Consolidação dos relatórios finais de todos os agentes.

## Fora de escopo

- Alterações no código fonte do protótipo durante a fase de documentação (o código já está modularizado e com build validado).

## Tarefas

- [x] `@aiox-master`: Registrar Plano 0004 e criar subpastas de documentação sob `docs/`.
- [x] `@pm`: Validar integridade do PRD v0.4 e redigir mapa de informação em `doc/produto/SITEMAP.md`.
- [x] `@architect`: Redigir especificação técnica em `docs/arquitetura/ARCHITECTURE.md`.
- [x] `@ux-design-expert`: Redigir `docs/design/DESIGN-SYSTEM.md` e `docs/design/SCREEN-INVENTORY.md`.
- [x] `@data-engineer`: Redigir `docs/dados/DATA-DICTIONARY.md`.
- [x] `@qa`: Redigir `docs/qualidade/TEST-PLAN.md`.
- [x] `@devops`: Redigir `docs/devops/DEPLOYMENT.md`.
- [x] `@aiox-master`: Consolidar pareceres finais e atualizar status do plano.

## Rotas e arquivos afetados

- `doc/produto/SITEMAP.md`
- `docs/arquitetura/ARCHITECTURE.md`
- `docs/design/DESIGN-SYSTEM.md`
- `docs/design/SCREEN-INVENTORY.md`
- `docs/dados/DATA-DICTIONARY.md`
- `docs/qualidade/TEST-PLAN.md`
- `docs/devops/DEPLOYMENT.md`
- `doc/plan/0004 - suite-de-documentacao-profissional-do-ecossistema.md`
- `doc/plan/README.md`
- `doc/handof/ESTADO-ATUAL.md`

## Criterios de aceite

- [x] Todos os 5 documentos essenciais (`ARCHITECTURE`, `DESIGN-SYSTEM`, `DATA-DICTIONARY`, `TEST-PLAN`, `DEPLOYMENT`) criados e revisados.
- [x] Alinhamento 100% estrito com as definições do PRD v0.4 e as regras do repositório.
- [x] Convenção Desktop `[D]` e Mobile `[M]` refletida nos documentos de arquitetura, design e testes.
- [x] Premissa Multi-repo (isolamento entre `salusdev-site` e `salusdev-admin`) formalizada em todos os manuais técnicos.
- [x] Cada agente emite seu relatório final registrado no plano.

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)
- **Status:** [Concluído]
- **Entregas realizadas:** Plano 0004 orquestrado de ponta a ponta, pastas técnicas criadas sob `docs/`, esteira de agentes executada sem bloqueios e consolidação da suíte técnica profissional.
- **Observações:** Aprovado e homologado com zero pendências documentais.

### Relatório - `@pm` (Morgan)
- **Status:** [Concluído]
- **Entregas realizadas:** Redação e homologação de `doc/produto/SITEMAP.md`, cobrindo as rotas e diretrizes de conteúdo do Site Institucional e do Centro de Comando, alinhado 100% com o PRD v0.4.
- **Observações:** Ausência total de dúvidas de escopo; foco mantido em autoridade, proximidade regional em Apucarana e vitrine sem expor tabelas públicas de preços.

### Relatório - `@architect` (Aria)
- **Status:** [Concluído]
- **Decisões registradas:** Redação de `docs/arquitetura/ARCHITECTURE.md` formalizando a topologia Multi-Repo, arquitetura modular Feature-Driven, PWA com cache restrito a ativos estáticos (`PWAS-01`), autenticação centralizada com MFA/2FA via Supabase Auth TOTP (`AUTH-02`), contrato canônico de aplicações e cinco ADRs estruturais (ADR-001 a ADR-005).
- **Observações:** Arquitetura robusta com raio de explosão isolado e resiliência entre produtos.

### Relatório - `@ux-design-expert` (Uma)
- **Status:** [Concluído]
- **Entregas realizadas:** Redação de `docs/design/DESIGN-SYSTEM.md` (tokens de cores, tipografia, escala, componentes atômicos e acessibilidade WCAG 2.1 AA) e `docs/design/SCREEN-INVENTORY.md` com inventário de telas detalhando comportamentos contrastados entre Desktop `[D]` e Mobile `[M]`.
- **Observações:** Alvos de toque >= 44px garantidos no mobile e foco visível em todos os elementos interativos.

### Relatório - `@data-engineer` (Dara)
- **Status:** [Concluído]
- **Entregas realizadas:** Redação de `docs/dados/DATA-DICTIONARY.md` contemplando diagramas ER e dicionário detalhado para as tabelas `products`, `clients`, `client_products` e `auth_audit_logs`, além de diretrizes de isolamento de bancos e RLS para SaaS satélites.
- **Observações:** Privacidade desde a concepção (LGPD) e isolamento multi-tenant formalizado.

### Relatório - `@qa` (Quinn)
- **Status:** [Concluído]
- **Testes executados:** Redação de `docs/qualidade/TEST-PLAN.md` com definição de 5 Quality Gates, matriz de testes nos quatro viewports de referência (360px, 768px, 1024px, 1440px), plano de testes para PWA e MFA/2FA, e protocolo de abertura/triagem de bugs.
- **Observações:** Parecer final: **PASS**.

### Relatório - `@devops` (Gage)
- **Status:** [Concluído]
- **Entregas realizadas:** Redação de `docs/devops/DEPLOYMENT.md` especificando topologia de domínios/DNS, modelo de configuração `netlify.toml` com cabeçalhos de segurança obrigatórios (`CFG-02`), gestão de segredos e pipeline de CI/CD com Deploy Previews.
- **Observações:** Esteira de deploy desacoplada e reprodutível.

## Riscos e bloqueios

- Nenhum. Todas as etapas foram concluídas com sucesso.

## Historico de versoes

| Versao | Data | Alteracao | Agente |
|---|---|---|---|
| 1.0 | 2026-11-05 | Criação do plano para a suíte completa de documentação profissional do ecossistema SalusDev | @aiox-master |
