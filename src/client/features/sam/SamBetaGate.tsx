import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

/**
 * Shown on the chat route until the user opts into Sam. Sam is the OpenSEO
 * MCP plus skills wrapped in an in-app chat; the agents people already use
 * run that same toolset with a more mature harness, so the primary action
 * points there and Sam is the explicit fallback.
 */
export function SamBetaGate({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex h-full items-center justify-center overflow-auto px-4 py-8 md:px-6">
      <div className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-6 md:p-8">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-5" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">O Sam está em beta</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-base-content/70">
          <p>
            O Sam é o MCP e as skills do RE9 SEO dentro de uma janela de chat. O
            agente que você já usa, como Claude Code, ChatGPT, Grok Bot ou
            Hermes, roda essas mesmas ferramentas em uma estrutura bem mais
            capaz. Recomendamos usar o RE9 SEO por lá.
          </p>
          <p>
            Você ainda pode usar o Sam, mas ele está no começo e tem limitações.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to="/ai" className="btn btn-primary">
            Configure seu agente
          </Link>
          <button type="button" className="btn btn-ghost" onClick={onContinue}>
            Usar o Sam mesmo assim
          </button>
        </div>
      </div>
    </div>
  );
}
