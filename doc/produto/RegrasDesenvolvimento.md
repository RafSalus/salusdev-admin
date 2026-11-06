# Regras de Desenvolvimento — SalusDev Prototypes

> **Documento mestre do projeto.** Deve ser lido no início de toda sessão de trabalho, antes de qualquer ação.
> Contém as regras de processo (Parte I) e o espelho obrigatório das regras de sistema e interface (Parte II).
>
> - **Local:** `doc/produto/RegrasDesenvolvimento.md`
> - **Repositório:** `salusdev-admin` (ecossistema Multi-Repo SalusDev)
> - **Versão:** 2.0
> - **Criado em:** 2026-11-04
> - **Atualizado em:** 2026-11-06
> - **Responsável:** Rafael Amaral Salustiano
> - **Agente orquestrador:** `@aiox-master`
> - **Fontes:** Parte I (este documento) + Parte II (espelho e leitura obrigatória de `doc/produto/RegrasSystema.md`)

---

## 0. Como usar este documento

Toda sessão de trabalho começa com o pedido:

```text
Ler as regras de desenvolvimento e iniciar o dia.
```

Ao receber esse pedido, o agente deve, **nesta ordem**:

1. Ler este documento inteiro (`doc/produto/RegrasDesenvolvimento.md`) **e obrigatoriamente ler também `doc/produto/RegrasSystema.md` na íntegra**. As duas leituras são mandatórias e indissociáveis.
2. Ler `doc/handof/ESTADO-ATUAL.md` e o handoff de encerramento mais recente em `doc/handof/`.
3. Listar e ler os planos em `doc/plan/`, identificando o plano ativo e o primeiro item não concluído.
4. Verificar o estado real do repositório com `git status` e, quando necessário, `git diff`.
5. Responder com um resumo curto do estado atual e o próximo passo sugerido.
6. Aguardar a confirmação de Rafael antes de iniciar alterações relevantes.

> **Regra de ouro:** nenhuma implementação começa antes do passo 5. O resumo do estado é obrigatório.

> **Regra mandatória de planos:** todo plano criado para aprovação do usuário **deve constar fisicamente na pasta `doc/plan/`** (`D:\SalusDev - Admin\doc\plan\`) com o nome e a numeração sequencial corretos antes de ser submetido à aprovação e antes de qualquer implementação.

> **Leitura concomitante e obrigatória de `RegrasSystema.md`:**
> A leitura de `D:\SalusDev - Admin\doc\produto\RegrasSystema.md` é mandatória toda vez que as regras forem solicitadas.
> **Atenção especial às regras críticas do ecossistema SalusDev:**
>
> - **Máscaras obrigatórias (`FRM-01` a `FRM-09`):** todo campo estruturado (CPF, CNPJ, telefone, CEP, data, hora, moeda, placa, CNH e afins) deve ter máscara centralizada em módulo reutilizável, com `react-imask` como biblioteca recomendada.
> - **Campos de seleção (`FRM-10` a `FRM-15`):** uso obrigatório de `react-select` encapsulado em componente padrão do design system; `<select>` nativo é proibido.
> - **Responsividade `[D]` e `[M]` (`GER-03`, `GER-04`):** toda tela validada em `360 px`, `768 px`, `1024 px` e `1440 px`, sem rolagem horizontal involuntária.
> - **Estados de interface (`GER-05`, `FBK-01` a `FBK-08`):** carregando, vazio, erro e sucesso definidos em todo fluxo.
> - **Proibição de diálogos nativos (`GER-07`):** nunca usar `alert`, `confirm` ou `prompt`.
> - **PWA e mobile (`PWA-01` a `PWA-18`):** fonte mínima de `16 px` em campos no mobile, sem bloquear zoom, com áreas seguras e `100dvh`.
> - **Ações e navegação (`BTN-01` a `BTN-18`):** sem botões redundantes, com uma ação primária por contexto e alvos de toque de `44 x 44 px` em `[M]`.
> - **Conteúdo e redação (`CONT-01` a `CONT-08`):** português do Brasil, sem o caractere `&` em textos visíveis.
> - **Segurança e privacidade (`SEG-01` a `ENV-08`, `GOV-01` a `SANC-05`):** nenhum segredo no repositório, nenhum dado real em protótipo, nenhum dado pessoal em log ou prompt de IA.
> - **Código limpo (`CLN-01` a `CLN-22`, `CMT-01` a `CMT-14`, `ORG-01` a `ORG-18`):** modularidade, ausência de `any` injustificado, ausência de código morto e imports com `@/`.
> - **Bugs e regressão (`BUG-01` a `BUG-36`, `REG-01` a `REG-17`):** todo bug registrado em `docs/bugs/` antes da correção, com teste de regressão.

> **Parte II é obrigatória:** as regras de interface, arquitetura, identidade visual, segurança e padrões de código da Parte II têm o mesmo peso das regras de processo da Parte I. Nenhuma tela, componente ou funcionalidade pode ser criado ou alterado sem respeitá-las.

---

## 1. Agentes AIOX e suas funções

Fonte: `.aiox-core/development/agents/` e `.claude/skills/AIOX/agents/`.

| Agente | Persona | Função principal | Quando acionar | Entregável típico |
| --- | --- | --- | --- | --- |
| `@aiox-master` | Orion | Master Orchestrator e Framework Developer | Início de sessão, tarefas mistas ou ambíguas, orquestração e criação ou modificação de componentes do framework | Plano, roteamento, coordenação |
| `@analyst` | Atlas | Business Analyst | Pesquisa de mercado, análise competitiva, pesquisa de usuário, brainstorming, ideação, viabilidade e discovery | Pesquisa, análise, insights |
| `@pm` | Morgan | Product Manager | PRD (greenfield e brownfield), criação e gestão de epics, estratégia e visão de produto, priorização (MoSCoW e RICE), roadmap e business case | PRD, epics, roadmap |
| `@po` | Pax | Product Owner | Gestão de backlog, refinamento de stories, critérios de aceite, sprint planning e decisões de priorização | Stories refinadas e validadas |
| `@sm` | River | Scrum Master | Criação de stories a partir do PRD, validação e completude, critérios de aceite, refinamento e retrospectivas | Stories prontas para desenvolvimento |
| `@architect` | Aria | Architect | Arquitetura fullstack, backend, frontend e infraestrutura, escolha de stack, design de API (REST, GraphQL, tRPC e WebSocket), segurança e performance | Arquitetura, ADRs, design técnico |
| `@ux-design-expert` | Uma | UX/UI Designer e Design System Architect | Pesquisa de usuário, wireframes, design system, tokens, construção de componentes e QA de design | Wireframes, design system, componentes |
| `@data-engineer` | Dara | Database Architect e Operations Engineer | Modelagem de dados, schema, Supabase, políticas RLS, migrations, otimização de queries, operações e monitoramento | Schema, migrations, políticas |
| `@dev` | Dex | Full Stack Developer | Implementação de código, debugging, refatoração e boas práticas de desenvolvimento | Código implementado e testado |
| `@qa` | Quinn | Test Architect e Quality Advisor | Revisão de arquitetura de testes, quality gates, rastreabilidade de requisitos, análise de risco e estratégia de testes | Parecer PASS, CONCERNS ou FAIL |
| `@devops` | Gage | GitHub Repository Manager e DevOps Specialist | Operações de repositório, versionamento, CI/CD, quality gates e push para o remoto | Push, release, pipeline |
| `@squad-creator` | Craft | Squad Creator | Criar, validar, publicar e gerenciar squads de agentes | Squad criado e publicado |

### 1.1 Como acionar um agente

- O usuário aciona pelo nome: `@dev`, `@architect`, `@qa`, etc.
- Se o usuário **nomear** um agente, esse agente é usado, sem substituições.
- Se o usuário **não nomear** e o pedido tiver um dono claro (ver 1.2), o agente responsável é acionado automaticamente.
- Se o pedido for **ambíguo, misto ou de abertura de dia**, o `@aiox-master` assume e delega.

### 1.2 Matriz de intenção para agente

| Se o usuário pedir... | Acionar |
| --- | --- |
| "Ler as regras de desenvolvimento", "começar o dia", "o que fizemos ontem" | `@aiox-master` |
| "Pesquisar mercado", "analisar concorrência", "brainstorm", "estudo de viabilidade" | `@analyst` |
| "Criar PRD", "criar epic", "roadmap", "priorizar features", "business case" | `@pm` |
| "Refinar story", "critérios de aceite", "backlog", "sprint planning" | `@po` |
| "Criar story", "validar story", "quebrar PRD em stories" | `@sm` |
| "Definir arquitetura", "escolher stack", "desenhar API", "decisão técnica estrutural" | `@architect` |
| "Criar tela", "wireframe", "design system", "tokens", "componente visual" | `@ux-design-expert` |
| "Criar schema", "migration", "RLS", "Supabase", "otimizar query" | `@data-engineer` |
| "Implementar", "corrigir bug", "refatorar", "escrever código" | `@dev` |
| "Testar", "revisar qualidade", "quality gate", "rastreabilidade" | `@qa` |
| "Commit", "push", "release", "CI/CD", "deploy" | `@devops` |
| "Criar squad", "validar squad", "publicar squad" | `@squad-creator` |

### 1.3 Regras de acionamento

1. **`@aiox-master` é o agente padrão de abertura de sessão.** Só é trocado se o usuário pedir algo específico de outro agente.
2. **Um agente por vez.** Se a tarefa cruzar domínios, o `@aiox-master` orquestra e delega na ordem correta.
3. **`@devops` é o único autorizado a fazer push** para o repositório remoto.
4. **Nenhum agente pula a leitura das regras, do plano e do handoff.**
5. **Não inventar.** Se faltar informação, perguntar ou registrar como premissa ou pendência no plano (princípio _No Invention_).
6. **Cada agente emite relatório final** ao concluir sua participação no plano, conforme a Seção 2.5.

### 1.4 Skills operacionais (não são agentes)

| Skill | Uso neste repositório |
| --- | --- |
| `aiox-commit` | Criar commit local (nunca faz push) |
| `checklist-runner` | Validar entregas contra checklists de conformidade |
| `coderabbit-review` | Revisão automatizada de código antes de commit ou PR |
| `tech-search` | Pesquisa técnica profunda com registro em `docs/` |
| `synapse` | Consultar o motor de contexto e domínios do framework |

> **Nota:** as skills de story (`develop-story`, `validate-story-draft`, `review-story`, `apply-qa-fixes`, `close-story`, `full-sdc` e `wave-execute`) não se aplicam a este repositório de protótipos, que é controlado por planos numerados e não por stories detalhadas.

---

## 2. Regra nº 1 — Plano antes de executar

> **Nenhum trabalho começa sem plano escrito e salvo na pasta correta.**

### 2.0 Localização obrigatória do plano para aprovação

> **Regra mandatória do usuário:**
> Quando o agente criar o plano para o usuário aprovar, **ele deve obrigatoriamente constar na pasta `D:\SalusDev - Admin\doc\plan\`** com a nomenclatura correta (`NNNN - slug-curto.md`).
>
> **Sempre antes de implementar qualquer funcionalidade ou alteração de código**, é obrigatório criar o plano físico nesta pasta (`doc/plan/`), registrar a entrada no índice `doc/plan/README.md` e aguardar a aprovação expressa do usuário. É expressamente proibido iniciar implementação sem o plano previamente gravado neste caminho.

### 2.1 Sequência obrigatória

1. Ler as regras (este documento e `RegrasSystema.md`).
2. Ler o handoff mais recente e o `ESTADO-ATUAL.md`.
3. **Procurar um plano existente** em `doc/plan/` relacionado ao pedido (por módulo, tela, palavra-chave e assunto).
4. Se existir plano relacionado, **reutilizar** (ver Seção 3).
5. Se não existir, **criar o próximo plano numerado diretamente em `doc/plan/`** e registrar em `doc/plan/README.md`.
6. Submeter o plano na pasta `doc/plan/` para aprovação do usuário.
7. **Só então implementar**, após a aprovação do usuário.
8. Atualizar o plano durante a execução (checkboxes, status e histórico de versões).

### 2.2 Numeração e nome do arquivo

- Pasta obrigatória: `D:\SalusDev - Admin\doc\plan\`
- Formato: `NNNN - slug-curto.md`
- Numeração com **4 dígitos**, começando em `0001`, **sequencial e nunca reutilizada**.
- Separação por `-` (espaço, hífen, espaço).
- O slug deve ser curto, em `kebab-case` e sem acentos.

Exemplos reais deste repositório:

```text
doc/plan/0001 - centro-de-comando-produtos.md
doc/plan/0002 - fundacao-de-interligacao-e-atualizacao-prd.md
doc/plan/0003 - refatoracao-arquitetural-e-modularizacao-do-admin.md
doc/plan/0004 - suite-de-documentacao-profissional-do-ecossistema.md
doc/plan/0005 - adaptacao-das-regras-de-desenvolvimento-ao-molde-mestre.md
```

Regras adicionais:

- Um plano cancelado **mantém o número** e recebe status `Cancelado`.
- Nunca renumerar planos existentes.
- O próximo número é sempre `maior número existente + 1`.
- Como este repositório contém protótipos, **não são criadas histórias de usuário detalhadas**; o controle é feito por planos, tarefas com checkboxes e handoffs diários.

### 2.3 Ciclo de vida do plano

```text
Rascunho -> Aprovado -> Em andamento -> Em revisao -> Concluido
                                      -> Bloqueado
                                      -> Cancelado
```

- O plano só é executado após estar `Aprovado` (ou quando o usuário mandar executar diretamente).
- Ao concluir, marcar `Concluido` e registrar no handoff.

### 2.4 Conteúdo mínimo do plano

Todo plano deve conter:

- linha de releitura obrigatória de `doc/produto/RegrasSystema.md` antes do início;
- código, título, versão, status e datas;
- responsável orquestrador;
- objetivo;
- referências de conteúdo e design;
- lista de agentes participantes;
- sequência e ordem de atuação dos agentes com o esperado de cada um;
- escopo e fora de escopo;
- premissas e dependências;
- tarefas com checkboxes, divididas por agente;
- telas e rotas afetadas;
- critérios de aceite;
- validação desktop `[D]` e mobile `[M]` quando aplicável;
- riscos e bloqueios;
- relatórios finais individuais de cada agente participante;
- histórico de versões.

Template completo na Seção 7.1.

### 2.5 Agentes participantes, sequência e relatórios finais

Todo plano obrigatoriamente deve conter:

1. **Lista de agentes participantes:** identificação clara de todos os agentes que atuarão no plano (por exemplo `@pm`, `@architect`, `@dev`, `@qa`, `@devops`, `@ux-design-expert`).
2. **Sequência e ordem de atuação:** ordem cronológica em que cada agente executa suas atividades, definindo o agente acionado, o que é esperado dele e o critério de passagem para o próximo agente.
3. **Relatórios finais individuais:** ao final da implementação, cada agente participante registra seu parecer conclusivo no plano antes do encerramento (por exemplo validação de requisitos pelo `@pm`, conformidade arquitetural pelo `@architect`, checklist de código pelo `@dev` e parecer PASS, CONCERNS ou FAIL pelo `@qa`).

---

## 3. Reutilização e versionamento de planos

> **Regra:** se já existe um plano anterior sobre o assunto, **não crie outro**. Altere a versão e implemente.

### 3.1 Como decidir

Antes de criar um plano novo, verifique em `doc/plan/`:

1. Existe plano com o **mesmo objetivo**?
2. Existe plano do **mesmo módulo, tela ou feature**?
3. Existe plano cujo objetivo contém o **mesmo assunto**?

Se **sim** para qualquer item, reutilizar o mesmo arquivo.

Se **não**, criar novo plano com o próximo número.

### 3.2 Como versionar

- Versão inicial: `1.0`.
- Ajuste pequeno, correção ou complemento: `1.1`, `1.2`, `1.3`.
- Mudança de escopo ou objetivo: sobe o major (`2.0`).
- Nunca apagar o histórico: **acrescentar** uma linha na tabela "Historico de versoes".
- Atualizar sempre o campo `Atualizado em`.

Exemplo de histórico:

| Versao | Data | Alteracao | Agente |
| --- | --- | --- | --- |
| 1.0 | 2026-11-05 | Criação do plano | @aiox-master |
| 1.1 | 2026-11-06 | Inclusão do filtro por período | @dev |

### 3.3 Diferença entre ajustar e criar novo

| Situação | Ação |
| --- | --- |
| Mesmo objetivo, novo detalhe ou requisito | Reutilizar e subir versão menor |
| Mesmo módulo, escopo muito maior | Reutilizar e subir versão maior |
| Assunto totalmente diferente | Criar novo plano |
| Plano anterior cancelado e assunto retomado | Criar novo plano (não reabrir o cancelado) |

---

## 4. Handoff — abertura, encerramento e recuperação

### 4.1 Artefatos obrigatórios

| Artefato | Quando atualizar | Para quê |
| --- | --- | --- |
| `doc/handof/ESTADO-ATUAL.md` | A cada marco relevante, inclusive no meio do dia | Proteção contra queda de energia e perda de contexto |
| `doc/handof/AAAA-MM-DD - encerramento.md` | No fim do dia | Fechamento formal e retomada no dia seguinte |
| `doc/handof/AAAA-MM-DD - abertura.md` | No início do dia | Registrar o ponto de partida e o plano do dia |

> **Observação:** a pasta existente chama-se `handof` (sem o segundo "f"). Mantenha esse nome para não quebrar a convenção do projeto.

### 4.2 Handoff de encerramento (fim do dia)

Gatilhos: `encerrar o dia`, `fechar o dia`, `handoff de encerramento`.

Passos:

1. Atualizar todos os checkboxes do plano ativo.
2. Registrar o que foi concluído e o que ficou pendente.
3. Criar ou atualizar `doc/handof/AAAA-MM-DD - encerramento.md`.
4. Atualizar `doc/handof/ESTADO-ATUAL.md` com o snapshot final.
5. Registrar arquivos alterados, estado do Git, riscos e próximo passo exato.
6. Opcional: commit local via `@devops` (push só se o usuário pedir).

### 4.3 Handoff de abertura (início do dia)

Gatilhos: `iniciar o dia`, `abrir o dia`, `ler as regras de desenvolvimento`.

Passos:

1. Ler `ESTADO-ATUAL.md` e o último encerramento.
2. Ler o plano ativo.
3. Criar `doc/handof/AAAA-MM-DD - abertura.md` com o ponto de partida e o objetivo do dia.
4. Confirmar com o usuário antes de implementar.

### 4.4 Recuperação após queda de energia

Gatilho: usuário relata queda de energia, travamento ou perda de contexto.

Procedimento:

1. Abrir `doc/handof/ESTADO-ATUAL.md` (é o retrato mais recente).
2. Abrir o plano ativo e conferir os checkboxes.
3. Verificar o estado real do código com `git status` e `git diff`.
4. Comparar o que está marcado como feito com o que realmente está no código.
5. Corrigir divergências no plano e no estado atual.
6. Retomar do **primeiro passo não concluído**.
7. Registrar a recuperação no handoff do dia.

> O código e o estado do Git prevalecem quando houver conflito com um registro desatualizado.

### 4.5 Conteúdo mínimo do handoff

- Data e hora.
- Agente que abriu ou encerrou.
- Plano vinculado (código e versão).
- O que foi feito.
- O que ficou pendente.
- Próximo passo exato.
- Arquivos alterados.
- Bloqueios e riscos.
- Estado do Git (branch e modificações).

Templates completos nas Seções 7.2, 7.3 e 7.4.

### 4.6 Regra do próximo dia

O campo `O que realizar no proximo dia` é obrigatório no encerramento.

A lista deve conter itens objetivos e executáveis, por exemplo:

```text
1. Ajustar o hero para 360 px.
2. Corrigir o menu mobile.
3. Criar o estado visual do formulario enviado.
4. Revisar a pagina em 1440 px.
5. Apresentar a versao 0.2 para aprovacao.
```

Evitar registros vagos como `continuar o projeto` ou `melhorar o site`.

---

## 5. Estrutura de pastas e organização profissional

### 5.1 Estrutura geral do repositório e documentação

```text
D:\SalusDev - Admin\
├── docs\
│   ├── plan\                 # planos numerados (0001, 0002, ...)
│   ├── handof\               # abertura, encerramento e ESTADO-ATUAL.md
│   ├── produto\              # PRD, RegrasSystema.md e este documento
│   ├── bugs\                 # INDEX.md, registros e evidencias
│   ├── arquitetura\          # arquitetura, ADRs e decisoes tecnicas
│   ├── design\               # design system, tokens e inventario de telas
│   ├── dados\                # dicionario de dados e modelagem
│   ├── qualidade\            # plano de testes e quality gates
│   ├── devops\               # deploy, ambientes e operacao
│   └── seguranca\            # politicas, ameacas e LGPD
├── src\                      # codigo-fonte do Centro de Comando
├── public\                   # ativos estaticos e manifesto PWA
├── AGENTS.md                 # guia operacional do repositorio
├── CLAUDE.md                 # ponte para o AGENTS.md
├── package.json
└── vite.config.ts
```

> **Documentação técnica fora de `doc/produto/`:** `doc/produto/` permanece exclusiva para documentos de produto (PRD, `RegrasSystema.md` e este documento). Arquitetura, design, dados, qualidade, devops e segurança vivem nas pastas próprias indicadas acima.

### 5.2 Estrutura profissional de pastas e arquivos do sistema (`src/`)

A organização do código-fonte deve seguir padrão modular, escalável e baseado em separação por domínios e camadas técnicas:

```text
src/
├── main.tsx                  # bootstrap da aplicacao
├── App.tsx                   # composicao raiz (entrypoint)
├── index.css                 # estilos globais e Tailwind v4
├── components\
│   ├── ui\                   # primitivas (Icon, Badge, Toast, Button, Input)
│   └── layout\               # estruturais (AppShell, Header, Sidebar, Logo)
├── features\
│   └── products\             # dominio: catalogo de produtos
│       ├── components\       # subcomponentes do dominio
│       ├── data\             # mocks do dominio
│       ├── hooks\            # regras de estado do dominio
│       ├── types\            # tipos do dominio
│       └── ProductsModule.tsx
├── shared\
│   ├── constants\            # constantes compartilhadas
│   └── types\                # tipos globais do sistema
└── vite-env.d.ts
```

**Convenções de nomenclatura obrigatórias:**

- **Diretórios e pastas:** `kebab-case` minúsculo, sem acentos ou caracteres especiais.
- **Componentes React:** `PascalCase` com extensão `.tsx` (por exemplo `ProductCard.tsx`).
- **Custom hooks:** `camelCase` com prefixo `use` (por exemplo `useProducts.ts`).
- **Serviços, utilitários e tipos:** `camelCase` ou `kebab-case` com sufixo descritivo (por exemplo `product.types.ts`, `formatCurrency.ts`).
- **Proibição de desordem:** é proibido criar arquivos soltos na raiz de pastas de domínio ou misturar regra de negócio dentro de componentes genéricos de UI.
- **Exceção de bootstrap:** `main.tsx`, `App.tsx` e `index.css` são entrypoints previstos pelo scaffold Vite e não são considerados arquivos soltos (`ORG-11`).

### 5.3 Governança de código: arquivos enxutos, segurança e comentários

#### A. Responsabilidade única e proibição de arquivos enormes

- Nenhum arquivo deve acumular múltiplas responsabilidades ou se tornar um "God File".
- Limites preferenciais no protótipo: até **200 linhas** por componente e até **300 linhas** por arquivo; durante exploração inicial, até **500 linhas** antes de modularizar.
- Funções, hooks e manipuladores devem ser curtos, idealmente até **60 linhas**; se exceder, extrair funções utilitárias puras.
- A separação entre apresentação, regra de negócio e acesso a dados protege a manutenibilidade e reduz riscos de segurança.

#### B. Comentários breves e objetivos

- Toda função, hook ou método não trivial **pode** receber um comentário curto de 1 a 3 linhas, explicando propósito, premissas e regras críticas.
- Comentários devem seguir `CMT-01` a `CMT-14`: explicar o porquê, nunca repetir o óbvio, nunca usar banners decorativos, nunca guardar código comentado.
- `TODO` e `FIXME` só com responsável, data e referência de plano ou issue.

#### C. Imports e dependências

- Imports internos usam o alias `@/`.
- É proibida dependência circular entre módulos.
- Nenhuma dependência nova sem justificativa, uso real e registro no plano (`PERF-07`).

### 5.4 Escopo do repositório

O `salusdev-admin` é usado para:

- criar wireframes e telas visuais navegáveis;
- validar identidade visual e responsividade;
- simular fluxos de navegação;
- apresentar demonstrações a potenciais clientes;
- aprovar interfaces antes da implementação definitiva.

O repositório **não** é sistema de produção.

**Fora do escopo:**

- banco de dados de produção;
- autenticação real;
- políticas RLS;
- pagamentos reais;
- dados reais de clientes;
- operações comerciais reais;
- integrações com ambientes de produção;
- regras de negócio completas dos produtos finais.

### 5.5 Regras técnicas do protótipo

- **Stack:** TypeScript, React, Vite, Tailwind CSS, Git, GitHub e Netlify.
- **Dados:** somente fictícios, mantidos em arquivos de mock por domínio; nunca conectar ao Supabase de produção; nunca incluir chaves, tokens ou senhas; nunca usar dados pessoais reais em prompts de IA.
- **Responsividade e PWA:** tratar e testar explicitamente Desktop `[D]` (1024 px e 1440 px) e Mobile `[M]` (360 px e 768 px), com manifesto, service worker, ícones adaptativos e instalação A2HS.
- **Viewports obrigatórios:** 360 px, 768 px, 1024 px e 1440 px.
- **Acessibilidade mínima:** contraste legível, foco visível, navegação por teclado, rótulos nos campos, botões com nomes claros, texto alternativo em imagens relevantes e informação que não dependa apenas de cor.
- **Identidade visual:** branco, preto ou navy, azul da marca e cores semânticas apenas para estados; visual moderno, limpo e profissional; sem excesso de cores, efeitos e animações; não usar o caractere `&` em textos visíveis.

### 5.6 Regras para demonstrações a clientes

Toda demonstração deve exibir:

> Demonstracao visual com dados ficticios. Algumas funcionalidades sao simuladas e nao representam um sistema pronto para uso comercial.

Regras obrigatórias:

- não apresentar dados reais;
- não simular resultados comerciais como fatos;
- indicar funcionalidades ainda não implementadas;
- não conectar pagamentos reais;
- não prometer que tudo exibido está incluído na proposta;
- registrar a versão apresentada e os ajustes pedidos pelo cliente;
- obter aprovação antes de usar nome, logotipo ou imagens do cliente;
- proteger o acesso quando houver informação comercial reservada.

---

## 6. Regras numeradas (resumo)

| # | Regra |
| --- | --- |
| R1 | **Plano antes de executar.** Nenhum trabalho começa sem plano escrito e salvo fisicamente em `doc/plan/` com a nomenclatura correta e aguardando aprovação expressa do usuário. |
| R2 | **Reutilizar plano existente.** Se já há plano do assunto, apenas suba a versão e implemente. |
| R3 | **Numeração sequencial.** `NNNN - slug-curto.md`, com 4 dígitos, sem reutilização e sem renumerar. |
| R4 | **Handoff no encerramento e na abertura do dia.** |
| R5 | **`ESTADO-ATUAL.md` sempre atualizado** para sobreviver a queda de energia. |
| R6 | **Agente certo para cada função** (matriz da Seção 1.2). |
| R7 | **`@aiox-master` é o padrão de abertura**, salvo pedido específico de outro agente. |
| R8 | **`@devops` é o único que faz push.** |
| R9 | **Atualizar plano e handoff em tempo real**, não só no fim. |
| R10 | **No Invention.** Não inventar requisitos; registrar premissas ou perguntar. |
| R11 | **Quality First.** Rodar `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build` antes de concluir, quando aplicáveis. |
| R12 | **Um plano por assunto.** Não duplicar planos. |
| R13 | **Protótipo não é produção.** Nada deste repositório deve ser tratado como código pronto para produção. |
| R14 | **Somente dados fictícios e nenhuma credencial real.** |
| R15 | **Toda demonstração informa** que possui dados e funções simuladas. |
| R16 | **Todo plano lista agentes participantes, sequência de atuação e relatórios finais individuais.** |
| R17 | **Reler `RegrasSystema.md` em cada novo pedido** e registrar a releitura no plano ativo ou no handoff do dia. |
| R18 | **Web App e PWA com validação separada para Desktop `[D]` e Mobile `[M]`.** |
| R19 | **Organização profissional e SRP.** Estrutura modular por domínio, arquivos enxutos e sem arquivos soltos. |
| R20 | **Todo bug registrado em `docs/bugs/`** antes da correção, com teste de regressão e validação `[D]` e `[M]`. |
| R21 | **Leitura concomitante de `RegrasSystema.md`** e cumprimento integral das regras de interface, segurança, LGPD e código limpo da Parte II. |

---

## 7. Templates

### 7.1 Template de plano

Copie para `doc/plan/NNNN - slug-curto.md`:

```markdown
# Plano NNNN - Titulo curto

- **Codigo:** NNNN
- **Versao:** 1.0
- **Status:** Rascunho
- **Criado em:** AAAA-MM-DD
- **Atualizado em:** AAAA-MM-DD
- **Responsavel:** @aiox-master

## Releitura obrigatoria das regras

- [ ] Reler integralmente `doc/produto/RegrasSystema.md` antes de iniciar este plano.
- **Registro da releitura:** AAAA-MM-DD HH:MM - @agente

## Objetivo

O que este plano resolve, em 1 a 3 frases.

## Referencias

- PRD ou secao relacionada:
- Imagem ou identidade visual:
- Tela relacionada:

## Agentes participantes

| Agente | Persona | Papel no plano | Entregavel esperado |
| --- | --- | --- | --- |
| `@aiox-master` | Orion | Orquestracao | Plano, coordenacao e fechamento |
| `@dev` | Dex | Implementacao | Codigo e componentes |

## Sequencia de execucao e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governanca):**
   - O que e esperado: abrir o plano e registrar a releitura.
   - Criterio de passagem: plano ativo e aprovado.
2. **`@dev` (Etapa 2 - Implementacao):**
   - O que e esperado: implementar conforme escopo.
   - Criterio de passagem: build e typecheck sem erros.
3. **`@aiox-master` (Etapa 3 - Fechamento):**
   - O que e esperado: consolidar relatorios e atualizar status.

## Escopo

- [ ] Item de escopo 1
- [ ] Item de escopo 2

## Fora de escopo

- O que nao sera feito.

## Premissas e dependencias

- Premissa 1
- Dependencia 1

## Tarefas

- [ ] `@aiox-master`: Reler as regras e registrar neste plano.
- [ ] `@dev`: Implementar arquivos e codigo.
- [ ] `@qa`: Revisar e validar qualidade.
- [ ] `@aiox-master`: Registrar relatorios finais e atualizar status.

## Rotas e arquivos afetados

- `src/...`

## Criterios de aceite

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] [D] Desktop validado (1024 px e 1440 px).
- [ ] [M] Mobile validado (360 px e 768 px).
- [ ] Sem dados reais ou segredos.

## Relatorios finais dos agentes

### Relatorio - `@aiox-master` (Orion)
- **Status:** [Pendente / Aprovado]
- **Entregas realizadas:**
- **Observacoes:**

### Relatorio - `@dev` (Dex)
- **Status:** [Pendente / Implementado]
- **Arquivos modificados:**
- **Observacoes:**

### Relatorio - `@qa` (Quinn)
- **Status:** [Pendente / PASS / CONCERNS / FAIL]
- **Testes executados:**
- **Observacoes:**

## Riscos

| Risco | Impacto | Mitigacao |
| --- | --- | --- |
| Risco 1 | Alto/Medio/Baixo | Acao |

## Historico de versoes

| Versao | Data | Alteracao | Agente |
| --- | --- | --- | --- |
| 1.0 | AAAA-MM-DD | Criacao do plano | @aiox-master |
```

### 7.2 Template de handoff de encerramento

Copie para `doc/handof/AAAA-MM-DD - encerramento.md`:

```markdown
# Encerramento do Dia - AAAA-MM-DD

- **Hora:** HH:MM
- **Agente:** @nome
- **Plano ativo:** NNNN - slug (vX.Y)
- **Branch:** nome-da-branch
- **Estado do Git:** resumo

## O que foi feito hoje

- Item concluido 1.
- Item concluido 2.

## Decisoes tomadas

- Decisao 1.

## Testes e verificacoes

- [ ] Desktop 1440 px
- [ ] Notebook 1024 px
- [ ] Tablet 768 px
- [ ] Mobile 360 px
- [ ] Lint
- [ ] Typecheck
- [ ] Build

## O que ficou pendente

- Pendencia 1.
- Pendencia 2.

## Arquivos alterados

- `caminho/arquivo1`
- `caminho/arquivo2`

## Problemas, riscos e bloqueios

- Nenhum.

## Proximo passo exato

1. Acao exata de retomada.

## O que realizar no proximo dia

1. Tarefa objetiva 1.
2. Tarefa objetiva 2.

## Observacoes

- Notas adicionais.
```

### 7.3 Template de estado atual

Copie para `doc/handof/ESTADO-ATUAL.md` (sobrescreva a cada atualização):

```markdown
# Estado Atual do Trabalho

- **Atualizado em:** AAAA-MM-DD HH:MM
- **Agente:** @nome
- **Plano ativo:** NNNN - slug (vX.Y)
- **Status:** Em andamento
- **Branch:** nome-da-branch

## Ultimo marco concluido

- Descricao do ultimo passo finalizado.

## Em execucao agora

- Descricao do que estava sendo feito no momento.

## Proximo passo exato

1. Acao objetiva.

## Pendencias imediatas

- [ ] Pendencia 1
- [ ] Pendencia 2

## Arquivos em edicao

- `caminho/arquivo`

## Bloqueios

- Nenhum.
```

### 7.4 Template de handoff de abertura

Copie para `doc/handof/AAAA-MM-DD - abertura.md`:

```markdown
# Abertura do Dia - AAAA-MM-DD

- **Hora:** HH:MM
- **Agente:** @aiox-master
- **Plano ativo:** NNNN - slug (vX.Y)
- **Branch:** nome-da-branch

## Estado recebido

- Ultimo marco:
- Pendencias:
- Bloqueios:

## Objetivo principal do dia

- Resultado esperado.

## Tarefas previstas

- [ ] Tarefa 1
- [ ] Tarefa 2

## Primeiro passo

1. Acao exata para iniciar.

## Confirmacao

- [ ] Objetivo do dia confirmado por Rafael.
```

---

## 8. Fluxo do dia (resumo)

### Início

1. Usuário: "Ler as regras de desenvolvimento e iniciar o dia".
2. Agente lê `RegrasSystema.md` e este documento, depois lê handoff e planos.
3. Agente responde com estado atual e próximo passo.
4. Usuário confirma ou pede ajuste.
5. Se o pedido é novo: procurar plano, reutilizar ou criar.
6. Implementar atualizando o plano.

### Durante

- Executar uma tarefa pequena por vez.
- Verificar o resultado.
- Atualizar os checkboxes do plano imediatamente.
- Atualizar `ESTADO-ATUAL.md` a cada marco relevante.
- Rodar lint, typecheck e build antes de dizer que terminou.

### Fim

1. Usuário: "Encerrar o dia".
2. Agente executa as verificações.
3. Agente atualiza plano e `ESTADO-ATUAL.md`.
4. Agente cria o handoff de encerramento.
5. Agente registra as tarefas do dia seguinte.
6. Agente resume o dia e o próximo passo.

---

## 9. Checklist rápido

### Antes de começar

- [ ] Li este documento?
- [ ] Li `RegrasSystema.md` neste pedido?
- [ ] Li o `ESTADO-ATUAL.md` e o último handoff?
- [ ] Procurei plano existente em `doc/plan/`?
- [ ] O plano para aprovação do usuário já foi salvo fisicamente em `doc/plan/` antes de qualquer código?
- [ ] Sei qual agente deve executar?
- [ ] O plano está atualizado (versão e status)?
- [ ] Verifiquei bugs abertos em `docs/bugs/INDEX.md`?
- [ ] Rafael confirmou a execução?

### Antes de encerrar

- [ ] Plano com checkboxes atualizados?
- [ ] `ESTADO-ATUAL.md` atualizado?
- [ ] Handoff de encerramento criado?
- [ ] O que foi feito e o que ficou pendente registrado?
- [ ] O próximo passo exato registrado?
- [ ] As tarefas do dia seguinte registradas?
- [ ] Estado do Git registrado?
- [ ] Lint, typecheck e build executados quando aplicáveis?

---

## Parte II — Regras do Sistema (obrigatórias)

> **Origem:** espelho resumido e obrigatório de `doc/produto/RegrasSystema.md` (v1.3).
> A fonte canônica continua sendo `RegrasSystema.md`; ao alterar uma, sincronize a outra.
> Em caso de conflito, prevalece o texto canônico de `RegrasSystema.md`.

## 10. Diretrizes do sistema por categoria

| Categoria | Códigos | Aplicação no SalusDev |
| --- | --- | --- |
| Diretrizes gerais | `GER-01` a `GER-17` | Objetivo único por tela, feedback, 4 viewports, estados completos, sem diálogos nativos |
| Formulários e entrada | `FRM-01` a `FRM-26` | Máscaras, `react-select`, validação, teclado e `autocomplete` |
| Botões e navegação | `BTN-01` a `BTN-18` | Ação primária única, sem redundância, estados completos, toque de 44 px |
| PWA e mobile | `PWA-01` a `PWA-18` | Fonte de 16 px, sem bloquear zoom, `safe-area`, `100dvh`, offline previsível |
| Impressão | `IMP-01` a `IMP-14` | `@media print`, cabeçalho, rodapé, A4 e teste no navegador |
| Tabelas e filtros | `TAB-01` a `TAB-10` | Cabeçalho, paginação, filtros visíveis, cards em `[M]` |
| Feedback e erros | `FBK-01` a `FBK-08` | Início, sucesso e falha; erro acionável; skeleton no carregamento |
| Acessibilidade | `A11Y-01` a `A11Y-10` | Contraste, foco visível, teclado, rótulos, `aria-live` |
| Conteúdo e redação | `CONT-01` a `CONT-08` | Português do Brasil, sem `&`, padrão brasileiro de data e moeda |
| Identidade visual | `VIS-01` a `VIS-08` | Tokens, cores semânticas apenas para estado, hierarquia e escala |
| Segurança | `SEG-01` a `RES-12` | OWASP Top 10:2025, autorização no servidor, segredos fora do cliente |
| LGPD e privacidade | `GOV-01` a `SANC-05` | Base legal, minimização, direitos do titular, incidentes |
| PWA e armazenamento | `PWAS-01` a `PWAS-10` | Cache apenas público, sem dado pessoal, limpeza no logout |
| Integrações e pagamentos | `INT-01` a `INT-12` | Webhook assinado e idempotente, checkout no gateway |
| Logs e auditoria | `LOG-01` a `LOG-10` | Logs estruturados, sem dado sensível, trilha de auditoria |
| Performance | `PERF-01` a `PERF-09` | Sem erro de console, sem `any`, sem código morto |
| Código limpo e organização | `CLN-01` a `ORG-18` | SRP, nomes claros, `@/`, sem arquivo solto |
| Bugs e regressão | `BUG-01` a `BUG-36` e `REG-01` a `REG-17` | Registro obrigatório, correção mínima e teste de regressão |

### 10.1 Diretrizes gerais

- Toda tela tem objetivo único e hierarquia que conduz à próxima ação (`GER-01`).
- Toda ação tem resultado perceptível (`GER-02`).
- Toda tela é validada em `360 px`, `768 px`, `1024 px` e `1440 px` (`GER-03`).
- Sem rolagem horizontal involuntária (`GER-04`).
- Todo fluxo define carregando, vazio, erro e sucesso (`GER-05`).
- Confirmações e avisos são exibidos na interface, nunca por `alert`, `confirm` ou `prompt` (`GER-07`).
- Textos em português do Brasil, com acentuação correta (`GER-10`).

### 10.2 Formulários e entrada de dados

- Todo campo estruturado tem máscara e validação sobre o valor normalizado (`FRM-01` a `FRM-05`).
- Campos de seleção usam `react-select` encapsulado no design system (`FRM-10` a `FRM-15`).
- Erro específico, foco no primeiro campo inválido e bloqueio de duplo envio (`FRM-16` a `FRM-21`).
- `type`, `inputMode` e `autoComplete` declarados; sem `placeholder` como único rótulo (`FRM-22` a `FRM-26`).

### 10.3 Botões, ações e navegação

- Uma ação primária por contexto e nenhum botão redundante (`BTN-01` e `BTN-02`).
- Ação destrutiva com confirmação e descrição do impacto (`BTN-05`).
- Botões com `aria-label` quando só tiverem ícone e área de toque de `44 x 44 px` em `[M]` (`BTN-06` e `BTN-18`).
- Navegação idêntica em rótulos entre `[D]` e `[M]` e página atual indicada (`BTN-10` e `BTN-11`).

### 10.4 PWA e comportamento mobile

- Campos com `font-size` mínimo de `16 px` em `[M]` (`PWA-01`).
- **Não** bloquear zoom com `maximum-scale=1` ou `user-scalable=no` (`PWA-02`).
- `viewport-fit=cover`, `safe-area-inset-*` e `100dvh` (`PWA-04` a `PWA-06`).
- Teclado virtual não cobre campos nem botões (`PWA-07`).
- Manifesto válido, ícones `192x192`, `512x512` e `maskable`, modo `standalone` (`PWA-09` e `PWA-10`).
- Offline previsível e cache apenas de ativos públicos (`PWA-12` e `PWAS-01`).

### 10.5 Tabelas, listas e filtros

- Cabeçalho identificável, alinhamento por tipo de dado e paginação (`TAB-01` e `TAB-02`).
- Busca ou filtro acima de 10 registros, com debounce e estado sem resultado (`TAB-03` e `TAB-06`).
- Em `[M]`, tabelas viram cards ou lista vertical (`TAB-08` e `TAB-10`).

### 10.6 Feedback, estados e erros

- Toda operação tem feedback de início, sucesso e falha (`FBK-01`).
- Erro explica o que aconteceu e o que fazer, sem detalhe técnico (`FBK-03` e `FBK-04`).
- Estado vazio explica o motivo e oferece próxima ação (`FBK-05`).
- Carregamento usa skeleton ou progresso, nunca tela em branco (`FBK-06`).

### 10.7 Acessibilidade

- Contraste mínimo de `4.5:1` para texto normal e `3:1` para texto grande (`A11Y-01`).
- Todo elemento interativo alcançável por teclado e com foco visível (`A11Y-02` e `A11Y-03`).
- Rótulo associado em todo campo e ordem de leitura coerente (`A11Y-04` e `A11Y-06`).
- Modal prende o foco, fecha com `Esc` e devolve o foco (`A11Y-08`).
- Zoom do navegador nunca é bloqueado (`A11Y-10`).

### 10.8 Conteúdo e identidade visual

- Português do Brasil com acentuação correta e sem `&` em texto visível (`CONT-01` e `CONT-02`).
- Datas e moeda no padrão brasileiro (`CONT-05`).
- Tokens do design system em toda tela (`VIS-01`).
- Cores semânticas apenas para estado (`VIS-02`).
- No máximo quatro níveis tipográficos visíveis por tela (`VIS-07`).

### 10.9 Segurança, LGPD e privacidade

- Nenhum segredo no código, no repositório ou em variável `VITE_` (`SEG-01`, `ENV-01` e `ENV-02`).
- Dados de produção e dados pessoais reais proibidos em protótipo, demonstração e prompt de IA (`SEG-02` e `PROIB-23`).
- Toda autorização validada no servidor; ocultar botão não é controle de acesso (`SEG-12` e `ACL-01`).
- Toda comunicação em HTTPS, com cabeçalhos de segurança em produção (`SEG-04` e `CFG-02`).
- Logs sem senha, token, cartão, CPF completo ou dado sensível (`LOG-02`).
- Base legal, minimização e direitos do titular observados desde a concepção (`BASE-01`, `MIN-01` e `DIR-03`).
- Incidente com risco relevante comunicado à ANPD e aos titulares em até 3 dias úteis (`INC-03`).

### 10.10 Performance, código limpo e organização

- Sem erros no console e build sem erro de TypeScript (`PERF-01` e `PERF-02`).
- Sem `any` injustificado, código morto, `console.log` ou comentário temporário (`PERF-03` e `PERF-08`).
- Estrutura por domínio, sem duplicação e sem arquivo solto (`ORG-01` a `ORG-11`).
- Imports com `@/` e sem dependência circular (`ORG-06` e `ORG-07`).
- Formatação com `oxfmt` e lint quando disponível (`FMT-01` e `FMT-04`).

### 10.11 Bugs, isolamento e regressão

- Todo bug registrado em `docs/bugs/` antes da correção, com identificador `BUG-NNNN` (`BUG-01` a `BUG-04`).
- Severidade e prioridade classificadas separadamente (`BUG-08` e `BUG-16`).
- Correção em branch isolada `fix/BUG-NNNN-slug`, mínima e sem refatoração não relacionada (`ISO-03`, `ISO-05` e `ISO-13`).
- Teste de regressão falha antes e passa depois (`REG-01`).
- Validação `[D]` e `[M]` concluída antes de fechar (`PROIB-39`).
- Evidência sem dado pessoal, credencial ou segredo (`BUG-15`).

---

## 11. Planos, documentação e arquitetura Multi-Repo

### 11.1 Controle por planos, não por stories

1. Este repositório de protótipos **não usa histórias de usuário detalhadas**; o controle é feito por planos numerados e tarefas com checkboxes.
2. Cada plano pode representar uma página, uma tela administrativa, um fluxo navegável, uma rodada de ajustes visuais, uma revisão responsiva, uma demonstração para cliente ou uma configuração técnica do repositório.
3. Nenhuma tela ou alteração relevante começa sem plano registrado em `doc/plan/`.

### 11.2 Documentação do sistema

1. `doc/produto/` é exclusiva para documentos de produto (PRD, `RegrasSystema.md` e este documento).
2. A documentação técnica vive em `docs/arquitetura/`, `docs/design/`, `docs/dados/`, `docs/qualidade/`, `docs/devops/` e `docs/seguranca/`, conforme o Plano 0004.
3. Toda decisão técnica estrutural (stack, schema, API, integração) deve ser registrada em `docs/arquitetura/`.
4. O PRD vigente é a fonte única da verdade de produto e deve ser referenciado em todo plano que altere escopo, fluxo ou conteúdo.

### 11.3 Arquitetura Multi-Repo do ecossistema

1. O ecossistema SalusDev opera em repositórios independentes: `salusdev-site` (site institucional) e `salusdev-admin` (Centro de Comando).
2. A separação por repositório existe por segurança (_Blast Radius_) e por independência de deploy e manutenção.
3. Cada sistema tem domínio, deploy e credenciais próprios; não há compartilhamento de segredos, banco ou storage entre ambientes.
4. A interligação entre sistemas usa catálogo canônico e contratos de healthcheck documentados.
5. Nenhuma alteração em um repositório pode presumir acesso direto ao código ou ao banco do outro.

### 11.4 Faseamento do roadmap

1. A fundação de interligação e a vitrine vêm antes de formulários complexos de captação de leads.
2. Captação de leads e pagamentos são fases posteriores e só entram quando a fundação estiver estável.
3. Nenhuma fase pode antecipar escopo de outra sem registro e aprovação no plano ativo.

---

## 12. Histórico de versões deste documento

| Versão | Data | Alteração | Agente |
| --- | --- | --- | --- |
| 1.0 | 2026-11-04 | Criação das regras específicas do repositório `salusdev-prototypes`, com controle simplificado por planos e handoffs diários | @aiox-master |
| 1.1 | 2026-11-05 | Inclusão da Seção 1 com os agentes AIOX, forma de acionamento e matriz de intenção | @aiox-master |
| 1.2 | 2026-11-05 | Inclusão obrigatória de lista de agentes participantes, sequência de execução e relatórios finais por agente nos planos (R16, Seção 5.4 e Template 13.1) | @aiox-master |
| 1.3 | 2026-11-05 | Definição de Web App com suporte a PWA e padronização obrigatória de especificações e testes divididos em Desktop `[D]` e Mobile `[M]` (R11 e Seção 8.4) | @aiox-master |
| 1.4 | 2026-11-05 | Inclusão da leitura obrigatória de `doc/produto/RegrasSystema.md` na abertura de sessão, no checklist e na regra resumida R2 | @aiox-master |
| 1.5 | 2026-11-05 | Releitura obrigatória de `doc/produto/RegrasSystema.md` em cada novo pedido, com registro no plano, no checklist e na regra R17 | @aiox-master |
| 2.0 | 2026-11-06 | Adaptação integral ao molde mestre de `Regras Desenvolvimento.md`: Parte I (processo) e Parte II (regras de sistema), com seções 0 a 12, templates unificados, regras numeradas R1 a R21 e seção de arquitetura Multi-Repo, preservando o controle por planos e o escopo de protótipo do SalusDev | @aiox-master |
