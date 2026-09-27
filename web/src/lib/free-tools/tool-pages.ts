import { FREE_TOOL_PATHS } from "@/lib/free-tools/free-tool-paths";

export type FreeToolSlug = keyof typeof FREE_TOOL_PATHS;

export type FreeTool = {
  slug: FreeToolSlug;
  path: string;
  name: string;
  shortDescription: string;
  /** The paid feature this tool is the free sample of. */
  featureHref: string;
  related: FreeToolSlug[];
};

// Spend ceilings deliberately live in spend.ts, not here — this file is
// marketing copy, and a copy edit must not be able to move a spend control.

export const freeTools = {
  "backlink-checker": {
    slug: "backlink-checker",
    path: FREE_TOOL_PATHS["backlink-checker"],
    name: "Verificador de backlinks",
    shortDescription:
      "Domain Rank, domínios de referência e os principais backlinks que apontam para qualquer site.",
    featureHref: "/features/backlink-checker",
    related: ["spam-score-checker", "website-traffic-checker"],
  },
  "competitor-keyword-finder": {
    slug: "competitor-keyword-finder",
    path: FREE_TOOL_PATHS["competitor-keyword-finder"],
    name: "Localizador de palavras-chave de concorrentes",
    shortDescription:
      "Descubra as principais palavras-chave orgânicas de um concorrente, com volume de busca, posições e páginas ranqueadas.",
    featureHref: "/features/domain-overview",
    related: [
      "keyword-generator",
      "competitor-analysis",
      "website-traffic-checker",
    ],
  },
  "keyword-generator": {
    slug: "keyword-generator",
    path: FREE_TOOL_PATHS["keyword-generator"],
    name: "Gerador de palavras-chave",
    shortDescription:
      "Transforme um tema em ideias de palavras-chave com estimativas de volume de busca e dificuldade.",
    featureHref: "/features/keyword-research",
    related: [
      "competitor-keyword-finder",
      "competitor-analysis",
      "serp-simulator",
    ],
  },
  "website-traffic-checker": {
    slug: "website-traffic-checker",
    path: FREE_TOOL_PATHS["website-traffic-checker"],
    name: "Verificador de tráfego de sites",
    shortDescription:
      "Tráfego orgânico estimado, número de palavras-chave, principais palavras-chave e principais páginas de qualquer domínio.",
    featureHref: "/features/domain-overview",
    related: [
      "competitor-analysis",
      "competitor-keyword-finder",
      "backlink-checker",
    ],
  },
  "competitor-analysis": {
    slug: "competitor-analysis",
    path: FREE_TOOL_PATHS["competitor-analysis"],
    name: "Análise de concorrentes",
    shortDescription:
      "As principais palavras-chave e páginas de um concorrente e as palavras-chave em que ele ranqueia e você não.",
    featureHref: "/features/domain-overview",
    related: [
      "website-traffic-checker",
      "competitor-keyword-finder",
      "backlink-checker",
    ],
  },
  "spam-score-checker": {
    slug: "spam-score-checker",
    path: FREE_TOOL_PATHS["spam-score-checker"],
    name: "Verificador de spam score",
    shortDescription:
      "O spam score dos backlinks de um domínio e os links mais suspeitos que apontam para ele.",
    featureHref: "/features/backlink-checker",
    related: ["backlink-checker", "domain-age-checker"],
  },
  "domain-age-checker": {
    slug: "domain-age-checker",
    path: FREE_TOOL_PATHS["domain-age-checker"],
    name: "Verificador de idade de domínio",
    shortDescription:
      "Descubra quando um domínio foi registrado, quando expira e qual registrador ele usa.",
    featureHref: "/features/domain-overview",
    related: ["backlink-checker", "website-traffic-checker"],
  },
  "serp-simulator": {
    slug: "serp-simulator",
    path: FREE_TOOL_PATHS["serp-simulator"],
    name: "Simulador de SERP",
    shortDescription:
      "Veja como seu título e sua descrição aparecem nos resultados de busca no desktop e no mobile.",
    featureHref: "/features/site-audit",
    related: [
      "competitor-keyword-finder",
      "competitor-analysis",
      "website-traffic-checker",
    ],
  },
} satisfies Record<FreeToolSlug, FreeTool>;

/** Registry order drives the hub and the footer column. */
export const freeToolList: FreeTool[] = Object.values(freeTools);
