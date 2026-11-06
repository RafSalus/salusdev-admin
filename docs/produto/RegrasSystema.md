# Regras do Sistema - SalusDev

**Documento de diretrizes de produto e interface do ecossistema SalusDev.**  
Define o que o sistema **deve** ter, o que **não deve** ter e o que **pode** ter, servindo como referência obrigatória para especificação, design, implementação e revisão de qualidade.

- **Projeto:** Ecossistema SalusDev (`salusdev-site`, `salusdev-admin`, `salus-oficina` e demais produtos)
- **Tipo de aplicação:** Web App responsivo com suporte a PWA
- **Versão:** 1.4
- **Criado em:** 2026-11-05
- **Atualizado em:** 2026-11-06
- **Responsável:** Rafael Amaral Salustiano
- **Agente orquestrador:** `@aiox-master`
- **Status:** Ativo (aguardando validação)
- **Documentos relacionados:** `RegrasDesenvolvimento.md`, `PRD-SalusDev-v0.3.md`
- **Referenciais de segurança e privacidade:** OWASP Top 10:2025, Lei nº 13.709/2018 (LGPD) e regulamentos da ANPD

---

## 1. Objetivo

Este documento consolida as diretrizes de comportamento do sistema que não podem variar entre telas, produtos ou desenvolvedores. Ele existe para:

- padronizar a experiência em Desktop `[D]`, Mobile `[M]` e PWA;
- reduzir retrabalho e decisões repetidas;
- evitar padrões ruins que já foram identificados;
- permitir revisão objetiva antes de qualquer entrega;
- garantir que protótipos e produtos finais sigam a mesma base de qualidade.

Toda tela, componente, fluxo ou integração deve ser validado contra este documento antes de ser considerado concluído.

---

## 2. Escopo e aplicação

Estas regras se aplicam a:

- `salusdev-site` (site institucional);
- `salusdev-admin` (Centro de Comando);
- `salus-oficina` (SaaS de oficinas) e futuros produtos satélites;
- protótipos em `salusdev-prototypes`;
- componentes compartilhados do design system.

Aplicam-se a todas as fases do produto, inclusive protótipos, com exceção apenas dos itens explicitamente marcados como "quando aplicável".

---

## 3. Como interpretar as regras

| Termo | Significado |
|---|---|
| **DEVE** | Obrigatório. A ausência é uma falha de conformidade. |
| **NÃO DEVE** | Proibido. A presença é uma falha de conformidade. |
| **PODE** | Opcional, desde que não contrarie outra regra. |
| **DEVE quando aplicável** | Obrigatório apenas se o contexto existir (ex.: impressão, quando houver documento impresso). |

Cada regra possui um código (`FRM-01`, `BTN-03`, etc.) para ser referenciada em planos, stories, revisões e checklists.

---

## 4. Diretrizes gerais de produto

### 4.1 DEVE

- **GER-01:** Toda tela deve ter um objetivo único e claro, com hierarquia visual que leve o usuário à próxima ação.
- **GER-02:** Toda ação deve ter resultado perceptível (mudança de estado, navegação, toast, feedback visual).
- **GER-03:** Toda tela deve ser validada nos quatro viewports de referência: `360 px`, `768 px`, `1024 px` e `1440 px`.
- **GER-04:** Toda tela deve funcionar sem rolagem horizontal involuntária.
- **GER-05:** Todo fluxo deve ter estados definidos: carregando, vazio, erro e sucesso.
- **GER-06:** Toda informação exibida ao usuário deve ser verdadeira, rastreável e compatível com o estado real do sistema.
- **GER-07:** Toda confirmação, erro ou aviso deve ser exibido na interface do próprio sistema, nunca por `alert`, `confirm` ou `prompt` nativos do navegador.
- **GER-08:** Toda tela deve ser navegável por teclado e possuir foco visível.
- **GER-09:** Toda tela deve manter consistência de espaçamento, tipografia, cores e componentes com o design system.
- **GER-10:** Todo texto visível deve estar em português do Brasil, com acentuação correta e linguagem objetiva.

### 4.2 NÃO DEVE

- **GER-11:** NÃO DEVE existir tela sem estado vazio, sem estado de erro ou sem feedback de carregamento.
- **GER-12:** NÃO DEVE existir ação destrutiva sem confirmação explícita.
- **GER-13:** NÃO DEVE existir informação duplicada na mesma tela com rótulos diferentes.
- **GER-14:** NÃO DEVE existir navegação quebrada, link sem destino ou botão sem ação.
- **GER-15:** NÃO DEVE existir conteúdo provisório (`Lorem ipsum`, "em breve", "TODO") em entrega demonstrada ao cliente.
- **GER-16:** NÃO DEVE existir dependência de cor como única forma de transmitir informação.

### 4.3 PODE

- **GER-17:** PODE haver variação de layout entre `[D]` e `[M]`, desde que a lógica de negócio e os rótulos permaneçam os mesmos.

---

## 5. Formulários e entrada de dados

### 5.1 Máscaras de campos (obrigatório)

- **FRM-01:** Todo campo com formato estruturado DEVE ter máscara de entrada e validação correspondente.
- **FRM-02:** A máscara DEVE ser aplicada durante a digitação, colagem e preenchimento automático.
- **FRM-03:** O valor armazenado DEVE ser o valor normalizado (somente dígitos ou formato canônico), e a exibição DEVE usar a máscara.
- **FRM-04:** A validação DEVE ocorrer sobre o valor normalizado, nunca sobre o texto formatado.
- **FRM-05:** A máscara NÃO DEVE bloquear a digitação, mover o cursor para o fim do campo ou impedir colagem.

Máscaras mínimas por tipo de campo:

| Campo | Máscara esperada | Observação |
|---|---|---|
| Telefone fixo | `(99) 9999-9999` | DDD obrigatório |
| Celular | `(99) 99999-9999` | Detectar nono dígito |
| Telefone (fixo ou celular) | Dinâmica | Alterna conforme quantidade de dígitos |
| CPF | `999.999.999-99` | Validar dígitos verificadores |
| CNPJ | `99.999.999/9999-99` | Validar dígitos verificadores |
| CPF ou CNPJ | Dinâmica | Alterna conforme quantidade de dígitos |
| CEP | `99999-999` | Integrar com busca de endereço quando disponível |
| Data | `99/99/9999` | Validar data real, não apenas formato |
| Hora | `99:99` | Limitar a `23:59` |
| Data e hora | `99/99/9999 99:99` | — |
| Moeda (BRL) | `R$ 9.999,99` | Alinhar à direita em tabelas |
| Percentual | `99,99%` | Limitar a `0–100` quando for taxa |
| Placa de veículo | `AAA-9999` e `AAA9A99` | Aceitar padrão antigo e Mercosul |
| CNH | `99999999999` | Somente dígitos |
| Cartão de crédito | Grupos de 4 dígitos | Validar Luhn quando transacional |
| Validade de cartão | `99/99` | — |
| CVV | `999` ou `9999` | Campo mascarado |
| PIS/NIS | `999.99999.99-9` | — |
| Inscrição estadual | Dinâmica por UF | Quando aplicável |

- **FRM-06:** Campos sem formato estruturado NÃO DEVEM receber máscara: nome, e-mail, senha, busca, mensagem livre e descrição.
- **FRM-07:** Senhas NÃO DEVEM exibir o valor e DEVEM permitir alternar visibilidade.
- **FRM-08:** A biblioteca de máscara DEVE ser centralizada em um único módulo reutilizável, não implementada tela a tela.
- **FRM-09:** Biblioteca recomendada para máscaras: `react-imask` (instalar no projeto antes do uso, caso ainda não exista).

### 5.2 Campos de seleção

- **FRM-10:** Todo campo de seleção DEVE usar `react-select`, salvo exceção aprovada e registrada.
- **FRM-11:** O `react-select` DEVE ser encapsulado em um componente padrão do design system (ex.: `Select`), com tema, estados e acessibilidade padronizados.
- **FRM-12:** O componente DEVE suportar: seleção única, múltipla, busca, limpar seleção, desabilitado, erro e carregamento.
- **FRM-13:** Em modais e menus com `overflow`, o menu de opções DEVE usar `menuPortalTarget` para não ser cortado.
- **FRM-14:** O campo DEVE ter rótulo visível, texto de ajuda quando necessário e mensagem de erro associada.
- **FRM-15:** Seleções que disparam carregamento assíncrono DEVEM exibir estado de carregamento e tratar falha de requisição.

### 5.3 Validação e mensagens

- **FRM-16:** Todo campo obrigatório DEVE ser identificado visualmente e semanticamente.
- **FRM-17:** A validação DEVE ocorrer no envio e, preferencialmente, no `blur` do campo.
- **FRM-18:** A mensagem de erro DEVE ser específica e orientar a correção ("Informe um CPF válido", não "Campo inválido").
- **FRM-19:** O foco DEVE ir para o primeiro campo inválido no envio.
- **FRM-20:** O formulário NÃO DEVE limpar os dados preenchidos quando houver erro de validação.
- **FRM-21:** O botão de envio DEVE entrar em estado de carregamento e ser bloqueado contra duplo envio.

### 5.4 Teclado, autofill e dispositivos móveis

- **FRM-22:** Todo campo DEVE declarar `type`, `inputMode` e `autoComplete` adequados (ex.: `tel`, `numeric`, `email`, `current-password`).
- **FRM-23:** Campos numéricos DEVEM abrir teclado numérico em `[M]`.
- **FRM-24:** Campos de telefone DEVEM usar `autoComplete="tel"` e `inputMode="tel"`.
- **FRM-25:** O formulário NÃO DEVE ficar escondido atrás do teclado virtual em `[M]`.
- **FRM-26:** Rótulos NÃO DEVEM ser substituídos por `placeholder`; o `placeholder` é apoio, não rótulo.

---

## 6. Botões, ações e navegação

### 6.1 Ações

- **BTN-01:** Cada tela DEVE ter apenas uma ação primária por contexto.
- **BTN-02:** NÃO DEVE haver botões redundantes na mesma tela para a mesma ação (ex.: "Salvar" no topo e outro "Salvar" no rodapé executando a mesma função).
- **BTN-03:** Quando houver versão `[D]` e `[M]` do mesmo botão, apenas uma DEVE ficar visível por viewport; nunca as duas simultaneamente.
- **BTN-04:** Botões flutuantes NÃO DEVEM duplicar uma ação já disponível de forma fixa na tela.
- **BTN-05:** Ações destrutivas DEVEM usar confirmação com descrição do impacto.
- **BTN-06:** Botões DEVEM ter rótulo textual; botões apenas com ícone DEVEM ter `aria-label` e dica visual.
- **BTN-07:** O estado de carregamento DEVE desabilitar o botão e manter seu tamanho para evitar salto de layout.
- **BTN-08:** Botões desabilitados DEVEM explicar o motivo quando o usuário tentar interagir ou por meio de texto de apoio.
- **BTN-09:** Toda ação deve exibir resultado em até 1 segundo; acima disso, mostrar carregamento.

### 6.2 Navegação

- **BTN-10:** A navegação principal DEVE ser idêntica em rótulos entre `[D]` e `[M]`.
- **BTN-11:** A página atual DEVE estar indicada visual e semanticamente.
- **BTN-12:** NÃO DEVE haver mais de um menu de navegação principal visível ao mesmo tempo.
- **BTN-13:** O usuário DEVE conseguir retornar ao ponto anterior em qualquer fluxo mais profundo.
- **BTN-14:** Links externos DEVEM ser identificados e abrir conforme a política definida para a aplicação.
- **BTN-15:** NÃO DEVE haver navegação que dependa de gesto não descoberto (swipe escondido) sem alternativa visível.

### 6.3 Estados

- **BTN-16:** Todo botão DEVE ter estados de `hover`, `focus`, `active`, `disabled` e `loading` quando aplicável.
- **BTN-17:** O estado de foco DEVE ser visível e não depender apenas de cor.
- **BTN-18:** Ícones e botões DEVEM ter área de toque mínima de `44 x 44 px` em `[M]`.

---

## 7. PWA e comportamento mobile

### 7.1 Safari no iPhone (zoom automático)

- **PWA-01:** Campos de formulário DEVEM ter `font-size` mínimo de `16 px` em `[M]` para evitar o zoom automático do Safari no iPhone.
- **PWA-02:** NÃO DEVE ser usado `maximum-scale=1` nem `user-scalable=no` para impedir zoom, pois isso prejudica acessibilidade.
- **PWA-03:** A correção do zoom DEVE ser feita por tamanho de fonte, espaçamento e layout, não por bloqueio de zoom.
- **PWA-04:** O `viewport` DEVE incluir `viewport-fit=cover` para respeitar as áreas seguras do iPhone.
- **PWA-05:** Elementos fixos DEVEM respeitar `safe-area-inset-*` (notch, barra inferior e cantos arredondados).
- **PWA-06:** A altura de telas cheias DEVE usar `100dvh` e fallback compatível, não apenas `100vh`.
- **PWA-07:** O teclado virtual NÃO DEVE cobrir campos, botões de envio ou mensagens de erro.
- **PWA-08:** NÃO DEVE haver rolagem horizontal, bounce indesejado ou conteúdo cortado ao abrir o teclado.

### 7.2 Instalação e funcionamento como app

- **PWA-09:** O PWA DEVE possuir `manifest.json` válido, ícones `192x192`, `512x512` e `maskable`.
- **PWA-10:** O PWA DEVE funcionar em modo `standalone` sem depender da barra do navegador.
- **PWA-11:** O service worker DEVE armazenar recursos estáticos essenciais e tratar atualização de versão.
- **PWA-12:** O sistema DEVE informar quando estiver offline e permitir leitura do que estiver em cache.
- **PWA-13:** O sistema NÃO DEVE exibir telas de erro genéricas do navegador para falhas de rede previsíveis.
- **PWA-14:** O usuário DEVE conseguir instalar o app por instrução clara em Android, iPhone e desktop, quando aplicável.

### 7.3 Comportamento mobile

- **PWA-15:** Toda interação crítica DEVE funcionar com uma mão e com o polegar, especialmente em `360 px`.
- **PWA-16:** Modais DEVEM ser roláveis e não ultrapassar a altura útil da tela.
- **PWA-17:** Tabelas DEVEM se transformar em cards ou lista vertical em `[M]`.
- **PWA-18:** NÃO DEVE haver hover como única forma de revelar ação importante.

---

## 8. Impressão

Aplicável a qualquer tela que gere documento impresso (relatórios, ordens de serviço, contratos, comprovantes, listagens).

- **IMP-01:** Toda tela com saída impressa DEVE ter folha de estilo `@media print` dedicada.
- **IMP-02:** A impressão DEVE ocultar navegação, barras laterais, botões, filtros e elementos interativos.
- **IMP-03:** A impressão DEVE exibir cabeçalho com identificação do produto, título do documento, data e hora.
- **IMP-04:** A impressão DEVE exibir rodapé com numeração de página e identificação da SalusDev.
- **IMP-05:** O layout DEVE ser formatado para papel A4, com margens consistentes e tipografia legível.
- **IMP-06:** Tabelas DEVEM quebrar entre páginas sem cortar linhas no meio.
- **IMP-07:** Blocos de assinatura, totais e conclusões NÃO DEVEM ser divididos entre páginas.
- **IMP-08:** Elementos de interface não devem ser impressos como se fossem conteúdo.
- **IMP-09:** Cores de fundo DEVEM ser evitadas na impressão; quando indispensáveis, usar `print-color-adjust: exact`.
- **IMP-10:** O documento DEVE ser legível em impressão preto e branco.
- **IMP-11:** A impressão de um registro específico DEVE conter apenas o registro selecionado ou o escopo informado ao usuário.
- **IMP-12:** Quando houver necessidade de impressão programática ou de um único componente, DEVE ser usada uma biblioteca dedicada. Biblioteca recomendada: `react-to-print` (instalar no projeto antes do uso, caso ainda não exista).
- **IMP-13:** A impressão DEVE ser testada no navegador de destino antes da entrega.
- **IMP-14:** Quando a impressão for gerada por biblioteca, o componente impresso DEVE ser o mesmo exibido em tela, evitando duplicação de marcação.

---

## 9. Tabelas, listas e filtros

- **TAB-01:** Toda tabela DEVE ter cabeçalho identificável e alinhamento coerente por tipo de dado (texto à esquerda, números e moeda à direita).
- **TAB-02:** Toda tabela com volume DEVE ter paginação, contagem ou carregamento incremental.
- **TAB-03:** Toda listagem DEVE ter busca ou filtro quando houver mais de 10 registros.
- **TAB-04:** Filtros aplicados DEVEM ser visíveis e removíveis individualmente.
- **TAB-05:** NÃO DEVE existir filtro que altera resultado sem deixar claro o critério ativo.
- **TAB-06:** Busca DEVE ter debounce e informar quando não houver resultado.
- **TAB-07:** Ordenação DEVE indicar coluna ativa e direção.
- **TAB-08:** Em `[M]`, tabelas DEVEM virar cards ou lista vertical sem perda de informação essencial.
- **TAB-09:** Ações de linha DEVEM ser acessíveis sem exigir hover.
- **TAB-10:** NÃO DEVE existir tabela com rolagem horizontal em `[M]` como solução principal.

---

## 10. Feedback, estados e erros

- **FBK-01:** Toda operação DEVE ter feedback de início, sucesso e falha.
- **FBK-02:** Sucesso DEVE ser comunicado por toast ou mensagem contextual, sem interromper o fluxo.
- **FBK-03:** Erro DEVE explicar o que aconteceu e o que o usuário pode fazer.
- **FBK-04:** Erro inesperado NÃO DEVE expor stack trace, mensagem de banco ou detalhe técnico.
- **FBK-05:** Estados vazios DEVEM explicar o motivo e oferecer a próxima ação.
- **FBK-06:** Carregamentos de conteúdo DEVEM usar skeleton ou indicador de progresso, não tela em branco.
- **FBK-07:** Mensagens de erro DEVEM permanecer acessíveis (não apenas por tempo curto) quando exigirem ação.
- **FBK-08:** Toast NÃO DEVE ser usado para erro que exige correção antes de continuar.

---

## 11. Acessibilidade

- **A11Y-01:** Contraste mínimo de `4.5:1` para texto normal e `3:1` para textos grandes.
- **A11Y-02:** Todo elemento interativo DEVE ser alcançável por teclado.
- **A11Y-03:** Foco DEVE ser sempre visível.
- **A11Y-04:** Todo campo DEVE ter rótulo associado.
- **A11Y-05:** Toda imagem relevante DEVE ter texto alternativo; imagens decorativas DEVEM ter `alt=""`.
- **A11Y-06:** A ordem de leitura e tabulação DEVE seguir a ordem visual.
- **A11Y-07:** NÃO DEVE haver conteúdo que pisque ou se mova automaticamente.
- **A11Y-08:** Modais DEVEM prender o foco, fechar com `Esc` e devolver o foco ao elemento de origem.
- **A11Y-09:** Mensagens dinâmicas DEVEM usar região viva (`aria-live`) quando necessário.
- **A11Y-10:** Zoom do navegador NÃO DEVE ser bloqueado em nenhuma tela.

---

## 12. Conteúdo e redação

- **CONT-01:** Todo texto visível DEVE estar em português do Brasil, com acentuação correta.
- **CONT-02:** NÃO DEVE ser usado o caractere `&` em textos visíveis; usar "e".
- **CONT-03:** Rótulos DEVEM ser curtos, diretos e no padrão do sistema (ex.: "Salvar", "Cancelar", "Novo produto").
- **CONT-04:** NÃO DEVE haver mistura de idiomas na mesma tela.
- **CONT-05:** Números, datas e moeda DEVEM seguir o padrão brasileiro (`dd/mm/aaaa`, `R$ 1.234,56`).
- **CONT-06:** NÃO DEVE haver texto em imagem para informação essencial.
- **CONT-07:** Mensagens de erro DEVEM ser orientadas à ação, não ao sistema.
- **CONT-08:** NÃO DEVE haver abreviações não explicadas em telas operacionais.

---

## 13. Identidade visual e layout

- **VIS-01:** Toda tela DEVE usar os tokens de cor, tipografia e espaçamento do design system.
- **VIS-02:** Cores semânticas DEVEM ser usadas apenas para estados (sucesso, alerta, erro, informação).
- **VIS-03:** NÃO DEVE haver excesso de cores, sombras, gradientes ou animações decorativas.
- **VIS-04:** Animações DEVEM ser discretas e respeitar `prefers-reduced-motion`.
- **VIS-05:** O conteúdo principal DEVE ter largura máxima controlada em `[D]`, sem esticar elementos.
- **VIS-06:** O espaçamento DEVE seguir escala consistente, sem valores improvisados por tela.
- **VIS-07:** A hierarquia tipográfica DEVE ter no máximo quatro níveis visíveis por tela.
- **VIS-08:** NÃO DEVE haver ícones com significados diferentes para a mesma forma.

---

## 14. Segurança

A segurança é requisito de produto e deve existir desde a primeira linha de código, não como etapa final. A referência mínima adotada é o **OWASP Top 10:2025**, complementado pelas boas práticas específicas da stack (React, Vite, PWA, Netlify, Supabase e Mercado Pago).

Princípios obrigatórios: segurança desde a concepção, defesa em profundidade, privilégio mínimo, negação por padrão, falha segura, nunca confiar no cliente e responsabilização por meio de logs e auditoria.

### 14.1 Princípios gerais

- **SEG-01:** NENHUMA chave, token, senha ou segredo DEVE existir no código cliente ou no repositório.
- **SEG-02:** Dados de produção NÃO DEVEM ser usados em protótipos, demonstrações ou prompts de IA.
- **SEG-03:** Dados pessoais DEVEM ser coletados apenas quando necessários e com finalidade explícita.
- **SEG-04:** Toda comunicação DEVE usar HTTPS, com HSTS habilitado em produção.
- **SEG-05:** Entradas DEVEM ser validadas no cliente e no servidor quando houver backend.
- **SEG-06:** NÃO DEVE haver mensagem de erro que revele estrutura interna, tabela, coluna, caminho de arquivo ou stack trace.
- **SEG-07:** Sessões e credenciais DEVEM seguir o padrão definido pelo `@architect` e pelo `@data-engineer`.
- **SEG-08:** Logs NÃO DEVEM conter senha, token, dado de cartão, CPF completo ou dado pessoal sensível.
- **SEG-09:** Todo recurso DEVE ser seguro por padrão: o acesso só é liberado quando explicitamente concedido.
- **SEG-10:** Todo usuário, serviço e integração DEVE operar com o menor privilégio necessário.
- **SEG-11:** Em caso de dúvida ou falha de autorização, o sistema DEVE negar o acesso.
- **SEG-12:** Nenhuma regra de segurança DEVE depender apenas da interface; toda autorização DEVE ser validada no servidor.
- **SEG-13:** Toda funcionalidade nova DEVE passar por análise de abuso e de ameaça antes da implementação.
- **SEG-14:** Vulnerabilidade conhecida DEVE ser tratada como defeito, com prioridade proporcional ao risco.
- **SEG-15:** Nenhum ambiente de produção DEVE compartilhar credenciais, banco ou storage com desenvolvimento ou homologação.

### 14.2 Cobertura obrigatória do OWASP Top 10:2025

| Risco OWASP | Aplicação na SalusDev | Regras relacionadas |
|---|---|---|
| A01 - Broken Access Control | Toda requisição valida permissão, dono e tenant no servidor; ocultar botão não é controle | ACL-01 a ACL-14 |
| A02 - Security Misconfiguration | Ambientes separados, cabeçalhos de segurança, sem debug em produção, buckets e CORS restritos | CFG-01 a CFG-14 |
| A03 - Software Supply Chain Failures | Lockfile, auditoria, dependências mínimas, integridade de build e de pacotes | SUP-01 a SUP-12 |
| A04 - Cryptographic Failures | TLS, criptografia em repouso, hash forte de senha, gestão de chaves | CRY-01 a CRY-12 |
| A05 - Injection | Validação de schema, consultas parametrizadas, codificação de saída, sanitização | INJ-01 a INJ-14 |
| A06 - Insecure Design | Modelagem de abuso, limites de uso, separação de funções e revisão de fluxo antes do código | SEG-13, ACL-05, RES-08, PRIV-01 |
| A07 - Authentication Failures | Autenticação consolidada, MFA/2FA obrigatório em logins (Supabase), sessão segura, recuperação segura | AUTH-01 a AUTH-15 |
| A08 - Software or Data Integrity Failures | Validação de webhooks, integridade de artefatos, assinatura de atualizações | INT-01 a INT-12 |
| A09 - Security Logging and Alerting Failures | Logs estruturados, auditoria de ações privilegiadas e alertas acionáveis | LOG-01 a LOG-10 |
| A10 - Mishandling of Exceptional Conditions | Timeout, retry, idempotência, sobrecarga e falha segura | RES-01 a RES-12 |

### 14.3 Autenticação e sessão

- **AUTH-01:** A autenticação DEVE usar provedor consolidado (ex.: Supabase Auth) quando houver backend. NÃO DEVE ser criada autenticação própria.
- **AUTH-02:** Todo login no sistema DEVE ter no mínimo dois fatores de autenticação (MFA / 2FA). Pode ser utilizado o recurso nativo de MFA do próprio Supabase (Supabase Auth MFA via TOTP / App Autenticador). Nenhuma conta de acesso ao sistema ou ao Centro de Comando DEVE operar sem o segundo fator ativo.
- **AUTH-03:** Senhas DEVEM ter no mínimo 8 caracteres, com recomendação de 12 ou mais, sem regras de composição artificiais e com bloqueio de senhas vazadas conhecidas.
- **AUTH-04:** NÃO DEVE haver rotação periódica obrigatória de senha sem indício de comprometimento.
- **AUTH-05:** Tokens de sessão privilegiada NÃO DEVEM ser armazenados em `localStorage` ou `sessionStorage`; usar cookies `HttpOnly`, `Secure` e `SameSite`.
- **AUTH-06:** Tokens de acesso DEVEM ter vida curta, com rotação de refresh token e revogação no logout e na troca de senha.
- **AUTH-07:** A recuperação de senha DEVE usar token de uso único, com expiração curta e invalidação após uso.
- **AUTH-08:** NÃO DEVEM ser usadas perguntas de segurança como fator de recuperação.
- **AUTH-09:** Login, recuperação e cadastro DEVEM ter limite de tentativas, atraso progressivo e proteção contra automação.
- **AUTH-10:** Mensagens de login DEVEM ser genéricas ("Credenciais inválidas"), sem indicar se o e-mail existe.
- **AUTH-11:** A sessão DEVE ser regenerada no login para evitar fixação de sessão.
- **AUTH-12:** O painel administrativo DEVE ter timeout de inatividade e possibilidade de encerrar todas as sessões.
- **AUTH-13:** OAuth e OIDC DEVEM validar `state`, `nonce`, `PKCE` e lista de redirecionamento permitida.
- **AUTH-14:** Papéis e permissões DEVEM ser resolvidos no servidor, nunca aceitos como verdade a partir do cliente.
- **AUTH-15:** Eventos de autenticação DEVEM ser auditados: login, falha, logout, troca de senha, MFA e revogação.

### 14.4 Autorização e isolamento de dados

- **ACL-01:** Toda requisição DEVE validar autorização no servidor antes de ler ou gravar qualquer dado.
- **ACL-02:** O acesso DEVE ser negado por padrão e liberado apenas por regra explícita.
- **ACL-03:** Toda leitura e escrita DEVE verificar se o recurso pertence ao usuário ou ao tenant da sessão, prevenindo IDOR.
- **ACL-04:** Recursos expostos publicamente DEVEM usar identificadores não sequenciais (UUID).
- **ACL-05:** O modelo de papéis (administrador, operador, cliente) DEVE ser documentado e aplicar separação de funções.
- **ACL-06:** Em sistemas multi-tenant, o `tenant_id` DEVE ser obrigatório no servidor e nas políticas de banco, nunca aceito apenas do cliente.
- **ACL-07:** Todo produto multi-tenant DEVE ter testes de acesso cruzado entre tenants.
- **ACL-08:** A chave `service_role` e qualquer chave administrativa NUNCA DEVEM ser usadas no cliente.
- **ACL-09:** Todas as tabelas com dados de usuário DEVEM ter RLS habilitada e políticas para seleção, inserção, atualização e exclusão.
- **ACL-10:** Ações administrativas DEVEM ser auditadas com autor, data, recurso e resultado.
- **ACL-11:** Requisições de saída para URLs fornecidas pelo usuário DEVEM ser validadas contra lista permitida, prevenindo SSRF.
- **ACL-12:** CORS DEVE usar lista explícita de origens; NÃO DEVE usar `*` em conjunto com credenciais.
- **ACL-13:** Autenticação baseada em cookie DEVE ter proteção CSRF por `SameSite` e token anti-CSRF.
- **ACL-14:** Acesso a arquivos e rotas internas DEVE impedir path traversal e acesso direto a recursos não públicos.

### 14.5 Entrada, saída e injeção

- **INJ-01:** Toda entrada DEVE ser validada no servidor com schema tipado (ex.: Zod), incluindo tipo, tamanho, formato e faixa.
- **INJ-02:** Consultas ao banco DEVEM ser parametrizadas; NÃO DEVE haver concatenação de entrada do usuário em SQL.
- **INJ-03:** SQL bruto só PODE existir com parâmetros vinculados e justificativa registrada.
- **INJ-04:** React já escapa texto por padrão; `dangerouslySetInnerHTML` NÃO DEVE ser usado sem sanitização com `DOMPurify` ou equivalente.
- **INJ-05:** Conteúdo rico (markdown, HTML) DEVE ser sanitizado no servidor e no cliente.
- **INJ-06:** Uploads DEVEM validar extensão, MIME, assinatura binária, tamanho e nome; imagens DEVEM ser reprocessadas e armazenadas fora da raiz pública.
- **INJ-07:** `eval`, `new Function`, `setTimeout` com string e execução dinâmica de código são proibidos.
- **INJ-08:** URLs DEVEM ter esquema validado; `javascript:`, `data:` e similares NÃO DEVEM ser aceitos em links e redirecionamentos.
- **INJ-09:** Redirecionamentos DEVEM usar lista permitida, prevenindo open redirect.
- **INJ-10:** Exportações CSV e Excel DEVEM neutralizar fórmulas (`=`, `+`, `-`, `@`) para evitar CSV injection.
- **INJ-11:** Comandos de sistema NÃO DEVEM receber entrada do usuário; quando inevitável, usar lista permitida e argumentos separados.
- **INJ-12:** Consultas NoSQL DEVEM validar tipos e bloquear operadores enviados pelo cliente.
- **INJ-13:** Templates e expressões NÃO DEVEM compilar entrada do usuário.
- **INJ-14:** Nomes de arquivo, cabeçalhos e parâmetros DEVEM ser validados contra injeção de CRLF e caracteres de controle.

### 14.6 Criptografia e proteção de dados

- **CRY-01:** TLS 1.2 ou superior DEVE ser obrigatório, com preferência por TLS 1.3.
- **CRY-02:** Dados sensíveis DEVEM ser criptografados em repouso, incluindo banco, storage e backups.
- **CRY-03:** Criptografia NÃO DEVE ser implementada manualmente; usar Web Crypto, Node Crypto ou biblioteca consolidada.
- **CRY-04:** Senhas DEVEM usar hash com `Argon2id`, `bcrypt` ou `scrypt`, com salt individual; MD5, SHA-1 e SHA-256 puros são proibidos.
- **CRY-05:** Chaves DEVEM ficar em variável de ambiente ou cofre de segredos, com rotação e separação por ambiente.
- **CRY-06:** Dados sensíveis NÃO DEVEM trafegar em URL, query string ou fragmento, pois vazam em logs e referrer.
- **CRY-07:** Dados pessoais NÃO DEVEM ser persistidos em `localStorage`, `sessionStorage` ou cache do PWA sem necessidade e proteção.
- **CRY-08:** Dados de cartão NÃO DEVEM ser armazenados pela SalusDev; CVV NUNCA DEVE ser armazenado, e o fluxo deve seguir PCI DSS por meio do gateway.
- **CRY-09:** Backups DEVEM ser criptografados e ter restauração testada.
- **CRY-10:** Todo dado DEVE ser classificado como público, interno, confidencial ou sensível, com controle proporcional.
- **CRY-11:** Dados sensíveis DEVEM ser mascarados na interface e nos logs (CPF, telefone, e-mail, documento).
- **CRY-12:** Dados locais DEVEM ser limpos no logout e na exclusão da conta.

### 14.7 Configuração, cabeçalhos e infraestrutura

- **CFG-01:** Produção NÃO DEVE expor modo de depuração, ferramentas de desenvolvedor, endpoints de teste ou mensagens internas.
- **CFG-02:** Cabeçalhos de segurança DEVEM ser configurados: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e `frame-ancestors`.
- **CFG-03:** A CSP NÃO DEVE usar `unsafe-inline` ou `unsafe-eval`; usar nonce ou hash quando necessário.
- **CFG-04:** Contas padrão, dados de exemplo, diretórios listáveis e endpoints não utilizados DEVEM ser removidos antes da publicação.
- **CFG-05:** Ambientes DEV, homologação e produção DEVEM ter bancos, credenciais e domínios separados.
- **CFG-06:** Tokens de deploy e CI DEVEM ter escopo mínimo, expiração e possibilidade de revogação.
- **CFG-07:** Regras de redirect e headers do Netlify DEVEM ser revisadas antes de cada publicação.
- **CFG-08:** Páginas de erro DEVEM ser genéricas e não revelar tecnologia, versão ou caminho.
- **CFG-09:** Plataforma, runtime e dependências DEVEM ser mantidos atualizados.
- **CFG-10:** Buckets e storages DEVEM ser privados por padrão, com políticas de acesso e URLs assinadas quando necessário.
- **CFG-11:** Rate limiting e proteção de borda DEVEM ser usados quando disponíveis.
- **CFG-12:** Mixed content e redirecionamento HTTP para HTTPS DEVEM ser bloqueados.
- **CFG-13:** Cookies DEVEM usar `Secure`, `HttpOnly` e `SameSite`, com prefixo `__Host-` quando aplicável.
- **CFG-14:** Source maps de produção DEVEM ser desabilitados ou restritos, nunca públicos.

### 14.8 Cadeia de suprimentos de software

- **SUP-01:** O lockfile DEVE ser commitado e a instalação em CI DEVE usar `npm ci` ou `pnpm --frozen-lockfile`.
- **SUP-02:** Dependências de produção NÃO DEVEM usar versão flutuante (`latest`, `*`).
- **SUP-03:** `npm audit` ou `pnpm audit` DEVE ser executado a cada ciclo; falhas críticas e altas DEVEM ser corrigidas antes da entrega.
- **SUP-04:** Dependências DEVEM ser mínimas e avaliadas por manutenção, licença, reputação e volume de uso.
- **SUP-05:** Nomes de pacotes DEVEM ser verificados contra typosquatting antes da instalação.
- **SUP-06:** Pacotes não confiáveis NÃO DEVEM executar `postinstall`; usar `ignore-scripts` quando possível.
- **SUP-07:** Atualizações DEVEM ser revisadas por diff; atualização automática de versão maior é proibida.
- **SUP-08:** Scripts e estilos externos DEVEM usar Subresource Integrity (SRI) quando carregados de terceiros.
- **SUP-09:** Bibliotecas DEVEM ser preferencialmente auto-hospedadas, sem CDN desnecessário.
- **SUP-10:** Releases DEVEM ter artefato íntegro e rastreável; SBOM DEVE ser gerado quando aplicável.
- **SUP-11:** Segredos de CI DEVEM ser mascarados em logs e restritos ao ambiente necessário.
- **SUP-12:** Tokens de publicação DEVEM ser protegidos e revogados em caso de suspeita.

### 14.9 PWA, cache e armazenamento local

- **PWAS-01:** O service worker DEVE armazenar apenas ativos públicos e estáticos; respostas autenticadas ou privadas NÃO DEVEM ser cacheadas.
- **PWAS-02:** Dados pessoais NÃO DEVEM ir para `Cache Storage` ou `IndexedDB` sem necessidade comprovada e proteção.
- **PWAS-03:** Cache e dados locais DEVEM ser limpos no logout e na exclusão da conta.
- **PWAS-04:** O cache DEVE ter versionamento e invalidação para evitar dados antigos ou sensíveis.
- **PWAS-05:** O escopo do service worker DEVE ser restrito ao necessário.
- **PWAS-06:** Service worker NUNCA DEVE ser registrado fora de HTTPS.
- **PWAS-07:** Deep links e fallback de navegação DEVEM ser validados contra open redirect.
- **PWAS-08:** Notificações push NÃO DEVEM carregar conteúdo sensível na carga útil.
- **PWAS-09:** O manifesto NÃO DEVE expor informação sensível.
- **PWAS-10:** Ações privilegiadas NÃO DEVEM estar disponíveis offline; o sistema deve exigir reconexão e validação.

### 14.10 Integrações, pagamentos e webhooks

- **INT-01:** Todo webhook DEVE validar assinatura, origem e janela de tempo.
- **INT-02:** Processamento de webhook e pagamento DEVE ser idempotente, com deduplicação por identificador de evento.
- **INT-03:** Valor, status e produto NUNCA DEVEM ser confiados ao cliente; DEVEM ser consultados no gateway ou no banco.
- **INT-04:** Pagamento DEVE ser processado no servidor, sem dados de cartão no backend da SalusDev.
- **INT-05:** O estado só DEVE mudar após validação do evento, com registro do identificador.
- **INT-06:** Retentativas DEVEM ter backoff, limite e tratamento de falha definitiva.
- **INT-07:** Domínios de integração DEVEM usar lista permitida e validação de TLS.
- **INT-08:** No Supabase, a chave anônima pode ser pública, mas depende de RLS; a `service_role` fica apenas no servidor.
- **INT-09:** Tokens OAuth DEVEM ser criptografados em repouso e usar o mínimo de escopos.
- **INT-10:** Segredos NUNCA DEVEM ir para o bundle do frontend; variáveis `VITE_` são públicas.
- **INT-11:** Chamadas externas DEVEM ter timeout, limite de tentativas e proteção contra indisponibilidade.
- **INT-12:** Dados recebidos de terceiros DEVEM ser validados e sanitizados antes de renderizar ou armazenar.

### 14.11 Logs, auditoria e monitoramento

- **LOG-01:** Logs DEVEM ser estruturados e conter identificador de correlação.
- **LOG-02:** Senhas, tokens, cartão completo, CVV, CPF completo e dados de saúde NÃO DEVEM ser registrados.
- **LOG-03:** Ações privilegiadas DEVEM gerar trilha de auditoria com autor, ação, recurso, data, origem e resultado.
- **LOG-04:** Logs DEVEM ser somente de acréscimo, com retenção definida e acesso restrito.
- **LOG-05:** DEVEM existir alertas para falhas de autenticação, mudança de privilégio, picos de erro e anomalia de pagamento.
- **LOG-06:** Disponibilidade e endpoints de health DEVEM ser monitorados.
- **LOG-07:** Acesso a logs e auditoria DEVE seguir privilégio mínimo.
- **LOG-08:** Logs com dado pessoal DEVEM ser minimizados e retidos conforme base legal; registros de acesso DEVEM observar o prazo mínimo de 6 meses do Marco Civil quando aplicável.
- **LOG-09:** O cliente NÃO DEVE registrar dado sensível no console.
- **LOG-10:** Incidentes DEVEM ter runbook com detecção, contenção, avaliação, comunicação e post-mortem.

### 14.12 Exceções, resiliência e falha segura

- **RES-01:** Falha de autenticação ou autorização DEVE resultar em negação de acesso, nunca em liberação.
- **RES-02:** Toda chamada externa DEVE ter timeout; retry infinito é proibido.
- **RES-03:** Operações críticas (pagamento, criação, aprovação) DEVEM ser idempotentes.
- **RES-04:** O sistema DEVE impedir duplo envio e dupla execução.
- **RES-05:** Mensagens de erro DEVEM ser consistentes e não revelar detalhe interno.
- **RES-06:** Falhas parciais DEVEM ser tratadas com rollback ou compensação.
- **RES-07:** Transições de estado DEVEM ser validadas no servidor, sem permitir pular etapas.
- **RES-08:** Casos de abuso DEVEM ter limite: cadastro, recuperação, busca, exportação e envio de mensagem.
- **RES-09:** Open redirect é proibido.
- **RES-10:** Stack trace e detalhe de banco NUNCA DEVEM chegar ao usuário.
- **RES-11:** Sobrecarga DEVE ser tratada com fila, `429` ou backpressure, sem perder dados silenciosamente.
- **RES-12:** Estados excepcionais DEVEM ser testados (timeout, queda de rede, resposta parcial, duplicidade e concorrência).

### 14.13 Segredos e ambientes

- **ENV-01:** `.env` DEVE estar no `.gitignore`; apenas `.env.example` sem valores PODE ser commitado.
- **ENV-02:** Variáveis `VITE_` são públicas e NUNCA DEVEM conter segredo.
- **ENV-03:** Cada ambiente DEVE ter segredos próprios, com rotação após exposição.
- **ENV-04:** Secret scanning DEVE existir em CI ou pre-commit.
- **ENV-05:** Segredos NÃO DEVEM aparecer em print, log, issue, documento ou prompt de IA.
- **ENV-06:** Acesso a segredos DEVE ser restrito e auditado.
- **ENV-07:** Credencial de produção NUNCA DEVE ser usada em desenvolvimento.
- **ENV-08:** Vazamento DEVE ser revogado imediatamente e registrado como incidente.

### 14.14 Backup, continuidade e recuperação

- **BKP-01:** Banco e storage DEVEM ter backup automatizado e criptografado.
- **BKP-02:** A restauração DEVE ser testada periodicamente.
- **BKP-03:** Retenção de backup DEVE ser definida e compatível com a LGPD.
- **BKP-04:** RPO e RTO DEVEM ser definidos por produto.
- **BKP-05:** Acesso a backup DEVE ser restrito e auditado.
- **BKP-06:** Pedido de exclusão DEVE se propagar aos backups no ciclo definido.
- **BKP-07:** Todo produto DEVE ter runbook de recuperação de desastre.
- **BKP-08:** Backup NUNCA DEVE ficar em storage público.

### 14.15 Erros mais comuns no início do projeto

| Erro comum | Consequência | Prevenção obrigatória |
|---|---|---|
| Começar sem modelo de papéis e permissões | Autorização improvisada e vazamento de dados | Documentar papéis e aplicar ACL-01 a ACL-14 antes da primeira tela |
| Confiar no frontend para esconder ações | Qualquer usuário executa ação proibida | Validar autorização no servidor em toda requisição |
| Guardar token em `localStorage` | Roubo de sessão por XSS | Cookies `HttpOnly` e `Secure` |
| Usar `service_role` ou segredo no cliente | Comprometimento total do banco | Segredo só no servidor, `VITE_` sem segredo |
| Não habilitar RLS no Supabase | Leitura e escrita indevida entre usuários | RLS em todas as tabelas, com testes |
| Expor IDs sequenciais | Enumeração e acesso a registros de terceiros | UUID e verificação de dono |
| Validação apenas no cliente | Bypass por requisição direta | Schema no servidor |
| Montar SQL por concatenação | SQL injection | Consulta parametrizada |
| Usar `dangerouslySetInnerHTML` sem sanitizar | XSS armazenado | `DOMPurify` e sanitização no servidor |
| CORS aberto | Acesso cruzado indevido | Lista explícita de origens |
| Sem CSP e headers de segurança | Maior superfície de ataque | Configurar headers na publicação |
| Segredo no repositório | Vazamento permanente no histórico | Secret scanning e rotação |
| Dados reais em protótipo | Violação de LGPD e exposição | Dados fictícios e ambientes separados |
| Coletar dados "para o futuro" | Passivo de privacidade e risco jurídico | Minimização e base legal |
| Sem política de retenção | Dados guardados além do necessário | Prazo por tipo de dado e rotina de exclusão |
| Sem encarregado e sem canal do titular | Descumprimento da LGPD | Encarregado publicado e canal de direitos |
| Sem contrato com fornecedores | Responsabilidade solidária e falta de controle | DPA e avaliação de fornecedor |
| Sem plano de incidentes | Perda de prazo de 3 dias úteis | Runbook e simulação |
| Sem logs e alertas | Incidente passa despercebido | Logs estruturados e alertas |
| Sem backup testado | Perda definitiva de dados | Teste de restauração |
| Dependência sem auditoria | Vulnerabilidade e pacote malicioso | Lockfile, audit e revisão |
| Sem ambiente de homologação | Erro chega direto à produção | DEV, staging e produção separados |
| Sem rate limiting | Abuso, força bruta e custo excessivo | Limite por rota e por usuário |
| Login sem MFA | Tomada de conta e invasão de credenciais | MFA obrigatório em todos os logins (mínimo dois fatores, via Supabase) |
| Armazenar cartão ou CVV | Violação de PCI DSS e LGPD | Checkout do gateway, sem armazenamento |
| Webhook sem assinatura | Fraude e mudança indevida de estado | Validar assinatura e idempotência |
| Cache do PWA com dado privado | Exposição após logout | Cache apenas público |
| Não testar multi-tenant | Vazamento entre clientes | Teste de acesso cruzado obrigatório |
| Ignorar LGPD por ser "protótipo" | Decisões estruturais difíceis de corrigir | Aplicar privacidade desde a concepção |

### 14.16 Requisitos mínimos por fase

| Fase | Requisitos obrigatórios |
|---|---|
| Protótipo | Sem dado real, sem segredo, sem autenticação real, aviso de demonstração, dependências auditadas e nenhuma coleta desnecessária |
| MVP | Autenticação, autorização, RLS, validação no servidor, headers, logs, backup, política de privacidade, encarregado e plano de incidentes |
| Produção | MFA/2FA obrigatório em todos os logins (Supabase), rate limiting, monitoramento com alertas, teste de restauração, DPA com fornecedores, revisão de segurança e RIPD quando aplicável |

### 14.17 Catálogo de ataques e defesa obrigatória

| Ataque | Defesa obrigatória |
|---|---|
| Força bruta e credential stuffing | Rate limiting, atraso progressivo, MFA, bloqueio de senhas vazadas e detecção de automação |
| Phishing e engenharia social | MFA, educação da equipe, SPF, DKIM e DMARC, e nunca solicitar senha por e-mail ou chat |
| XSS (refletido, armazenado e DOM) | Escape por contexto, sanitização de HTML, CSP sem `unsafe-inline` e validação de URL |
| CSRF | Cookies `SameSite`, token anti-CSRF e reautenticação em ação sensível |
| Clickjacking | `frame-ancestors` na CSP e `X-Frame-Options` |
| Session hijacking e fixation | Cookies `HttpOnly` e `Secure`, regeneração de sessão, timeout e revogação |
| SQL injection | Consultas parametrizadas e validação de schema |
| NoSQL injection | Validação de tipos e bloqueio de operadores enviados pelo cliente |
| Command injection | Não usar shell com entrada do usuário; allowlist e argumentos separados |
| SSRF | Allowlist de destinos, bloqueio de IPs internos e de metadados de nuvem, egress restrito |
| Path traversal | Normalização de caminho, allowlist e storage fora da raiz pública |
| Open redirect | Lista permitida de destinos e validação de esquema |
| IDOR e BOLA | Verificação de dono e tenant no servidor e IDs não sequenciais |
| Escalada de privilégio | Privilégio mínimo, papéis no servidor e testes de autorização |
| Mass assignment | DTO e allowlist explícita de campos aceitos |
| Enumeração de usuários e recursos | Respostas genéricas, rate limiting e IDs imprevisíveis |
| API abuse e scraping | Autenticação, limite por usuário e IP, paginação máxima e cotas |
| DDoS e exaustão de recursos | CDN e WAF, rate limiting, timeout, fila e limite de payload |
| Upload malicioso | Validação de MIME e assinatura, reprocessamento, antivírus, storage isolado e URL assinada |
| Dependência maliciosa e typosquatting | Lockfile, auditoria, revisão de pacote, SRI e dependências mínimas |
| Vazamento de segredo | Secret scanning, variáveis de ambiente, rotação e revogação imediata |
| Comprometimento da cadeia de build | Permissões mínimas de CI, artefato assinado, proveniência e revisão de release |
| Webhook forjado ou repetido | Assinatura, janela de tempo, idempotência e deduplicação |
| Adulteração de pagamento | Preço e status consultados no servidor e no gateway, nunca no cliente |
| Cache poisoning e cache deception | Não cachear resposta privada, chave de cache correta e autorização em toda requisição |
| Injeção de cabeçalho e CRLF | Validação de parâmetros, cabeçalhos e caracteres de controle |
| Falsificação de e-mail | SPF, DKIM e DMARC configurados no domínio |
| Information disclosure | Erros genéricos, headers seguros, source maps restritos e remoção de metadados |
| Desserialização insegura | Não desserializar entrada não confiável; validar schema |
| Prototype pollution | Merge seguro, bloqueio de `__proto__`, `constructor` e `prototype` |
| Tabnabbing | `rel="noopener noreferrer"` em links externos |
| Subdomain takeover | Higiene de DNS e remoção de registros órfãos |
| Envenenamento de cache do PWA | Cache apenas de ativos próprios, com versionamento e integridade |
| Abuso de notificação push | Permissão contextual e carga útil sem dado sensível |
| Account takeover por recuperação | Token de uso único, expiração curta, MFA e notificação ao titular |
| Abuso de regra de negócio | Limites, validação no servidor e revisão de fluxo |
| Race condition | Transação, lock e idempotência em operação crítica |
| Replay attack | Nonce, timestamp e idempotência |
| MITM | TLS, HSTS e certificado válido |
| Ameaça interna | Privilégio mínimo, auditoria, revisão de acesso e segregação de função |

---

## 15. LGPD e privacidade

A **Lei nº 13.709/2018 (LGPD)** se aplica a todo tratamento de dado pessoal, inclusive em protótipos que utilizem dado real ou de cliente. A conformidade deve ser construída desde o início, e não corrigida depois. Este documento não substitui assessoria jurídica especializada.

### 15.1 Papéis e governança

- **GOV-01:** Os papéis de controlador, operador e encarregado DEVEM estar definidos e documentados por produto.
- **GOV-02:** O encarregado (DPO) DEVE ser indicado, com identidade e contato publicados, nos termos da Resolução CD/ANPD nº 18/2024.
- **GOV-03:** O registro das operações de tratamento (ROPA) DEVE existir e ser atualizado, conforme art. 37 da LGPD.
- **GOV-04:** O Relatório de Impacto à Proteção de Dados (RIPD) DEVE ser elaborado para tratamento de alto risco, conforme art. 38.
- **GOV-05:** DEVE existir programa de governança em privacidade, conforme art. 50.
- **GOV-06:** Agente de pequeno porte PODE usar obrigações simplificadas da Resolução CD/ANPD nº 2/2022, sem dispensar segurança, direitos do titular e resposta a incidentes.
- **GOV-07:** Responsabilidades de privacidade DEVEM estar atribuídas a pessoas e registradas.
- **GOV-08:** A equipe DEVE receber orientação periódica sobre privacidade e segurança.

### 15.2 Bases legais e princípios

- **BASE-01:** Toda atividade de tratamento DEVE ter base legal documentada entre as do art. 7 (dados comuns) ou art. 11 (dados sensíveis).
- **BASE-02:** O consentimento DEVE ser livre, informado, específico, inequívoco e revogável.
- **BASE-03:** O consentimento DEVE ser registrado com data, versão do texto e finalidade.
- **BASE-04:** Legítimo interesse DEVE ter avaliação documentada e oferecer oposição ao titular.
- **BASE-05:** Dados sensíveis (saúde, biometria, origem racial ou étnica, convicção religiosa, opinião política, filiação sindical e vida sexual) só PODEM ser tratados com base específica do art. 11.
- **BASE-06:** Dados de crianças e adolescentes DEVEM observar o melhor interesse e o art. 14, com consentimento parental quando aplicável.
- **BASE-07:** Tratamento NÃO DEVE ter finalidade discriminatória, abusiva ou incompatível com a informada.
- **BASE-08:** Caixas de consentimento NÃO DEVEM vir pré-marcadas.
- **BASE-09:** O princípio da finalidade, adequação, necessidade, transparência, segurança, prevenção e responsabilização DEVE orientar toda decisão de produto.

### 15.3 Minimização, qualidade e retenção

- **MIN-01:** Apenas dados necessários para a finalidade DEVEM ser coletados.
- **MIN-02:** Dados NÃO DEVEM ser reutilizados para finalidade incompatível sem nova análise e base legal.
- **MIN-03:** O prazo de retenção DEVE ser definido por tipo de dado.
- **MIN-04:** Após o prazo, o dado DEVE ser eliminado ou anonimizado.
- **MIN-05:** Anonimização e pseudonimização DEVEM ser preferidas quando atenderem à finalidade.
- **MIN-06:** Dados DEVEM ter rotina de atualização e correção.
- **MIN-07:** A exclusão DEVE se propagar para backups e fornecedores no ciclo definido.
- **MIN-08:** Exceções de retenção legal (fiscal, trabalhista, Marco Civil) DEVEM ser documentadas.
- **MIN-09:** NÃO DEVE haver coleta "por precaução" ou "para uso futuro".

### 15.4 Transparência e direitos do titular

- **DIR-01:** A política de privacidade DEVE ser clara, acessível, versionada e informar categorias de dados, finalidades, bases legais, compartilhamento, retenção, direitos e contato.
- **DIR-02:** Aviso de privacidade DEVE existir no ponto de coleta.
- **DIR-03:** O titular DEVE poder solicitar confirmação, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informação sobre compartilhamento e revogação do consentimento, conforme art. 18.
- **DIR-04:** Pedido de confirmação ou acesso DEVE ser respondido em até 15 dias, conforme art. 19.
- **DIR-05:** A identidade do titular DEVE ser verificada sem exigir dados excessivos.
- **DIR-06:** O exercício de direitos NÃO DEVE ter cobrança.
- **DIR-07:** Decisões automatizadas DEVEM permitir revisão humana, conforme art. 20.
- **DIR-08:** DEVE existir canal publicado e rastreável para pedidos de titular, com prazo e responsável.
- **DIR-09:** O titular NÃO DEVE sofrer retaliação ou tratamento diferenciado por exercer direitos.
- **DIR-10:** A política DEVE informar como o titular pode reclamar à ANPD.

### 15.5 Consentimento e cookies

- **COOK-01:** Cookies e tecnologias estritamente necessários PODEM funcionar sem consentimento; os demais dependem de consentimento.
- **COOK-02:** O banner DEVE oferecer aceitar e recusar com igual destaque, sem padrão enganoso.
- **COOK-03:** O consentimento DEVE ser granular por categoria.
- **COOK-04:** NÃO DEVE haver cookie wall que bloqueie o acesso quando o consentimento não for a base legal.
- **COOK-05:** O consentimento DEVE ser registrado e revogável a qualquer momento.
- **COOK-06:** Analytics e pixels de terceiros NÃO DEVEM carregar antes do consentimento.
- **COOK-07:** A política de cookies DEVE listar nome, finalidade, duração e fornecedor.
- **COOK-08:** Preferir analytics sem dados pessoais e sem rastreamento entre sites.

### 15.6 Segurança e comunicação de incidentes

- **INC-01:** Medidas técnicas e administrativas de segurança DEVEM existir, conforme arts. 46 a 49.
- **INC-02:** DEVE existir plano de resposta a incidente, com papéis, contatos e critérios de acionamento.
- **INC-03:** Incidente com risco ou dano relevante DEVE ser comunicado à ANPD e aos titulares em até 3 dias úteis do conhecimento, conforme Resolução CD/ANPD nº 15/2024.
- **INC-04:** A comunicação DEVE conter os itens exigidos pelo art. 6º da Resolução nº 15/2024.
- **INC-05:** Informações complementares PODEM ser enviadas em até 20 dias úteis, de forma fundamentada.
- **INC-06:** A comunicação ao titular DEVE ser direta, individualizada e em linguagem simples.
- **INC-07:** Quando a comunicação individual for inviável, DEVE haver aviso público por no mínimo 3 meses.
- **INC-08:** Todo incidente DEVE ser registrado, inclusive os não comunicados, com avaliação de risco e justificativa, por no mínimo 5 anos.
- **INC-09:** A avaliação de risco DEVE considerar dados sensíveis, crianças, adolescentes e idosos, dados financeiros, autenticação, sigilo e larga escala.
- **INC-10:** Evidências DEVEM ser preservadas durante a apuração.
- **INC-11:** A comunicação à ANPD DEVE ser feita pelo encarregado ou representante com comprovação de vínculo.
- **INC-12:** Ocultar incidente é proibido e agrava a sanção.
- **INC-13:** O plano de incidentes DEVE ser testado periodicamente.

### 15.7 Transferência internacional de dados

- **TRF-01:** Todo fornecedor e serviço DEVE ser mapeado quanto ao local de armazenamento e processamento.
- **TRF-02:** Transferência internacional só PODE ocorrer com mecanismo válido do art. 33: adequação, cláusulas-padrão, cláusulas específicas ou normas corporativas globais.
- **TRF-03:** Cláusulas-padrão contratuais DEVEM usar o modelo da ANPD sem alterações substanciais, conforme Resolução CD/ANPD nº 19/2024.
- **TRF-04:** A íntegra das cláusulas DEVE ser fornecida ao titular em até 15 dias quando solicitada.
- **TRF-05:** DEVE existir explicação pública em português sobre a transferência, com finalidade, país, responsabilidades e direitos.
- **TRF-06:** Contratos DEVEM ser atualizados quando houver mudança de fornecedor ou de região.
- **TRF-07:** O reconhecimento de adequação da União Europeia pela Resolução CD/ANPD nº 32/2026 PODE ser usado quando aplicável.

### 15.8 Fornecedores e operadores

- **FOR-01:** Todo operador que trate dado pessoal pela SalusDev DEVE ter contrato de tratamento de dados (DPA).
- **FOR-02:** Fornecedores DEVEM passar por avaliação de risco de segurança e privacidade antes da contratação.
- **FOR-03:** O contrato DEVE prever finalidade, segurança, confidencialidade, suboperadores, incidentes, devolução ou exclusão e auditoria.
- **FOR-04:** A lista de suboperadores DEVE ser mantida e comunicada.
- **FOR-05:** O fornecedor DEVE ter acesso apenas ao dado necessário.
- **FOR-06:** A postura de segurança do fornecedor DEVE ser revista periodicamente.
- **FOR-07:** Incidente no fornecedor DEVE acionar avaliação e comunicação pela SalusDev.

### 15.9 Privacidade desde a concepção

- **PRIV-01:** Todo produto e funcionalidade DEVEM adotar privacidade desde a concepção e por padrão.
- **PRIV-02:** RIPD DEVE ser feito para tratamento de alto risco, incluindo perfilamento, dados sensíveis, larga escala e crianças.
- **PRIV-03:** Todo plano e story DEVEM conter requisitos de privacidade.
- **PRIV-04:** Todo novo dado DEVE ser registrado no ROPA antes da implementação.
- **PRIV-05:** O QA DEVE testar acesso, exclusão, retenção, consentimento e isolamento de dados.
- **PRIV-06:** NÃO DEVE haver padrão enganoso que induza o titular a compartilhar mais dados.
- **PRIV-07:** A interface DEVE explicar de forma simples por que o dado é solicitado.
- **PRIV-08:** Toda entrega DEVE passar por revisão de privacidade antes da publicação.

### 15.10 Sanções e responsabilidade

- **SANC-01:** A LGPD prevê advertência, multa de até 2% do faturamento no Brasil, limitada a R$ 50 milhões por infração, multa diária, publicização, bloqueio, eliminação, suspensão e proibição de tratamento, conforme art. 52.
- **SANC-02:** Controlador e operador PODEM responder solidariamente pelos danos causados, conforme arts. 42 a 45.
- **SANC-03:** O risco reputacional e contratual DEVE ser considerado mesmo quando não houver sanção formal.
- **SANC-04:** Agente de pequeno porte também está sujeito à LGPD.
- **SANC-05:** A ausência de base legal, de segurança ou de comunicação de incidente aumenta a exposição.

### 15.11 Checklist LGPD

- [ ] Base legal definida e documentada para cada dado.
- [ ] Política de privacidade e aviso no ponto de coleta publicados.
- [ ] Encarregado indicado e contato divulgado.
- [ ] ROPA atualizado.
- [ ] RIPD elaborado quando o tratamento for de alto risco.
- [ ] Consentimento registrado, granular e revogável, quando aplicável.
- [ ] Cookies não essenciais bloqueados até o consentimento.
- [ ] Canal de direitos do titular publicado, com prazo e responsável.
- [ ] Prazos de retenção definidos e rotina de exclusão ativa.
- [ ] Plano de incidentes documentado, com fluxo de 3 dias úteis.
- [ ] Registro de incidentes por no mínimo 5 anos.
- [ ] Mecanismo de transferência internacional contratado.
- [ ] DPA assinado com todos os operadores.
- [ ] RLS e autorização validados no servidor.
- [ ] Logs sem dado pessoal desnecessário.
- [ ] Backups criptografados e exclusão propagada.
- [ ] Equipe orientada sobre privacidade e segurança.
- [ ] Revisão de privacidade concluída antes da publicação.

### 15.12 Outras normas aplicáveis

| Norma | Impacto no produto |
|---|---|
| Lei nº 12.965/2014 (Marco Civil da Internet) | Guarda de registros de acesso, privacidade e responsabilidade no ambiente digital |
| Lei nº 8.078/1990 (Código de Defesa do Consumidor) | Informação clara, oferta, atendimento e direito de arrependimento em contratação online |
| Lei nº 13.146/2015 (Lei Brasileira de Inclusão) | Acessibilidade digital como requisito de produto |
| Lei nº 14.155/2021 | Agravamento de penas para fraude e invasão de dispositivo informático |

### 15.13 Referências normativas

- Lei nº 13.709/2018 (LGPD): https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Regulamentos da ANPD: https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd
- Resolução CD/ANPD nº 2/2022 (agentes de pequeno porte)
- Resolução CD/ANPD nº 4/2023 (dosimetria)
- Resolução CD/ANPD nº 15/2024 (comunicação de incidentes)
- Resolução CD/ANPD nº 18/2024 (encarregado)
- Resolução CD/ANPD nº 19/2024 (transferência internacional)
- Resolução CD/ANPD nº 32/2026 (adequação da União Europeia)
- Lei nº 12.965/2014 (Marco Civil da Internet): https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm
- Lei nº 8.078/1990 (Código de Defesa do Consumidor): https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm
- OWASP Top 10:2025: https://owasp.org/Top10/2025/

---

## 16. Performance e qualidade técnica

- **PERF-01:** Toda tela DEVE carregar sem erros no console do navegador.
- **PERF-02:** Toda entrega DEVE passar em `npm run build` sem erros de TypeScript.
- **PERF-03:** NÃO DEVE ser usado `any` sem justificativa.
- **PERF-04:** Imagens DEVEM ter dimensão definida e formato adequado.
- **PERF-05:** Listas longas DEVEM usar paginação ou virtualização.
- **PERF-06:** Requisições DEVEM tratar carregamento, erro e cancelamento.
- **PERF-07:** NÃO DEVE haver dependência nova sem justificativa, uso real e registro no plano.
- **PERF-08:** NÃO DEVE haver código morto, `console.log` de depuração ou comentário temporário em entrega.
- **PERF-09:** Formatação e lint DEVEM ser executados antes de concluir a tarefa, quando disponíveis.

---

## 17. Código limpo, comentários e organização do projeto

Código é lido muito mais vezes do que escrito. O padrão profissional deve existir desde o primeiro arquivo, inclusive em protótipos. A permissão de arquivo monolítico no início, prevista em `RegrasDesenvolvimento.md`, não dispensa organização, nomes claros e extração de componentes quando houver repetição.

### 17.1 Princípios de código limpo

- **CLN-01:** Nomes DEVEM ser claros, específicos e sem abreviações obscuras (`customerPhone`, não `cp`).
- **CLN-02:** Cada função DEVE ter uma única responsabilidade.
- **CLN-03:** Cada componente DEVE ter uma responsabilidade e, preferencialmente, até 200 linhas.
- **CLN-04:** Cada arquivo DEVE ter, preferencialmente, até 300 linhas; em protótipo, até 500 linhas antes de modularizar.
- **CLN-05:** O aninhamento DEVE ter no máximo 3 níveis, com retorno antecipado quando possível.
- **CLN-06:** Números e textos mágicos DEVEM ser substituídos por constantes nomeadas.
- **CLN-07:** Lógica repetida DEVE ser extraída após a segunda ocorrência, sem abstração prematura.
- **CLN-08:** A solução mais simples que atende ao requisito DEVE ser preferida (KISS), sem implementar o que ainda não é necessário (YAGNI).
- **CLN-09:** Tipos DEVEM ser explícitos; `any` é proibido sem justificativa registrada.
- **CLN-10:** Asserções de tipo DEVEM ser evitadas quando houver alternativa segura.
- **CLN-11:** Dados DEVEM ser imutáveis por padrão; props e estado NÃO DEVEM ser mutados diretamente.
- **CLN-12:** Efeitos colaterais DEVEM ser isolados, explícitos e com limpeza quando necessário.
- **CLN-13:** Erros DEVEM ser tratados; `catch` vazio ou que engole exceção é proibido.
- **CLN-14:** Código morto, import não usado e variável não usada DEVEM ser removidos.
- **CLN-15:** Código comentado NÃO DEVE permanecer no repositório.
- **CLN-16:** `console.log` de depuração NÃO DEVE existir em entrega.
- **CLN-17:** Booleanos DEVEM usar prefixos `is`, `has`, `can` ou `should`.
- **CLN-18:** Funções com muitos parâmetros DEVEM receber objeto de opções nomeadas.
- **CLN-19:** Estado derivado NÃO DEVE ser duplicado; manter uma única fonte de verdade.
- **CLN-20:** Listas dinâmicas NÃO DEVEM usar índice como `key`.
- **CLN-21:** Dívida técnica DEVE ser registrada no plano, não escondida em comentário.
- **CLN-22:** Legibilidade DEVE prevalecer sobre esperteza; código curto demais e obscuro é tão ruim quanto código longo demais.

### 17.2 Comentários

- **CMT-01:** Comentário DEVE explicar o porquê, a restrição, a decisão ou a regra de negócio, nunca o óbvio.
- **CMT-02:** Comentário DEVE ser sucinto, preferencialmente em até 2 linhas.
- **CMT-03:** NÃO DEVE existir comentário que repita o que o código já diz.
- **CMT-04:** Código comentado NÃO DEVE ser usado como backup; o Git é o histórico.
- **CMT-05:** `TODO` e `FIXME` só PODEM existir com responsável, data e referência de issue ou plano.
- **CMT-06:** API pública, hooks e lógica complexa DEVEM ter documentação curta em TSDoc ou JSDoc.
- **CMT-07:** Comentário DEVE ser atualizado junto com o código; comentário desatualizado é pior que ausente.
- **CMT-08:** Comentário NÃO DEVE compensar nome ruim; renomear é a solução.
- **CMT-09:** NÃO DEVEM existir banners decorativos, separadores gigantes ou arte ASCII.
- **CMT-10:** Autoria, data e "alterado por" NÃO DEVEM ficar no código; usar Git.
- **CMT-11:** Comentário NÃO DEVE conter segredo, dado pessoal, URL interna ou credencial.
- **CMT-12:** O idioma dos comentários DEVE ser consistente por arquivo.
- **CMT-13:** Workaround DEVE referenciar a limitação ou a issue que o justifica.
- **CMT-14:** Desativar lint ou TypeScript NÃO DEVE ocorrer sem justificativa na própria linha ou no plano.

### 17.3 Organização de pastas e arquivos

- **ORG-01:** A estrutura DEVE ser organizada por domínio ou feature, não por arquivos soltos.
- **ORG-02:** Componentes de interface DEVEM ficar separados de regra de negócio, serviço e tipo.
- **ORG-03:** Cada arquivo DEVE ter um componente principal ou uma responsabilidade clara.
- **ORG-04:** Código compartilhado DEVE ficar em `components/ui`, `hooks`, `lib` ou `services`, sem duplicação em features.
- **ORG-05:** Cada feature DEVE expor seu ponto de entrada em `index.ts`, sem lógica no barrel.
- **ORG-06:** Imports DEVEM usar o alias `@/`; caminhos relativos profundos (`../../../`) são proibidos.
- **ORG-07:** Dependência circular entre módulos é proibida.
- **ORG-08:** Arquivos auxiliares DEVEM ter nomes descritivos; `temp`, `novo`, `final`, `copia`, `teste`, `old` e `backup` são proibidos.
- **ORG-09:** Arquivos órfãos, duplicados ou não utilizados DEVEM ser removidos.
- **ORG-10:** Assets DEVEM ser organizados por tipo ou feature e otimizados antes do commit.
- **ORG-11:** NÃO DEVE haver arquivo solto na raiz de `src`.
- **ORG-12:** Configuração DEVE ficar na raiz do projeto, sem espalhar arquivos de config.
- **ORG-13:** `.env.example` DEVE estar atualizado e sem valores reais.
- **ORG-14:** O `README.md` DEVE explicar instalação, execução, build e estrutura.
- **ORG-15:** Testes DEVEM ficar próximos do módulo testado ou em `__tests__`, com nome `.test.ts` ou `.test.tsx`.
- **ORG-16:** Protótipo PODE começar monolítico, mas DEVE ser modularizado ao ultrapassar 500 linhas ou ao repetir lógica.
- **ORG-17:** Identificadores de código DEVEM ser em inglês; textos de interface DEVEM ser em português.
- **ORG-18:** NÃO DEVEM ser criadas pastas genéricas como `misc`, `coisas`, `utils2` ou `temp`.

### 17.4 Convenções de nomenclatura

| Elemento | Convenção | Exemplo |
|---|---|---|
| Componente React | PascalCase | `ProductCard.tsx` |
| Hook | camelCase com prefixo `use` | `useProducts.ts` |
| Função utilitária | camelCase | `formatCurrency.ts` |
| Constante | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE` |
| Tipo ou interface | PascalCase | `Product` |
| Contexto React | PascalCase | `AuthContext.tsx` |
| Arquivo de teste | nome do módulo com `.test` | `ProductCard.test.tsx` |
| Pasta | kebab-case | `product-catalog/` |
| Variável booleana | prefixo `is`, `has`, `can` ou `should` | `isLoading` |
| Manipulador de evento | prefixo `handle` | `handleSave` |
| Prop de evento | prefixo `on` | `onSave` |
| Rota pública | português, curta e estável | `/solucoes` |
| Classe CSS customizada | kebab-case | `product-card` |

### 17.5 Formatação e ferramentas

- **FMT-01:** O formatador oficial DEVE ser o `oxfmt`, executado por `npm run format`.
- **FMT-02:** NÃO DEVE ser reformatado arquivo não relacionado à tarefa.
- **FMT-03:** TypeScript DEVE compilar em modo estrito, sem erro e sem `any` injustificado.
- **FMT-04:** Lint DEVE ser executado quando disponível, sem desativação silenciosa.
- **FMT-05:** O estilo existente DEVE ser seguido: aspas duplas, sem ponto e vírgula e indentação de 2 espaços no código atual.
- **FMT-06:** Imports DEVEM ser organizados e não utilizados DEVEM ser removidos.
- **FMT-07:** `npm run build` DEVE passar antes de concluir a tarefa.
- **FMT-08:** Artefatos gerados (`dist`, `node_modules`) NÃO DEVEM ser commitados.
- **FMT-09:** O lockfile DEVE ser commitado.
- **FMT-10:** Arquivo específico de editor NÃO DEVE ser incluído sem acordo do time.

### 17.6 Estrutura de referência

```text
src/
├── app/
│   └── App.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Select.tsx
│   │   └── Input.tsx
│   └── layout/
│       ├── AppShell.tsx
│       └── PageHeader.tsx
├── features/
│   └── products/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── schemas/
│       ├── types.ts
│       └── index.ts
├── hooks/
├── lib/
│   ├── formatters.ts
│   ├── masks.ts
│   └── validators.ts
├── services/
├── types/
├── styles/
├── assets/
└── main.tsx
```

### 17.7 Checklist de código limpo

- [ ] Nomes claros e sem abreviação obscura.
- [ ] Funções e componentes com responsabilidade única.
- [ ] Sem código morto, import não usado ou código comentado.
- [ ] Sem `console.log` de depuração.
- [ ] Sem `any` sem justificativa.
- [ ] Erros tratados, sem `catch` vazio.
- [ ] Comentários apenas para o porquê e atualizados.
- [ ] `TODO` com responsável, data e referência.
- [ ] Estrutura de pastas por domínio.
- [ ] Imports com `@/` e sem dependência circular.
- [ ] Formatação e lint aplicados.
- [ ] Build e TypeScript sem erro.
- [ ] Nenhum arquivo temporário ou duplicado.

---

## 18. Gestão de bugs e testes de regressão

Todo bug DEVE ser registrado, reproduzido, isolado e corrigido com escopo mínimo. Nenhuma correção DEVE ser considerada concluída sem teste que comprove o comportamento anterior e o novo. O objetivo é impedir que a correção de um ponto quebre o que já funcionava.

### 18.1 Registro de bugs

- **BUG-01:** Todo bug DEVE ser registrado em `docs/bugs/` antes da correção; em incidente crítico, a contenção pode ocorrer primeiro e o registro deve ser feito imediatamente depois.
- **BUG-02:** O identificador DEVE seguir o formato `BUG-NNNN`, com quatro dígitos, sequencial e nunca reutilizado.
- **BUG-03:** O arquivo DEVE seguir o padrão `BUG-NNNN - slug-curto.md`.
- **BUG-04:** Cada registro DEVE conter, no mínimo: identificador, título, status, severidade, prioridade, ambiente, versão ou commit, tela ou rota, passos para reproduzir, resultado esperado, resultado atual, evidência, causa raiz, escopo afetado, correção, arquivos alterados, teste de regressão e validação `[D]` e `[M]`.
- **BUG-05:** Cada bug DEVE ter um único registro; problemas não relacionados NÃO DEVEM ser agrupados.
- **BUG-06:** A evidência DEVE permitir reproduzir o problema (print, vídeo, log ou dados de teste), com dado pessoal e segredo removidos.
- **BUG-07:** O status DEVE seguir o ciclo definido na Seção 18.3.
- **BUG-08:** Severidade e prioridade DEVEM ser classificadas na triagem, conforme a Seção 18.2.
- **BUG-09:** O registro DEVE apontar o plano, a story, o commit e o pull request relacionados.
- **BUG-10:** O `INDEX.md` DEVE ser atualizado a cada abertura, mudança de status ou fechamento.
- **BUG-11:** Bug duplicado DEVE ser marcado e vinculado ao registro principal.
- **BUG-12:** Reabertura DEVE ser registrada como reincidência, com o motivo e o teste que não cobriu o caso.
- **BUG-13:** Bug S1 ou S2 DEVE ter post-mortem sem culpa, com causa raiz e ação preventiva.
- **BUG-14:** Bug de segurança DEVE ser tratado de forma restrita até a correção; se houver dado pessoal, DEVE acionar também o fluxo de incidente da Seção 15.6.
- **BUG-15:** Evidência, log e anexo NÃO DEVEM conter dado pessoal real, credencial ou segredo.

### 18.2 Severidade e prioridade

Severidade mede o impacto; prioridade mede a ordem de execução. As duas DEVEM ser registradas separadamente.

| Severidade | Critério | Exemplo |
|---|---|---|
| S1 - Crítico | Perda de dado, falha de segurança, erro de pagamento, indisponibilidade total ou incidente com dado pessoal | Usuário acessa dado de outro tenant; cobrança duplicada |
| S2 - Alto | Fluxo principal quebrado sem alternativa de contorno | Não é possível salvar produto; login indisponível |
| S3 - Médio | Fluxo afetado com alternativa de contorno | Filtro não persiste, mas a busca funciona |
| S4 - Baixo | Problema visual, texto ou comportamento menor | Alinhamento, acentuação, ícone inadequado |

| Prioridade | Critério de atendimento |
|---|---|
| P0 | Contenção imediata e correção no mesmo dia |
| P1 | Correção no próximo ciclo de trabalho |
| P2 | Entra no backlog priorizado |
| P3 | Pode aguardar conveniência ou próxima versão |

- **BUG-16:** S1 DEVE ser P0 por padrão.
- **BUG-17:** A prioridade final PODE ser ajustada por Rafael, com justificativa registrada.

### 18.3 Ciclo de vida do bug

```text
Novo -> Triado -> Reproduzido -> Em correção -> Em validação -> Resolvido -> Fechado
                                      |
                                      +-> Bloqueado
                                      +-> Não reproduzido
                                      +-> Duplicado
                                      +-> Rejeitado
Fechado -> Reaberto (reincidência)
```

- **BUG-18:** Um bug só PODE ir para `Em correção` após ser reproduzido.
- **BUG-19:** Um bug só PODE ir para `Resolvido` após teste de regressão aprovado e validação `[D]` e `[M]` quando aplicável.
- **BUG-20:** Um bug só PODE ir para `Fechado` após revisão e atualização do registro.
- **BUG-21:** `Não reproduzido` DEVE registrar as tentativas, o ambiente e a informação faltante.
- **BUG-22:** `Duplicado` DEVE apontar o bug principal.
- **BUG-23:** `Rejeitado` DEVE registrar o motivo.

### 18.4 Protocolo de isolamento

O isolamento existe para corrigir apenas o necessário, sem alterar o que já foi validado.

- **ISO-01:** O bug DEVE ser reproduzido de forma determinística antes da correção.
- **ISO-02:** O escopo afetado DEVE ser identificado antes da alteração: arquivos, componentes, rotas, serviços e dados.
- **ISO-03:** A correção DEVE ocorrer em branch isolada no padrão `fix/BUG-NNNN-slug`.
- **ISO-04:** O teste que reproduz o bug DEVE ser escrito antes da correção e DEVE falhar no estado atual.
- **ISO-05:** A correção DEVE ser mínima; refatoração, renomeação, formatação global e melhoria não relacionada são proibidas no mesmo commit.
- **ISO-06:** Quando a correção exigir refatoração, ela DEVE ser feita em tarefa separada, aprovada e posterior ao bugfix.
- **ISO-07:** Se a alteração começar a se espalhar por arquivos não previstos, o trabalho DEVE parar e o escopo ser revisto.
- **ISO-08:** O comportamento fora do escopo do bug DEVE ser preservado.
- **ISO-09:** Todos os testes afetados e a suíte de regressão DEVEM ser executados.
- **ISO-10:** O registro DEVE ser atualizado com causa raiz, correção e arquivos alterados.
- **ISO-11:** Bug S1 e S2 DEVEM ter revisão por uma segunda pessoa.
- **ISO-12:** Correção de risco DEVE ter plano de rollback ou feature flag.
- **ISO-13:** NÃO DEVE ser corrigido diretamente na branch principal.
- **ISO-14:** Apenas o `@devops` realiza push, conforme `RegrasDesenvolvimento.md`.

### 18.5 Testes de regressão e comparação com o anterior

- **REG-01:** Todo bugfix DEVE ter teste de regressão que falha antes e passa depois.
- **REG-02:** Toda implementação DEVE adicionar ou atualizar teste do comportamento alterado.
- **REG-03:** O teste de regressão DEVE comparar o comportamento atual com o comportamento aprovado anteriormente (baseline ou golden master).
- **REG-04:** Alterações de interface DEVEM ter comparação visual com a versão anterior.
- **REG-05:** O baseline DEVE ser versionado e revisado; atualizar baseline sem justificativa e revisão é proibido.
- **REG-06:** O nome do teste DEVE referenciar o bug ou a regra de negócio.
- **REG-07:** Testes DEVEM ser determinísticos, independentes de ordem e sem estado externo compartilhado.
- **REG-08:** Fluxos críticos DEVEM ter teste ponta a ponta: login, cadastro e edição de produto, exclusão, pagamento e impressão.
- **REG-09:** Testes visuais DEVEM cobrir `360 px`, `768 px`, `1024 px` e `1440 px`.
- **REG-10:** Testes DEVEM verificar erros de console e acessibilidade básica.
- **REG-11:** A suíte de regressão DEVE rodar em CI antes do merge.
- **REG-12:** NÃO DEVE haver merge com teste vermelho; teste ignorado DEVE ter issue e prazo.
- **REG-13:** Teste instável (flaky) DEVE ser tratado como bug.
- **REG-14:** A cobertura DEVE ser medida pelo comportamento corrigido, não apenas pelo percentual global.
- **REG-15:** Enquanto não houver automação, a linha de base PODE ser manual, com screenshots e checklist aprovados, e DEVE ser migrada para automação assim que possível.

Stack recomendada para ativar a automação, quando o sistema de testes for implementado:

| Camada | Ferramenta recomendada |
|---|---|
| Teste unitário e de componente | Vitest com React Testing Library |
| Teste ponta a ponta | Playwright |
| Comparação visual | Playwright com snapshots |
| Acessibilidade | axe-core integrado ao Playwright |
| Mock de API | MSW |

- **REG-16:** As ferramentas de teste DEVEM ser instaladas no projeto antes do uso, com registro no plano.
- **REG-17:** O comando de teste DEVE ser documentado no `README.md`.

### 18.6 Estrutura do sistema de bugs

```text
docs/bugs/
├── README.md
├── INDEX.md
├── BUG-0001 - slug-curto.md
├── evidencias/
│   └── BUG-0001/
│       ├── antes.png
│       └── depois.png
└── templates/
    └── bug-template.md
```

- **BUG-24:** `INDEX.md` DEVE listar identificador, título, severidade, prioridade, status, responsável, data e link.
- **BUG-25:** Evidências DEVEM ficar em pasta por bug.
- **BUG-26:** Bug fechado NÃO DEVE ser apagado; permanece como histórico e auditoria.

### 18.7 Template de registro de bug

```md
# BUG-NNNN - Título curto

- **Status:** Novo
- **Severidade:** S1 / S2 / S3 / S4
- **Prioridade:** P0 / P1 / P2 / P3
- **Ambiente:** desenvolvimento / homologação / produção
- **Versão ou commit:**
- **Tela ou rota:**
- **Dispositivo:** [D] / [M] / ambos
- **Responsável:**
- **Aberto em:**
- **Plano ou story relacionada:**

## Descrição

Descrever o problema de forma objetiva.

## Passos para reproduzir

1. Acessar...
2. Clicar em...
3. Informar...

## Resultado esperado

Descrever o comportamento correto.

## Resultado atual

Descrever o comportamento observado.

## Evidência

- Arquivo ou link:
- Dados de teste sem dado pessoal:

## Causa raiz

Preencher durante a analise.

## Escopo afetado

- Arquivos:
- Componentes:
- Rotas:
- Dados:

## Correção aplicada

- Commit:
- Pull request:

## Teste de regressão

- Arquivo do teste:
- Falha antes da correção:
- Passa depois da correção:
- Validacao [D]:
- Validacao [M]:

## Histórico

| Data | Status | Responsável | Observação |
|---|---|---|---|
| AAAA-MM-DD | Novo | | |
```

### 18.8 Template de teste de regressão

| Campo | Conteúdo |
|---|---|
| Identificador | `BUG-NNNN` ou regra de negócio |
| Comportamento protegido | O que o teste garante |
| Baseline aprovado | Versão ou evidência de referência |
| Cenário | Dado, quando, então |
| Viewports | `360`, `768`, `1024`, `1440` |
| Arquivo de teste | Caminho no repositório |
| Resultado antes | Falha esperada e reproduzida |
| Resultado depois | Aprovação |
| Evidência | Print, vídeo ou relatório |
| Responsável | Quem validou |

### 18.9 Integração com planos, handoffs e Git

- **BUG-27:** A abertura de sessão DEVE verificar bugs abertos e sua prioridade.
- **BUG-28:** O handoff diário DEVE registrar bugs abertos, corrigidos e reincidentes.
- **BUG-29:** O plano ativo DEVE referenciar o `BUG-NNNN` quando a correção fizer parte dele.
- **BUG-30:** O commit DEVE seguir o padrão `fix(BUG-NNNN): descrição curta`.
- **BUG-31:** O pull request DEVE conter link do bug, arquivos alterados, teste de regressão e validação `[D]` e `[M]`.
- **BUG-32:** Bug de segurança NÃO DEVE ser divulgado publicamente antes da correção.

### 18.10 Métricas e revisão

- **BUG-33:** DEVEM ser acompanhados: bugs abertos por severidade, tempo de correção, taxa de reincidência e bugs escapados para produção.
- **BUG-34:** A revisão DEVE ocorrer em toda abertura de sessão e no encerramento do dia.
- **BUG-35:** S1 e S2 DEVEM gerar ação preventiva registrada.
- **BUG-36:** A taxa de reincidência alta DEVE indicar falha de teste de regressão ou de causa raiz.

### 18.11 Checklist de bugfix

- [ ] Bug registrado em `docs/bugs/` com identificador único.
- [ ] Severidade e prioridade classificadas.
- [ ] Bug reproduzido de forma determinística.
- [ ] Branch isolada `fix/BUG-NNNN-slug`.
- [ ] Teste de regressão escrito e falhando antes da correção.
- [ ] Correção mínima, sem refatoração não relacionada.
- [ ] Suíte de regressão executada.
- [ ] Validação `[D]` e `[M]` concluída.
- [ ] Baseline atualizado apenas quando a mudança for intencional.
- [ ] Evidência antes e depois anexada.
- [ ] Registro e `INDEX.md` atualizados.
- [ ] Handoff atualizado.
- [ ] Revisão por segunda pessoa em S1 e S2.
- [ ] Sem dado pessoal, segredo ou credencial na evidência.

---

## 19. Anti-padrões proibidos (resumo)

Os itens abaixo são proibidos em qualquer tela:

| Código | Anti-padrão |
|---|---|
| PROIB-01 | Botões redundantes para a mesma ação na mesma tela. |
| PROIB-02 | Zoom automático do Safari no iPhone causado por fonte menor que `16 px` em campos. |
| PROIB-03 | Bloquear zoom do usuário com `maximum-scale=1` ou `user-scalable=no`. |
| PROIB-04 | Campo estruturado sem máscara. |
| PROIB-05 | Campo de seleção fora do padrão `react-select`. |
| PROIB-06 | Impressão sem formatação, com menus e botões no papel. |
| PROIB-07 | `alert`, `confirm` ou `prompt` nativos do navegador. |
| PROIB-08 | Uso de `placeholder` como único rótulo. |
| PROIB-09 | Rolagem horizontal involuntária. |
| PROIB-10 | Ação destrutiva sem confirmação. |
| PROIB-11 | Erro técnico exibido ao usuário. |
| PROIB-12 | Dados fictícios misturados com dados reais sem identificação. |
| PROIB-13 | Segredos no código ou no repositório. |
| PROIB-14 | Conteúdo provisório em entrega demonstrada. |
| PROIB-15 | Depender de hover para ação essencial. |
| PROIB-16 | Texto essencial dentro de imagem. |
| PROIB-17 | Carrossel com avanço automático sem controle do usuário. |
| PROIB-18 | Duplicação de navegação principal na mesma viewport. |
| PROIB-19 | Segredo em variável `VITE_` ou no bundle do frontend. |
| PROIB-20 | Autorização aplicada apenas na interface, sem validação no servidor. |
| PROIB-21 | RLS desabilitado ou chave `service_role` no cliente. |
| PROIB-22 | Token de sessão privilegiada em `localStorage` ou `sessionStorage`. |
| PROIB-23 | Dado pessoal real em protótipo, demonstração ou prompt de IA. |
| PROIB-24 | Cache do PWA com resposta autenticada ou dado privado. |
| PROIB-25 | Webhook ou pagamento processado sem validar assinatura e idempotência. |
| PROIB-26 | Armazenar número de cartão ou CVV. |
| PROIB-27 | Tratamento de dado pessoal sem base legal documentada. |
| PROIB-28 | Cookie não essencial ativo antes do consentimento. |
| PROIB-29 | Transferência internacional sem mecanismo válido. |
| PROIB-30 | Incidente de segurança sem avaliação e comunicação no prazo legal. |
| PROIB-31 | Log com senha, token, cartão, CPF completo ou dado sensível. |
| PROIB-32 | CORS aberto com credenciais ou origem curinga. |
| PROIB-33 | `dangerouslySetInnerHTML` sem sanitização. |
| PROIB-34 | Dependência nova sem auditoria e sem registro no plano. |
| PROIB-35 | Backup sem teste de restauração. |
| PROIB-36 | Corrigir bug sem registro, reprodução e teste de regressão. |
| PROIB-37 | Bugfix com refatoração, renomeação ou formatação não relacionada. |
| PROIB-38 | Alterar baseline de teste sem justificativa e revisão. |
| PROIB-39 | Fechar bug sem validação `[D]` e `[M]` quando aplicável. |
| PROIB-40 | Evidência de bug com dado pessoal real, segredo ou credencial. |
| PROIB-41 | Divulgar bug de segurança antes da correção. |
| PROIB-42 | Reabrir bug sem registrar reincidência e causa. |
| PROIB-43 | Teste dependente de ordem, estado externo ou execução manual oculta. |
| PROIB-44 | Atualizar snapshot ou baseline automaticamente sem revisão humana. |
| PROIB-45 | Código comentado como backup de versão. |
| PROIB-46 | Comentário óbvio, decorativo ou desatualizado. |
| PROIB-47 | `TODO` sem responsável, data e referência. |
| PROIB-48 | `console.log` de depuração em entrega. |
| PROIB-49 | `any` sem justificativa. |
| PROIB-50 | Arquivo ou função gigante sem extração. |
| PROIB-51 | Arquivo com nome temporário, cópia, final ou antigo. |
| PROIB-52 | Import relativo profundo fora do alias `@/`. |
| PROIB-53 | Duplicação de componente, lógica ou estilo. |
| PROIB-54 | Lint ou TypeScript desativado sem justificativa. |
| PROIB-55 | Dependência circular entre módulos. |
| PROIB-56 | Arquivo solto na raiz de `src`. |

---

## 20. Checklist de conformidade por entrega

Antes de marcar uma tela, componente ou fluxo como concluído:

### Formulários

- [ ] Todos os campos estruturados têm máscara e validação.
- [ ] Campos de seleção usam `react-select` por meio do componente padrão.
- [ ] Campos têm rótulo, `type`, `inputMode` e `autoComplete` adequados.
- [ ] Erros são específicos e o foco vai para o primeiro campo inválido.
- [ ] Envio tem estado de carregamento e bloqueio de duplo envio.
- [ ] Fontes de campos em `[M]` têm no mínimo `16 px`.

### Ações e navegação

- [ ] Existe apenas uma ação primária por contexto.
- [ ] Não há botões redundantes para a mesma ação.
- [ ] Ações destrutivas têm confirmação.
- [ ] Botões têm estados completos e área de toque adequada.
- [ ] Navegação está consistente entre `[D]` e `[M]`.

### Mobile e PWA

- [ ] Testado em `360 px`, `768 px`, `1024 px` e `1440 px`.
- [ ] Sem rolagem horizontal.
- [ ] Teclado virtual não cobre campos nem botões.
- [ ] Áreas seguras do iPhone respeitadas.
- [ ] `manifest.json`, ícones e modo `standalone` válidos.
- [ ] Comportamento offline previsível.

### Impressão

- [ ] Existe `@media print` para telas imprimíveis.
- [ ] Cabeçalho, rodapé e numeração de página presentes.
- [ ] Navegação, botões e filtros não são impressos.
- [ ] Tabelas não quebram linhas entre páginas.
- [ ] Impressão testada no navegador de destino.
- [ ] Biblioteca de impressão instalada quando utilizada.

### Segurança

- [ ] Autorização validada no servidor em toda requisição.
- [ ] IDs não sequenciais e verificação de dono e tenant.
- [ ] RLS habilitada em todas as tabelas com dado de usuário.
- [ ] Entradas validadas com schema no servidor.
- [ ] Saída codificada e HTML sanitizado.
- [ ] CORS com lista explícita de origens.
- [ ] Cabeçalhos de segurança e CSP configurados.
- [ ] Nenhum segredo no repositório, bundle ou log.
- [ ] Dependências auditadas e lockfile commitado.
- [ ] Rate limiting em login, recuperação, busca e exportação.
- [ ] Autenticação de dois fatores (MFA/2FA) ativa em todos os logins (usando Supabase Auth MFA).
- [ ] Webhooks com assinatura e idempotência.
- [ ] Backup criptografado com restauração testada.
- [ ] Logs de auditoria para ações privilegiadas.
- [ ] Plano de resposta a incidente definido.

### LGPD

- [ ] Base legal documentada para cada dado tratado.
- [ ] Política de privacidade e aviso de coleta publicados.
- [ ] Encarregado indicado com contato divulgado.
- [ ] ROPA atualizado e RIPD quando aplicável.
- [ ] Consentimento granular, registrado e revogável.
- [ ] Cookies não essenciais bloqueados até consentimento.
- [ ] Canal de direitos do titular com prazo definido.
- [ ] Retenção e exclusão definidas por tipo de dado.
- [ ] Transferência internacional com mecanismo válido.
- [ ] DPA assinado com operadores.
- [ ] Fluxo de incidente com prazo de 3 dias úteis.
- [ ] Dados pessoais fora de cache, log e backup sem proteção.

### Bugs e regressão

- [ ] Bug registrado com identificador, severidade e prioridade.
- [ ] Bug reproduzido e escopo afetado identificado.
- [ ] Branch isolada e correção mínima.
- [ ] Teste de regressão falha antes e passa depois.
- [ ] Suíte de regressão executada sem falha.
- [ ] Baseline visual revisado e atualizado somente quando intencional.
- [ ] Validação `[D]` e `[M]` concluída.
- [ ] Evidência antes e depois anexada sem dado pessoal.
- [ ] Registro, `INDEX.md` e handoff atualizados.

### Código e organização

- [ ] Nomes claros, funções e componentes com responsabilidade única.
- [ ] Sem código morto, comentado ou `console.log`.
- [ ] Comentários sucintos, atualizados e apenas quando necessários.
- [ ] Sem `any` sem justificativa.
- [ ] Estrutura de pastas por domínio e sem arquivo solto em `src`.
- [ ] Imports com `@/` e sem dependência circular.
- [ ] Formatação, lint, TypeScript e build aprovados.

### Qualidade

- [ ] Estados de carregamento, vazio, erro e sucesso definidos.
- [ ] Acessibilidade mínima validada.
- [ ] Textos em português, com acentuação e sem `&`.
- [ ] Sem erros no console, no build ou no TypeScript.
- [ ] Sem segredos, dados reais ou conteúdo provisório.
- [ ] Documentação e plano atualizados.

---

## 21. Exceções e aprovação

- **EXC-01:** Qualquer exceção a uma regra DEVE ser registrada no plano ativo, com justificativa, impacto e responsável.
- **EXC-02:** Exceções sem registro são tratadas como falha de conformidade.
- **EXC-03:** Exceções que afetam acessibilidade, segurança ou privacidade NÃO DEVEM ser aprovadas.
- **EXC-04:** A aprovação de exceção é responsabilidade de Rafael, com registro do `@aiox-master`.

---

## 22. Governança do documento

- Este documento DEVE ser relido integralmente em cada novo pedido, antes de analisar, responder ou executar qualquer alteração.
- Todo plano novo DEVE conter, no início, a linha de releitura obrigatória deste documento, com registro de data, hora e agente responsável.
- Este documento DEVE ser lido antes de especificar ou implementar qualquer tela.
- Novas regras DEVEM ser adicionadas com código, categoria e data.
- Regras não devem ser removidas; quando obsoletas, DEVEM ser marcadas como `Revogada` com data e motivo.
- Toda alteração DEVE ser registrada no histórico de versões.
- Conflitos com o `PRD-SalusDev-v0.3.md` ou com `RegrasDesenvolvimento.md` DEVEM ser resolvidos por Rafael antes da implementação.

---

## 23. Histórico de versões

| Versão | Data | Alteração | Agente |
|---|---|---|---|
| 1.0 | 2026-11-05 | Criação do documento com diretrizes de formulários, máscaras, seleção com `react-select`, ações sem redundância, comportamento PWA/Safari iOS, impressão, acessibilidade, segurança e checklist de conformidade | @aiox-master |
| 1.1 | 2026-11-05 | Expansão da Seção 14 (segurança) com cobertura do OWASP Top 10:2025, autenticação, autorização, isolamento multi-tenant, injeção, criptografia, infraestrutura, cadeia de suprimentos, PWA, integrações, logs, resiliência, segredos, backup, erros comuns de início e requisitos por fase. Nova Seção 15 (LGPD) com bases legais, direitos do titular, cookies, incidentes, transferência internacional, fornecedores, privacidade desde a concepção e sanções. Ampliação de anti-padrões e checklists | @aiox-master |
| 1.2 | 2026-11-05 | Inclusão da Seção 17 (código limpo, comentários e organização de pastas) e da Seção 18 (sistema de registro de bugs, triagem, isolamento de escopo e testes de regressão com comparação de baseline). Ampliação de anti-padrões e checklists de entrega | @aiox-master |
| 1.3 | 2026-11-05 | Governança: releitura obrigatória deste documento em cada novo pedido e inclusão da linha de releitura no início de todo plano novo | @aiox-master |
| 1.4 | 2026-11-06 | Atualização da regra AUTH-02 e requisitos correlatos: obrigatoriedade de no mínimo dois fatores de autenticação (MFA / 2FA) em todos os logins do sistema, com autorização para uso do recurso nativo do Supabase Auth MFA (TOTP) | @aiox-master |
