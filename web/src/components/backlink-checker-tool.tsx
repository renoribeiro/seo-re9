import { ToolTable } from "@/lib/free-tools/tool-table";
import { useEffect, useState } from "react";
import { FIELD_CLASS, SubmitButton, ToolForm } from "@/lib/free-tools/form";
import { formatCount, InfoTip, MetricGrid } from "@/lib/free-tools/metric-grid";
import { UpsellCard } from "@/lib/free-tools/upsell-card";
import { useToolRun } from "@/lib/free-tools/use-tool-run";

const TOOL = "backlink-checker";

type BacklinkRow = {
  domainFrom: string | null;
  urlFrom: string | null;
  urlTo: string | null;
  pageTitle: string | null;
  anchor: string | null;
  dofollow: boolean | null;
  domainRank: number | null;
};

type CheckResult = {
  target: string;
  summary: {
    rank: number | null;
    backlinks: number | null;
    referringDomains: number | null;
    brokenBacklinks: number | null;
  };
  topBacklinks: BacklinkRow[];
};

export function BacklinkCheckerTool({
  initialTarget,
}: {
  initialTarget?: string;
}) {
  const [target, setTarget] = useState("");
  const { status, errorMessage, result, run } = useToolRun<CheckResult>(
    TOOL,
    "/api/backlink-check",
  );

  // Applied after hydration so the prerendered HTML and the first client
  // render agree, whatever ?target= the visitor arrived with.
  useEffect(() => {
    if (initialTarget) setTarget(initialTarget);
  }, [initialTarget]);

  return (
    <div>
      <ToolForm
        onSubmit={run}
        input={{ target }}
        status={status}
        errorMessage={errorMessage}
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="backlink-target" className="sr-only">
            Domínio para verificar
          </label>
          <input
            id="backlink-target"
            name="target"
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            required
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="exemplo.com.br"
            disabled={status === "loading"}
            className={FIELD_CLASS}
          />
          <SubmitButton status={status} idleLabel="Verificar backlinks" />
        </div>
      </ToolForm>

      {status === "done" && result ? <CheckResults result={result} /> : null}
    </div>
  );
}

function CheckResults({ result }: { result: CheckResult }) {
  const { summary, topBacklinks } = result;
  const total = summary.backlinks;
  const hasMore = typeof total === "number" && total > topBacklinks.length;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
        Perfil de backlinks de{" "}
        <span className="text-[var(--color-brand-accent)]">
          {result.target}
        </span>
      </h2>

      <div className="mt-4">
        <MetricGrid
          metrics={[
            {
              label: "Domain Rank",
              value: formatCount(summary.rank),
              tip: "Pontuação de 0 a 100 da DataForSEO para a força do perfil de links de um domínio. A ideia é parecida com o DR do Ahrefs ou o DA do Moz, mas cada ferramenta usa seu próprio índice e fórmula, então os números variam entre elas.",
            },
            {
              label: "Backlinks",
              value: formatCount(summary.backlinks),
              tip: "Total de links individuais que apontam para este domínio, contando vários links do mesmo site.",
            },
            {
              label: "Domínios de referência",
              value: formatCount(summary.referringDomains),
              tip: "Sites únicos que linkam para este domínio pelo menos uma vez.",
            },
            {
              label: "Backlinks quebrados",
              value: formatCount(summary.brokenBacklinks),
              tip: "Links que apontam para páginas deste domínio que não carregam mais, como páginas excluídas que retornam 404.",
            },
          ]}
        />
      </div>

      {topBacklinks.length > 0 ? (
        <ToolTable
          label="Resultados do verificador de backlinks"
          className="mt-4"
        >
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-brand-muted)]">
                <th className="px-4 py-3 font-medium">
                  Rank
                  <InfoTip tip="Força (0 a 100) do perfil de links do próprio site que faz o link. Links de domínios com rank maior costumam ter mais peso." />
                </th>
                <th className="px-4 py-3 font-medium">Página de origem</th>
                <th className="px-4 py-3 font-medium">
                  Âncora e destino
                  <InfoTip tip="O texto clicável do link e a página deste domínio para onde ele aponta." />
                </th>
                <th className="px-4 py-3 font-medium">
                  Tipo
                  <InfoTip
                    tip="Links follow podem passar valor de ranqueamento para o destino. Links nofollow pedem aos buscadores que não os considerem."
                    align="right"
                  />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {topBacklinks.map((row) => (
                <tr key={row.urlFrom ?? row.domainFrom ?? ""}>
                  <td className="px-4 py-3 align-top tabular-nums text-neutral-950">
                    {formatCount(row.domainRank)}
                  </td>
                  <td className="max-w-[300px] px-4 py-3 align-top">
                    <p className="truncate font-medium text-neutral-950">
                      {row.pageTitle ?? row.domainFrom ?? "—"}
                    </p>
                    {row.urlFrom ? (
                      <a
                        href={row.urlFrom}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="block truncate text-xs text-[var(--color-brand-muted)] hover:text-neutral-900 hover:underline"
                      >
                        {row.urlFrom}
                      </a>
                    ) : null}
                  </td>
                  <td className="max-w-[260px] px-4 py-3 align-top">
                    <p className="truncate text-neutral-700">
                      {row.anchor ?? "—"}
                    </p>
                    {row.urlTo ? (
                      <p className="truncate text-xs text-[var(--color-brand-muted)]">
                        {row.urlTo}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={
                        row.dofollow
                          ? "rounded-full border border-[var(--color-border-subtle)] px-2 py-0.5 text-xs font-medium text-neutral-900"
                          : "rounded-full px-2 py-0.5 text-xs text-neutral-500"
                      }
                    >
                      {row.dofollow ? "Follow" : "Nofollow"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ToolTable>
      ) : (
        <p className="mt-4 rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 text-sm text-neutral-700">
          Ainda não há backlinks ativos para este domínio no índice.
        </p>
      )}

      <UpsellCard tool={TOOL} cta="Explorar mais backlinks">
        {hasMore ? (
          <>
            Mostrando os {topBacklinks.length} principais backlinks, um por
            domínio de referência, dos domínios mais fortes para os mais fracos.
            O índice tem{" "}
            <span className="font-medium text-neutral-950">
              {formatCount(total)} backlinks no total
            </span>{" "}
            para este domínio.
          </>
        ) : (
          <>
            Veja o quadro completo: domínios de referência, âncoras, links novos
            e perdidos e sinais de spam.
          </>
        )}
      </UpsellCard>
    </div>
  );
}
