import { createFileRoute } from "@tanstack/react-router";

const DATAFORSEO_API_ACCESS_URL = "https://app.dataforseo.com/api-access";

export const Route = createFileRoute("/_app/help/dataforseo-api-key")({
  component: DataforseoApiKeyHelpPage,
});

function DataforseoApiKeyHelpPage() {
  return (
    <div className="px-4 py-4 md:px-6 md:py-6 pb-24 md:pb-8 overflow-auto">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-3">
            <h1 className="text-2xl font-semibold">
              Configure sua chave de API da DataForSEO
            </h1>
            <p className="text-sm text-base-content/70">
              O RE9 SEO precisa do secret <code>DATAFORSEO_API_KEY</code> para
              executar os fluxos de palavras-chave, domínios e dados de SEO.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h2 className="card-title text-base">Passos</h2>
            <ol className="list-decimal pl-5 text-sm space-y-3 text-base-content/80">
              <li>
                Acesse{" "}
                <a
                  className="link link-primary"
                  href={DATAFORSEO_API_ACCESS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  DataForSEO API Access
                </a>{" "}
                e solicite as credenciais de API por e-mail.
              </li>
              <li>
                Codifique em Base64 seu login da DataForSEO e a senha da API
                neste formato:
                <pre className="mt-2 p-3 rounded bg-base-200 border border-base-300 overflow-x-auto text-xs">
                  <code>printf '%s' 'SEU_LOGIN:SUA_SENHA' | base64</code>
                </pre>
              </li>
              <li>
                Salve o resultado como o secret <code>DATAFORSEO_API_KEY</code>{" "}
                no seu ambiente.
              </li>
            </ol>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-2 text-sm text-base-content/75">
            <h2 className="card-title text-base">
              Cloudflare Workers (painel web)
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-base-content/80">
              <li>
                No Cloudflare, acesse <code>Compute</code> -&gt;{" "}
                <code>Workers &amp; Pages</code>e abra o Worker do RE9 SEO.
              </li>
              <li>
                Abra <code>Settings</code>.
              </li>
              <li>
                Acesse <code>Variables &amp; Secrets</code> e adicione um novo
                secret chamado
                <code className="mx-1">DATAFORSEO_API_KEY</code>.
              </li>
              <li>Cole o valor em base64 gerado pelo comando acima e salve.</li>
            </ol>

            <div className="divider my-1" />

            <p>Ou defina o mesmo secret pelo terminal com:</p>
            <pre className="p-3 rounded bg-base-200 border border-base-300 overflow-x-auto text-xs">
              <code>npx wrangler secret put DATAFORSEO_API_KEY</code>
            </pre>
            <p>
              Quando for solicitado, use o valor em base64 de{" "}
              <code>login:senha</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
