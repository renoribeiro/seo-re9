import type { BacklinksTab } from "@/types/schemas/backlinks";
import type { BacklinksOverviewData } from "./backlinksPageTypes";

export const TAB_DESCRIPTIONS: Record<BacklinksTab, string> = {
  backlinks:
    "Veja cada link que aponta para o seu alvo, com página de origem, texto âncora e sinais de qualidade do link.",
  domains:
    "Veja os domínios únicos que apontam para o seu alvo, agrupados por site em vez de por link individual.",
  pages:
    "Veja quais páginas do site-alvo atraem mais backlinks e domínios de referência.",
};

export function buildSummaryStats(data: BacklinksOverviewData | undefined) {
  if (!data) return [];

  return [
    {
      label: "Backlinks",
      value: formatNumber(data.summary.backlinks),
      description: "Total de links que apontam para este site ou página.",
    },
    {
      label: "Domínios de referência",
      value: formatNumber(data.summary.referringDomains),
      description: "Domínios únicos que apontam para este site ou página.",
    },
    {
      label: "Páginas de referência",
      value: formatNumber(data.summary.referringPages),
      description: "Páginas únicas que apontam para este site ou página.",
    },
    {
      label: "Autoridade",
      value: formatNumber(data.summary.rank),
      description: "Pontuação de autoridade de 0 a 100 da DataForSEO.",
    },
    {
      label: "Pontuação de spam dos backlinks",
      value: formatDecimal(data.summary.backlinksSpamScore),
      description: "Risco estimado de spam dos links que apontam para cá.",
    },
    {
      label: "Backlinks quebrados",
      value: formatNumber(data.summary.brokenBacklinks),
      description: "Links que apontam para páginas quebradas daqui.",
    },
    {
      label: "Páginas quebradas",
      value: formatNumber(data.summary.brokenPages),
      description: "Páginas quebradas daqui que ainda recebem backlinks.",
    },
    {
      label: "Pontuação de spam do alvo",
      value: formatDecimal(data.summary.targetSpamScore),
      description: "Risco estimado de spam deste site ou página.",
    },
  ];
}

export function formatNumber(value: number | null | undefined) {
  if (value == null) return "-";
  return new Intl.NumberFormat("pt-BR").format(Math.round(value));
}

export function formatDecimal(value: number | null | undefined) {
  if (value == null) return "-";
  const digits = value >= 100 ? 0 : 1;
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatTooltipValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") return value;
  return "-";
}

export function formatCompactDate(value: string | null | undefined) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("pt-BR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMonthLabel(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("pt-BR", {
    month: "short",
    year: "2-digit",
  });
}

export function formatRelativeTimestamp(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "recentemente";
  return parsed.toLocaleString("pt-BR", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function extractUrlPath(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return url;
  }
}

const ELLIPSIS = "...";

export function truncateMiddle(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  if (maxLength <= ELLIPSIS.length)
    return value.slice(0, Math.max(maxLength, 0));
  const sideLength = Math.floor((maxLength - ELLIPSIS.length) / 2);
  if (sideLength <= 0) {
    return `${value.slice(0, maxLength - ELLIPSIS.length)}${ELLIPSIS}`;
  }
  return `${value.slice(0, sideLength)}${ELLIPSIS}${value.slice(-sideLength)}`;
}
