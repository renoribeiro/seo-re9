import { createFileRoute } from "@tanstack/react-router";

const OPENROUTER_KEYS_URL = "https://openrouter.ai/settings/keys";

export const Route = createFileRoute("/_app/help/openrouter-api-key")({
  component: OpenrouterApiKeyHelpPage,
});

function OpenrouterApiKeyHelpPage() {
  return (
    <div className="px-4 py-4 md:px-6 md:py-6 pb-24 md:pb-8 overflow-auto">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-3">
            <h1 className="text-2xl font-semibold">
              Configure sua chave de API do OpenRouter
            </h1>
            <p className="text-sm text-base-content/70">
              O RE9 SEO precisa do secret <code>OPENROUTER_API_KEY</code> para
              executar os recursos de IA, como o SAM, o agente de SEO do app.
              Ele é opcional: todo o resto do RE9 SEO funciona sem ele.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-4">
            <h2 className="card-title text-base">Passos</h2>
            <ol className="list-decimal pl-5 text-sm space-y-3 text-base-content/80">
              <li>
                Crie uma conta em{" "}
                <a
                  className="link link-primary"
                  href="https://openrouter.ai"
                  target="_blank"
                  rel="noreferrer"
                >
                  openrouter.ai
                </a>{" "}
                e adicione créditos (pagamento por uso, como na DataForSEO).
              </li>
              <li>
                Acesse{" "}
                <a
                  className="link link-primary"
                  href={OPENROUTER_KEYS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenRouter API Keys
                </a>{" "}
                e clique em "Create API Key".
              </li>
              <li>
                Salve a chave como o secret <code>OPENROUTER_API_KEY</code> no
                seu ambiente:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Docker auto-hospedado: <code>.env</code>
                  </li>
                  <li>Cloudflare: defina no painel do Workers (veja abaixo)</li>
                  <li>
                    Desenvolvimento local: <code>.env.local</code>
                  </li>
                </ul>
              </li>
              <li>Reinicie o RE9 SEO.</li>
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
                <code className="mx-1">OPENROUTER_API_KEY</code>.
              </li>
              <li>Cole sua chave de API do OpenRouter e salve.</li>
            </ol>

            <div className="divider my-1" />

            <p>Ou defina o mesmo secret pelo terminal com:</p>
            <pre className="p-3 rounded bg-base-200 border border-base-300 overflow-x-auto text-xs">
              <code>npx wrangler secret put OPENROUTER_API_KEY</code>
            </pre>
            <p>Quando for solicitado, cole sua chave de API do OpenRouter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
