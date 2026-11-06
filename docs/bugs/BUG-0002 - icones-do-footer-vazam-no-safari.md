# BUG-0002 - Topo dos Ícones da Barra Inferior (Footer) Vazando para Fora no Safari iOS

- **ID:** BUG-0002
- **Título:** Topo dos ícones da barra inferior (footer) vazando para fora no Safari iOS
- **Severidade:** Média
- **Prioridade:** Alta
- **Status:** Resolvido
- **Componente afetado:** `src/components/layout/MobileTabBar.tsx`, `src/index.css`
- **Ambiente:** Mobile Safari (`[M]`, iOS com `safe-area-inset-bottom`)
- **Aberto em:** 2026-11-06
- **Responsável:** `@dev` (Dex)
- **Relatado por:** Rafael Amaral Salustiano

---

## 1. Descrição do Problema

Ao visualizar a aplicação em navegadores Safari no iPhone (dispositivos com *home indicator* como iPhone X a 16), o topo dos ícones dos botões da barra inferior de navegação (`MobileTabBar`) ficava projetado para cima, vazando para fora da borda superior do footer sobre o fundo da página.

---

## 2. Passos para Reproduzir

1. Abrir a aplicação em um iPhone físico utilizando o navegador Safari (ex: via túnel `https://salusdev-admin.loca.lt`).
2. Fazer login e acessar o Dashboard.
3. Observar a barra inferior (`MobileTabBar`).
4. Os ícones apareciam empurrados para cima, ultrapassando a borda superior do componente.

---

## 3. Causa Raiz

No componente `MobileTabBar.tsx`, a classe `h-[68px]` estava aplicada no mesmo container `<nav>` que continha a classe `.pb-safe`.

No iOS Safari, com a meta tag `viewport-fit=cover` habilitada, a variável `env(safe-area-inset-bottom)` retorna aproximadamente `34px`.

Devido ao modelo de caixa `box-sizing: border-box`:
- Altura total do container: `68px`
- Borda superior: `1px`
- Preenchimento inferior (*padding-bottom* do safe area): `~34px`
- **Altura útil restante para o conteúdo:** `68px - 1px - 34px = 33px`

Como os botões internos possuíam altura de aproximadamente `50px` a `54px`, o alinhamento flexível `items-center` forçava os botões a se centralizarem dentro da área útil de apenas `33px`. Isso fazia com que a metade superior do botão se projetasse cerca de `10px` **para cima da borda superior** do container, causando o vazamento visual dos ícones.

---

## 4. Correção Aplicada e Validação

1. **Desacoplamento de dimensões:** Removeu-se a restrição de altura fixa `h-[68px]` do container `<nav>`.
2. **Separação de camadas:**
   - O `<nav>` atua como moldura de fundo e recebe a classe `.pb-safe`, estendendo o efeito translúcido (*frosted glass*) até a base física do aparelho.
   - Criou-se uma `div` interna com altura explícita `h-16` (`64px`) para acomodar os botões de ação e ícones.
   - Os botões foram dimensionados com `h-[52px]` e ícones de `21px`, garantindo folga superior e inferior mínima de `6px` dentro da linha de `64px`.
3. **Refinamento do `.pb-safe` em `src/index.css`:**
   - Adicionada compatibilidade com `constant(safe-area-inset-bottom)` (fallback legado) e `env(safe-area-inset-bottom, 0px)`.
4. **Espaçamento do conteúdo:**
   - Ampliado o padding inferior em `AppShell.tsx` e `MobileDashboardHub.tsx` para `pb-32` no mobile, garantindo que o rodapé ampliado pelo safe area nunca cubra nenhum cartão ou dado.
5. **Data de Resolução:** 2026-11-06.
