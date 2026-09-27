# Google Search Console no self-hosting

Conectar o Google Search Console (GSC) permite que o RE9 SEO traga seus cliques,
impressões, posições e dados de inspeção de URL reais, direto do Google.

É **opcional**: o RE9 SEO funciona bem sem ele, só que sem os dados do Search Console.

## Do que você vai precisar

- Uma conta Google com acesso à sua propriedade verificada no Search Console.
- Uns 10 minutos no [Google Cloud Console](https://console.cloud.google.com/).
- Três variáveis de ambiente definidas na sua implantação (veja o [passo 4](#4-defina-as-variáveis-de-ambiente)).

## 1) Crie um projeto no Google Cloud e ative a API

1. Abra o [Google Cloud Console](https://console.cloud.google.com/) e crie um
   projeto (ou escolha um existente).
2. Ative a
   [Google Search Console API](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com)
   nesse projeto.

## 2) Configure a tela de consentimento OAuth

Em **APIs & Services → OAuth consent screen**:

- Escolha **External** (a menos que todas as pessoas que vão usar estejam na sua organização do Google Workspace).
- Preencha o nome do app, o e-mail de suporte e o e-mail de contato de desenvolvimento.
- Enquanto o app estiver em **Testing**, adicione as contas Google que vão se
  conectar como **test users** — caso contrário, o Google bloqueia o login com `access_denied`.

Para uso pessoal ou interno, você não precisa enviar o app para verificação; o
modo de teste é suficiente.

## 3) Crie um ID de cliente OAuth

Em **APIs & Services → Credentials → Create credentials → OAuth client ID**:

1. Tipo de aplicativo: **Web application**.
2. Adicione uma **Authorized redirect URI** exatamente igual à origem da sua
   implantação mais `/api/gsc/oauth/callback`:

   | Implantação  | URI de redirecionamento                                 |
   | ------------ | ------------------------------------------------------- |
   | Implantada   | `https://your-re9seo-domain.com/api/gsc/oauth/callback` |
   | Docker local | `http://localhost:3001/api/gsc/oauth/callback`          |

   O esquema, o host e a porta devem ser idênticos, sem barra no final.

3. Salve e copie o **Client ID** e o **Client secret**.

## 4) Defina as variáveis de ambiente

Defina estes três valores e reinicie o RE9 SEO:

| Variável               | Valor                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `GOOGLE_CLIENT_ID`     | Client ID do passo 3.                                                                |
| `GOOGLE_CLIENT_SECRET` | Client secret do passo 3.                                                            |
| `BETTER_AUTH_SECRET`   | Uma string aleatória de **pelo menos 32 caracteres** (criptografa os tokens salvos). |

O `BETTER_AUTH_SECRET` não é necessário no self-hosting normal — só para o Search
Console, porque os tokens OAuth salvos são criptografados em repouso com ele.
Gere um com:

```sh
openssl rand -base64 32
```

Onde defini-las:

- **Self-hosting com Docker:** `.env`
- **Cloudflare:** no painel de Workers (como secrets)
- **Desenvolvimento local:** `.env.local`

## 5) Reinicie e conecte

Reinicie o RE9 SEO para ele carregar as novas variáveis. No Docker, mudar o `.env`
exige que o Compose recrie o container para aplicar as mudanças:

```bash
docker compose up -d --force-recreate open-seo
```

Depois, abra **Integrações**, clique em **Conectar com o Google**, autorize a
conta Google dona da sua propriedade verificada e escolha a propriedade que será
vinculada ao seu projeto.

## Como funciona

- O RE9 SEO usa o seu cliente Google para executar o fluxo OAuth e salva a
  autorização resultante no banco de dados, com os tokens de acesso e de
  atualização **criptografados em repouso** (com a chave `BETTER_AUTH_SECRET`).
- Os tokens de acesso são gerados e renovados sob demanda — você só autoriza uma vez.
- Os dados do Search Console vêm da sua própria conta Google, então o RE9 SEO nunca desconta créditos por eles.

## Solução de problemas

**`redirect_uri_mismatch` vindo do Google** — a URI de redirecionamento no seu
cliente OAuth deve ser exatamente igual a `<your-origin>/api/gsc/oauth/callback`.
Confira o esquema (`http` vs `https`), o host, a porta e se não há barra no final.

**"Google OAuth client not configured" / "not configured for Search Console yet"**
(no app ou pelas ferramentas MCP) — falta uma das variáveis `GOOGLE_CLIENT_ID`,
`GOOGLE_CLIENT_SECRET` ou `BETTER_AUTH_SECRET`, ou o segredo tem menos de 32
caracteres. Defina as três e reinicie. No Docker, recrie o container para que o
Compose aplique o `.env`:

```bash
docker compose up -d --force-recreate open-seo
```

**`access_denied` durante o login** — a conta Google não está na lista de
usuários de teste da tela de consentimento OAuth (enquanto o app está em modo
Testing). Adicione-a em **OAuth consent screen → Test users**.

**Conectado, mas sem propriedades para escolher** — a conta Google que você
autorizou não tem uma propriedade verificada no Search Console. Verifique o site
no [Search Console](https://search.google.com/search-console) primeiro e conecte
de novo.
