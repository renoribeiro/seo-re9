import { Package } from "lucide-react";
import { CopyButton } from "./SetupControls";

export const AGENT_SETUP_DESCRIPTION =
  "Cole este prompt no seu agente para configurar o RE9 SEO automaticamente.";

export function AgentSetupPanel({
  prompt,
  onCopy,
}: {
  prompt: string;
  onCopy?: () => void;
}) {
  return (
    <>
      <div className="rounded-xl border border-base-300 bg-base-200/25 p-5">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-base-300 bg-base-100">
            <Package className="size-5 text-base-content/70" />
          </span>
          <div>
            <p className="text-sm font-medium">Plugin do RE9 SEO</p>
            <p className="mt-1 text-xs text-base-content/55">
              Conexão MCP + skills de SEO
            </p>
          </div>
        </div>
        <div className="[&>button]:h-11 [&>button]:w-full [&>button]:gap-2 [&>button]:text-sm">
          <CopyButton
            primary
            value={prompt}
            label="Copiar prompt de configuração"
            successMessage="Prompt de configuração copiado"
            onCopy={onCopy}
          />
        </div>
      </div>
    </>
  );
}
