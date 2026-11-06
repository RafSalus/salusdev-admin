# Inventário de Telas e Especificação de Viewports [D] e [M]

- **Documento:** Catálogo e Comportamento Responsivo das Telas
- **Versão:** 1.0
- **Data:** 2026-11-06
- **Agente:** `@ux-design-expert` (Uma)
- **Status:** Homologado
- **Referências:** [PRD-SalusDev-v0.3.md](file:///D:/SalusDev%20-%20Admin/docs/produto/PRD-SalusDev-v0.3.md) (v0.4) e [DESIGN-SYSTEM.md](file:///D:/SalusDev%20-%20Admin/docs/design/DESIGN-SYSTEM.md)

---

## 1. Visão Geral

Em total conformidade com a regra `R11` e `GER-03`, toda tela do ecossistema SalusDev possui requisitos, comportamentos e testes especificados e divididos estritamente entre **Desktop `[D]`** (1024px e 1440px) e **Mobile `[M]`** (360px e 768px).

---

## 2. Inventário de Telas - Centro de Comando (`salusdev-admin`)

### 2.1 Tela ADM-01: Login e Autenticação Multifator (MFA / 2FA)

- **Objetivo:** Autenticar o operador via e-mail e senha e exigir validação de segundo fator (TOTP) antes de conceder acesso.
- **Desktop `[D]`:**
  - Card centralizado na tela com largura fixa de 420px, sombra suave e fundo limpo.
  - Teclado com foco automático no primeiro campo de texto.
  - Na tela de MFA, campos de 6 dígitos com avanço automático ao digitar cada dígito.
- **Mobile `[M]`:**
  - Card ocupando 100% da largura da tela (com padding lateral de 16px).
  - O campo de código de 6 dígitos ativa automaticamente o teclado numérico virtual (`inputMode="numeric"`).
  - Botão de envio fixo com altura mínima de 48px para facilitar o toque.

### 2.2 Tela ADM-02: Catálogo Central de Produtos e Sistemas (`/produtos`)

- **Objetivo:** Visualizar, filtrar, pesquisar e gerenciar todas as aplicações do ecossistema SalusDev.
- **Desktop `[D]`:**
  - Sidebar fixa à esquerda com ícones e rótulos completos.
  - Header com barra de pesquisa rápida, filtros por status em abas e botão primário "Novo Produto".
  - Seção de métricas (Cards de estatísticas com total de produtos, ativos, pilotos e clientes atendidos) em grade de 4 colunas.
  - Grid de produtos exibido em 3 ou 4 colunas com cartões ricos contendo tag de status, barra de progresso, botões de ação e links externos.
  - Painel lateral deslizante (Drawer) para exibição detalhada de metadados ao selecionar um item.
- **Mobile `[M]`:**
  - Sidebar oculta por padrão, acessível via botão de menu hambúrguer no topo (alvo de toque de 48x48px).
  - Métricas dispostas em carrossel horizontal de rolagem suave ou cartões empilhados compactos.
  - Lista de produtos em coluna única (cards verticais com largura total).
  - Modal em tela cheia (Fullscreen Drawer) para exibição de detalhes e formulários de edição.

### 2.3 Tela ADM-03: Gestão de Clientes e Assinaturas (`/clientes`)

- **Objetivo:** Consultar histórico de contratação, produtos ativos por cliente e status de atendimento.
- **Desktop `[D]`:**
  - Tabela densa com colunas: Razão Social, Contato Principal, Cidade/Região, Produtos Contratados, Status e Ações.
  - Filtros avançados por cidade e por produto no topo da listagem.
- **Mobile `[M]`:**
  - Transformação da tabela em lista de cartões expansíveis (estilo acordeon).
  - Cada cartão destaca o nome da empresa e o status, com botão direto de atalho para conversa no WhatsApp com um único toque.

### 2.4 Tela ADM-04: Monitoramento e Healthcheck de Sistemas (`/sistemas`)

- **Objetivo:** Acompanhar em tempo real a disponibilidade de subdomínios e versões de cada aplicação em produção.
- **Desktop `[D]`:**
  - Painel com grade de cartões operacionais.
  - Indicadores luminosos de latência, uptime e versão de compilação.
  - Botão de "Executar Healthcheck Manual" com feedback imediato via Toast.
- **Mobile `[M]`:**
  - Lista vertical resumida com badges verdes ou vermelhos e botão de teste rápido.

---

## 3. Inventário de Telas - Site Institucional (`salusdev-site`)

### 3.1 Tela WEB-01: Página Inicial (Home)

- **Objetivo:** Conversão de visitantes, posicionamento de autoridade e demonstração de portfólio.
- **Desktop `[D]`:**
  - Hero com tipografia em grande escala (H1 em 48px), ilustração interativa e dois botões de CTA ("Conhecer Soluções" e "Falar no WhatsApp").
  - Menu de navegação superior horizontal fixo com link sutil para acesso administrativo.
  - Seção de soluções com cartões expansíveis em grid de 3 colunas.
- **Mobile `[M]`:**
  - Hero adaptado para leitura em tela vertical (H1 em 28px), botões empilhados verticalmente.
  - Menu recolhido em gaveta lateral (Drawer com fundo escurecido e transição fluida).
  - Botão flutuante de WhatsApp fixo no canto inferior direito para contato imediato.

### 3.2 Tela WEB-02: Vitrine de Produtos (`/produtos`)

- **Objetivo:** Apresentar os softwares desenvolvidos pela SalusDev (como o Salus Oficina) para demonstração a potenciais clientes.
- **Desktop `[D]`:**
  - Cards amplos com screenshot do software, lista de diferenciais, status da solução e botão "Solicitar Demonstração".
- **Mobile `[M]`:**
  - Galeria de imagens com suporte a gestos de deslize (swipe) e botão de ação em largura completa.

### 3.3 Tela WEB-03: Privacidade e LGPD (`/privacidade`)

- **Objetivo:** Cumprir obrigações legais da LGPD e demonstrar compromisso ético com a segurança dos dados.
- **Desktop `[D]`:**
  - Layout com índice lateral fixo para navegação rápida entre os capítulos da política.
- **Mobile `[M]`:**
  - Navegação em fluxo contínuo com botão "Voltar ao Topo" fixo e tipografia otimizada para leitura móvel.
