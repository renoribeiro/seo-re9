# Implantações de preview com Alchemy

Os stages de preview do RE9 SEO usam recursos isolados da Cloudflare e uma
barreira do Cloudflare Access compartilhada, gerenciada pelo Alchemy.

## Modelo de segurança

- Os Workers de preview se chamam `open-seo-<stage>` e são servidos em
  `open-seo-<stage>.<WORKERS_SUBDOMAIN>`.
- Uma aplicação persistente do Access protege
  `open-seo-*.<WORKERS_SUBDOMAIN>` antes mesmo de existir qualquer Worker de preview.
- A produção usa o Worker `open-seo`, sem sufixo, em `seo.agenciare9.com.br` e
  `www.seo.agenciare9.com.br`. Ele não corresponde ao curinga de preview e não
  fica atrás do Access de preview.
- Uma stack persistente separada do Alchemy gerencia a barreira compartilhada do
  Access. Assim, uma implantação ou remoção de preview que falhe não consegue
  remover a barreira que protege os outros previews.
- `pnpm preview:access` implanta/reconcilia a stack persistente do Access —
  configuração única, que pode ser executada de novo com segurança. Cada
  implantação do CI então verifica o desafio HTTP real (uma checagem com curl no
  `pr-preview.yml`, com novas tentativas para atrasos de propagação) antes de
  comentar uma URL, então a ausência da barreira faz o job falhar. Um preview que
  responde sem o desafio está público — destrua o stage
  (`pnpm destroy:preview`); um que apenas está inacessível pode ficar, pois
  continua atrás da aplicação curinga.

## Credenciais

O Alchemy gerencia as credenciais da Cloudflare por conta própria — nada com
formato de credencial vai nos arquivos de ambiente.

- **Localmente**, rode `pnpm alchemy login` uma vez. Responda sim para
  **Customize OAuth scopes?** e ative `access:write` além dos padrões
  (a barreira de Access do preview precisa dele; adicione também
  `query_cache:write` se for implantar em produção — Hyperdrive). A credencial
  fica salva globalmente, e as execuções seguintes — inclusive as não
  interativas — a reutilizam silenciosamente.
- **O estado** fica no state store da Cloudflare da conta (um Worker
  `alchemy-state-store` com SQLite embutido), compartilhado por todas as máquinas
  e pelo CI — provisione-o uma vez com `pnpm alchemy cloudflare bootstrap`. Ele
  gera um token de autenticação e uma chave de criptografia no Secrets Store da
  conta; execuções locais guardam credenciais em cache em `~/.alchemy/`.
- **No GitHub Actions**, a variável `CI` do runner faz o alchemy ler
  `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` do ambiente (secrets do
  repositório) e resolver o token do state store pelo Secrets Store a cada
  execução. O token precisa de acesso de escrita a Workers Scripts, KV, D1, R2 e
  Workflows, além de **leitura do Secrets Store** e **leitura de Account
  Settings** (ambos usados pelo login do state store do alchemy, que busca o
  token por meio de um Worker temporário de edge-preview). O CI nunca mexe no
  Access — a barreira é uma configuração local única.

## Configuração do Cloudflare Access

A stack persistente do Access cria uma aplicação self-hosted com este hostname
público:

```text
open-seo-*.your-subdomain.workers.dev
```

Use o subdomínio de Workers da conta mostrado em **Workers & Pages**, não o
domínio da equipe do Zero Trust. Defina esse valor completo no `.env.preview`
como `WORKERS_SUBDOMAIN`. As URLs de preview derivam dele como
`https://open-seo-<stage>.<WORKERS_SUBDOMAIN>` — previews em modo hosted usam
isso como `BETTER_AUTH_URL`, e a etapa de verificação do CI testa esse endereço;
um valor errado faz a checagem falhar. Previews em modo `local_noauth` ou
`cloudflare_access` são implantados sem ele, já que nada lê `BETTER_AUTH_URL`
nesses modos.

Defina `ACCESS_ALLOWED_EMAILS` com os e-mails exatos, separados por vírgula, que
podem abrir os previews:

```env
ACCESS_ALLOWED_EMAILS=you@example.com
```

`pnpm preview:access` implanta a stack persistente do Access. Ele sempre usa
`--adopt`, então consegue recuperar a infraestrutura correspondente se o estado
local do Alchemy se perder — pode ser executado de novo a qualquer momento com
segurança. A remoção normal de um preview destrói apenas o stage da aplicação
solicitado e não consegue tocar na stack do Access.

## Preview local

```sh
pnpm alchemy login    # uma vez — veja Credenciais acima
cp .env.preview.example .env.preview
pnpm preview:access   # uma vez — a barreira compartilhada do Access (seguro rodar de novo)
pnpm deploy:preview --stage manual-preview --yes
```

O `deploy:preview` faz o build no modo preview do Vite (`--mode preview` carrega o
`.env.preview` no bundle do cliente) e roda `alchemy deploy` com o
`.env.preview`; flags extras são repassadas para o deploy. O CI roda esse mesmo
comando. Duas convenções do alchemy que você precisa conhecer: omitir `--stage`
usa o stage padrão por usuário do alchemy (`dev_$USER`), e o stage `hosted-prod`
com `.env.preview` falha na stack (sem `BETTER_AUTH_URL`) — use
`pnpm deploy:postgres` para produção.

Cada preview começa com um banco de dados vazio: abra a URL, passe pelo desafio
do Access e pronto. Os previews usam `AUTH_MODE=local_noauth` por padrão, então
todas as pessoas liberadas pela barreira compartilham uma única conta de
administrador criada automaticamente — defina `AUTH_MODE=hosted` no
`.env.preview` (veja o arquivo de exemplo) para testar o fluxo real de criação de
conta.

Destrua o stage (o estado é compartilhado pelo state store da Cloudflare, então
qualquer máquina com credenciais pode fazer isso):

```sh
pnpm destroy:preview --stage manual-preview --yes
```

## CI

O `.github/workflows/pr-preview.yml` implanta o stage `pr-<n>` para cada PR do
repositório privado (e verifica o desafio do Access antes de comentar a URL) e o
destrói quando o PR é fechado, rodando os mesmos comandos das implantações
locais. O estado é compartilhado pelo state store da Cloudflare, então execuções
do CI e máquinas locais enxergam os mesmos stages — um stage esquecido sempre pode
ser destruído localmente com `pnpm destroy:preview --stage pr-<n> --yes`.

## PRs do espelho público

PRs externos (de renoribeiro/seo-re9) nunca são implantados pelo CI — código de
fork não pode rodar com secrets de implantação. Em vez disso, faça o preview
localmente: o código do fork apenas faz o BUILD, em um worktree irmão desanexado,
e a implantação roda a partir da stack alchemy deste checkout confiável, usando o
`dist/` do fork. Os scripts de implantação do próprio fork nunca são executados
(PRs de fork podem até ser anteriores à configuração do alchemy). Leia antes o
diff do PR na superfície executável do build — `package.json`, o lockfile,
`vite.config*`, `scripts/`, `patches/`, `.npmrc` — porque o build executa o
código de configuração do fork na sua máquina com o `.env.preview` disponível.

```sh
git fetch https://github.com/renoribeiro/seo-re9.git pull/<pr>/head
git worktree add --detach ../open-seo-pub-<pr> FETCH_HEAD
cp .env.preview ../open-seo-pub-<pr>/
(cd ../open-seo-pub-<pr> && pnpm install --frozen-lockfile && pnpm exec vite build --mode preview)
rm -rf dist && cp -R ../open-seo-pub-<pr>/dist dist
git worktree remove --force ../open-seo-pub-<pr>
pnpm alchemy deploy --env-file .env.preview --stage pub-<pr> --yes
```

Confirme que o preview redireciona para o login do Access antes de compartilhar a
URL. Destrua o stage quando o PR estiver concluído:

```sh
pnpm destroy:preview --stage pub-<pr> --yes
```

## Produção

A produção é implantada pela mesma stack do Alchemy, no stage `hosted-prod`, que
nomeia os recursos de produção existentes para que o `--adopt` os importe em vez
de criar novos. Os domínios dela não correspondem ao curinga do Access de
preview. (O stage é `hosted-prod`, e não `prod`, para que o nome de stage de quem
faz self-hosting nunca colida com o caminho de adoção.)

```sh
pnpm deploy:postgres
```

O script roda as migrações do Postgres (`db:migrate:pg`), faz o build e depois
`alchemy deploy --env-file .env.production --stage hosted-prod --adopt` —
`--adopt` e o stage já vêm fixos para não serem esquecidos, e o alchemy mostra o
plano para aprovação antes de aplicar. Ele usa a mesma credencial do
`pnpm alchemy login` dos previews (confirme que `query_cache:write` foi ativado
para o Hyperdrive).

### Checklist da primeira migração (uma única vez)

A primeira implantação de produção com Alchemy adota recursos que já estão no ar.
Antes de rodá-la:

1. Adicione `--dry-run` ao comando do alchemy e leia o plano — todos os recursos
   de produção (D1 `open-seo`, KV `every-super-seo`/`OAUTH_KV`, R2 `open-seo`,
   Hyperdrive `openseo`, Worker `open-seo`) devem ser adotados, nenhum criado.
2. Compare o `.env.production` com os secrets do Worker em produção
   (`GET /accounts/:id/workers/scripts/open-seo/secrets`): o deploy do alchemy
   substitui o conjunto COMPLETO de bindings, então qualquer secret em produção
   que falte no arquivo de ambiente é implantado como `""` — a maioria das
   variáveis é opcional com padrão vazio, então o deploy funciona enquanto
   desativa silenciosamente aquela integração.
3. Ensaie a adoção em um stage de rascunho que espelhe o formato da produção —
   implante o Worker de rascunho **primeiro com o wrangler** (incluindo o bloco
   `migrations`) para que ele tenha uma tag de migração da era wrangler e
   namespaces de DO ativos como a produção; um stage novo do alchemy pula
   exatamente o caminho de adoção que a produção vai seguir.
4. Compare `SELECT name FROM d1_migrations` no D1 de produção com
   `ls drizzle/*.sql` — o alchemy aplica as migrações de D1 que faltarem na
   primeira implantação (registro compatível com o wrangler, verificado), e o D1
   de produção, que está inativo, não é migrado desde a migração para o Postgres.
5. Confirme que os valores `HYPERDRIVE_ORIGIN_*` no `.env.production`
   correspondem à configuração do Hyperdrive em produção — a Cloudflare nunca
   devolve as credenciais de origem, então uma divergência reescreveria a origem.
6. Observação: a produção já é servida em `open-seo.<subdomain>.workers.dev` (o
   alchemy mantém isso ativado; a opção de workers.dev nunca aparece no
   `--dry-run`). Os recursos de produção (worker, D1, R2, KV, Hyperdrive) usam o
   `RemovalPolicy.retain` do alchemy, gravado no estado na primeira implantação
   de produção: destruir o stage `hosted-prod` esquece o estado, mas mantém os
   recursos em produção intactos. (Os registros de Workflow são a exceção — eles
   são criados dentro do provider do worker e não podem ser retidos
   individualmente —, mas registrar um workflow de novo é um upsert sem perdas.)

## Self-hosting na Cloudflare

Quem faz self-hosting implanta a mesma stack no stage fixo `selfhost` (via
`pnpm deploy:selfhost` — não é preciso informar stage) com o próprio arquivo de
ambiente: o Alchemy provisiona D1/KV/R2/workflows novos pelo nome (o D1 é o banco
de dados — sem Postgres/Hyperdrive), além da aplicação do Cloudflare Access que
protege o worker (`AUTH_MODE=cloudflare_access` + `ACCESS_ALLOWED_EMAILS`; o
`resolveSelfHostAccess` em alchemy.run.ts deriva `TEAM_DOMAIN`/`POLICY_AUD`, ou
os aceita explicitamente para uma aplicação gerenciada manualmente). O curinga
do Access de preview e o workflow de PR são específicos da operação do RE9 SEO e
não são necessários. O passo a passo está em docs/SELF_HOSTING_CLOUDFLARE.md.
