# Inventário de Telas e Especificação de Viewports [D] e [M]

- **Documento:** Catálogo e Comportamento Responsivo das Telas
- **Versão:** 1.0
- **Data:** 2026-11-06
- **Agente:** `@ux-design-expert` (Uma)
- **Status:** Homologado
- **Referências:** [PRD-SalusDev-v0.3.md](file:///D:/SalusDev%20-%20Admin/doc/produto/PRD-SalusDev-v0.3.md) (v0.4) e [DESIGN-SYSTEM.md](file:///D:/SalusDev%20-%20Admin/docs/design/DESIGN-SYSTEM.md)

---

## 1. Visão Geral

Em total conformidade com a regra `R11` e `GER-03`, toda tela do ecossistema SalusDev possui requisitos, comportamentos e testes especificados e divididos estritamente entre **Desktop `[D]`** (1024px e 1440px) e **Mobile `[M]`** (360px e 768px).

---

## 2. Inventário de Telas - Centro de Comando (`salusdev-admin`)

### 2.1 Tela ADM-01: Login e Autenticação Multifator (MFA / 2FA)

- **Objetivo:** Autenticar o operador via e-mail e senha e exigir validação de segundo fator (TOTP) antes de conceder acesso.
- **Referência Visual Canônica:**
  - Desktop `[D]`: `docs/design/img/login - D .png`
  - Mobile `[M]`: `docs/design/img/Login - M.png`
- **Desktop `[D]`:**
  - Layout dividido em duas colunas (split-screen institucional 45/55):
    - **Coluna Esquerda:** Fundo verde institucional profundo (`#163e32`) com logotipo `</> SalusDev`, headline de alto impacto (*"Sua operação, em um só lugar."*), descrição de autoridade e links legais de rodapé (*Privacidade* e *Termos de uso*).
    - **Coluna Direita:** Fundo suave (`#f8faf8`), selo de *"Acesso seguro"* no topo direito, card flutuante centralizado (`#ffffff`, border `#eaecf0`) com badge `</> SalusDev`, saudação *"Boas-vindas de volta"*, campos com tipografia e espaçamentos precisos, checkbox *"Lembrar de mim"*, atalho *"Esqueci minha senha"*, botão verde floresta *"Entrar →"* e rodapé com link *"Precisa de ajuda?"*.
    - **Etapa MFA:** Transição suave no mesmo card, mantendo o cabeçalho e exibindo a grade de 6 dígitos numéricos com avanço automático.
- **Mobile `[M]`:**
  - Superfície 100% branca e limpa (sem banner escuro, exatamente conforme `Login - M.png`).
  - Topo: Logotipo `< /> SalusDev` com badge em fundo menta claro (`#eef7f2`) e tipografia escura.
  - Formulário fluido ocupando a largura total (sem bordas de card externo), com títulos em destaque, campos em cantos arredondados, toggle de visualização de senha e botão *"Entrar →"*.
  - Rodapé do formulário: chamada *"Ainda não tem uma conta? Criar conta"*.
  - Rodapé inferior centralizado: link *"Precisa de ajuda?"* e links legais em cinza *"Privacidade • Termos de uso"*.
  - O campo de código de 6 dígitos ativa automaticamente o teclado numérico virtual (`inputMode="numeric"`).
  - Alvos de toque `>= 44 px`.

### 2.2 Tela ADM-02: Dashboard Executivo e Hub Mobile (`/dashboard` ou `/`)

- **Objetivo:** Ponto de entrada operacional pós-autenticação. Prover visão executiva consolidada no desktop e atalhos de alta produtividade com um toque no mobile.
- **Referência Visual Canônica:**
  - Desktop `[D]`: `docs/design/img/Dashboard - D.png`
  - Mobile `[M]`: `docs/design/img/Dashboard - M.png`
- **Mobile `[M]` (Hub Operacional):**
  - **Topo:** Barra superior com logotipo `< /> SalusDev` (badge menta claro `#eef7f2`), sino de notificações com indicador de não lidas e avatar circular `RA` (`#eaf3ee`).
  - **Saudação:** Título de alto impacto *"Olá, Rafael"* e subtítulo *"Acesse rapidamente as principais áreas do seu portfólio."*.
  - **Atalhos Rápidos em Squircles:** Grade de 3 colunas com cartões brancos arredondados (`rounded-[24px]`), elevação suave, feedback ao toque e ícones coloridos:
    - **Principal:** Dashboard (verde `#23634e`), Produtos (`</>` âmbar `#c18442`), Atendimentos (check azul `#3d7ca8`);
    - **Comercial:** Clientes (pessoas roxo `#7d5ba6`), Leads (`+` verde `#2f8064`), Contratos (sino âmbar `#c18442`);
    - **Operacional:** Assinaturas (check azul `#3d7ca8`), Pagamentos (cartão roxo `#7d5ba6`), Configurações (grid verde `#23634e`).
  - **Barra de Navegação Inferior (Mobile Tab Bar):** Fixa no rodapé (`lg:hidden`), altura 64px, com 5 ações essenciais: *Início*, *Leads*, *Produtos*, *Clientes* e *Menu* (abertura do drawer lateral). Alvos de toque `>= 48 px`.
- **Desktop `[D]` (Visão Executiva):**
  - **Sidebar:** Fixa à esquerda (252px) com navegação agrupada em *Visão geral* e *Gestão*, links de *Configurações* e *Ajuda*, e perfil administrativo.
  - **Header:** Breadcrumbs, indicador de ambiente (*Ambiente de protótipo*), sino de notificações e botão de encerramento seguro de sessão.
  - **Métricas Operacionais:** 4 cards analíticos (Total de produtos, Em construção, Sistemas ativos e Clientes vinculados) com selo *"Atualizado agora"*.
  - **Painel de Monitoramento de Sistemas:** Status contínuo (Online, Piloto, Operacional) com latência, uptime e tipo de serviço para cada aplicação.
  - **Atividades Recentes e Atalhos de Operação:** Acesso imediato a cadastro de produtos, clientes, funil de leads e configurações.

### 2.3 Tela ADM-03: Catálogo Central de Produtos e Sistemas (`/produtos`)

- **Objetivo:** Visualizar, filtrar, pesquisar e gerenciar todas as aplicações do ecossistema SalusDev.
- **Referência Visual Canônica:** `docs/design/img/Dashboard - D.png`
- **Desktop `[D]`:**
  - Sidebar fixa à esquerda com logotipo oficial `< /> SalusDev CENTRO DE COMANDO`.
  - Header com tag superior `PORTFÓLIO DE SISTEMAS`, título `Produtos`, descrição e botão `+ Novo produto`.
  - Cards de estatísticas com total de produtos (05), em desenvolvimento (01), ativos (01) e clientes vinculados (04).
  - Barra de pesquisa integrada com abas de filtro por status (*Todos*, *Planejamento*, *Desenvolvimento*, *Piloto*, *Ativo*).
  - Contador de itens encontrados (*5 produtos encontrados*) e indicador *Visualização em grade*.
  - Grid de produtos tricolunar (`lg:grid-cols-3`) com cartões contendo selo colorido de iniciais (SD, SO, FP, KC, SC), descrição, barra de progresso com porcentagem, tag de status e contagem de clientes.
  - Rodapé legal com aviso de dados fictícios de protótipo.
- **Mobile `[M]`:**
  - Acessível diretamente pelo squircle *Produtos* ou pela barra inferior *Produtos*.
  - Lista de produtos adaptada com campos de toque expandidos e barra inferior persistente.

### 2.4 Tela ADM-04: Gestão do Produto (KartControl)

- **Objetivo:** Ponto centralizado de gestão técnica, acessos administrativos e controle de credenciais de um produto específico do portfólio.
- **Referência Visual Canônica:**
  - Desktop `[D]`: `docs/design/img/kartcontrol/Produtokartcontrol - D.png`
- **Desktop `[D]`:**
  - Header com breadcrumb dinâmico `Produtos > KartControl > Gestão` e link de retorno `← Voltar ao portfólio`.
  - Hero header com squarcle `KC`, categoria `GESTÃO DO PRODUTO · SISTEMA DE GESTÃO`, descrição institucional, badge `● Piloto`, métrica `1 cliente` e barra de progresso `84%`.
  - Banner informativo `Dados de demonstração` em verde suave.
  - Card `Administração`: ponto de acesso centralizado com status e botão `Entrar`.
  - Grade de 2 colunas:
    - Coluna 1: `Informações técnicas` (Repositório com Copiar/Abrir/Editar, Banco de dados com Configurar, Endereço web com Copiar/Abrir/Editar).
    - Coluna 2: `Acessos do produto` (Painel de controle com Configurar, E-mail com Configurar, Senha de acesso com bullets mascarados e atalho Alterar senha).
  - Card `Alterar senha`: formulário funcional com Senha atual, Nova senha, Confirmar nova senha e botão `Salvar alteração`.
  - Rodapé institucional `SalusDev · Informações e acessos do produto`.
- **Mobile `[M]`:**
  - Grade de 2 colunas colapsa fluidamente para 1 coluna vertical.
  - Alvos de toque `>= 44 px` em todos os botões de ação e inputs com fonte `>= 16 px`.
  - Compatibilidade com safe area (`pt-safe` no topo e `pb-32` na base).

### 2.5 Tela ADM-05: Monitoramento e Healthcheck de Sistemas (`/sistemas`)

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
