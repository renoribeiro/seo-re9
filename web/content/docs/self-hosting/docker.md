---
title: "Hospedagem própria com Docker"
description: "Rode o RE9 SEO localmente com Docker Compose usando a imagem publicada no GHCR."
---

Rode o RE9 SEO localmente com Docker.

No modo Docker, o RE9 SEO usa `AUTH_MODE=local_noauth` (sem verificação de autenticação, com o usuário administrador local `admin@localhost`). Só exponha o app atrás do seu próprio proxy reverso com autenticação, túnel ou rede privada. Para hospedagem acessível pela internet, use a [Cloudflare](/docs/self-hosting/cloudflare).

O `compose.yaml` padrão usa a imagem publicada no GHCR:

- `ghcr.io/every-app/open-seo:latest`

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine + Docker Compose)
- Uma [chave de API da DataForSEO](/docs/self-hosting#dataforseo-api-key-setup)

## Início rápido

Clone o repositório e depois:

```bash
git clone https://github.com/renoribeiro/seo-re9.git
cd seo-re9
cp .env.example .env
```

Defina `DATAFORSEO_API_KEY` no `.env` seguindo o [guia de configuração da DataForSEO](/docs/self-hosting#dataforseo-api-key-setup) e inicie o RE9 SEO:

```bash
docker compose up -d
```

Abra `http://localhost:<PORT>` (padrão `3001`). Cada inicialização do contêiner faz o build do app e pode levar de 1 a 2 minutos; acompanhe o progresso com `docker compose logs -f`.

Variáveis de ambiente opcionais:

- `PORT` (padrão `3001`)
- `ALLOWED_HOST` (um único hostname de proxy reverso a ser permitido no preview do Vite)
- `AUTH_MODE=local_noauth` (já definido no compose)
- `OPEN_SEO_IMAGE` (padrão `ghcr.io/every-app/open-seo:latest`)

Se você for colocar o Docker atrás de um proxy reverso ou de um túnel temporário, lembre-se de que a hospedagem própria com Docker roda com a autenticação do app desativada. Só exponha o app atrás do seu próprio proxy reverso com autenticação, túnel ou rede privada, e adicione o hostname público antes de reiniciar:

```bash
ALLOWED_HOST=yourdomain.com docker compose up -d
```

Troque `yourdomain.com` pelo seu domínio. Você também pode deixar esse valor fixo no `.env`.

## Telemetria

O RE9 SEO coleta telemetria anonimizada de eventos básicos de uso: sinais periódicos (heartbeats) com contagens agregadas (instalações, usuários, projetos, uso de recursos) vinculadas a um ID de instalação aleatório, enviados a cada 5 minutos nas duas primeiras horas após a instalação e, depois, no máximo uma vez por dia. A telemetria também inclui nomes e status de verificações de configuração que falharam, nunca valores ou mensagens de erro. Nenhuma URL, palavra-chave, prompt, e-mail ou localização derivada de IP é coletada, e instalações ociosas não enviam nada.

Os heartbeats são disparados por requisições ao app ou ao servidor MCP. Requisições para `/api/health`, incluindo as verificações de saúde automáticas do Docker, não disparam telemetria.

Para desativá-la, defina `OPENSEO_TELEMETRY_DISABLED=1` (ou `DO_NOT_TRACK=1`) no `.env` e execute `docker compose up -d --force-recreate open-seo`.

## Fixe uma tag de imagem específica

Defina `OPEN_SEO_IMAGE` no `.env` e reinicie:

```bash
OPEN_SEO_IMAGE=ghcr.io/every-app/open-seo:v1.2.3
docker compose up -d
```

## Gere sua própria imagem localmente

Se você estiver testando alterações locais no código, gere e rode uma tag local:

```bash
docker build -f Dockerfile.selfhost -t open-seo:local .
OPEN_SEO_IMAGE=open-seo:local docker compose up -d
```

## Comandos comuns

Reinicie o serviço depois de alterar variáveis de ambiente:

```bash
docker compose up -d open-seo
```

Baixe a imagem publicada mais recente e reinicie:

```bash
docker compose pull && docker compose up -d
```

Pare o serviço:

```bash
docker compose down
```

## Saúde e solução de problemas

As verificações de inicialização aparecem em `docker compose logs` antes do build. Com o app rodando, `/api/health` informa o status da configuração e do banco de dados, e `docker compose ps` informa a saúde do contêiner.

## Solução de problemas com variáveis de ambiente

Para confirmar que o Docker Compose está usando as variáveis de ambiente esperadas:

```bash
docker compose config
```

Confira se `AUTH_MODE=local_noauth` e se `DATAFORSEO_API_KEY` é o valor codificado em base64 do seu e-mail e da senha de API da DataForSEO, no formato `email:password`.

Se você alterou o `.env`, recrie o contêiner para que o Compose aplique as mudanças:

```bash
docker compose up -d --force-recreate open-seo
```
