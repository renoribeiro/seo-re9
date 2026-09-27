import { KeywordTable } from "@/lib/free-tools/keyword-table";
import { ToolTable } from "@/lib/free-tools/tool-table";
import { useState } from "react";
import { DEFAULT_COUNTRY_CODE } from "@/lib/free-tools/countries";
import {
  CountrySelect,
  FIELD_CLASS,
  FieldLabel,
  SubmitButton,
  ToolForm,
} from "@/lib/free-tools/form";
import {
  formatCount,
  formatMoney,
  MetricGrid,
} from "@/lib/free-tools/metric-grid";
import { UpsellCard } from "@/lib/free-tools/upsell-card";
import { useToolRun } from "@/lib/free-tools/use-tool-run";

const TOOL = "competitor-analysis";

type KeywordRow = {
  keyword: string | null;
  searchVolume: number | null;
  difficulty: number | null;
  position: number | null;
  url: string | null;
};

type GapRow = KeywordRow & { traffic: number | null };

type PageRow = {
  url: string | null;
  traffic: number | null;
  keywords: number | null;
};

type OrganicMetrics = {
  organicTraffic: number | null;
  organicKeywords: number | null;
  trafficValue: number | null;
};

type AnalysisResult = {
  competitor: string;
  yourDomain: string | null;
  keywords: KeywordRow[];
  totalKeywords: number | null;
  pages: PageRow[];
  totalPages: number | null;
  comparison: { competitor: OrganicMetrics; you: OrganicMetrics } | null;
  gap: GapRow[] | null;
  gapFailed: boolean;
};

export function CompetitorAnalysisTool() {
  const [competitor, setCompetitor] = useState("");
  const [yourDomain, setYourDomain] = useState("");
  const [locationCode, setLocationCode] = useState(DEFAULT_COUNTRY_CODE);
  const { status, errorMessage, result, run } = useToolRun<AnalysisResult>(
    TOOL,
    "/api/competitor-analysis",
  );

  return (
    <div>
      <ToolForm
        onSubmit={run}
        input={{
          competitor,
          yourDomain: yourDomain.trim() || undefined,
          locationCode,
        }}
        status={status}
        errorMessage={errorMessage}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <FieldLabel htmlFor="competitor-domain">
              Domínio do concorrente
            </FieldLabel>
            <input
              id="competitor-domain"
              name="competitor"
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              required
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="concorrente.com.br"
              disabled={status === "loading"}
              className={`mt-1 ${FIELD_CLASS}`}
            />
          </div>
          <div>
            <FieldLabel htmlFor="competitor-your-domain">
              Seu domínio (opcional)
            </FieldLabel>
            <input
              id="competitor-your-domain"
              name="yourDomain"
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              value={yourDomain}
              onChange={(e) => setYourDomain(e.target.value)}
              placeholder="exemplo.com.br"
              disabled={status === "loading"}
              className={`mt-1 ${FIELD_CLASS}`}
            />
          </div>
          <div>
            <FieldLabel htmlFor="competitor-country">País</FieldLabel>
            <div className="mt-1">
              <CountrySelect
                id="competitor-country"
                value={locationCode}
                onChange={setLocationCode}
                disabled={status === "loading"}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <SubmitButton status={status} idleLabel="Analisar concorrente" />
        </div>
      </ToolForm>

      {status === "done" && result ? <AnalysisReport result={result} /> : null}
    </div>
  );
}

function AnalysisReport({ result }: { result: AnalysisResult }) {
  return (
    <div className="mt-6 space-y-8">
      {result.comparison ? (
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
            {result.competitor} vs {result.yourDomain}
          </h2>
          <div className="mt-3">
            <MetricGrid
              metrics={[
                {
                  label: `Tráfego de ${result.competitor}`,
                  value: formatCount(
                    result.comparison.competitor.organicTraffic,
                  ),
                  tip: "Visitas orgânicas mensais estimadas do concorrente no país selecionado.",
                },
                {
                  label: `Palavras-chave de ${result.competitor}`,
                  value: formatCount(
                    result.comparison.competitor.organicKeywords,
                  ),
                },
                {
                  label: `Tráfego de ${result.yourDomain}`,
                  value: formatCount(result.comparison.you.organicTraffic),
                  tip: "Visitas orgânicas mensais estimadas do seu domínio no país selecionado.",
                },
                {
                  label: `Palavras-chave de ${result.yourDomain}`,
                  value: formatCount(result.comparison.you.organicKeywords),
                },
              ]}
            />
          </div>
          <p className="mt-2 text-xs text-[var(--color-brand-muted)]">
            Valor do tráfego:{" "}
            {formatMoney(result.comparison.competitor.trafficValue)} vs.{" "}
            {formatMoney(result.comparison.you.trafficValue)} por mês.
          </p>
        </section>
      ) : null}

      {result.gap && result.gap.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
            Palavras-chave em que ele ranqueia e você não
          </h2>
          <KeywordTable rows={result.gap} showTraffic />
        </section>
      ) : null}

      {result.gapFailed ? (
        <p className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 text-sm text-neutral-700">
          Não foi possível carregar a comparação de palavras-chave. Tente
          novamente. As palavras-chave e as páginas do concorrente abaixo
          continuam disponíveis.
        </p>
      ) : null}

      {result.gap && result.gap.length === 0 ? (
        <p className="rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 text-sm text-neutral-700">
          Nenhuma palavra-chave exclusiva do concorrente foi encontrada nos
          dados disponíveis para este país.
        </p>
      ) : null}

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
          Principais palavras-chave de{" "}
          <span className="text-[var(--color-brand-accent)]">
            {result.competitor}
          </span>
        </h2>
        <KeywordTable rows={result.keywords} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
          Principais páginas
        </h2>
        {result.pages.length === 0 ? (
          <p className="mt-3 rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 text-sm text-neutral-700">
            Nenhuma página ranqueada encontrada nos dados disponíveis para este
            país.
          </p>
        ) : (
          <ToolTable label="Principais páginas do concorrente" className="mt-3">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-brand-muted)]">
                  <th className="px-4 py-3 font-medium">URL</th>
                  <th className="px-4 py-3 font-medium">Tráfego</th>
                  <th className="px-4 py-3 font-medium">Palavras-chave</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {result.pages.map((row) => (
                  <tr key={row.url ?? ""}>
                    <td className="max-w-[420px] truncate px-4 py-3 align-top text-neutral-950">
                      {row.url ?? "—"}
                    </td>
                    <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                      {formatCount(row.traffic)}
                    </td>
                    <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                      {formatCount(row.keywords)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ToolTable>
        )}
      </section>

      <UpsellCard tool={TOOL} cta="Explorar mais palavras-chave do concorrente">
        {result.keywords.length > 0 ? (
          <>
            Mostrando {result.keywords.length}
            {result.totalKeywords !== null
              ? ` de ${formatCount(result.totalKeywords)}`
              : ""}{" "}
            {result.keywords.length === 1 && result.totalKeywords === null
              ? "palavra-chave ranqueada."
              : "palavras-chave ranqueadas."}{" "}
          </>
        ) : (
          <>
            Tente outro país ou concorrente para explorar mais dados de
            ranqueamento.{" "}
          </>
        )}
        No RE9 SEO, você vê mais palavras-chave do concorrente, filtra por
        volume de busca, dificuldade e posição e salva palavras-chave para
        aprofundar a pesquisa.
      </UpsellCard>
    </div>
  );
}
