---
title: "Hospede o RE9 SEO por conta própria"
description: "Rode o RE9 SEO por conta própria com Docker ou Cloudflare, use sua própria chave de API da DataForSEO e pague só pelo que usar."
---

O RE9 SEO é gratuito e de código aberto. Na hospedagem própria (self-hosting), o app não custa nada. Você usa sua própria chave de API da DataForSEO e paga o uso da API diretamente à DataForSEO.

Há dois caminhos de hospedagem própria:

- **Simples: [Docker](/docs/self-hosting/docker)**, recomendado para uso pessoal na sua própria máquina. É o jeito mais fácil de começar.
- **Avançado: [Cloudflare](/docs/self-hosting/cloudflare)**, para hospedagem acessível pela internet, em vários dispositivos ou com a sua equipe. Uma experiência parecida com SaaS, com backups automáticos do banco de dados, e funciona no plano gratuito da Cloudflare. Exige um pouco mais de configuração se você não conhece a Cloudflare.

## Configuração da chave de API da DataForSEO [#dataforseo-api-key-setup]

O RE9 SEO usa a [DataForSEO](https://dataforseo.com/) para buscar dados de SEO. A DataForSEO é um serviço pago de terceiros, sem vínculo com o RE9 SEO. Você precisa de uma chave de API para conectar o RE9 SEO a ela.

1. Acesse [DataForSEO API Access](https://app.dataforseo.com/api-access).
2. Clique em "Send by email" para receber suas credenciais.
3. Copie a credencial mais longa, identificada como "Base64".
4. Defina esse valor como `DATAFORSEO_API_KEY` no seu ambiente:
   - Docker: `.env`
   - Cloudflare: como um secret do Worker no painel
   - Desenvolvimento local: `.env.local`

Contas novas da DataForSEO incluem US$ 1 de crédito gratuito para testes, e a recarga mínima é de US$ 50.

## Recursos opcionais

### Google Search Console

O Search Console é opcional e funciona em instalações próprias usando o seu próprio cliente OAuth do Google. A configuração leva cerca de 10 minutos e é feita uma única vez. Veja o [guia do Google Search Console no GitHub](https://github.com/renoribeiro/seo-re9/blob/main/docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md).

### Recursos de IA (SAM)

Recursos de IA como o SAM, o agente de SEO dentro do app, são opcionais. Defina a variável de ambiente `OPENROUTER_API_KEY` para ativá-los. Crie uma chave em [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys).
