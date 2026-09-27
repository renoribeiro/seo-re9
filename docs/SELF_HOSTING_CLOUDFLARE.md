# Self-hosting na Cloudflare

Hospede o RE9 SEO na Cloudflare para acessá-lo pela internet em vários dispositivos ou com a sua equipe. Um único comando de implantação provisiona tudo, incluindo a barreira de login do Cloudflare Access. Funciona no plano gratuito da Cloudflare.

Guias relacionados:

- [Operação](./SELF_HOSTING_CLOUDFLARE_OPERATIONS.md): conectar o servidor MCP e telemetria.
- [Implantações legadas](./SELF_HOSTING_CLOUDFLARE_LEGACY.md): manutenção de instalações criadas pelos fluxos antigos de botão "Deploy" ou Wrangler manual.

## Pré-requisitos

- **Node 22.6 ou mais recente** e **pnpm** (`corepack enable` configura o pnpm).
- **Uma conta na Cloudflare com o R2 ativado.** Ativar o R2 exige um meio de pagamento cadastrado, mesmo dentro do nível gratuito — se você nunca usou o R2, abra `R2` no painel da Cloudflare uma vez.
- **Uma conta no DataForSEO** — veja [`DATAFORSEO_API_KEY.md`](./DATAFORSEO_API_KEY.md).

## 1) Clone o seu repositório do RE9 SEO

Faça um fork de `renoribeiro/seo-re9` no GitHub se quiser um repositório sob o seu controle e, depois, clone-o localmente:

```bash
git clone https://github.com/YOUR_GITHUB_USER/seo-re9.git
cd seo-re9
corepack enable
pnpm install
```

Se você não precisa de um fork, clone o repositório original:

```bash
git clone https://github.com/renoribeiro/seo-re9.git
cd seo-re9
corepack enable
pnpm install
```

## 2) Faça login na Cloudflare (uma vez)

```bash
pnpm alchemy login                # responda sim para "Customize OAuth scopes?" e ative access:write
pnpm alchemy cloudflare bootstrap # implanta o Worker de state store do alchemy na sua conta
```

Já tinha feito login antes sem o escopo `access:write`? Rode `pnpm alchemy login --configure` — repetir o login simples não pergunta de novo sobre os escopos.

## 3) Crie o `.env.selfhost`

Copie o modelo e preencha os valores obrigatórios:

```bash
cp .env.selfhost.example .env.selfhost
```

## 4) Implante

```bash
pnpm deploy:selfhost --yes
```

Isso provisiona o banco D1, os namespaces KV e o bucket R2, aplica as migrações do banco, implanta os Workers e cria a aplicação do Cloudflare Access que os protege (liberando exatamente os e-mails de `ACCESS_ALLOWED_EMAILS`). Se a conta ainda não tiver uma equipe do Zero Trust, uma é criada para você, com o nome do seu subdomínio workers.dev.

Para gerenciar a aplicação do Access por conta própria, defina `TEAM_DOMAIN` (`https://your-team.cloudflareaccess.com`) e `POLICY_AUD` (a tag de audiência da aplicação) no `.env.selfhost` — assim a implantação não provisiona nenhum recurso do Access.

## 5) Valide a configuração

1. Abra a URL do Worker exibida no fim da implantação.
2. Entre com o Cloudflare Access.
3. O RE9 SEO deve carregar depois do login.

Se não carregar, veja a seção Solução de problemas abaixo.

## Atualizando para a versão mais recente do RE9 SEO

```bash
git pull        # ou: git fetch upstream && git merge upstream/main, se você fez fork
pnpm install
pnpm deploy:selfhost --yes
```

## Dando acesso à equipe

Adicione a pessoa em `ACCESS_ALLOWED_EMAILS` no `.env.selfhost` e implante de novo. Edições feitas no painel nessa política do Access são sobrescritas na próxima implantação. (Se você gerencia a aplicação do Access por conta própria, edite a política Allow dela no Zero Trust.)

Todas as pessoas liberadas pelo Cloudflare Access trabalham em um único espaço de trabalho compartilhado e veem os mesmos projetos. Implantações atualizadas de versões antigas (que davam um espaço de trabalho separado para cada pessoa) mostram um aviso único no painel — ao clicar nele, todo o trabalho anterior de cada pessoa é migrado para o espaço compartilhado.

## Solução de problemas

- Falha no login: confira `ACCESS_ALLOWED_EMAILS` no `.env.selfhost` e implante de novo.
- `https://<your-worker-hostname>/api/health` mostra as verificações de configuração em tempo de execução e o status do banco de dados.
- Para erros no servidor, abra os `Logs` do Worker ou rode `pnpm exec wrangler tail`. As auditorias do site rodam em um Worker separado: `pnpm exec wrangler tail open-seo-selfhost-audit`.

## Removendo tudo

```bash
pnpm alchemy destroy --env-file .env.selfhost --stage selfhost
```

Isso apaga os Workers, os recursos D1/KV/R2 com sufixo do stage (incluindo os seus dados) e a aplicação do Access.

## Próximos passos

Veja [Operação](./SELF_HOSTING_CLOUDFLARE_OPERATIONS.md) para conectar clientes MCP e configurar a telemetria.
