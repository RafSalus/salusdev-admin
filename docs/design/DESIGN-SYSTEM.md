# Design System SalusDev - Diretrizes Visuais e Tokens

- **Documento:** Especificação do Design System e Componentes
- **Versão:** 1.0
- **Data:** 2026-11-06
- **Agente:** `@ux-design-expert` (Uma)
- **Status:** Homologado
- **Referências:** [RegrasSystema.md](file:///D:/SalusDev%20-%20Admin/docs/produto/RegrasSystema.md) e [ARCHITECTURE.md](file:///D:/SalusDev%20-%20Admin/docs/arquitetura/ARCHITECTURE.md)

---

## 1. Princípios de Design

1. **Eficiência e Densidade Equilibrada:** As interfaces devem priorizar a clareza e a rapidez de execução das tarefas, apresentando os dados com espaçamentos confortáveis tanto no mouse quanto no toque.
2. **Consistência Semântica:** A mesma cor, ícone ou componente deve ter exatamente o mesmo significado em todas as telas e produtos do ecossistema.
3. **Acessibilidade Universal (WCAG 2.1 AA):** Relação de contraste mínima de 4.5:1 para texto normal, 3:1 para texto grande e componentes visuais, foco visível obrigatório em todos os elementos interativos.
4. **Alvos de Toque Confortáveis (Mobile `[M]`):** Qualquer botão, item de menu ou link clicável deve possuir área interativa mínima de 44 x 44 pixels.
5. **Comunicação Textual Limpa:** Português do Brasil com acentuação correta, linguagem direta e ausência do caractere `&` em texto visível.

---

## 2. Tokens de Cor (Design Tokens)

O sistema de cores adota a paleta refinada construída sobre Tailwind CSS v4, garantindo harmonia entre temas claros e áreas de alto contraste:

### 2.1 Cores Primárias e de Marca

| Nome do Token | Valor Hex | Classe Tailwind | Aplicação Primária |
|---|---|---|---|
| `brand-primary-50` | `#eff6ff` | `bg-blue-50` | Fundos de cards destacados e alertas sutis |
| `brand-primary-500` | `#3b82f6` | `bg-blue-500` | Botões secundários, ícones de foco |
| `brand-primary-600` | `#2563eb` | `bg-blue-600` | Cor mestre de ação primária, botões principais |
| `brand-primary-700` | `#1d4ed8` | `bg-blue-700` | Estado de hover em botões primários |

### 2.2 Cores Neutras e Estruturais (Superfícies e Tipografia)

| Nome do Token | Valor Hex | Classe Tailwind | Aplicação Primária |
|---|---|---|---|
| `surface-canvas` | `#f8fafc` | `bg-slate-50` | Fundo principal da página (canvas) |
| `surface-card` | `#ffffff` | `bg-white` | Fundo de cartões, modais e painéis |
| `surface-muted` | `#f1f5f9` | `bg-slate-100` | Fundo de inputs, cabeçalhos de tabela e separadores |
| `border-subtle` | `#e2e8f0` | `border-slate-200` | Linhas de divisão, contornos de cartões |
| `border-strong` | `#cbd5e1` | `border-slate-300` | Bordas de inputs não focados |
| `text-primary` | `#0f172a` | `text-slate-900` | Títulos principais e textos de destaque |
| `text-secondary` | `#475569` | `text-slate-600` | Corpo de texto, descrições e legendas |
| `text-muted` | `#94a3b8` | `text-slate-400` | Placeholders e textos desativados |

### 2.3 Cores Semânticas de Estado

| Estado | Token de Fundo | Token de Texto | Aplicação |
|---|---|---|---|
| **Sucesso (Ativo)** | `bg-emerald-50` | `text-emerald-700` / `border-emerald-200` | Status "Ativo", confirmações bem-sucedidas |
| **Alerta (Piloto / Atenção)** | `bg-amber-50` | `text-amber-700` / `border-amber-200` | Status "Piloto", avisos e pendências |
| **Desenvolvimento** | `bg-blue-50` | `text-blue-700` / `border-blue-200` | Status "Desenvolvimento", recursos em teste |
| **Planejamento** | `bg-purple-50` | `text-purple-700` / `border-purple-200` | Status "Planejamento", novas ideias |
| **Erro / Descontinuado** | `bg-rose-50` | `text-rose-700` / `border-rose-200` | Falhas, validações incorretas, "Descontinuado" |

---

## 3. Tipografia e Escala

A família tipográfica padrão é **Inter**, complementada por fontes de sistema sans-serif nativas para desempenho máximo:

| Nível | Tamanho / Altura | Peso | Classe Tailwind | Uso Recomendado |
|---|---|---|---|---|
| **Título Principal (H1)** | 24px / 32px | Semibold (600) | `text-2xl font-semibold` | Cabeçalho de página e títulos de dashboard |
| **Subtítulo (H2)** | 18px / 28px | Semibold (600) | `text-lg font-semibold` | Títulos de cards e seções internas |
| **Título de Seção (H3)** | 16px / 24px | Medium (500) | `text-base font-medium` | Rótulos de painéis e modais |
| **Corpo Normal** | 14px / 20px | Regular (400) | `text-sm font-normal` | Dados de tabela, parágrafos e formulários |
| **Texto Compacto** | 12px / 16px | Regular (400) | `text-xs font-normal` | Badges, datas, legendas e metadados |

---

## 4. Componentes Atômicos Padronizados

### 4.1 Botões (`Button`)

- **Primário:** Fundo azul (`bg-blue-600`), texto branco, sombra suave (`shadow-sm`), cantos arredondados (`rounded-lg`). Foco visível com anel duplo (`focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`).
- **Secundário:** Fundo branco, borda cinza (`border border-slate-300`), texto escuro (`text-slate-700`), hover sutil (`hover:bg-slate-50`).
- **Ação Destrutiva / Perigo:** Fundo vermelho (`bg-rose-600`), texto branco. **Obrigatório** diálogo de confirmação explícito antes de executar a ação (`GER-12`).
- **Alvos de Toque no Mobile `[M]`:** Altura mínima de 44px (`h-11`) ou padding equivalente.

### 4.2 Badges de Status (`Badge`)

Componente semântico compacto com cantos arredondados (`rounded-full`), texto em peso médio (`font-medium`) e borda sutil:

- `Ativo`: Fundo esmeralda claro, texto verde escuro;
- `Piloto`: Fundo âmbar claro, texto âmbar escuro;
- `Desenvolvimento`: Fundo azul claro, texto azul escuro;
- `Planejamento`: Fundo roxo claro, texto roxo escuro;
- `Descontinuado`: Fundo cinza/rosa claro, texto discreto.

### 4.3 Formulários e Inputs

- Bordas definidas (`border-slate-300`), cantos `rounded-lg`, foco destacado (`focus:border-blue-600 focus:ring-1 focus:ring-blue-600`).
- Mensagens de erro posicionadas imediatamente abaixo do campo, com ícone de alerta e texto em vermelho legível.
- Proibição absoluta de alertas nativos do navegador (`window.alert` ou `confirm`), utilizando sempre componentes de feedback integrados na tela (`GER-07`).

### 4.4 Notificações e Toasts (`Toast`)

- Posicionados no canto superior ou inferior direito no Desktop `[D]`, e fixos na parte inferior ou superior central com largura adaptada no Mobile `[M]`.
- Temporizador automático com botão de fechamento manual e ícone semântico correspondente.

---

## 5. Diretrizes de Layout e Responsividade

| Viewport de Teste | Dispositivo Típico | Comportamento da Casca (AppShell) |
|---|---|---|
| **360 px** | Smartphone pequeno (Mobile `[M]`) | Sidebar recolhida em Drawer, header compacto, cards em coluna única, alvos >= 44px |
| **768 px** | Tablet vertical / Dobrável | Menu lateral retraído por padrão, grid em 2 colunas |
| **1024 px** | Notebook / Tablet horizontal (Desktop `[D]`) | Sidebar recolhível com ícones, grid em 3 colunas, densidade moderada |
| **1440 px** | Monitor Desktop grande (Desktop `[D]`) | Sidebar expandida fixa, grid em até 4 colunas, métricas em painel completo |
