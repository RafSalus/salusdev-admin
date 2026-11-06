# Plano 0008 - Configuracao, Manifesto e Iconografia Oficial do PWA

- **Codigo:** 0008
- **Versao:** 1.0
- **Status:** Proposto para Aprovação
- **Criado em:** 2026-11-06
- **Atualizado em:** 2026-11-06
- **Responsavel:** @aiox-master

## Releitura obrigatoria das regras

- [x] Reler integralmente `doc/produto/RegrasSystema.md` (v1.4) com foco mandatório na seção 7 (`PWA-01` a `PWA-18`).
- **Registro da releitura:** 2026-11-06 14:45 - @aiox-master

## Objetivo

Corrigir e padronizar integralmente a experiência de instalação do **Progressive Web App (PWA)** do Centro de Comando SalusDev, garantindo que o ícone de instalação no smartphone (Android e iPhone) e no desktop utilize o emblema oficial da marca SalusDev (`< />` em verde floresta `#163e32` com chevrons em verde menta `#34d399` e barra branca `#ffffff`), em conformidade absoluta com as regras `PWA-09` a `PWA-14`.

## Justificativa e Diagnóstico Técnico

1. Atualmente, a pasta `public/` contém apenas `favicon.svg` e um arquivo `favicon.png` legado com imagem de scaffold.
2. Não existe um arquivo `manifest.json` (ou `manifest.webmanifest`) registrado em `index.html`.
3. Ao acionar a opção *"Instalar aplicativo"* ou *"Adicionar à tela de início"* no smartphone, o navegador recorre ao `favicon.png` genérico antigo ou gera um ícone padrão do navegador, quebrando a identidade visual do ecossistema SalusDev.
4. Faltam os formatos e dimensões canônicos exigidos pelas diretrizes modernas de PWA:
   - `pwa-192x192.png`: Ícone para tela inicial em dispositivos móveis padrão;
   - `pwa-512x512.png`: Ícone em alta resolução para splash screen e lojas de aplicativos;
   - `maskable-icon-512x512.png`: Ícone adaptável com margem de segurança para formatos circulares, squircle ou arredondados no Android;
   - `apple-touch-icon.png` (180x180): Ícone dedicado para iOS Safari / iPhone;
   - `favicon.png` (32x32 e 48x48): Substituição do favicon PNG legado pelo oficial.

## Referencias

- Regras do Sistema: `doc/produto/RegrasSystema.md` (Seção 7: `PWA-01` a `PWA-18`)
- Arquitetura: `docs/arquitetura/ARCHITECTURE.md` (ADR-003 - Estratégia PWA e Mobile-First)
- Ícone Canônico da Marca: `public/favicon.svg`
- Inventário de Telas: `docs/design/SCREEN-INVENTORY.md`

## Agentes participantes

| Agente | Persona | Papel no plano | Entregável esperado |
|---|---|---|---|
| `@aiox-master` | Orion | Orquestrador | Registro do plano, controle de conformidade e esteira de aprovação |
| `@ux-design-expert` | Uma | Designer UI/UX | Especificação precisa da arte dos ícones em 192x192, 512x512, maskable e apple-touch-icon |
| `@dev` | Dex | Desenvolvedor Full Stack | Geração dos arquivos de imagem de alta resolução, criação do `manifest.json` e ajuste de meta tags no `index.html` |
| `@qa` | Quinn | Arquiteto de Testes | Validação dos critérios de instalação PWA (manifesto, headers, integridade de ícones e ausência de 404) |
| `@devops` | Gage | Especialista DevOps | Build de produção, validação de esteira e push para a branch `main` |

## Sequencia de execucao

1. **Etapa 1 - Geração da Suíte de Ícones PNG de Alta Resolução (`public/`):**
   - Gerar `favicon.png` oficial atualizado com o logotipo `< />`;
   - Gerar `pwa-192x192.png` com fundo `#163e32` e símbolo `< />` perfeitamente centralizado;
   - Gerar `pwa-512x512.png` com resolução ultra-nítida para splash screens de inicialização;
   - Gerar `maskable-icon-512x512.png` com zona de segurança (*safe zone* de 80%) para garantir que o símbolo nunca seja cortado em nenhum formato de ícone no Android;
   - Gerar `apple-touch-icon.png` (180x180) para suporte nativo e ícone perfeito em iPhones/iPads.
2. **Etapa 2 - Criação do Manifesto Web (`public/manifest.json`):**
   - `name`: "SalusDev | Centro de Comando"
   - `short_name`: "SalusDev"
   - `description`: "Centro de Comando e Governança de Sistemas do Ecossistema SalusDev"
   - `start_url`: "/"
   - `display`: "standalone"
   - `background_color`: "#163e32"
   - `theme_color`: "#163e32"
   - `orientation`: "any"
   - `scope`: "/"
   - Configuração do array `icons` com propósitos `any` e `maskable`.
3. **Etapa 3 - Atualização do Shell HTML (`index.html`):**
   - Vínculo com `<link rel="manifest" href="/manifest.json" />`;
   - Vínculo com `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`;
   - Adição das meta tags iOS:
     - `<meta name="apple-mobile-web-app-capable" content="yes" />`
     - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`
     - `<meta name="apple-mobile-web-app-title" content="SalusDev" />`
   - Atualização do `viewport` com `viewport-fit=cover` per regra `PWA-04`.
4. **Etapa 4 - Service Worker e Cache Básico (`PWA-11`):**
   - Garantir registro seguro ou fallback de cache para recursos estáticos essenciais.
5. **Etapa 5 - Validação `@qa`:**
   - Teste de manifesto com zero erros de validação;
   - Teste de build (`npm run build` < 500ms) e tipagem TypeScript (`npx tsc --noEmit` com 0 erros);
   - Teste nos viewports móveis e validação no smartphone real.
6. **Etapa 6 - Publicação `@devops`:**
   - Commit semântico e envio para o GitHub `salusdev-admin.git`.

## Escopo detalhado

- [ ] Instalar utilitário para renderização precisa de ícones PNG a partir do vetor canônico.
- [ ] Gerar `public/pwa-192x192.png`.
- [ ] Gerar `public/pwa-512x512.png`.
- [ ] Gerar `public/maskable-icon-512x512.png`.
- [ ] Gerar `public/apple-touch-icon.png`.
- [ ] Atualizar `public/favicon.png` com o emblema oficial.
- [ ] Criar `public/manifest.json` em conformidade com as regras PWA.
- [ ] Atualizar `index.html` com manifesto, apple-touch-icon e meta tags iOS.
- [ ] Validar compilação de produção e integridade dos assets.
- [ ] Testar instalação PWA no celular e no desktop.

## Riscos e mitigacoes

- **Risco:** O navegador no celular pode manter o ícone antigo em cache temporário.
  - **Mitigação:** Versionamento com query string ou limpeza de cache de navegação no teste de instalação.
