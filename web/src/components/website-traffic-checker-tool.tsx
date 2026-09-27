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

const TOOL = "website-traffic-checker";

type KeywordRow = {
  keyword: string | null;
  searchVolume: number | null;
  position: number | null;
  url: string | null;
};

type PageRow = {
  url: string | null;
  traffic: number | null;
  keywords: number | null;
};

type DomainTraffic = {
  domain: string;
  organicTraffic: number | null;
  organicKeywords: number | null;
  trafficValue: number | null;
  topKeywords: KeywordRow[];
  topPages: PageRow[];
  totalPages: number | null;
};

type TrafficResult = {
  locationCode: number;
  primary: DomainTraffic;
  comparison: DomainTraffic | null;
};

export function WebsiteTrafficCheckerTool() {
  const [target, setTarget] = useState("");
  const [compare, setCompare] = useState("");
  const [locationCode, setLocationCode] = useState(DEFAULT_COUNTRY_CODE);
  const { status, errorMessage, result, run } = useToolRun<TrafficResult>(
    TOOL,
    "/api/website-traffic-checker",
  );

  return (
    <div>
      <ToolForm
        onSubmit={run}
        input={{ target, compare: compare.trim() || undefined, locationCode }}
        status={status}
        errorMessage={errorMessage}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <FieldLabel htmlFor="traffic-target">Domínio</FieldLabel>
            <input
              id="traffic-target"
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
              className={`mt-1 ${FIELD_CLASS}`}
            />
          </div>
          <div>
            <FieldLabel htmlFor="traffic-compare">
              Comparar com (opcional)
            </FieldLabel>
            <input
              id="traffic-compare"
              name="compare"
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              value={compare}
              onChange={(e) => setCompare(e.target.value)}
              placeholder="concorrente.com.br"
              disabled={status === "loading"}
              className={`mt-1 ${FIELD_CLASS}`}
            />
          </div>
          <div>
            <FieldLabel htmlFor="traffic-country">País</FieldLabel>
            <div className="mt-1">
              <CountrySelect
                id="traffic-country"
                value={locationCode}
                onChange={setLocationCode}
                disabled={status === "loading"}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <SubmitButton status={status} idleLabel="Verificar tráfego" />
        </div>
      </ToolForm>

      {status === "done" && result ? (
        <div className="mt-6 space-y-8">
          {result.comparison ? (
            <section>
              <h2 className="text-lg font-semibold text-neutral-950">
                Comparação de domínios
              </h2>
              <ToolTable
                label="Comparação de tráfego entre domínios"
                className="mt-3"
              >
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-subtle)]">
                      <th scope="col" className="px-4 py-3 font-medium">
                        Métrica
                      </th>
                      <th
                        scope="col"
                        className="max-w-[240px] break-words px-4 py-3 font-medium"
                      >
                        {result.primary.domain}
                      </th>
                      <th
                        scope="col"
                        className="max-w-[240px] break-words px-4 py-3 font-medium"
                      >
                        {result.comparison.domain}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)]">
                    {[
                      {
                        label: "Visitas estimadas / mês",
                        key: "organicTraffic" as const,
                        format: formatCount,
                      },
                      {
                        label: "Palavras-chave orgânicas",
                        key: "organicKeywords" as const,
                        format: formatCount,
                      },
                      {
                        label: "Valor do tráfego / mês",
                        key: "trafficValue" as const,
                        format: formatMoney,
                      },
                      {
                        label: "Páginas ranqueadas",
                        key: "totalPages" as const,
                        format: formatCount,
                      },
                    ].map(({ label, key, format }) => (
                      <tr key={key}>
                        <th
                          scope="row"
                          className="px-4 py-3 font-normal text-neutral-700"
                        >
                          {label}
                        </th>
                        <td className="px-4 py-3 font-semibold tabular-nums">
                          {format(result.primary[key])}
                        </td>
                        <td className="px-4 py-3 font-semibold tabular-nums">
                          {format(result.comparison?.[key])}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ToolTable>
              <p className="mt-2 text-xs text-[var(--color-brand-muted)]">
                O tráfego é estimado a partir das posições. O valor do tráfego
                estima o custo mensal de cliques equivalentes no Google Ads.
              </p>
            </section>
          ) : null}
          <DomainReport
            data={result.primary}
            showMetrics={!result.comparison}
          />
          {result.comparison ? (
            <DomainReport data={result.comparison} showMetrics={false} />
          ) : null}
          <UpsellCard tool={TOOL} cta="Explorar mais palavras-chave e páginas">
            A verificação gratuita mostra as 5 principais palavras-chave e
            páginas por domínio. No RE9 SEO, você vê mais palavras-chave e
            páginas, filtra os resultados e salva palavras-chave para o
            monitoramento de posições.
          </UpsellCard>
        </div>
      ) : null}
    </div>
  );
}

function DomainReport({
  data,
  showMetrics = true,
}: {
  data: DomainTraffic;
  showMetrics?: boolean;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
        <span className="text-[var(--color-brand-accent)]">{data.domain}</span>
      </h2>

      {showMetrics ? (
        <div className="mt-3">
          <MetricGrid
            metrics={[
              {
                label: "Tráfego orgânico / mês",
                value: formatCount(data.organicTraffic),
                tip: "Visitas orgânicas mensais estimadas pela DataForSEO, calculadas a partir das palavras-chave em que este domínio ranqueia e do volume de busca delas. É uma estimativa, não dados de analytics.",
              },
              {
                label: "Palavras-chave orgânicas",
                value: formatCount(data.organicKeywords),
                tip: "Quantas palavras-chave deste domínio aparecem entre os 100 primeiros resultados orgânicos do país selecionado.",
              },
              {
                label: "Valor do tráfego",
                value: formatMoney(data.trafficValue),
                tip: "Quanto esse tráfego orgânico custaria por mês se fosse comprado no Google Ads, com os CPCs atuais.",
              },
              {
                label: "Páginas ranqueadas",
                value: formatCount(data.totalPages),
                tip: "Quantas páginas deste domínio ranqueiam para pelo menos uma palavra-chave no país selecionado.",
              },
            ]}
          />
        </div>
      ) : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ToolTable label={`Principais palavras-chave de ${data.domain}`}>
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-brand-muted)]">
                <th className="px-4 py-3 font-medium">Palavra-chave</th>
                <th className="px-4 py-3 font-medium">Volume</th>
                <th className="px-4 py-3 font-medium">Posição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {data.topKeywords.map((row) => (
                <tr key={row.keyword ?? row.url ?? ""}>
                  <td className="max-w-[240px] px-4 py-3 align-top">
                    <p className="truncate font-medium text-neutral-950">
                      {row.keyword ?? "—"}
                    </p>
                    {row.url ? (
                      <p className="truncate text-xs text-[var(--color-brand-muted)]">
                        {row.url}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                    {formatCount(row.searchVolume)}
                  </td>
                  <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                    {formatCount(row.position)}
                  </td>
                </tr>
              ))}
              {data.topKeywords.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-4 text-sm text-neutral-700"
                  >
                    Nenhuma palavra-chave ranqueada encontrada para este país.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </ToolTable>

        <ToolTable label={`Principais páginas de ${data.domain}`}>
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-brand-muted)]">
                <th className="px-4 py-3 font-medium">Página</th>
                <th className="px-4 py-3 font-medium">Tráfego</th>
                <th className="px-4 py-3 font-medium">Palavras-chave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)]">
              {data.topPages.map((row) => (
                <tr key={row.url ?? ""}>
                  <td className="max-w-[240px] truncate px-4 py-3 align-top text-neutral-950">
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
              {data.topPages.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-4 text-sm text-neutral-700"
                  >
                    Nenhuma página ranqueada encontrada para este país.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </ToolTable>
      </div>
    </section>
  );
}
