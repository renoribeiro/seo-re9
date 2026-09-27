# Self-hosting na Cloudflare: implantações legadas

Manutenção de instalações criadas pelo antigo **botão "Deploy to Cloudflare"** ou pelo **fluxo manual com Wrangler**. Essas implantações continuam funcionando — nada muda para você. Novas implantações devem usar o [guia atual](./SELF_HOSTING_CLOUDFLARE.md).

## Atualizando (repositórios criados pelo botão Deploy)

Seu repositório foi criado pelo botão de deploy e o `wrangler.jsonc` guarda os IDs dos seus recursos; mantenha-os ao puxar o código mais recente.

Configuração única:

```bash
git remote add upstream https://github.com/renoribeiro/seo-re9.git
```

Passos de atualização:

```bash
git fetch upstream
cp wrangler.jsonc wrangler.local.backup.jsonc
git checkout main
git reset --hard upstream/main
cp wrangler.local.backup.jsonc wrangler.jsonc
git add wrangler.jsonc
git commit -m "restore Cloudflare settings" || true
git push --force-with-lease origin main
```

## Atualizando (implantações manuais com Wrangler)

```bash
git pull
pnpm install
pnpm run deploy
```

O `pnpm run deploy` também implanta um segundo Worker, `open-seo-audit`, que executa as auditorias do site. Copie os bindings `DB`, `KV` e `R2` do `wrangler.jsonc` para o `wrangler.audit.jsonc` (ele não precisa de `OAUTH_KV`) — a implantação falha com IDs que não existem na sua conta. Depois, defina a chave do DataForSEO dele uma vez; caso contrário, todas as verificações do Lighthouse em uma auditoria falham:

```bash
pnpm exec wrangler secret put DATAFORSEO_API_KEY --name open-seo-audit
```

## Dando acesso à equipe

1. Abra o Cloudflare Zero Trust.
2. Vá em Access -> Applications.
3. Abra a aplicação do RE9 SEO.
4. Edite a política `Allow`.
5. Adicione os e-mails das pessoas da equipe (ou o domínio de e-mail / grupo da sua empresa).
6. Salve.

Capturas de tela: [editar a política do Access](https://github.com/user-attachments/assets/c7bbc7b4-a18e-4ae4-9fe5-3b33c72048a7), [adicionar e-mails da equipe](https://github.com/user-attachments/assets/fa4ecaf2-31f7-4a64-9001-210cf729747b).

## Opcional: regra de ciclo de vida do R2

As respostas da API do DataForSEO ficam em cache no R2, sob o prefixo `dataforseo-cache/`. Recomendado para que objetos de cache expirados não se acumulem:

```bash
pnpm exec wrangler r2 bucket lifecycle add open-seo dataforseo-cache-expiry dataforseo-cache/ --expire-days 7
```

Troque `open-seo` pelo nome do seu bucket, se você o alterou.

## Solução de problemas

**O login falha ou o RE9 SEO não carrega.** Confira, no seu Worker, em `Settings`:

- `Domains & Routes`: o `Cloudflare Access` está ativado para a rota `workers.dev`.
- `Variables & Secrets`: `TEAM_DOMAIN` (por exemplo `https://your-team.cloudflareaccess.com`), `POLICY_AUD` (a tag de audiência da aplicação do Access) e `DATAFORSEO_API_KEY` estão definidos. O Worker `open-seo-audit` também precisa de `DATAFORSEO_API_KEY`.
- Implantações manuais com Wrangler: os IDs dos bindings no `wrangler.jsonc` correspondem aos seus recursos.

`https://<your-worker-hostname>/api/health` mostra as verificações de configuração em tempo de execução e o status do banco de dados. Para erros no servidor, abra os `Logs` do Worker ou rode `pnpm exec wrangler tail`.

**Migrar para o fluxo atual** ainda não é suportado — a nova implantação provisiona recursos novos, então seus dados não seriam transferidos. Continue usando esta página.

## Todo o resto

A configuração do MCP e a telemetria funcionam como nas implantações atuais — veja [Operação](./SELF_HOSTING_CLOUDFLARE_OPERATIONS.md).
