import { buildCsv, type CsvValue } from "@/client/lib/csv";
import type { CategoryTab, LighthouseIssue } from "./types";

const ISSUE_HEADERS = [
  "Categoria",
  "Gravidade",
  "Pontuação",
  "Título",
  "Valor exibido",
  "Descrição",
  "Impacto (ms)",
  "Impacto (bytes)",
  "Itens afetados",
];

const SEVERITY_LABELS: Record<LighthouseIssue["severity"], string> = {
  critical: "Crítico",
  warning: "Alerta",
  info: "Informativo",
};

export function severityLabel(severity: LighthouseIssue["severity"]) {
  return SEVERITY_LABELS[severity];
}

const CATEGORY_LABELS: Record<CategoryTab, string> = {
  all: "Todas",
  performance: "Desempenho",
  accessibility: "Acessibilidade",
  "best-practices": "Boas práticas",
  seo: "SEO",
};

function issuesToRows(issues: LighthouseIssue[]): CsvValue[][] {
  return issues.map((issue) => [
    categoryLabel(issue.category),
    severityLabel(issue.severity),
    issue.score ?? "",
    issue.title,
    issue.displayValue ?? "",
    issue.description ?? "",
    issue.impactMs ?? "",
    issue.impactBytes ?? "",
    issue.items.length,
  ]);
}

export function issuesToTable(issues: LighthouseIssue[]) {
  return { headers: ISSUE_HEADERS, rows: issuesToRows(issues) };
}

export function categoryLabel(category: CategoryTab) {
  return CATEGORY_LABELS[category];
}

export function issuesToCsv(issues: LighthouseIssue[]) {
  return buildCsv(ISSUE_HEADERS, issuesToRows(issues));
}
