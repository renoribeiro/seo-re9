import type { CsvValue } from "@/client/lib/csv";
import { INTENT_LABELS } from "@/client/features/keywords/components/IntentBadge";
import { KEYWORD_RESEARCH_HEADERS } from "@/client/features/keywords/state/keywordControllerActions";
import type { SavedKeywordRow } from "@/types/keywords";
import type { GetSavedKeywordsInput } from "@/types/schemas/keywords";

// Widened so a stored intent outside KeywordIntent falls back to its raw value.
const INTENT_LABEL_LOOKUP: Partial<Record<string, string>> = INTENT_LABELS;

export const SAVED_KEYWORD_PAGE_SIZES = [50, 100, 250] as const;
export const SAVED_KEYWORD_EXPORT_HEADERS = [
  ...KEYWORD_RESEARCH_HEADERS,
  "Tags",
  "Atualizado em",
];

export function savedKeywordExportRow(row: SavedKeywordRow): CsvValue[] {
  return [
    row.keyword,
    row.searchVolume ?? "",
    row.cpc ?? "",
    row.competition ?? "",
    row.keywordDifficulty ?? "",
    row.intent ? (INTENT_LABEL_LOOKUP[row.intent] ?? row.intent) : "",
    row.tags.map((tag) => tag.name).join(", "),
    row.fetchedAt ?? "",
  ];
}

export function toSavedKeywordSort(
  value: string | undefined,
): GetSavedKeywordsInput["sort"] {
  if (
    value === "keyword" ||
    value === "searchVolume" ||
    value === "cpc" ||
    value === "competition" ||
    value === "keywordDifficulty" ||
    value === "fetchedAt"
  ) {
    return value;
  }
  return "createdAt";
}

export function formatSavedKeywordNumber(value: number | null | undefined) {
  if (value == null) return "-";
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatSavedKeywordDate(value: string | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("pt-BR");
}
