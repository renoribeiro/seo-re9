# Self-hosting na Cloudflare: operação

Tarefas do dia a dia depois da [configuração inicial](./SELF_HOSTING_CLOUDFLARE.md): conectar o servidor MCP e gerenciar a telemetria. Atualizações e acesso da equipe estão no [guia de implantação](./SELF_HOSTING_CLOUDFLARE.md) (ou na [página legada](./SELF_HOSTING_CLOUDFLARE_LEGACY.md), para implantações anteriores ao alchemy).

## Conecte o servidor MCP pelo Cloudflare Access

Use a mesma aplicação do Cloudflare Access que protege o seu Worker do RE9 SEO.
O Managed OAuth é obrigatório para clientes MCP e não vem ativado por padrão.

1. Abra o Cloudflare Zero Trust.
2. Vá em `Access controls` -> `Applications`.
3. Encontre a aplicação do RE9 SEO e selecione `Edit`.
4. Vá em `Additional settings` -> `OAuth`.
5. Ative o `Managed OAuth`.
6. Em `Managed OAuth settings`, libere as URIs de redirecionamento que seus clientes MCP usam:
   - Libere clientes `localhost` / loopback para agentes de CLI e desktop (Codex
     CLI, Claude Code) que registram `http://localhost:PORT/callback`.
   - Adicione URIs de redirecionamento HTTPS para conectores web (o caminho pode terminar em `/*`).
   - Sem isso, os clientes não conseguem concluir o [Dynamic Client Registration](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/)
     e fazem login, mas não expõem nenhuma ferramenta.
7. Salve.

Os clientes MCP devem se conectar a:

```text
https://YOUR_WORKER_HOSTNAME/mcp
```

## Telemetria

**A telemetria vem desligada no RE9 SEO.** Ela só é enviada se você definir a variável `SELF_HOST_TELEMETRY_POSTHOG_KEY` com a chave de um projeto PostHog **seu** no `.env.selfhost`. Sem essa variável, nenhum dado de uso sai da sua instalação.

Quando ativada, funciona assim:

São enviados apenas dados anonimizados de eventos básicos de uso: heartbeats com contagens agregadas (instalações, pessoas usuárias, projetos, uso de recursos) vinculadas a um ID de instalação aleatório, enviados a cada 5 minutos nas duas primeiras horas após a instalação e, depois, no máximo uma vez por dia. Não são coletados URLs, palavras-chave, prompts, e-mails nem localização derivada de IP, e instalações ociosas não enviam nada.

Os heartbeats são disparados por requisições ao app ou ao servidor MCP. Requisições a `/api/health` não disparam telemetria, como no Docker.

Para desativá-la mesmo com a chave definida, defina `OPENSEO_TELEMETRY_DISABLED=1` no `.env.selfhost` e implante de novo. No Docker e em [implantações legadas](./SELF_HOSTING_CLOUDFLARE_LEGACY.md): defina-a (ou `DO_NOT_TRACK=1`) como variável de ambiente / variável do Worker.
