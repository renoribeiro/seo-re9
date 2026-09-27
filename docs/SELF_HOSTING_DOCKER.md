# Self-hosting com Docker

Rode o RE9 SEO localmente com Docker.

No modo Docker, o RE9 SEO usa `AUTH_MODE=local_noauth` (sem verificação de autenticação, com a pessoa administradora local `admin@localhost`). Só exponha o app atrás do seu próprio proxy reverso com autenticação, túnel ou rede privada.

O `compose.yaml` padrão usa a imagem publicada no GHCR:

- `ghcr.io/every-app/open-seo:latest`

## Pré-requisitos

- Docker Desktop (ou Docker Engine + Docker Compose)
- Uma chave de API do DataForSEO (veja [`DATAFORSEO_API_KEY.md`](./DATAFORSEO_API_KEY.md))

## Início rápido

```bash
cp .env.example .env
```

Defina `DATAFORSEO_API_KEY` no `.env` seguindo o [guia de configuração do DataForSEO](./DATAFORSEO_API_KEY.md) e, depois, inicie o RE9 SEO:

```bash
docker compose up -d
```

Abra `http://localhost:<PORT>` (padrão `3001`). A primeira inicialização faz o build do app e pode levar de 1 a 2 minutos; acompanhe o progresso com `docker compose logs -f`.

Valores opcionais de ambiente:

- `PORT` (padrão `3001`)
- `ALLOWED_HOST` (um único hostname de proxy reverso a ser liberado no preview do Vite)
- `AUTH_MODE=local_noauth` (já definido no compose)
- `OPEN_SEO_IMAGE` (padrão `ghcr.io/every-app/open-seo:latest`)
- `OPENROUTER_API_KEY` (obrigatório para recursos de IA como o SAM; veja [OpenRouter](https://openrouter.ai/settings/keys))

Se você for colocar o Docker atrás de um proxy reverso ou de um túnel temporário, lembre-se de que o self-hosting com Docker roda com a autenticação do app desativada. Só exponha o app atrás do seu próprio proxy reverso com autenticação, túnel ou rede privada, e adicione o hostname público antes de reiniciar:

```bash
ALLOWED_HOST=yourdomain.com docker compose up -d
```

Você também pode deixar esse valor fixo no `.env`.

## Telemetria

**A telemetria vem desligada no RE9 SEO.** Ela só é enviada se você definir a variável `SELF_HOST_TELEMETRY_POSTHOG_KEY` com a chave de um projeto PostHog **seu** no `.env`. Sem essa variável, nenhum dado de uso sai da sua instalação.

Quando ativada, funciona assim:

São enviados apenas dados anonimizados de eventos básicos de uso: heartbeats com contagens agregadas (instalações, pessoas usuárias, projetos, uso de recursos) vinculadas a um ID de instalação aleatório, enviados a cada 5 minutos nas duas primeiras horas após a instalação e, depois, no máximo uma vez por dia. A telemetria também inclui os nomes e status das verificações de configuração que falharam, nunca valores ou mensagens de erro. Não são coletados URLs, palavras-chave, prompts, e-mails nem localização derivada de IP, e instalações ociosas não enviam nada.

Os heartbeats são disparados por requisições ao app ou ao servidor MCP. Requisições a `/api/health`, incluindo as verificações de saúde automáticas do Docker, não disparam telemetria.

Para desativá-la mesmo com a chave definida, defina `OPENSEO_TELEMETRY_DISABLED=1` (ou `DO_NOT_TRACK=1`) no `.env` e rode `docker compose up -d --force-recreate open-seo`.

## Fixe uma tag de imagem específica

Defina `OPEN_SEO_IMAGE` no `.env` e reinicie:

```bash
OPEN_SEO_IMAGE=ghcr.io/every-app/open-seo:v1.2.3
docker compose up -d
```

## Faça o build da sua própria imagem localmente

Se estiver testando mudanças locais no código, faça o build e rode uma tag local:

```bash
docker build -f Dockerfile.selfhost -t open-seo:local .
OPEN_SEO_IMAGE=open-seo:local docker compose up -d
```

## Comandos comuns

- Reiniciar o serviço depois de mudar o ambiente:

```bash
docker compose up -d open-seo
```

- Baixar a imagem publicada mais recente e reiniciar:

```bash
docker compose pull && docker compose up -d
```

- Parar:

```bash
docker compose down
```

## Saúde e solução de problemas

As verificações de inicialização aparecem em `docker compose logs` antes do build. Com o app rodando, `/api/health` mostra o status da configuração e do banco de dados, e `docker compose ps` mostra a saúde do container.

## Solução de problemas com variáveis de ambiente

Para confirmar que o Docker Compose está usando as variáveis de ambiente esperadas:

```bash
docker compose config
```

Verifique se `AUTH_MODE=local_noauth` e se `DATAFORSEO_API_KEY` é o valor em base64
do seu e-mail e da senha de API do DataForSEO neste formato:
`email:password`.

Se você mudou o `.env`, recrie o container para que o Compose aplique as mudanças:

```bash
docker compose up -d --force-recreate open-seo
```
