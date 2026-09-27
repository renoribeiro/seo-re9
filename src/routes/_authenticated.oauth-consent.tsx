import { createFileRoute } from "@tanstack/react-router";
import { Check, Database, KeyRound, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { captureClientEvent } from "@/client/lib/posthog";

export const Route = createFileRoute("/_authenticated/oauth-consent")({
  component: OAuthConsentPage,
});

const SCOPES = [
  {
    icon: Database,
    label: "Ler seus dados do RE9 SEO",
    description:
      "Projetos, relatórios de palavras-chave e resultados de auditoria.",
  },
  {
    icon: KeyRound,
    label: "Agir em seu nome via MCP",
    description:
      "Executar ferramentas e gravar os resultados na sua organização.",
  },
];

function OAuthConsentPage() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userEmail = session?.user?.email ?? null;

  useEffect(() => {
    captureClientEvent("mcp:consent_viewed");
  }, []);

  async function respond(accept: boolean) {
    setError(null);
    setIsSubmitting(true);
    if (!accept) {
      captureClientEvent("mcp:consent_denied");
    }

    const response = await fetch("/api/oauth/consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accept,
        query: window.location.search,
      }),
    });
    const data: {
      redirectTo?: string;
      error?: string;
    } = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Não foi possível concluir a autorização.");
      setIsSubmitting(false);
      return;
    }

    if (data.redirectTo) {
      window.location.assign(data.redirectTo);
      return;
    }

    setError(
      "A resposta da autorização não trouxe uma URL de redirecionamento.",
    );
    setIsSubmitting(false);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <img
          src="/transparent-logo.png"
          alt="RE9 SEO"
          className="size-10 rounded-lg"
        />
        <h1 className="mt-5 text-xl font-semibold">Autorizar acesso via MCP</h1>
        <p className="mt-2 text-sm text-base-content/70">
          Um cliente MCP está pedindo acesso ao seu espaço de trabalho no RE9
          SEO.
        </p>
      </div>

      {userEmail ? (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-base-300 bg-base-200/50 px-3 py-2 text-sm">
          <div className="flex size-7 items-center justify-center rounded-full bg-base-300">
            <User className="size-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-base-content/60">Conectado como</div>
            <div className="font-medium">{userEmail}</div>
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <div className="text-xs font-medium uppercase tracking-wide text-base-content/60">
          Com isso, ele poderá
        </div>
        <ul className="mt-3 space-y-3">
          {SCOPES.map((scope) => (
            <li key={scope.label} className="flex gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <div className="text-sm font-medium">{scope.label}</div>
                <div className="text-xs text-base-content/60">
                  {scope.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {error ? (
        <div className="mt-6 rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
          {error}
        </div>
      ) : null}

      <div className="mt-8 flex gap-2">
        <button
          type="button"
          className="btn btn-ghost flex-1"
          disabled={isSubmitting}
          onClick={() => void respond(false)}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-primary flex-1"
          disabled={isSubmitting}
          onClick={() => void respond(true)}
        >
          {isSubmitting ? "Autorizando..." : "Autorizar"}
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-base-content/50">
        Você pode revogar o acesso a qualquer momento em Configurações.
      </p>
    </div>
  );
}
