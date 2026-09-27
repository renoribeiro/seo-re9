# Rodando o RE9 SEO com Postgres localmente

O RE9 SEO roda no **Cloudflare D1 (SQLite) por padrão**. O Postgres é um backend
opcional para instalações que ultrapassam o limite de armazenamento do D1. O código
da aplicação é escrito uma única vez sobre uma camada `db` que reconhece o provedor
(veja `src/db/`), então a única diferença em tempo de execução é a flag
`DATABASE_PROVIDER` e uma string de conexão.

Este guia sobe um Postgres descartável no Docker para você desenvolver e testar o
caminho do Postgres localmente. **Você não precisa disso no desenvolvimento
normal** — o D1 é o padrão e o caminho que a maioria das pessoas deve usar.

## Pré-requisitos

- Docker Desktop (ou Docker Engine)
- A configuração normal de desenvolvimento local de [`LOCAL_DEVELOPMENT.md`](./LOCAL_DEVELOPMENT.md)

## 1. Suba um container Postgres

A porta `5433` é usada no host para evitar conflito com um Postgres do sistema na
porta padrão `5432`.

```sh
docker run --name openseo-postgres \
  -e POSTGRES_USER=openseo \
  -e POSTGRES_PASSWORD=openseo \
  -e POSTGRES_DB=openseo \
  -p 5433:5432 \
  -d postgres:16
```

Aguarde até ele aceitar conexões:

```sh
docker exec openseo-postgres pg_isready -U openseo -d openseo
```

A string de conexão é:

```
postgres://openseo:openseo@localhost:5433/openseo
```

## 2. Aplique as migrações do Postgres

O schema do Postgres é escrito à mão (é o único artefato estrutural que o
`db:generate` não regenera) e as migrações ficam em `drizzle-pg/`. Aplique-as com
`POSTGRES_DATABASE_URL` definida — o `drizzle-kit` lê essa variável do ambiente
do shell:

```sh
POSTGRES_DATABASE_URL=postgres://openseo:openseo@localhost:5433/openseo \
  pnpm db:migrate:pg
```

## 3. Aponte o app para o Postgres

O runtime Vite da Cloudflare lê as variáveis do Worker do `.env.local`, então
defina a flag do provedor lá (não apenas no seu shell):

```sh
# .env.local
DATABASE_PROVIDER=postgres
```

A string de conexão vem do binding `HYPERDRIVE`. O bloco `hyperdrive` no
`wrangler.jsonc` vem comentado, então descomente-o primeiro. O Miniflare então
resolve o binding para a sua `localConnectionString`, que já aponta para o
container Docker do passo 1. (Nos Workers implantados, o mesmo binding resolve
para o Hyperdrive real — o app nunca se conecta ao Postgres a não ser por esse
binding.) Se o seu Postgres local estiver em outro lugar, sobrescreva sem mexer
na configuração:

```sh
CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE=postgres://... pnpm dev
```

Depois, inicie o servidor de desenvolvimento normalmente:

```sh
pnpm dev
```

Para voltar ao D1, remova essa linha (ou defina `DATABASE_PROVIDER=d1`) e
reinicie.

> `POSTGRES_DATABASE_URL` (passo 2) só é lida pelas ferramentas do lado Node —
> `drizzle-kit` e `scripts/migrate-d1-to-postgres.ts`. O próprio app a ignora.

## 4. Verifique

```sh
# Tabelas criadas pelas migrações
docker exec openseo-postgres psql -U openseo -d openseo -c "\dt"

# Inspecione as linhas que o app grava (ex.: depois de criar um projeto / salvar palavras-chave)
docker exec openseo-postgres psql -U openseo -d openseo -c "select count(*) from projects;"
```

## Mudanças de schema

Ao alterar uma tabela, atualize **os dois** dialetos:

- SQLite: `src/db/*.schema.ts` (+ `pnpm db:generate:d1`)
- Postgres: `src/db/pg/*.schema.ts` (+ `pnpm db:generate:pg`)

O `src/db/schema-parity.test.ts` falha no CI se os dois dialetos divergirem
(tabelas, colunas, nulabilidade, chaves primárias, índices únicos/parciais ou
`onDelete` de FK diferentes). Ele compara as definições de schema, **não** as
migrações geradas — então, depois de editar o schema do Postgres, sempre rode
`pnpm db:generate:pg` e faça commit da nova migração em `drizzle-pg/`, senão uma
implantação com Postgres ficará sem a mudança mesmo com o teste de paridade verde.

## Remoção

```sh
docker rm -f openseo-postgres
```

Isso apaga o container e todos os dados dele. Rode de novo a partir do passo 1 para
começar do zero.
