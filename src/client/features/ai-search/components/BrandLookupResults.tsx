import { Info } from "lucide-react";
import { BrandLookupMentionTrendCard } from "@/client/features/ai-search/components/BrandLookupMentionTrendCard";
import { BrandLookupShareOfVoice } from "@/client/features/ai-search/components/BrandLookupShareOfVoice";
import { CitationTabsCard } from "@/client/features/ai-search/components/BrandLookupCitationsCard";
import {
  formatCount,
  formatPlatformLabel,
  PLATFORM_DOT_CLASS,
} from "@/client/features/ai-search/platformLabels";
import type { BrandLookupResult } from "@/types/schemas/ai-search";
import { RESEARCH_SCOPE_LABELS } from "@/shared/researchScope";

type Props = {
  result: BrandLookupResult;
  projectId: string;
};

type PlatformRow = BrandLookupResult["perPlatform"][number];
type MetricKey = "mentions" | "aiSearchVolume";

const DOMAIN_LEVEL_TIP =
  "Os provedores de busca com IA informam menções por domínio, não por página. Este número cobre o domínio inteiro — as páginas citadas abaixo se limitam ao seu escopo.";

const TARGET_TYPE_LABELS: Record<
  BrandLookupResult["detectedTargetType"],
  string
> = {
  domain: "domínio",
  keyword: "marca",
};

/**
 * Marks a metric that could not be narrowed to a URL scope, so a page-scoped
 * lookup never reads as if the number belonged to that page.
 */
function DomainLevelBadge() {
  return (
    <span
      className="tooltip badge badge-ghost badge-sm shrink-0 normal-case"
      data-tip={DOMAIN_LEVEL_TIP}
    >
      Domínio inteiro
    </span>
  );
}

export function BrandLookupResults({ result, projectId }: Props) {
  if (!result.hasData) {
    const erroredPlatforms = result.perPlatform.filter(
      (p) => p.status === "error",
    );
    const allPlatformsErrored =
      erroredPlatforms.length === result.perPlatform.length &&
      result.perPlatform.length > 0;

    if (allPlatformsErrored) {
      return (
        <div className="rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm">
          Os dados de menções em IA estão temporariamente indisponíveis para{" "}
          <strong>{result.resolvedTarget}</strong>. Tente novamente em
          instantes.
        </div>
      );
    }
    return (
      <div className="space-y-3">
        <div className="rounded-lg border border-info/30 bg-info/10 p-4 text-sm">
          Nenhuma menção em IA encontrada para{" "}
          <strong>{result.resolvedTarget}</strong>.
        </div>
        {erroredPlatforms.length > 0 ? (
          <p className="text-xs text-base-content/60">
            Observação:{" "}
            {erroredPlatforms
              .map((p) => formatPlatformLabel(p.platform))
              .join(" e ")}{" "}
            {erroredPlatforms.length === 1
              ? "estava indisponível"
              : "estavam indisponíveis"}{" "}
            — algumas menções podem estar faltando.
          </p>
        ) : null}
      </div>
    );
  }

  const hasTrendData = result.monthlyVolume.length > 0;
  const sov = result.shareOfVoice;

  return (
    <div className="space-y-4">
      <BrandHeader result={result} />

      {/* One shared grid so the cards align by construction: stats left, trend
          right, Share of Voice flowing into the next free half-width cell —
          whichever of trend/SoV is absent, the rest stay column-aligned. A
          lone stats card keeps full width instead of half a grid. */}
      <div
        className={
          hasTrendData || sov ? "grid gap-4 lg:grid-cols-2" : undefined
        }
      >
        <StatsCard result={result} />
        {hasTrendData ? <MentionTrendCard result={result} /> : null}
        {sov ? (
          <BrandLookupShareOfVoice
            shareOfVoice={sov}
            isDomainLevel={result.aggregatesAreDomainLevel}
          />
        ) : null}
      </div>

      <CitationTabsCard result={result} projectId={projectId} />
    </div>
  );
}

function BrandHeader({ result }: { result: BrandLookupResult }) {
  return (
    <section className="flex flex-wrap items-baseline justify-between gap-2">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="text-3xl font-semibold tracking-tight">
          {result.resolvedTarget}
        </h2>
        <span className="badge badge-ghost badge-sm">
          {TARGET_TYPE_LABELS[result.detectedTargetType]}
        </span>
        {result.scope ? (
          <span className="badge badge-ghost badge-sm">
            {RESEARCH_SCOPE_LABELS[result.scope]}
          </span>
        ) : null}
      </div>
      <p className="text-xs text-base-content/50">
        Atualizado {formatRelative(result.fetchedAt)}
      </p>
    </section>
  );
}

function StatsCard({ result }: { result: BrandLookupResult }) {
  return (
    <section className="rounded-xl border border-base-300 bg-base-100">
      <div className="flex h-full flex-col divide-y divide-base-200">
        <StatBlock
          label="Menções"
          tooltip="Estimativa de quantas respostas de IA mostraram a marca ou o domínio buscado no texto da resposta ou nas fontes citadas."
          value={result.totalMentions}
          perPlatform={result.perPlatform}
          metric="mentions"
          isDomainLevel={result.aggregatesAreDomainLevel}
        />
        <StatBlock
          label="Volume de busca em IA"
          tooltip="Demanda mensal estimada de buscas para prompts em que a marca ou o domínio buscado aparece em respostas de IA. É a demanda dos prompts, não o número de menções."
          value={result.totalAiSearchVolume}
          perPlatform={result.perPlatform}
          metric="aiSearchVolume"
          isDomainLevel={result.aggregatesAreDomainLevel}
        />
      </div>
    </section>
  );
}

function StatBlock({
  label,
  tooltip,
  value,
  perPlatform,
  metric,
  isDomainLevel,
}: {
  label: string;
  tooltip: string;
  value: number | null;
  perPlatform: PlatformRow[];
  metric: MetricKey;
  isDomainLevel: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center p-4">
      <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-base-content/50">
        {label}
        <span className="tooltip inline-flex normal-case" data-tip={tooltip}>
          <Info className="size-3 text-base-content/40" />
        </span>
        {isDomainLevel ? <DomainLevelBadge /> : null}
      </p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">
        {formatCount(value)}
      </p>
      <div className="mt-3 space-y-1 border-t border-base-200 pt-2.5">
        {perPlatform.map((row) => (
          <PlatformStatRow key={row.platform} row={row} metric={metric} />
        ))}
      </div>
    </div>
  );
}

function PlatformStatRow({
  row,
  metric,
}: {
  row: PlatformRow;
  metric: MetricKey;
}) {
  const value = row.status === "error" ? null : row[metric];

  return (
    <div className="flex items-center justify-between text-xs">
      <span className="inline-flex items-center gap-1.5 text-base-content/70">
        <span
          className={`size-1.5 rounded-full ${PLATFORM_DOT_CLASS[row.platform]}`}
        />
        {formatPlatformLabel(row.platform)}
        {row.platform === "chat_gpt" ? (
          <span
            className="tooltip z-20 inline-flex"
            data-tip="O DataForSEO indexa menções do ChatGPT apenas em inglês dos EUA — a seleção de país não está disponível para esta plataforma."
          >
            <Info className="size-3 text-base-content/40" />
          </span>
        ) : null}
        {row.status === "error" ? (
          <span className="text-error">indisponível</span>
        ) : null}
      </span>
      <span className="font-medium tabular-nums text-base-content/90">
        {formatCount(value)}
      </span>
    </div>
  );
}

function MentionTrendCard({ result }: { result: BrandLookupResult }) {
  return (
    <section className="overflow-hidden rounded-xl border border-base-300 bg-base-100">
      <div className="flex items-center justify-between gap-2 border-b border-base-300 px-4 py-3">
        <h3 className="text-sm font-semibold">
          Tendência de menções (últimos 12 meses)
        </h3>
        {result.aggregatesAreDomainLevel ? <DomainLevelBadge /> : null}
      </div>
      <div className="p-4">
        <BrandLookupMentionTrendCard result={result} />
      </div>
    </section>
  );
}

function formatRelative(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "agora mesmo";

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `há ${diffHr} h`;
  const diffDay = Math.floor(diffHr / 24);
  return `há ${diffDay} d`;
}
