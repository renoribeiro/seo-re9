# RE9 SEO

> Ferramenta de SEO completa para você e para o seu agente de IA, da RE9 Online.

O RE9 SEO é uma plataforma de SEO para quem quer dados de SEO úteis sem uma suíte pesada e complicada. Você pesquisa palavras-chave, acompanha posições, analisa concorrentes e backlinks e audita sites em um só lugar.

Conecte qualquer agente de IA, como Claude Code, OpenClaw ou Hermes. Já temos skills prontas, mas você pode criar as suas para adaptar o RE9 SEO às suas necessidades.

## Versão hospedada

Acesse o RE9 SEO em [seo.agenciare9.com.br](https://seo.agenciare9.com.br). Planos sob consulta: fale com a gente em [trafego@re9.online](mailto:trafego@re9.online).

## Por que usar o RE9 SEO?

- MCP e skills de IA de primeira linha.
- Interface moderna e simples.
  - Fluxos focados, em vez de uma suíte de SEO inchada e complexa.
- No self-hosting, você usa sua própria chave de API do DataForSEO e paga só pelo que usar.
- Faça um fork e personalize a ferramenta do seu jeito.

## Principais fluxos de SEO

- Pesquisa de palavras-chave
- Monitoramento de posições
- Análise de concorrentes
- Backlinks
- Auditoria do site
- Visibilidade em IA
- Integração com Google Search Console e Google Analytics (GA4)

## MCP e skills de agente do RE9 SEO

O RE9 SEO disponibiliza um servidor MCP para que agentes de IA como Claude Code, OpenClaw e Hermes usem seus dados de SEO diretamente. As skills de agente são fluxos reutilizáveis que guiam o seu agente em tarefas de SEO usando o MCP.

- [Configurar o MCP do RE9 SEO](https://seo.agenciare9.com.br/docs/mcp)
- [Configurar as skills de agente do RE9 SEO](https://seo.agenciare9.com.br/docs/skills/setup)

## Self-hosting (hospedagem própria)

O RE9 SEO tem dois caminhos de self-hosting:

- **Simples: Docker (melhor para testar)** - Para uso pessoal na sua própria máquina. Veja [`docs/SELF_HOSTING_DOCKER.md`](./docs/SELF_HOSTING_DOCKER.md).
  - A menos que você já hospede outros apps e tenha segurança nisso, recomendamos o self-hosting na Cloudflare em vez de Railway, Coolify ou Dokploy.
- **Recomendado: Cloudflare** - Para acesso pela internet em vários dispositivos ou com a sua equipe (funciona no plano gratuito da Cloudflare). Veja [`docs/SELF_HOSTING_CLOUDFLARE.md`](./docs/SELF_HOSTING_CLOUDFLARE.md).

Nos dois casos, você precisa de uma chave de API do DataForSEO para obter os dados de SEO. Veja [`docs/DATAFORSEO_API_KEY.md`](./docs/DATAFORSEO_API_KEY.md).

Guias complementares:

- Operação na Cloudflare (MCP e telemetria): [`docs/SELF_HOSTING_CLOUDFLARE_OPERATIONS.md`](./docs/SELF_HOSTING_CLOUDFLARE_OPERATIONS.md)
- Google Search Console: [`docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md`](./docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md)
- Google Analytics: [`docs/SELF_HOSTING_GOOGLE_ANALYTICS.md`](./docs/SELF_HOSTING_GOOGLE_ANALYTICS.md)

## Custos (self-hosting)

O RE9 SEO precisa de uma chave de API do [DataForSEO](https://dataforseo.com/) para obter os dados de SEO. No self-hosting, você paga o DataForSEO diretamente, conforme o uso. Veja os preços do provedor em [dataforseo.com/pricing](https://dataforseo.com/pricing).

Contas novas no DataForSEO vêm com US$ 1 de crédito gratuito para testes, e a recarga mínima é de US$ 50.

## Desenvolvimento local

Veja [`docs/LOCAL_DEVELOPMENT.md`](./docs/LOCAL_DEVELOPMENT.md). Para rodar com Postgres em vez de D1, veja [`docs/LOCAL_POSTGRES.md`](./docs/LOCAL_POSTGRES.md).

## Como contribuir

Abrir issues claras é a melhor forma de contribuir.

Saiba mais em: [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md)

A skill `/simple-issue-description` ajuda a escrever a issue:

```sh
npx skills add renoribeiro/seo-re9 --skill simple-issue-description
```

## Contato

Dúvidas, planos e parcerias: [trafego@re9.online](mailto:trafego@re9.online)

Repositório: [github.com/renoribeiro/seo-re9](https://github.com/renoribeiro/seo-re9)

## Créditos

O RE9 SEO é baseado no [OpenSEO](https://github.com/every-app/open-seo), projeto de código aberto distribuído sob a licença MIT. O aviso de copyright e a licença originais estão preservados no arquivo [`LICENSE`](./LICENSE).
