# BUG-0001 - Fechamento Indevido do Drawer Móvel ao Rolar Conteúdo

- **ID:** BUG-0001
- **Título:** Fechamento indevido do drawer móvel ao rolar conteúdo interno
- **Severidade:** Média
- **Prioridade:** Alta
- **Status:** Resolvido (Plano 0009)
- **Componente afetado:** `src/components/layout/MobileMenuDrawer.tsx`
- **Ambiente:** Mobile Touch (`[M]`, iOS / Android)
- **Aberto em:** 2026-11-06
- **Responsável:** `@dev` (Dex)
- **Relatado por:** Rafael Amaral Salustiano

---

## 1. Descrição do Problema

No componente `MobileMenuDrawer.tsx`, os event handlers de toque (`onTouchStart`, `onTouchMove`, `onTouchEnd`) estavam aplicados na `div` principal que envolve todo o Bottom Sheet.

Quando o usuário tenta rolar a lista de itens de navegação para baixo com o polegar, o evento de toque é capturado pelo container principal, interpretando o movimento vertical como uma tentativa de arrastar para fechar, provocando o fechamento acidental do menu enquanto o usuário apenas tentava visualizar o conteúdo inferior.

---

## 2. Passos para Reproduzir

1. Abrir a aplicação em viewport mobile (`360 px` ou smartphone físico).
2. Tocar no botão *"Menu"* na barra inferior ou no avatar no topo.
3. Com o menu aberto, tentar rolar a lista para baixo pelo meio da tela.
4. O menu se fecha em vez de rolar suavemente a lista interna.

---

## 3. Causa Raiz

Os manipuladores de gesto de toque foram atrelados ao container global do Bottom Sheet ao invés de ficarem restritos exclusivamente à alça de arraste superior (*drag handle*).

---

## 4. Correção Aplicada e Validação

1. Os manipuladores `onTouchStart`, `onTouchMove` e `onTouchEnd` foram isolados no container superior da alça de arraste (*drag handle container*).
2. Aplicou-se `touchAction: "none"` estritamente na alça de arraste, garantindo captura fluida do swipe down para dispensar.
3. A área interna com `overflow-y-auto` foi desacoplada de listeners touch, permitindo navegação e rolagem verticais suaves e sem bloqueios.
4. **Resolução:** Validado por `@qa` em build de produção e verificação manual em viewport móvel (`360 px` e smartphone físico via localtunnel).
- **Data de Resolução:** 2026-11-06
