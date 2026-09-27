import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { AUDIT_ISSUE_TYPES } from "@/shared/audit-issues";

import {
  formatCount,
  formatCtr,
  formatPosition,
} from "@/client/features/search-performance/SearchPerformanceColumns";
import { getSearchPerformanceReport } from "@/serverFunctions/searchPerformance";
import {
  CardShell,
  EmptyCardBody,
  formatDay,
  moreDetailsClass,
  newLost,
  PercentDelta,
  Stat,
} from "@/client/features/dashboard/cardParts";
import type {
  DashboardAuditSummary,
  DashboardBacklinkSummary,
} from "@/server/features/dashboard/services/DashboardService";

// Plain string-keyed view of the registry: issue types from the DB are not
// statically guaranteed to be registry keys.
const issueTitles: Record<string, string | undefined> = Object.fromEntries(
  Object.entries(AUDIT_ISSUE_TYPES).map(([key, value]) => [key, value.title]),
);

export function GscCard({
  projectId,
  connected,
}: {
  projectId: string;
  connected: boolean;
}) {
  const reportQuery = useQuery({
    queryKey: ["dashboardGscReport", projectId],
    queryFn: () =>
      getSearchPerformanceReport({
        data: { projectId, dateRange: "last_28_days" },
      }),
    enabled: connected,
  });

  // Not connected (or a dead grant discovered by the report call): the
  // connection card sells and runs the whole flow itself.
  if (!connected || (reportQuery.data && !reportQuery.data.connected)) {
    return (
      <div id="connect-gsc">
        <SearchConsoleConnectionCard projectId={projectId} />
      </div>
    );
  }

  const report = reportQuery.data;

  return (
    <CardShell
      title="Desempenho na busca"
      stamp="Google Search Console · últimos 28 dias"
      action={
        <Link
          to="/p/$projectId/search-performance"
          params={{ projectId }}
          className={moreDetailsClass}
        >
          Mais detalhes
        </Link>
      }
    >
      {reportQuery.isPending ? (
        <div className="grid grid-cols-2 gap-3" aria-busy>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="skeleton h-20" />
          ))}
        </div>
      ) : reportQuery.isError ? (
        <p className="text-sm text-base-content/60">
          Não foi possível carregar os dados do Search Console. Tente novamente
          em breve.
        </p>
      ) : report?.connected ? (
        <div className="grid grid-cols-2 gap-3">
          <Stat
            label="Cliques"
            value={formatCount(report.totals.clicks)}
            sub={
              <PercentDelta
                current={report.totals.clicks}
                previous={report.prevTotals.clicks}
              />
            }
          />
          <Stat
            label="Impressões"
            value={formatCount(report.totals.impressions)}
            sub={
              <PercentDelta
                current={report.totals.impressions}
                previous={report.prevTotals.impressions}
              />
            }
          />
          <Stat label="CTR" value={formatCtr(report.totals.ctr)} />
          <Stat
            label="Posição média"
            value={formatPosition(report.totals.position)}
          />
        </div>
      ) : null}
    </CardShell>
  );
}

export function AuditHealthCard({
  projectId,
  audit,
}: {
  projectId: string;
  audit: DashboardAuditSummary | null;
}) {
  if (!audit) {
    return (
      <CardShell title="Auditoria do site">
        <EmptyCardBody
          message="Rastreie seu site em busca de links quebrados, tags ausentes e problemas de indexação."
          cta={
            <Link
              to="/p/$projectId/audit"
              params={{ projectId }}
              className="btn btn-primary btn-sm"
            >
              Fazer uma auditoria
            </Link>
          }
        />
      </CardShell>
    );
  }

  return (
    <CardShell
      title="Auditoria do site"
      stamp={`Auditoria do site · ${
        audit.status === "completed"
          ? `${audit.pagesCrawled.toLocaleString("pt-BR")} ${audit.pagesCrawled === 1 ? "página rastreada" : "páginas rastreadas"} · ${formatDay(audit.startedAt)}`
          : audit.status === "running"
            ? "rastreamento em andamento"
            : "o último rastreamento falhou"
      }`}
      action={
        <Link
          to="/p/$projectId/audit"
          params={{ projectId }}
          className={moreDetailsClass}
        >
          Mais detalhes
        </Link>
      }
    >
      {audit.topIssues.length === 0 ? (
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <Check className="size-4 text-success" />
          Nenhum problema encontrado — seu site parece saudável.
        </div>
      ) : (
        <ul className="space-y-2">
          {audit.topIssues.map((issue) => (
            <li
              key={issue.issueType}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className={`size-2 shrink-0 rounded-full ${
                    issue.severity === "critical"
                      ? "bg-error"
                      : issue.severity === "warning"
                        ? "bg-warning"
                        : "bg-base-content/30"
                  }`}
                />
                <span className="truncate">
                  {issueTitles[issue.issueType] ?? issue.issueType}
                </span>
              </span>
              <span className="shrink-0 tabular-nums text-base-content/60">
                {issue.count.toLocaleString("pt-BR")}{" "}
                {issue.count === 1 ? "página" : "páginas"}
              </span>
            </li>
          ))}
          {audit.totalIssueTypes > audit.topIssues.length ? (
            <li className="text-xs text-base-content/50">
              + {audit.totalIssueTypes - audit.topIssues.length}{" "}
              {audit.totalIssueTypes - audit.topIssues.length === 1
                ? "outro problema"
                : "outros problemas"}
            </li>
          ) : null}
        </ul>
      )}
    </CardShell>
  );
}

export function BacklinkPulseCard({
  projectId,
  backlinks,
  refreshing,
}: {
  projectId: string;
  backlinks: DashboardBacklinkSummary | null;
  refreshing: boolean;
}) {
  if (!backlinks && refreshing) {
    return (
      <CardShell
        title="Pulso de backlinks"
        stamp="Capturando o primeiro registro…"
      >
        <div className="grid grid-cols-2 gap-3" aria-busy>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="skeleton h-20" />
          ))}
        </div>
      </CardShell>
    );
  }

  if (!backlinks) {
    return (
      <CardShell title="Pulso de backlinks">
        <p className="text-sm text-base-content/60">
          Vamos registrar quem aponta links para o seu domínio — sem nada para
          configurar.
        </p>
      </CardShell>
    );
  }

  return (
    <CardShell
      title="Pulso de backlinks"
      stamp={`Backlinks · capturado em ${formatDay(backlinks.capturedAt)}${
        refreshing ? " · atualizando…" : ""
      }`}
      action={
        <Link
          to="/p/$projectId/backlinks"
          params={{ projectId }}
          search={{ target: backlinks.domain, scope: "domain" }}
          className={moreDetailsClass}
        >
          Mais detalhes
        </Link>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <Stat
          label="Domínios de ref."
          value={
            backlinks.referringDomains === null
              ? "—"
              : backlinks.referringDomains.toLocaleString("pt-BR")
          }
        />
        <Stat
          label="Backlinks"
          value={
            backlinks.backlinks === null
              ? "—"
              : backlinks.backlinks.toLocaleString("pt-BR")
          }
        />
        <Stat
          label="Links novos"
          value={`▲ ${newLost(backlinks.newBacklinks)}`}
          tone={
            backlinks.newBacklinks && backlinks.newBacklinks > 0
              ? "success"
              : undefined
          }
        />
        <Stat
          label="Links perdidos"
          value={`▼ ${newLost(backlinks.lostBacklinks)}`}
          tone={
            backlinks.lostBacklinks && backlinks.lostBacklinks > 0
              ? "error"
              : undefined
          }
        />
      </div>
    </CardShell>
  );
}
