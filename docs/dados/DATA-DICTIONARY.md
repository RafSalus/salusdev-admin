# Dicionário de Dados e Modelagem de Persistência - Ecossistema SalusDev

- **Documento:** Modelagem Conceitual, Lógica e Dicionário de Dados
- **Versão:** 1.0
- **Data:** 2026-11-06
- **Agente:** `@data-engineer` (Dara)
- **Status:** Homologado
- **Referências:** [PRD-SalusDev-v0.3.md](file:///D:/SalusDev%20-%20Admin/doc/produto/PRD-SalusDev-v0.3.md) (v0.4), [RegrasSystema.md](file:///D:/SalusDev%20-%20Admin/doc/produto/RegrasSystema.md) (v1.4) e [ARCHITECTURE.md](file:///D:/SalusDev%20-%20Admin/docs/arquitetura/ARCHITECTURE.md)

---

## 1. Visão Geral da Modelagem de Dados

A arquitetura de dados do ecossistema SalusDev segue os princípios de **privilégio mínimo**, **isolamento estrito de responsabilidades** e **privacidade desde a concepção (Privacy by Design)**, com suporte a bancos PostgreSQL gerenciados via Supabase.

A persistência é dividida em duas camadas fundamentais:
1. **Camada Corporativa SalusDev (Banco Central do Admin):** Centraliza o Catálogo de Produtos, Metadados de Sistemas, Cadastro de Clientes e Logs de Auditoria do Centro de Comando.
2. **Camada de Produtos Satélites (Bancos Isolados por Solução SaaS):** Cada produto SaaS comercializado (como o Salus Oficina) opera com seu próprio banco de dados isolado, garantindo conformidade absoluta com a LGPD e evitando contaminação de dados multi-tenant.

```mermaid
erDiagram
    PRODUCTS ||--o{ CLIENT_PRODUCTS : "contratado em"
    CLIENTS ||--o{ CLIENT_PRODUCTS : "possui"
    SYSTEM_HEALTHCHECKS }o--|| PRODUCTS : "monitora"
    AUTH_AUDIT_LOGS }o--|| USERS : "registrado por"

    PRODUCTS {
        uuid id PK
        string name
        string short_code
        string category
        string status
        text description
        integer active_clients_count
        integer progress_percent
        string theme_color
        string app_url
        string staging_url
        string repo_url
        string healthcheck_url
        string current_version
        timestamp created_at
        timestamp updated_at
    }

    CLIENTS {
        uuid id PK
        string legal_name
        string trade_name
        string tax_id
        string contact_name
        string email
        string phone_whatsapp
        string city
        string state
        string status
        timestamp created_at
        timestamp updated_at
    }

    CLIENT_PRODUCTS {
        uuid id PK
        uuid client_id FK
        uuid product_id FK
        string subscription_status
        timestamp start_date
        timestamp next_billing_date
    }

    AUTH_AUDIT_LOGS {
        uuid id PK
        uuid user_id FK
        string event_type
        string factor_type
        string ip_address
        string user_agent
        string status
        timestamp created_at
    }
```

---

## 2. Entidades do Catálogo Central (Centro de Comando)

### 2.1 Tabela `products` (Catálogo Canônico de Aplicações)

Representa a fonte oficial da verdade sobre qualquer produto ou aplicação mantida no ecossistema SalusDev.

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `UUID` | Não | Chave Primária (`gen_random_uuid()`) | Identificador universal único do produto |
| `slug` | `VARCHAR(64)` | Não | Único (`UNIQUE`) | Identificador amigável de rota (ex.: `salus-oficina`) |
| `name` | `VARCHAR(128)` | Não | Não vazio | Nome comercial completo da aplicação |
| `short_code` | `VARCHAR(4)` | Não | 2 a 4 caracteres | Sigla abreviada para exibição em badges (ex.: `SO`, `SD`) |
| `category` | `VARCHAR(64)` | Não | Padrão: 'Outros' | Categoria funcional (ex.: 'SaaS', 'Site Institucional') |
| `status` | `VARCHAR(32)` | Não | Check Enum | 'Planejamento', 'Desenvolvimento', 'Piloto', 'Ativo', 'Descontinuado' |
| `description` | `TEXT` | Não | - | Resumo executivo da proposta do produto |
| `active_clients_count` | `INTEGER` | Não | Padrão: 0, `>= 0` | Contagem total agregada de clientes ativos no produto |
| `progress_percent` | `INTEGER` | Não | Entre 0 e 100 | Percentual de conclusão da versão em andamento |
| `theme_color` | `VARCHAR(7)` | Não | Hex (`^#[0-9A-Fa-f]{6}$`) | Cor tema de identificação visual no formato hexadecimal |
| `app_url` | `VARCHAR(255)` | Sim | Formato URL HTTPS | Endereço oficial em ambiente de produção |
| `staging_url` | `VARCHAR(255)` | Sim | Formato URL HTTPS | Endereço do ambiente de homologação |
| `repo_url` | `VARCHAR(255)` | Sim | Formato URL GitHub | Link para o repositório de código fonte |
| `healthcheck_url` | `VARCHAR(255)` | Sim | Formato URL HTTPS | Endpoint de verificação de integridade e latência |
| `current_version` | `VARCHAR(16)` | Não | SemVer (ex.: `v1.0.0`) | Versão de compilação atualmente ativa |
| `created_at` | `TIMESTAMPTZ` | Não | Padrão: `NOW()` | Data e hora de criação do registro |
| `updated_at` | `TIMESTAMPTZ` | Não | Padrão: `NOW()` | Data e hora da última modificação |

### 2.2 Tabela `clients` (Cadastro de Clientes do Ecossistema)

Armazena os dados cadastrais das empresas atendidas pela SalusDev.

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `UUID` | Não | Chave Primária | Identificador único do cliente |
| `legal_name` | `VARCHAR(255)` | Sim | - | Razão Social completa da empresa |
| `trade_name` | `VARCHAR(255)` | Não | Não vazio | Nome Fantasia ou como o cliente é conhecido |
| `tax_id` | `VARCHAR(18)` | Sim | Formato CNPJ ou CPF | Documento fiscal do cliente (com máscara de validação) |
| `contact_name` | `VARCHAR(128)` | Não | Não vazio | Nome do responsável ou interlocutor principal |
| `email` | `VARCHAR(255)` | Sim | Formato de E-mail | E-mail para contato e envio de avisos |
| `phone_whatsapp` | `VARCHAR(20)` | Não | E.164 (`+5543...`) | Telefone celular com WhatsApp para atendimento direto |
| `city` | `VARCHAR(128)` | Não | Padrão: 'Apucarana' | Cidade onde a empresa está localizada |
| `state` | `VARCHAR(2)` | Não | Padrão: 'PR' | Unidade Federativa com duas letras |
| `status` | `VARCHAR(32)` | Não | Check Enum | 'Prospecção', 'Piloto', 'Ativo', 'Inativo' |
| `created_at` | `TIMESTAMPTZ` | Não | Padrão: `NOW()` | Data de início de relacionamento |
| `updated_at` | `TIMESTAMPTZ` | Não | Padrão: `NOW()` | Data de atualização cadastral |

### 2.3 Tabela `client_products` (Associações de Produtos por Cliente)

Tabela associativa que relaciona quais produtos do catálogo cada cliente contratou ou está utilizando.

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `UUID` | Não | Chave Primária | Identificador único da contratação |
| `client_id` | `UUID` | Não | Chave Estrangeira (`clients.id`) | Vínculo com a empresa contratante |
| `product_id` | `UUID` | Não | Chave Estrangeira (`products.id`) | Vínculo com o produto contratado |
| `subscription_status` | `VARCHAR(32)` | Não | Check Enum | 'Ativo', 'Degustação', 'Cancelado', 'Bloqueado' |
| `start_date` | `DATE` | Não | - | Data de início do serviço |
| `next_billing_date` | `DATE` | Sim | - | Próxima data de vencimento/renovação |

---

## 3. Segurança, Auditoria e Conformidade com MFA / 2FA (`AUTH-15`)

### 3.1 Tabela `auth_audit_logs` (Registro de Eventos de Autenticação)

Em conformidade estrita com a regra `AUTH-02` e `AUTH-15` de `RegrasSystema.md`, todo evento crítico de segurança é auditado de forma imutável:

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `UUID` | Não | Chave Primária | Identificador único do evento de auditoria |
| `user_id` | `UUID` | Sim | FK (`auth.users.id`) | Usuário que executou ou sofreu a ação |
| `event_type` | `VARCHAR(64)` | Não | - | 'LOGIN_PASSWORD_SUCCESS', 'MFA_CHALLENGE_SUCCESS', 'MFA_FAILED', 'LOGOUT', 'PASSWORD_RESET' |
| `factor_type` | `VARCHAR(32)` | Sim | - | 'totp' (App Autenticador), 'none' |
| `status` | `VARCHAR(16)` | Não | 'SUCCESS', 'FAILED' | Resultado da operação |
| `ip_address` | `INET` | Não | - | Endereço IP de origem da requisição |
| `user_agent` | `TEXT` | Não | - | Identificação do navegador e sistema operacional |
| `failure_reason` | `VARCHAR(128)` | Sim | - | Motivo de falha caso tenha ocorrido (sem vazar dados) |
| `created_at` | `TIMESTAMPTZ` | Não | Padrão: `NOW()` | Data e hora exatas do evento em UTC |

---

## 4. Diretrizes de Isolamento de Banco de Dados para SaaS Satélites

Para produtos como o `salus-oficina`, são aplicadas as seguintes diretrizes de arquitetura de dados:

1. **Separação Fisiológica de Bancos:** Os bancos operacionais das oficinas mecânicas nunca compartilham tabelas operacionais com o Centro de Comando da SalusDev.
2. **Obrigatoriedade de `tenant_id` (`ACL-06`):** Toda tabela operacional em bancos multi-tenant possui a coluna `tenant_id UUID NOT NULL` indexada.
3. **Políticas de RLS (Row Level Security):** Todas as tabelas operacionais possuem políticas RLS ativadas, garantindo que um cliente só possa consultar e modificar registros associados ao seu próprio `tenant_id`.
4. **Sem Chaves `service_role` no Frontend (`ACL-08`):** Toda operação no navegador utiliza exclusivamente a chave anônima pública (`anon-key`) com contexto de segurança autenticado.

---

## 5. Entidades e Modelos do KartControl (Painel Administrativo Satélite)

Em conformidade com o Plano 0011 (`KART-01`), as seguintes entidades modelam os dados operacionais do produto satélite KartControl:

### 5.1 Entidade `kart_pilots` (Pilotos do Kartódromo)

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `INTEGER` | Não | Chave Primária | Identificador único numérico do piloto |
| `name` | `VARCHAR(128)` | Não | Não vazio | Nome completo de exibição do piloto |
| `initials` | `VARCHAR(4)` | Não | 1 a 2 caracteres | Iniciais para renderização do avatar visual |
| `email` | `VARCHAR(255)` | Não | Formato de e-mail | E-mail de cadastro do piloto |
| `phone` | `VARCHAR(20)` | Não | Padrão celular BR | Telefone formatado com DDD |
| `status` | `VARCHAR(16)` | Não | Check Enum | 'Pendente' (âmbar) ou 'Ativo' (verde) |
| `registered_at` | `VARCHAR(16)` | Não | Formato DD/MM/AAAA | Data de realização do cadastro |
| `color` | `VARCHAR(7)` | Não | Hexadecimal | Cor de fundo do avatar de identificação |

### 5.2 Estrutura `kart_dashboard_metrics` (Agregados Operacionais do Dashboard)

| Atributo | Tipo de Dado | Descrição Semântica |
|---|---|---|
| `pilots` | `INTEGER` | Total geral de pilotos cadastrados na unidade |
| `next_registrations` | `INTEGER` | Quantidade de pilotos pré-inscritos na próxima etapa |
| `last_result` | `VARCHAR(64)` | Título identificador do último evento/etapa realizada |
| `events` | `INTEGER` | Contagem total de eventos já realizados na temporada |

### 5.3 Entidade `kart_units` (Unidades/Kartódromos Vinculados)

| Coluna | Tipo de Dado | Restrições | Descrição Semântica |
|---|---|---|---|
| `id` | `VARCHAR(32)` | Chave Primária | Identificador slug da unidade (ex.: `kart-apucarana`) |
| `name` | `VARCHAR(128)` | Não vazio | Nome da praça/kartódromo (ex.: 'Kart Apucarana') |

---

## 6. Modelos Comerciais Globais e Governança de Produtos (Plano 0012)

Em conformidade com o Plano 0012, os modelos a seguir definem a separação estrita entre o domínio comercial cross-product e o domínio de governança de produtos:

### 6.1 Tabela `plans` (Catálogo Canônico de Planos B2C)

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `VARCHAR(40)` | Não | Chave Primária | Identificador único do plano (ex.: `plan-pro`) |
| `product_id` | `INTEGER` | Sim | FK (`products.id`) | Produto vinculado (ou nulo se global) |
| `code` | `VARCHAR(32)` | Não | Check Enum | 'free', 'pro', 'premium' |
| `name` | `VARCHAR(64)` | Não | Não vazio | Nome amigável do plano ('Gratuito', 'Pro', 'Premium') |
| `description` | `TEXT` | Não | - | Resumo comercial da proposta de valor |
| `price_cents` | `INTEGER` | Sim | Nulo = Em breve | Valor em centavos (nulo na fase de validação) |
| `currency` | `VARCHAR(3)` | Não | Padrão 'BRL' | Moeda de cobrança |
| `interval` | `VARCHAR(20)` | Não | Check Enum | 'mensal', 'anual' |
| `features_json` | `JSONB` | Não | Array de strings | Lista canônica de recursos do plano |
| `active` | `BOOLEAN` | Não | Padrão `TRUE` | Se o plano está disponível para novas assinaturas |

### 6.2 Tabela `subscriptions` (Assinaturas Comerciais Cross-Product)

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `VARCHAR(40)` | Não | Chave Primária | Identificador universal da assinatura |
| `customer_id` | `VARCHAR(40)` | Não | Chave Estrangeira | Identificador do cliente/piloto contratante |
| `product_id` | `INTEGER` | Não | FK (`products.id`) | Produto no qual o serviço é usufruído |
| `plan_id` | `VARCHAR(40)` | Não | FK (`plans.id`) | Plano ativo contratado |
| `status` | `VARCHAR(20)` | Não | Check Enum | 'Ativo', 'Em teste', 'Inadimplente', 'Cancelado' |
| `started_at` | `VARCHAR(20)` | Não | Formato Data | Data de início de vigência |
| `current_period_end` | `VARCHAR(20)` | Não | Formato Data | Data de vencimento/renovação do ciclo |
| `provider` | `VARCHAR(60)` | Não | - | Gateway de faturamento ('Em breve' ou manual) |

### 6.3 Tabela `entitlements` (Matriz de Recursos Liberados)

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `VARCHAR(40)` | Não | Chave Primária | Identificador único da permissão |
| `feature_key` | `VARCHAR(80)` | Não | Único | Chave funcional (ex.: `stats.advanced`, `export.pdf`) |
| `name` | `VARCHAR(100)` | Não | Não vazio | Nome comercial do recurso |
| `description` | `TEXT` | Não | - | Explicação do benefício concedido |
| `plans_json` | `JSONB` | Não | Array de codes | Lista de planos que liberam o recurso (`['pro', 'premium']`) |
| `unlimited` | `BOOLEAN` | Não | Padrão `TRUE` | Se o acesso é ilimitado durante a assinatura |

### 6.4 Tabela `product_admins` (Governança e Autorização com MFA)

| Coluna | Tipo de Dado | Nulo? | Restrições | Descrição Semântica |
|---|---|---|---|---|
| `id` | `VARCHAR(40)` | Não | Chave Primária | Identificador único do vínculo administrativo |
| `product_id` | `INTEGER` | Não | FK (`products.id`) | Produto sob gestão |
| `name` | `VARCHAR(128)` | Não | Não vazio | Nome completo do operador |
| `email` | `VARCHAR(255)` | Não | Formato e-mail | E-mail para autenticação e convite |
| `role` | `VARCHAR(60)` | Não | - | Papel atribuído (ex.: 'Operador de Pista', 'Administrador Geral') |
| `mfa_status` | `VARCHAR(20)` | Não | Check Enum | 'Ativo' (TOTP configurado), 'Pendente', 'Inativo' |
| `last_access_at` | `VARCHAR(40)` | Não | - | Registro de data/hora do último login efetuado |
| `status` | `VARCHAR(20)` | Não | Check Enum | 'Ativo', 'Revogado' |

### 6.5 Tabela `health_checks` e `audit_log` (Telemetria e Auditoria Imutável)

| Entidade | Colunas Chave | Finalidade |
|---|---|---|
| `health_checks` | `product_id`, `status`, `latency_ms`, `version`, `checked_at` | Registro contínuo de latência, uptime e integridade da API |
| `audit_log` | `actor`, `action`, `target`, `timestamp` | Histórico imutável de alterações em conformidade com `AUTH-02` |


