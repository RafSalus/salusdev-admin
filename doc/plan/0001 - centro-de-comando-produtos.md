# Plano 0001 - Centro de Comando - Gestao de Produtos

- **Codigo:** 0001
- **Versao:** 1.0
- **Status:** Em andamento
- **Criado em:** 2026-11-05
- **Atualizado em:** 2026-11-05
- **Responsavel:** @aiox-master

## Objetivo

Implementar e validar o protótipo navegável da tela de Gestão de Produtos dentro do Centro de Comando da SalusDev, permitindo visualizar o portfólio de sistemas, filtrar por status, cadastrar e editar produtos fictícios, com layout responsivo e aderente à identidade visual inicial.

## Referencias

- PRD: `doc/produto/PRD-SalusDev-v0.3.md` (Seção 1 e Seção 5 - Centro de Comando)
- Regras de Desenvolvimento: `doc/produto/RegrasDesenvolvimento.md`
- Tela atual: `src/App.tsx`

## Escopo

- [x] Estrutura da barra lateral (Sidebar) com navegação administrativa e logo SalusDev.
- [x] Header com breadcrumbs, badge demonstrativo e botão de notificações.
- [x] Cards de métricas (Total de produtos, Em desenvolvimento, Ativos, Clientes vinculados).
- [x] Barra de busca por nome/categoria e filtro por status.
- [x] Listagem em grid com cards detalhados por produto (progresso, links simulados, status, clientes).
- [x] Modal de criação e edição de produtos com formulário.
- [x] Feedback visual temporário (Toast) ao salvar.
- [ ] Modularização de componentes e mocks em arquivos separados conforme diretrizes futuras.
- [ ] Validação rigorosa em 360 px, 768 px, 1024 px e 1440 px.

## Fora de escopo

- Conexão com banco de dados de produção ou Supabase.
- Autenticação real.
- Ações reais de deploy ou criação de repositórios reais no GitHub.
- Pagamentos e cobranças reais.

## Tarefas

- [x] Criar estrutura visual e layout da tela de Produtos.
- [x] Adicionar dados fictícios para sistemas SalusDev (Salus Oficina, Kart Control, etc.).
- [x] Implementar modal de cadastro/edição e filtros de busca.
- [ ] Corrigir build resolvendo dependência de `.figma/`.
- [ ] Validar responsividade em 360 px, 768 px, 1024 px e 1440 px.
- [ ] Executar build de produção sem erros.
- [ ] Apresentar para aprovação de Rafael.

## Rotas e arquivos afetados

- `src/App.tsx`
- `doc/plan/0001 - centro-de-comando-produtos.md`
- `doc/handof/ESTADO-ATUAL.md`

## Criterios de aceite

- [x] Tela coerente com os objetivos do Centro de Comando no PRD.
- [ ] Funciona visualmente em 360 px e 1440 px.
- [x] Navegação demonstrativa e formulários funcionando com mocks.
- [x] Sem dados reais ou segredos.
- [x] Aviso de demonstração presente no topo ("Ambiente de protótipo").

## Riscos e bloqueios

- Build quebrado temporariamente por arquivos ausentes em `.figma/`.

## Historico de versoes

| Versao | Data | Alteracao | Agente |
|---|---|---|---|
| 1.0 | 2026-11-05 | Criação do plano inicial consolidando a tela de Produtos do Centro de Comando | @aiox-master |
