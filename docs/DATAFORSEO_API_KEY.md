# Configuração da chave de API do DataForSEO

O RE9 SEO usa o [DataForSEO](https://dataforseo.com/) para buscar dados de SEO. É um serviço de terceiros, pago conforme o uso e sem vínculo com o RE9 SEO. Você precisa de uma chave de API para conectar o RE9 SEO a ele.

Contas novas no DataForSEO vêm com US$ 1 de crédito gratuito para testes, e a recarga mínima é de US$ 50.

## Obtenha sua chave de API

1. Acesse [DataForSEO API Access](https://app.dataforseo.com/api-access) (crie uma conta se ainda não tiver).
2. Clique em "Send by email" para receber suas credenciais.
3. Copie a credencial mais longa, identificada como "Base64". Ela é o valor em base64 do seu e-mail e da senha de API do DataForSEO no formato `email:password`.

## Onde configurar

Defina o valor como `DATAFORSEO_API_KEY`:

- **Self-hosting com Docker:** no `.env` (veja [`SELF_HOSTING_DOCKER.md`](./SELF_HOSTING_DOCKER.md)).
- **Self-hosting na Cloudflare:** no `.env.selfhost` (veja [`SELF_HOSTING_CLOUDFLARE.md`](./SELF_HOSTING_CLOUDFLARE.md)). Implantações legadas (botão/Wrangler): como secret do Worker no painel, em `Settings` -> `Variables & Secrets`.
- **Desenvolvimento local:** no `.env.local` (veja [`LOCAL_DEVELOPMENT.md`](./LOCAL_DEVELOPMENT.md)).
