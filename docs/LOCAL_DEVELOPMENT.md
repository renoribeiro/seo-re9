# Desenvolvimento local

## Pré-requisitos

- Node.js 20+
- [Corepack](https://nodejs.org/api/corepack.html) (incluído no Node.js até a versão 24; instale separadamente no Node.js 25+)
- Uma conta/credenciais de API do DataForSEO

## Fluxo de desenvolvimento local

```sh
# Ativa a versão exata do pnpm declarada no package.json.
corepack enable
pnpm install --frozen-lockfile

# Rode uma vez para cada banco local novo
pnpm run db:migrate:local
```

Confira se `pnpm --version` mostra a versão declarada no campo
`packageManager` do `package.json`. Um pnpm global mais antigo pode rejeitar
o lockfile do repositório como incompatível.

Configure o `.env.local`:

1. `cp .env.example .env.local`
2. Adicione `DATAFORSEO_API_KEY` como um valor `login:password` codificado em base64:

   `printf '%s' 'YOUR_LOGIN:YOUR_PASSWORD' | base64`

3. Defina `AUTH_MODE=local_noauth` para o desenvolvimento local normal.

Rode localmente:

```sh
# Opção 1
pnpm run dev

# Opção 2 (recomendada)
# Este arquivo de log facilita a depuração pelo seu agente de código.
mkdir .logs
touch .logs/dev-server.log

# Este comando usa o portless, ótimo para worktrees. Ele também envia os logs para esse arquivo fixo, o que ajuda o agente a depurar.
pnpm dev:agents
```

Por padrão, `pnpm dev:agents` roda pelo [portless](https://github.com/vercel-labs/portless) em `http://open-seo.localhost:1355`.

Ao usar um git worktree, o [portless](https://github.com/vercel-labs/portless) adiciona o nome da branch como prefixo, por exemplo `http://feature-name.open-seo.localhost:1355`.

## Imagens de compartilhamento de relatórios

Para testar um relatório real de ponta a ponta, rode o app com `AUTH_MODE=hosted`,
compartilhe um relatório local e abra a URL `/s/<token>/og.png` dele. Inspecione o
HTML inicial da página compartilhada em busca de `og:image` e `twitter:image`,
depois revogue o compartilhamento e confira se a imagem retorna 404. Salvar o
relatório ou mudar o hostname do projeto exibido atualiza a versão da URL da
imagem. Se a renderização falhar para um compartilhamento válido, a rota da
imagem redireciona para o cartão de divulgação padrão do RE9 SEO.
As redes sociais podem manter suas próprias prévias; nossas respostas de imagem
usam `no-store` e verificam o acesso a cada requisição. Um crawler de rede social
de verdade precisa de uma página e de uma imagem acessíveis publicamente; o
ambiente de preview protegido pelo Access permite inspeção manual, mas não pode
ser acessado por esses crawlers.

## Site e BadSEO

O site de divulgação (`web/`) e o site de teste de auditoria (`badseo/`) são
projetos pnpm separados, com lockfiles próprios. A instalação na raiz não instala
as dependências deles. Na raiz do repositório, instale o projeto em que você vai
trabalhar:

```sh
# Site de divulgação
pnpm --dir web install --frozen-lockfile
pnpm --dir web run dev
# Validar mudanças no site
pnpm --dir web run types:check
pnpm --dir web run build

# Site de teste de auditoria (mantenha as dependências da raiz instaladas para o harness de auditoria)
pnpm --dir badseo install --frozen-lockfile
pnpm --dir badseo run dev
# Validar mudanças no BadSEO
pnpm --dir badseo run build
```

Rode o harness de auditoria do BadSEO em outro terminal enquanto o servidor de desenvolvimento dele estiver rodando:

```sh
pnpm --dir badseo run audit http://localhost:8787
```

Use o formatador da raiz para o BadSEO; o site tem um formatador próprio:

```sh
# Na raiz do repositório
pnpm exec prettier --write "badseo/**/*.{ts,tsx,json,jsonc,md}"
pnpm --dir web run format:write
```

Veja o [README do BadSEO](../badseo/README.md) para instruções de fixtures e auditoria.

## Comandos de banco de dados

Gerar migração:

```sh
pnpm run db:generate
```

Migrar o banco local:

```sh
pnpm run db:migrate:local
```

## Backend Postgres (opcional)

O D1 (SQLite) é o padrão. Para rodar localmente com Postgres — o backend opcional
para instalações que ultrapassam o D1 — veja
[`LOCAL_POSTGRES.md`](./LOCAL_POSTGRES.md).

## Modos de autenticação

- `AUTH_MODE=cloudflare_access` (padrão): valida JWTs do Cloudflare Access (`cf-access-jwt-assertion`) usando `TEAM_DOMAIN` + `POLICY_AUD`.
- `AUTH_MODE=local_noauth`: modo local confiável, sem verificação de autenticação; injeta `admin@localhost`.
- `AUTH_MODE=hosted`: modo de e-mail/senha com Better Auth. Exige a geração do schema do Better Auth, além de `BETTER_AUTH_SECRET` e `BETTER_AUTH_URL`.

Os scripts de desenvolvimento não definem `AUTH_MODE`, então você pode testar outro modo mudando o valor no `.env.local`.

Em implantações na Cloudflare, confirme que o Cloudflare Access está ativado na rota/domínio do seu Worker e informe `TEAM_DOMAIN` + `POLICY_AUD` nas variáveis de ambiente.
