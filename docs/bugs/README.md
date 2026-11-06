# Sistema de Bugs - SalusDev

Registro oficial de bugs do projeto. As regras completas estão em `docs/produto/RegrasSystema.md`, Seção 18.

## Como registrar

1. Copie `templates/bug-template.md`.
2. Crie o arquivo `BUG-NNNN - slug-curto.md` nesta pasta.
3. Use o próximo número disponível em `INDEX.md`; nunca reutilize um número.
4. Preencha passos para reproduzir, resultado esperado, resultado atual e evidência.
5. Classifique severidade e prioridade.
6. Adicione a linha correspondente em `INDEX.md`.

## Ciclo de vida

```text
Novo -> Triado -> Reproduzido -> Em correção -> Em validação -> Resolvido -> Fechado
```

Variações: `Bloqueado`, `Não reproduzido`, `Duplicado`, `Rejeitado` e `Reaberto`.

## Severidade

| Código | Critério |
|---|---|
| S1 | Perda de dado, falha de segurança, erro de pagamento, indisponibilidade total ou incidente com dado pessoal |
| S2 | Fluxo principal quebrado sem alternativa |
| S3 | Fluxo afetado com alternativa de contorno |
| S4 | Problema visual, texto ou comportamento menor |

## Prioridade

| Código | Atendimento |
|---|---|
| P0 | Contenção imediata e correção no mesmo dia |
| P1 | Próximo ciclo de trabalho |
| P2 | Backlog priorizado |
| P3 | Pode aguardar próxima versão |

## Regras de isolamento

- Reproduzir antes de corrigir.
- Criar branch `fix/BUG-NNNN-slug`.
- Escrever o teste que falha antes da correção.
- Corrigir apenas o escopo do bug.
- Não misturar refatoração, renomeação ou formatação não relacionada.
- Rodar a suíte de regressão e comparar com o baseline aprovado.
- Validar `[D]` e `[M]` quando aplicável.
- Atualizar o registro, `INDEX.md` e o handoff.

## Evidências

Salvar em `evidencias/BUG-NNNN/` com nomes como `antes.png` e `depois.png`. Nunca incluir dado pessoal real, credencial ou segredo.

## Segurança e LGPD

- Bug de segurança deve ser tratado de forma restrita até a correção.
- Se houver dado pessoal, acionar também o fluxo de incidente da Seção 15.6 de `RegrasSystema.md`.
- Bug fechado não é apagado; permanece como histórico e auditoria.
