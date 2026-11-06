# BUG-0003 - Header Escondido Atrás das Horas e Barra de Status no Safari iOS

- **ID:** BUG-0003
- **Título:** Header escondido atrás do relógio (horas) e barra de status no Safari iOS
- **Severidade:** Média
- **Prioridade:** Alta
- **Status:** Resolvido
- **Componente afetado:** `src/components/layout/Header.tsx`, `src/features/auth/LoginScreen.tsx`
- **Ambiente:** Mobile Safari (`[M]`, iOS com `safe-area-inset-top` e `viewport-fit=cover`)
- **Aberto em:** 2026-11-06
- **Responsável:** `@dev` (Dex)
- **Relatado por:** Rafael Amaral Salustiano

---

## 1. Descrição do Problema

Ao visualizar a aplicação em navegadores Safari ou em modo PWA no iPhone (modelos com *notch* ou *Dynamic Island*, como iPhone X ao 16), o cabeçalho superior (`Header`) ficava posicionado diretamente no topo físico da tela (`top: 0`), fazendo com que o logotipo SalusDev, o botão de notificações e o avatar do perfil ficassem sobrepostos e ocultos atrás das horas (relógio do sistema), indicadores de bateria/rede e da área de câmera.

---

## 2. Passos para Reproduzir

1. Abrir a aplicação em um iPhone físico utilizando o Safari (ex: `https://salusdev-admin.loca.lt`).
2. Fazer login e carregar o Dashboard.
3. Observar o topo da tela.
4. O logotipo e os ícones do Header colidiam visualmente com o relógio ("15:30") e os ícones da barra de status do iOS.

---

## 3. Causa Raiz

Com a inclusão de `viewport-fit=cover` no `index.html`, a viewport web se expande por toda a superfície física do display, invadindo a área da barra de status (`safe-area-inset-top`).

O componente `Header.tsx` possuía a classe `sticky top-0 h-[68px]`, sem nenhum preenchimento seguro no topo (`pt-safe`). Portanto, o conteúdo do cabeçalho iniciava imediatamente no pixel zero, exatamente onde o sistema operacional iOS desenha a barra de status (relógio, sinal e bateria) que ocupa entre `44px` e `59px` de altura.

---

## 4. Correção Aplicada e Validação

1. **Aplicação de Safe Area no Header:**
   - Adicionada a classe `.pt-safe` no container `<header>` em `src/components/layout/Header.tsx`.
   - Criada uma linha interna com altura `h-16` (`64px` no mobile) e `sm:h-[68px]` no desktop.
   - O `<header>` estende seu efeito translúcido (*frosted glass*) por trás da barra de status, enquanto o conteúdo interativo (logo, sino e avatar) é empurrado com segurança para baixo da barra de status.
2. **Aplicação de Safe Area na Tela de Login:**
   - Adicionadas as classes `pt-safe` e `pb-safe` em `src/features/auth/LoginScreen.tsx`, garantindo que no login mobile o logotipo também não colida com as horas.
3. **Data de Resolução:** 2026-11-06.
