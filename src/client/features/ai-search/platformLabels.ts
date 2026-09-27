import type {
  PromptExplorerModel,
  WebSearchCountryCode,
} from "@/types/schemas/ai-search";

const MENTION_PLATFORM_LABELS: Record<"chat_gpt" | "google", string> = {
  chat_gpt: "ChatGPT",
  google: "Google AI Overview",
};

const MODEL_LABELS: Record<PromptExplorerModel, string> = {
  chat_gpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
  perplexity: "Perplexity",
};

/**
 * Per-model accent colors. Applied as left-border + dot on response cards so
 * the model header is unambiguously separated from the markdown content that
 * follows. Values are Tailwind color tokens that work in light + dark themes.
 */
type ModelAccent = {
  border: string;
  dot: string;
};

const MODEL_ACCENTS: Record<PromptExplorerModel, ModelAccent> = {
  chat_gpt: {
    border: "border-l-emerald-500",
    dot: "bg-emerald-500",
  },
  claude: {
    border: "border-l-orange-500",
    dot: "bg-orange-500",
  },
  gemini: {
    border: "border-l-sky-500",
    dot: "bg-sky-500",
  },
  perplexity: {
    border: "border-l-violet-500",
    dot: "bg-violet-500",
  },
};

export function formatPlatformLabel(platform: "chat_gpt" | "google"): string {
  return MENTION_PLATFORM_LABELS[platform];
}

/** Shared per-platform accent dot + short label for compact table/KPI rows. */
export const PLATFORM_DOT_CLASS: Record<"chat_gpt" | "google", string> = {
  chat_gpt: "bg-emerald-500",
  google: "bg-sky-500",
};

export const PLATFORM_SHORT_LABEL: Record<"chat_gpt" | "google", string> = {
  chat_gpt: "ChatGPT",
  google: "Google",
};

export function formatModelLabel(model: PromptExplorerModel): string {
  return MODEL_LABELS[model];
}

export function getModelAccent(model: PromptExplorerModel): ModelAccent {
  return MODEL_ACCENTS[model];
}

const COUNTRY_LABELS: Record<WebSearchCountryCode, string> = {
  US: "Estados Unidos",
  GB: "Reino Unido",
  CA: "Canadá",
  AU: "Austrália",
  IE: "Irlanda",
  DE: "Alemanha",
  FR: "França",
  ES: "Espanha",
  IT: "Itália",
  NL: "Países Baixos",
  PT: "Portugal",
  PL: "Polônia",
  SE: "Suécia",
  NO: "Noruega",
  DK: "Dinamarca",
  BR: "Brasil",
  MX: "México",
  IN: "Índia",
  JP: "Japão",
  KR: "Coreia do Sul",
  SG: "Singapura",
  HK: "Hong Kong",
  TW: "Taiwan",
  ZA: "África do Sul",
};

export function formatCountryLabel(code: WebSearchCountryCode): string {
  return COUNTRY_LABELS[code];
}

const NUMBER_FORMATTER = new Intl.NumberFormat("pt-BR");

/** Render a count for display. Null/undefined renders as an em-dash. */
export function formatCount(value: number | null | undefined): string {
  if (value == null) return "—";
  return NUMBER_FORMATTER.format(value);
}
