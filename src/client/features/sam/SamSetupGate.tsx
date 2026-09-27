import { Link } from "@tanstack/react-router";
import { ShieldAlert, Wrench } from "lucide-react";

export function SamSetupGate({
  errorMessage,
  isRefetching,
  onRetry,
}: {
  errorMessage: string | null;
  isRefetching: boolean;
  onRetry: () => void;
}) {
  return (
    <section>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 md:p-7 space-y-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-warning/15 p-2.5 text-warning shrink-0">
            <Wrench className="size-5" />
          </div>
          <div className="max-w-3xl space-y-1.5">
            <h2 className="text-xl font-semibold">Ativar recursos de IA</h2>
            <div className="text-sm text-base-content/68">
              O SAM, agente de IA do RE9 SEO, precisa de uma chave de API do
              OpenRouter. Crie uma chave no OpenRouter, defina-a na variável de
              ambiente <code>OPENROUTER_API_KEY</code>, reinicie o RE9 SEO e
              confirme aqui.
            </div>
            <div className="text-xs text-base-content/50">
              As instruções passo a passo para cada tipo de instalação estão no{" "}
              <Link
                className="underline underline-offset-2 hover:text-base-content/70"
                to="/help/openrouter-api-key"
              >
                guia de configuração da chave de API do OpenRouter
              </Link>
              .
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="btn btn-primary"
            onClick={onRetry}
            disabled={isRefetching}
          >
            {isRefetching ? "Confirmando..." : "Confirmar chave de API"}
          </button>
          <a
            className="btn"
            href="https://openrouter.ai/settings/keys"
            target="_blank"
            rel="noreferrer"
          >
            Abrir chaves do OpenRouter
          </a>
        </div>

        {errorMessage ? (
          <div className="alert alert-warning">
            <ShieldAlert className="size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
