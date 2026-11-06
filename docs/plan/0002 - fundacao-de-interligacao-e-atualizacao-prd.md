# Plano 0002 - Fundacao de Interligacao de Sistemas e Atualizacao do PRD

- **Codigo:** 0002
- **Versao:** 1.3
- **Status:** Concluido
- **Criado em:** 2026-11-05
- **Atualizado em:** 2026-11-05
- **Responsavel:** @aiox-master

## Objetivo

Definir e formalizar no PRD (evoluindo para v0.4) a arquitetura de interligação e fundação técnica do ecossistema SalusDev, conectando o Site Institucional (`salusdev-site`), o Centro de Comando (`salusdev-admin`) e os futuros produtos SaaS (como `salus-oficina`). O projeto é concebido como um **Web App moderno com suporte a PWA (Progressive Web App)** e deve ser obrigatoriamente especificado e validado sob a ótica **Desktop `[D]`** e **Mobile `[M]`**, estabelecendo a topologia de domínios, contratos canônicos de aplicações e diretrizes de fronteira de dados, enquanto fluxos de leads e pagamentos são postergados para fases posteriores.

## Referencias

- Repositório do Site: `https://github.com/RafSalus/salusdev-site`
- Repositório do Admin (Protótipo): `salusdev-prototypes`
- PRD atual: `docs/produto/PRD-SalusDev-v0.3.md`
- Regras de Desenvolvimento: `docs/produto/RegrasDesenvolvimento.md` (R3, R11, R16 e Seção 8.4)
- Protótipo de referência: `src/App.tsx` (catálogo e gestão de produtos com navegação responsiva)

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
|---|---|---|---|
| `@aiox-master` | Orion | Master Orchestrator | Abertura do plano, atualização das diretrizes mestre (PWA e [D]/[M]), coordenação da esteira e consolidação final |
| `@architect` | Aria | Architect | Especificação da topologia de sistemas, contratos canônicos de aplicações, arquitetura PWA, healthchecks e isolamento de banco |
| `@pm` | Morgan | Product Manager | Reestruturação do PRD (v0.3 → v0.4), reordenação do roadmap em fases, inclusão de requisitos PWA e divisão explícita [D] e [M] |
| `@qa` | Quinn | Test Architect & QA | Revisão de rastreabilidade, verificação de conformidade dos requisitos [D], [M] e PWA no PRD e emissão de parecer de qualidade |

## Sequência de execução e responsabilidades

1. **`@aiox-master` (Etapa 1 - Governança e Diretrizes):**
   - O que foi realizado: Formalização das regras no documento mestre (`RegrasDesenvolvimento.md`) com suporte a PWA, separação Desktop `[D]` / Mobile `[M]`, e regras R11/R16.
   - Critério de passagem: Concluído com sucesso (v1.3).
2. **`@architect` (Etapa 2 - Desenho da Interligação Técnica e Arquitetura PWA):**
   - O que foi realizado: Definição da topologia de domínios (`salusdev.com`, `admin.salusdev.com`), modelo de contrato canônico do sistema (`SystemContract`), isolamento estrito de dados operacionais nos produtos satélites e especificações de PWA.
   - Critério de passagem: Concluído e integrado ao PRD v0.4.
3. **`@pm` (Etapa 3 - Atualização e Redação do PRD v0.4):**
   - O que foi realizado: Redação e publicação do PRD v0.4 em `PRD-SalusDev-v0.3.md` com a nova Seção de Interligação de Sistemas, requisitos de PWA, divisão detalhada `[D]` e `[M]`, e roadmap reestruturado em 5 fases.
   - Critério de passagem: Concluído e validado.
4. **`@qa` (Etapa 4 - Auditoria de Qualidade e Rastreabilidade):**
   - O que foi realizado: Auditoria completa de consistência, rastreabilidade dos requisitos de escopo, verificações de segurança e integridade documental.
   - Critério de passagem: Emitido parecer de qualidade PASS.
5. **`@aiox-master` (Etapa 5 - Consolidação e Fechamento do Plano):**
   - O que foi realizado: Coleta e registro dos relatórios finais dos agentes, atualização do índice de planos e do estado diário em `ESTADO-ATUAL.md`.
   - Critério de passagem: Plano finalizado e apresentado a Rafael.

## Escopo

- [x] Atualizar `RegrasDesenvolvimento.md` com suporte a PWA e diretriz obrigatória de Desktop `[D]` e Mobile `[M]` (R11 e Seção 8.4).
- [x] Especificar no PRD a topologia de domínios e subdomínios (`salusdev.com`, `admin.salusdev.com` e `[produto].salusdev.com`).
- [x] Especificar a arquitetura de Web App e PWA (manifesto web, instalação, cache estático e experiência offline mínima).
- [x] Estruturar requisitos de interface divididos claramente em Desktop `[D]` (1024 px / 1440 px) e Mobile `[M]` (360 px / 768 px).
- [x] Especificar o contrato canônico de registro e governança de aplicações no Centro de Comando.
- [x] Definir o modelo de fronteira e isolamento de dados (gestão centralizada no Admin vs. dados operacionais isolados nos produtos satélites).
- [x] Reestruturar o roadmap do PRD (Seção 21) priorizando a Fundação e Interligação como Fase 1 e movendo Leads e Pagamentos para fases subsequentes.
- [x] Publicar a versão `v0.4` do PRD.

## Fora de escopo

- Implementação de formulários de leads e e-mails transacionais (fase posterior - Fase 3 do Roadmap).
- Implementação de cobrança e integração com Mercado Pago (fase posterior - Fase 4 do Roadmap).
- Provisionamento de banco de dados de produção neste momento.

## Tarefas

- [x] `@aiox-master`: Atualizar `RegrasDesenvolvimento.md` (R11, R16, Seção 8.4 e Seção 5.4).
- [x] `@aiox-master`: Adequar o Plano 0002 com agentes, sequência, PWA e divisões `[D]` e `[M]`.
- [x] `@architect`: Elaborar especificação técnica da interligação de sistemas, contratos e arquitetura PWA.
- [x] `@pm`: Atualizar e redigir o `PRD-SalusDev-v0.3.md` para v0.4 incorporando PWA, `[D]`, `[M]` e novo roadmap.
- [x] `@qa`: Executar auditoria de qualidade documental e rastreabilidade no PRD v0.4.
- [x] `@aiox-master`: Registrar relatórios finais de cada agente e apresentar entrega para validação de Rafael.

## Rotas e arquivos afetados

- `docs/produto/RegrasDesenvolvimento.md`
- `docs/plan/0002 - fundacao-de-interligacao-e-atualizacao-prd.md`
- `docs/plan/README.md`
- `docs/produto/PRD-SalusDev-v0.3.md`
- `docs/handof/ESTADO-ATUAL.md`

## Criterios de aceite

- [x] Diretriz mestre `RegrasDesenvolvimento.md` define formalmente Web App, PWA, Desktop `[D]` e Mobile `[M]`.
- [x] Plano 0002 contém lista de agentes participantes, ordem/sequência de atuação e área de relatórios finais.
- [x] O PRD v0.4 trata explicitamente os requisitos sob a ótica Desktop `[D]` e Mobile `[M]`.
- [x] O PRD v0.4 inclui a arquitetura e premissas de PWA para o Web App.
- [x] O repositório `salusdev-site` e o `salusdev-admin` estão integrados na topologia do PRD v0.4.
- [x] O roadmap do PRD reflete com precisão que a Fundação de Interligação vem antes de Leads e Pagamentos.
- [x] Cada agente participante emite seu relatório final registrado no plano.

## Relatórios finais dos agentes

### Relatório - `@aiox-master` (Orion)
- **Status:** Concluído / Aprovado
- **Entregas realizadas:** Diretrizes mestre consolidadas em `RegrasDesenvolvimento.md` (v1.3) com regras R11, R16, suporte a PWA e divisão obrigatória `[D]` e `[M]`. Orquestração da esteira de trabalho realizada em conformidade com o AIOX. Fechamento e consolidação do Plano 0002.
- **Observações:** A governança do projeto está blindada contra ambiguidades. Próximos planos já herdarão o sequenciamento, papéis dos agentes e padrões de entrega.

### Relatório - `@architect` (Aria)
- **Status:** Concluído / Aprovado
- **Decisões registradas:**
  - Topologia de subdomínios definida (`salusdev.com`, `admin.salusdev.com` e `[produto].salusdev.com`).
  - Mapeamento explícito dos repositórios GitHub (`https://github.com/RafSalus/salusdev-site` e `salusdev-admin`).
  - Estabelecimento do contrato canônico de aplicações (`SystemContract`) para catálogo no Centro de Comando.
  - Diretriz obrigatória de isolamento estrito de dados operacionais nos produtos SaaS satélites.
  - Especificação de PWA (`manifest.json`, Service Worker com cache estático resiliente e A2HS para desktop e mobile).
- **Observações:** A arquitetura desacoplada protege o produto contra acoplamento indevido e vazamento de dados.

### Relatório - `@pm` (Morgan)
- **Status:** Concluído / Aprovado
- **Entregas realizadas:**
  - Redação e publicação da versão **v0.4** do PRD em `docs/produto/PRD-SalusDev-v0.3.md`.
  - Reestruturação do Roadmap em 5 fases bem delineadas, priorizando a Fundação e Vitrine Digital e postergando automações de leads e pagamentos para as Fases 3 e 4.
  - Matriz de escopo MoSCoW aplicada na Fase 1.
  - Todos os requisitos de experiência e interface reescritos com divisão explícita entre Desktop `[D]` e Mobile `[M]`.
- **Observações:** O PRD agora reflete exatamente a visão de produto alinhada com Rafael e desbloqueia a implementação do site institucional.

### Relatório - `@qa` (Quinn)
- **Status:** PASS (100% de conformidade)
- **Testes executados:**
  - Verificação de rastreabilidade do escopo: Todos os 8 itens de escopo foram cobertos no PRD v0.4.
  - Conformidade com a convenção Desktop `[D]` e Mobile `[M]`: Validada em todas as seções de escopo, interface e critérios de aceite.
  - Verificação de ausência de credenciais ou segredos em código/documento: 100% em conformidade.
  - Integridade de formatação markdown e links de arquivos: Aprovado.
- **Observações:** Parecer conclusivo favorável para início dos trabalhos práticos da Fase 1 / Fase 2.

## Riscos e bloqueios

- Nenhum bloqueio ativo.

## Historico de versoes

| Versao | Data | Alteracao | Agente |
|---|---|---|---|
| 1.0 | 2026-11-05 | Criação do plano inicial para fundação de interligação dos sistemas e atualização do PRD | @aiox-master |
| 1.1 | 2026-11-05 | Inclusão de agentes participantes, sequência ordenada com critérios e relatórios finais conforme regra R16 | @aiox-master |
| 1.2 | 2026-11-05 | Inclusão de requisitos de Web App, suporte a PWA e tratamento obrigatório Desktop [D] e Mobile [M] | @aiox-master |
| 1.3 | 2026-11-05 | Conclusão das tarefas, registro dos relatórios finais individuais de todos os agentes e aprovação formal | @aiox-master |
