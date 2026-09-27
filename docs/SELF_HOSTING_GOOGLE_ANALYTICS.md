# Google Analytics no self-hosting

Conectar o Google Analytics permite que o RE9 SEO vincule uma propriedade GA4 a um
projeto. A conexão é opcional e somente leitura.

## Do que você vai precisar

- Uma conta Google com acesso à propriedade GA4.
- Um projeto no Google Cloud com credenciais OAuth.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` e `BETTER_AUTH_SECRET` definidos na
  implantação do RE9 SEO.

Se o Search Console já estiver conectado, reutilize o mesmo projeto do Google
Cloud e o mesmo cliente OAuth. O GA4 ainda pede uma autorização de consentimento
separada.

## 1) Ative as APIs do Analytics

No [Google Cloud Console](https://console.cloud.google.com/), ative as duas:

- [Google Analytics Admin API](https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com)
- [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com)

A Admin API lista as propriedades durante a conexão. A Data API alimenta os
relatórios somente leitura adicionados nas etapas seguintes da integração com o GA4.

## 2) Configure a tela de consentimento OAuth

Em **APIs & Services → OAuth consent screen**, configure o app. Enquanto o app
estiver em modo Testing, adicione como usuária de teste cada conta Google que vai
se conectar.

## 3) Registre a URL de callback

Abra **APIs & Services → Credentials**, edite o cliente OAuth do tipo Web
application e adicione uma URI de redirecionamento autorizada igual à origem da
implantação mais `/api/ga4/oauth/callback`.

| Implantação  | URI de redirecionamento                                 |
| ------------ | ------------------------------------------------------- |
| Implantada   | `https://your-re9seo-domain.com/api/ga4/oauth/callback` |
| Docker local | `http://localhost:3001/api/ga4/oauth/callback`          |

Mantenha a URI `/api/gsc/oauth/callback` existente se o Search Console usar o
mesmo cliente.

## 4) Defina as variáveis de ambiente

Defina estes valores e reinicie o RE9 SEO:

| Variável               | Valor                                                                  |
| ---------------------- | ---------------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | Client ID do cliente Web application.                                  |
| `GOOGLE_CLIENT_SECRET` | Client secret do cliente Web application.                              |
| `BETTER_AUTH_SECRET`   | String aleatória de pelo menos 32 caracteres para criptografar tokens. |

Gere o segredo de criptografia com:

```sh
openssl rand -base64 32
```

## 5) Conecte uma propriedade

Abra o painel de um projeto ou **Configurações do projeto → Integrações**, clique em
**Conectar com o Google**, aprove o acesso somente leitura ao Analytics e escolha
uma propriedade GA4.

O RE9 SEO guarda os tokens OAuth criptografados na tabela de contas do Better
Auth. O vínculo com o projeto guarda apenas os metadados da propriedade
selecionada e a conta do conector. Desconectar o GA4 não desconecta o Search
Console.

## Solução de problemas

**`redirect_uri_mismatch`** — confirme que a URI registrada corresponde
exatamente ao esquema, host, porta e caminho `/api/ga4/oauth/callback` usados
pela implantação.

**Nenhuma propriedade aparece** — confirme que a Analytics Admin API está ativada
e que a conta Google conectada tem acesso à propriedade.

**Conexão expirada** — conecte a conta Google de novo. Apps OAuth deixados no
status Testing do Google podem receber autorizações de atualização de curta
duração.
