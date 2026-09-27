/**
 * The countries the free tools offer. Codes are DataForSEO location codes;
 * the language is the one DataForSEO expects for that market. The client only
 * ever sends a location code — the server derives the language from this list,
 * so an unknown code is rejected rather than passed through.
 */
export const TOOL_COUNTRIES = [
  { code: 2076, label: "Brasil", language: "pt" },
  { code: 2840, label: "Estados Unidos", language: "en" },
  { code: 2826, label: "Reino Unido", language: "en" },
  { code: 2124, label: "Canadá", language: "en" },
  { code: 2036, label: "Austrália", language: "en" },
  { code: 2276, label: "Alemanha", language: "de" },
  { code: 2250, label: "França", language: "fr" },
  { code: 2724, label: "Espanha", language: "es" },
  { code: 2356, label: "Índia", language: "en" },
  { code: 2528, label: "Países Baixos", language: "nl" },
] as const;

export const DEFAULT_COUNTRY_CODE = 2076;

export function countryLanguage(code: number): string | null {
  return (
    TOOL_COUNTRIES.find((country) => country.code === code)?.language ?? null
  );
}

export function countryLabel(code: number): string {
  return (
    TOOL_COUNTRIES.find((country) => country.code === code)?.label ??
    "Desconhecido"
  );
}
