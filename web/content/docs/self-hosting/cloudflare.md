---
title: "Hospedagem própria na Cloudflare"
description: "Publique o RE9 SEO na sua própria conta da Cloudflare para uso pela internet, em vários dispositivos ou em equipe."
---

Hospede o RE9 SEO na Cloudflare para ter uma instalação própria acessível pela internet, em vários dispositivos ou com a sua equipe. Um único comando de deploy provisiona tudo, incluindo a barreira de login do Cloudflare Access. Funciona no plano gratuito da Cloudflare.

## Pré-requisitos

- **Node 22.6 ou mais recente** e **pnpm** (`corepack enable` configura o pnpm).
- **Uma conta da Cloudflare com o R2 ativado.** Para ativar o R2 é preciso ter uma forma de pagamento cadastrada, mesmo dentro do nível gratuito — se você nunca usou o R2, abra `R2` no painel da Cloudflare uma vez.
- **Uma conta da DataForSEO** — veja a [configuração da chave de API da DataForSEO](/docs/self-hosting#dataforseo-api-key-setup).

## 1) Clone o seu repositório do RE9 SEO

Faça um fork de `renoribeiro/seo-re9` no GitHub se quiser um repositório sob seu controle e depois clone-o localmente (troque `YOUR_GITHUB_USER` pelo seu usuário do GitHub):

```bash
git clone https://github.com/YOUR_GITHUB_USER/seo-re9.git
cd seo-re9
corepack enable
pnpm install
```

Se não precisar de um fork, clone o repositório original:

```bash
git clone https://github.com/renoribeiro/seo-re9.git
cd seo-re9
corepack enable
pnpm install
```

## 2) Faça login na Cloudflare (uma vez)

```bash
pnpm alchemy login                # responda "yes" em "Customize OAuth scopes?" e ative access:write
pnpm alchemy cloudflare bootstrap # publica na sua conta o Worker de armazenamento de estado do alchemy
```

Já tinha feito login antes sem o escopo `access:write`? Execute `pnpm alchemy login --configure` — repetir o login normal não pergunta de novo sobre os escopos.

## 3) Crie o `.env.selfhost`

Copie o modelo e preencha os valores obrigatórios:

```bash
cp .env.selfhost.example .env.selfhost
```

## 4) Faça o deploy

```bash
pnpm deploy:selfhost --yes
```

Isso provisiona o banco de dados D1, os namespaces KV e o bucket R2, aplica as migrações do banco de dados, publica o Worker e cria a aplicação do Cloudflare Access que o protege (liberando exatamente os e-mails de `ACCESS_ALLOWED_EMAILS`). Se a conta ainda não tiver uma equipe do Zero Trust, uma é criada para você, com o nome do seu subdomínio workers.dev.

## 5) Valide a configuração

1. Abra a URL do Worker exibida ao final do deploy.
2. Entre com o Cloudflare Access.
3. O RE9 SEO deve carregar depois do login.

Se o login falhar, confira `ACCESS_ALLOWED_EMAILS` e faça o deploy de novo.

## Conectar o servidor MCP pelo Cloudflare Access [#connect-the-mcp-server-through-cloudflare-access]

Use a mesma aplicação do Cloudflare Access que protege o Worker do RE9 SEO. O Managed OAuth é obrigatório para clientes MCP e não vem ativado por padrão.

1. Abra o Cloudflare Zero Trust.
2. Vá em `Access controls` -> `Applications`.
3. Encontre a aplicação do RE9 SEO e selecione `Edit`.
4. Vá em `Additional settings` -> `OAuth`.
5. Ative o `Managed OAuth`.
6. Em `Managed OAuth settings`, permita as URIs de redirecionamento que seus clientes MCP usam:
   - Permita clientes `localhost` / loopback para agentes de CLI e desktop (Codex CLI, Claude Code) que registram `http://localhost:PORT/callback`.
   - Adicione URIs de redirecionamento HTTPS para conectores web (o caminho pode terminar em `/*`).
   - Sem isso, os clientes não conseguem concluir o [Dynamic Client Registration](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/) e fazem login, mas não exibem nenhuma ferramenta.
7. Salve.

Os clientes MCP devem se conectar a (troque `YOUR_WORKER_HOSTNAME` pelo hostname do seu Worker):

```text
https://YOUR_WORKER_HOSTNAME/mcp
```

## Dê acesso ao RE9 SEO para colegas de equipe

Adicione o e-mail da pessoa em `ACCESS_ALLOWED_EMAILS` no `.env.selfhost` e faça o deploy de novo. Todas as pessoas liberadas compartilham o mesmo workspace do RE9 SEO.

## Atualize para a versão mais recente do RE9 SEO

```bash
git pull        # ou: git fetch upstream && git merge upstream/main, se você fez um fork
pnpm install
pnpm deploy:selfhost --yes
```

## Mais guias no GitHub

- [Operações](https://github.com/renoribeiro/seo-re9/blob/main/docs/SELF_HOSTING_CLOUDFLARE_OPERATIONS.md): telemetria e outras tarefas do dia a dia.
- [Instalações legadas](https://github.com/renoribeiro/seo-re9/blob/main/docs/SELF_HOSTING_CLOUDFLARE_LEGACY.md): manutenção de instalações criadas com o antigo botão de Deploy ou com os fluxos manuais do Wrangler, já descontinuados.
