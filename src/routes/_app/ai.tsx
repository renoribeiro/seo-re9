import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { getAuthMode } from "@/lib/auth-mode";
import { captureClientEvent } from "@/client/lib/posthog";
import {
  agentUpdatePrompt,
  getAgentSetupPrompt,
} from "@/client/features/ai-mcp/agentSetupPrompt";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import { AgentList } from "@/client/features/ai-mcp/AgentList";

const DOCS_URL = "https://openseo.so/docs/agent-setup";
const COACH_DOCS_URL = "https://openseo.so/docs/skills/seo-coach";
const SKILLS = [
  ["seo-coach", "Explica onde você está e escolhe seu próximo passo."],
  [
    "seo-project-setup",
    "Salva suas metas, concorrentes e páginas principais como contexto compartilhado.",
  ],
  [
    "seo-audit",
    "Auditoria do site em uma página, focada em uma única ação para esta semana.",
  ],
  [
    "keyword-research",
    "Encontra oportunidades de palavras-chave a partir de alguns temas iniciais.",
  ],
  [
    "keyword-clustering",
    "Agrupa palavras-chave por intenção e as associa a páginas.",
  ],
  ["competitive-landscape", "Mapeia quem vence no seu mercado e por quê."],
  [
    "competitor-analysis",
    "Estuda as palavras-chave, o conteúdo e os backlinks de um concorrente.",
  ],
  [
    "link-prospecting",
    "Encontra oportunidades de links e rascunha a abordagem.",
  ],
  [
    "local-seo",
    "Audita um Perfil da Empresa no Google e a visibilidade no Maps.",
  ],
  [
    "seo-report",
    "Salva qualquer um dos itens acima como relatório na sua página de Relatórios.",
  ],
];

export const Route = createFileRoute("/_app/ai")({
  component: AiPage,
});

function AiPage() {
  const origin =
    typeof window === "undefined"
      ? "https://app.openseo.so"
      : window.location.origin;
  const mcpUrl = `${origin}/mcp`;
  const prompt = getAgentSetupPrompt(origin);
  const [tab, setTab] = useState<"setup" | "skills">("setup");

  return (
    <div className="h-full overflow-auto bg-base-100 px-4 py-12 md:px-6 md:py-16 pb-24 md:pb-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">
          Configuração do agente
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-base-content/70">
          A forma mais poderosa de usar o RE9 SEO é pelo agente de IA que você
          já usa. Configure uma vez e depois pergunte o que quiser.
        </p>

        <div role="tablist" className="tabs tabs-border mt-8 w-fit">
          {(
            [
              ["setup", "Configure seu agente"],
              ["skills", "Habilidades"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`tab ${tab === id ? "tab-active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "setup" ? (
          <>
            <div className="mt-6 space-y-5">
              <section className="rounded-xl border border-base-300 p-5 sm:p-6">
                <h2 className="text-base font-semibold">
                  Configure seu agente
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                  Cole o prompt de configuração no seu agente para conectar o
                  RE9 SEO e instalar as habilidades de SEO. Ele vai orientar
                  você em qualquer passo manual.
                </p>
                <AgentList />
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:h-11 [&>button]:gap-2 [&>button]:text-sm">
                  <CopyButton
                    primary
                    value={prompt}
                    label="Copiar prompt de configuração"
                    successMessage="Prompt de configuração copiado"
                    onCopy={() => captureClientEvent("mcp:setup_prompt_copy")}
                  />
                  <a
                    href={`${DOCS_URL}#set-up-your-agent`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-base-content/60 underline decoration-base-content/25 underline-offset-4 hover:text-base-content"
                  >
                    Instruções de configuração
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
                <p className="mt-5 border-t border-base-300 pt-4 text-sm leading-relaxed text-base-content/60">
                  Depois de conectar, peça ao seu agente para usar o{" "}
                  <a
                    href={COACH_DOCS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base-content underline decoration-base-content/25 underline-offset-4 hover:decoration-base-content"
                  >
                    SEO Coach
                  </a>{" "}
                  para ajudar você a escolher o que fazer em seguida.
                </p>
              </section>

              <section className="rounded-xl border border-base-300 p-5 sm:p-6">
                <h2 className="text-base font-semibold">
                  Atualize suas habilidades
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                  Já conectou? Cole o prompt de atualização no seu agente para
                  receber as habilidades mais recentes do RE9 SEO, mantendo suas
                  configurações de conexão e edições pessoais.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 [&>button]:h-11 [&>button]:gap-2 [&>button]:text-sm">
                  <CopyButton
                    primary
                    value={agentUpdatePrompt}
                    label="Copiar prompt de atualização"
                    successMessage="Prompt de atualização copiado"
                    onCopy={() => captureClientEvent("mcp:update_prompt_copy")}
                  />
                  <a
                    href={`${DOCS_URL}#update-your-skills`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-base-content/60 underline decoration-base-content/25 underline-offset-4 hover:text-base-content"
                  >
                    Instruções de atualização
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </section>
            </div>

            {getAuthMode(import.meta.env.AUTH_MODE) === "cloudflare_access" ? (
              <div className="alert alert-warning mt-8 text-sm" role="alert">
                <ShieldAlert className="size-4 shrink-0" />
                <span>
                  Esta instância está protegida pelo Cloudflare Access. Os
                  clientes MCP só conseguem se conectar depois que o Managed
                  OAuth for ativado no seu aplicativo do Access.{" "}
                  <a
                    href="https://openseo.so/docs/self-hosting/cloudflare#connect-the-mcp-server-through-cloudflare-access"
                    target="_blank"
                    rel="noreferrer"
                    className="link font-medium"
                  >
                    Guia de configuração
                  </a>
                </span>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-base-300 pt-5 text-xs text-base-content/55">
              <span>
                URL do servidor MCP desta instância:{" "}
                <code className="font-mono text-base-content/80">{mcpUrl}</code>
              </span>
              <CopyButton
                value={mcpUrl}
                successMessage="URL do MCP copiada"
                onCopy={() => captureClientEvent("mcp:setup_url_copy")}
              />
            </div>
          </>
        ) : (
          <section className="mt-6">
            <p className="text-sm text-base-content/60">
              O prompt de configuração instala estas habilidades. Chame uma pelo
              nome quando quiser um relatório completo em vez de uma resposta
              rápida.
            </p>
            <ul className="mt-5 space-y-3 text-sm sm:space-y-2">
              {SKILLS.map(([name, blurb]) => (
                <li
                  key={name}
                  className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
                >
                  <a
                    href={`https://openseo.so/docs/skills/${name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 font-mono text-[13px] text-base-content underline decoration-base-content/25 underline-offset-4 hover:decoration-base-content sm:w-48"
                  >
                    /{name}
                  </a>
                  <span className="text-base-content/60">{blurb}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
