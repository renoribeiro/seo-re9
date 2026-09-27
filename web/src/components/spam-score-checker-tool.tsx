import { ToolTable } from "@/lib/free-tools/tool-table";
import { useState } from "react";
import { FIELD_CLASS, SubmitButton, ToolForm } from "@/lib/free-tools/form";
import { formatCount, MetricGrid } from "@/lib/free-tools/metric-grid";
import { UpsellCard } from "@/lib/free-tools/upsell-card";
import { useToolRun } from "@/lib/free-tools/use-tool-run";

const TOOL = "spam-score-checker";

type SpamResult = {
  target: string;
  spamScore: number | null;
  targetSpamScore: number | null;
  rank: number | null;
  backlinks: number | null;
  referringDomains: number | null;
  worstBacklinks: Array<{
    domainFrom: string | null;
    urlFrom: string | null;
    anchor: string | null;
    dofollow: boolean | null;
    domainRank: number | null;
    spamScore: number | null;
  }>;
};

export function SpamScoreCheckerTool() {
  const [target, setTarget] = useState("");
  const { status, errorMessage, result, run } = useToolRun<SpamResult>(
    TOOL,
    "/api/spam-score-checker",
  );

  return (
    <div>
      <ToolForm
        onSubmit={run}
        input={{ target }}
        status={status}
        errorMessage={errorMessage}
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="spam-target" className="sr-only">
            Domínio para verificar
          </label>
          <input
            id="spam-target"
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
          <SubmitButton status={status} idleLabel="Verificar spam score" />
        </div>
      </ToolForm>

      {status === "done" && result ? (
        <div className="mt-6">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
            Sinais de spam de{" "}
            <span className="text-[var(--color-brand-accent)]">
              {result.target}
            </span>
          </h2>

          <div className="mt-3">
            <MetricGrid
              metrics={[
                {
                  label: "Spam score dos backlinks",
                  value: formatCount(result.spamScore),
                  tip: "Estimativa (de 0 a 100) da DataForSEO do quanto os links que apontam para este domínio parecem spam, com base em sinais como o perfil dos próprios sites que fazem o link. Quanto maior, pior.",
                },
                {
                  label: "Spam score do domínio",
                  value: formatCount(result.targetSpamScore),
                  tip: "A mesma escala de 0 a 100 aplicada ao próprio domínio, e não aos links que apontam para ele.",
                },
                {
                  label: "Domínios de referência",
                  value: formatCount(result.referringDomains),
                  tip: "Sites únicos que linkam para este domínio pelo menos uma vez.",
                },
                {
                  label: "Domain Rank",
                  value: formatCount(result.rank),
                  tip: "Pontuação de 0 a 100 da DataForSEO para a força do perfil de links deste domínio.",
                },
              ]}
            />
          </div>

          <h3 className="mt-6 text-base font-semibold text-neutral-950">
            Os links mais suspeitos que apontam para cá
          </h3>
          {result.worstBacklinks.length > 0 ? (
            <ToolTable
              label="Resultados do verificador de spam score"
              className="mt-3"
            >
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-brand-muted)]">
                    <th className="px-4 py-3 font-medium">Spam score</th>
                    <th className="px-4 py-3 font-medium">Página de origem</th>
                    <th className="px-4 py-3 font-medium">Âncora</th>
                    <th className="px-4 py-3 font-medium">Tipo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                  {result.worstBacklinks.map((row) => (
                    <tr key={row.urlFrom ?? row.domainFrom ?? ""}>
                      <td className="px-4 py-3 align-top tabular-nums text-neutral-950">
                        {formatCount(row.spamScore)}
                      </td>
                      <td className="max-w-[320px] px-4 py-3 align-top">
                        <p className="truncate font-medium text-neutral-950">
                          {row.domainFrom ?? "—"}
                        </p>
                        {row.urlFrom ? (
                          <span className="block truncate text-xs text-[var(--color-brand-muted)]">
                            {row.urlFrom}
                          </span>
                        ) : null}
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-3 align-top text-neutral-700">
                        {row.anchor ?? "—"}
                      </td>
                      <td className="px-4 py-3 align-top text-neutral-700">
                        {row.dofollow ? "Follow" : "Nofollow"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ToolTable>
          ) : (
            <p className="mt-3 rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 text-sm text-neutral-700">
              Ainda não há backlinks ativos para este domínio no índice.
            </p>
          )}
          <p className="mt-2 text-xs text-[var(--color-brand-muted)]">
            Ter alguns links de spam é normal. Um punhado de sites copiadores
            não é problema; já um perfil em que a maioria dos domínios de
            referência tem pontuação alta merece um olhar mais atento.
          </p>

          <UpsellCard tool={TOOL} cta="Auditar o perfil inteiro">
            A verificação gratuita lista os 10 domínios de referência com mais
            sinais de spam. O RE9 SEO filtra o perfil completo de backlinks por
            spam score para você ver quanto dele é lixo.
          </UpsellCard>
        </div>
      ) : null}
    </div>
  );
}
