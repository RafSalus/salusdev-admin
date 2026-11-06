# Plano 0005 - Adaptacao das Regras de Desenvolvimento ao Molde Mestre

- **Codigo:** 0005
- **Versao:** 1.0
- **Status:** Concluido
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsavel:** @aiox-master

## Releitura obrigatoria das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` antes de iniciar este plano.
- **Registro da releitura:** 2026-11-06 12:20 - @aiox-master

## Objetivo

Adaptar `doc/produto/RegrasDesenvolvimento.md` ao molde do documento mestre `Regras Desenvolvimento.md` (Parte I de processo e Parte II de sistema), preservando o sentido, o escopo e as regras específicas do repositorio `salusdev-admin`.

## Referencias

- Molde de origem: `Regras Desenvolvimento.md` (raiz do repositorio)
- Fonte canonica de sistema: `doc/produto/RegrasSystema.md` (v1.3)
- PRD: `doc/produto/PRD-SalusDev-v0.3.md` (v0.4 homologado)

## Agentes participantes

| Agente | Persona | Papel no plano | Entregavel esperado |
| --- | --- | --- | --- |
| `@aiox-master` | Orion | Orquestracao e redacao | Documento adaptado, plano registrado e handoff atualizado |

## Sequencia de execucao e responsabilidades

1. **`@aiox-master` (Etapa 1 - Releitura e analise):**
   - O que e esperado: reler `RegrasSystema.md` e comparar o molde de origem com o documento atual.
   - Criterio de passagem: divergencias e pontos de adaptacao identificados.
2. **`@aiox-master` (Etapa 2 - Redacao):**
   - O que e esperado: reescrever `RegrasDesenvolvimento.md` no molde mestre, com o sentido do projeto SalusDev.
   - Criterio de passagem: documento completo, sem contradicao com `RegrasSystema.md` e sem o caractere `&` em texto visivel.
3. **`@aiox-master` (Etapa 3 - Registro e fechamento):**
   - O que e esperado: registrar este plano, atualizar `doc/plan/README.md`, `ESTADO-ATUAL.md` e o handoff de abertura do dia.
   - Criterio de passagem: governanca atualizada.

## Escopo

- [x] Reestruturar o documento em Parte I (processo) e Parte II (sistema).
- [x] Adotar as secoes 0 a 12 do molde mestre.
- [x] Preservar o controle por planos numerados, sem stories detalhadas.
- [x] Preservar o escopo de prototipo, os dados ficticios e a arquitetura Multi-Repo.
- [x] Sincronizar a Parte II com os codigos vigentes de `RegrasSystema.md`.

## Fora de escopo

- Alteracao de codigo-fonte em `src/`.
- Alteracao de conteudo de `doc/produto/RegrasSystema.md`.
- Redacao dos documentos tecnicos do Plano 0004.

## Premissas e dependencias

- O molde de origem e `Regras Desenvolvimento.md` na raiz do repositorio.
- `RegrasSystema.md` permanece como fonte canonica da Parte II.

## Tarefas

- [x] `@aiox-master`: Reler `RegrasSystema.md` e registrar a releitura.
- [x] `@aiox-master`: Adaptar `RegrasDesenvolvimento.md` ao molde mestre.
- [x] `@aiox-master`: Registrar o Plano 0005 e atualizar o indice de planos.
- [x] `@aiox-master`: Atualizar `ESTADO-ATUAL.md` e o handoff de abertura do dia.

## Rotas e arquivos afetados

- `doc/produto/RegrasDesenvolvimento.md`
- `doc/plan/0005 - adaptacao-das-regras-de-desenvolvimento-ao-molde-mestre.md`
- `doc/plan/README.md`
- `doc/handof/ESTADO-ATUAL.md`
- `doc/handof/2026-11-06 - abertura.md`

## Criterios de aceite

- [x] Documento com o mesmo molde do arquivo de referencia.
- [x] Conteudo coerente com o projeto SalusDev.
- [x] Nenhuma contradicao com `RegrasSystema.md`.
- [x] Nenhum segredo ou dado real inserido.
- [x] Governanca de planos e handoff atualizada.

## Relatorios finais dos agentes

### Relatorio - `@aiox-master` (Orion)

- **Status:** Aprovado
- **Entregas realizadas:** `RegrasDesenvolvimento.md` reescrito em v2.0 no molde mestre, com Parte I de processo e Parte II de sistema; plano e handoffs atualizados.
- **Observacoes:** A Parte II e um espelho resumido e obrigatorio; a fonte canonica continua sendo `RegrasSystema.md`.

## Riscos

| Risco | Impacto | Mitigacao |
| --- | --- | --- |
| Divergencia entre Parte II e `RegrasSystema.md` | Medio | Espelho resumido com referencia explicita aos codigos e nota de prevalencia da fonte canonica |
| Perda de regras especificas do projeto | Alto | Revisao item a item do documento anterior antes da substituicao |

## Historico de versoes

| Versao | Data | Alteracao | Agente |
| --- | --- | --- | --- |
| 1.0 | 2026-11-06 | Adaptacao das regras de desenvolvimento ao molde mestre do projeto | @aiox-master |
