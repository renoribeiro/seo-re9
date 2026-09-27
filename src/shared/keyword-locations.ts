/* eslint-disable max-lines -- country data table */
/**
 * Supported keyword-data countries and their data provider.
 *
 * Default provider is DataForSEO Labs (94 countries; source:
 * https://api.dataforseo.com/v3/dataforseo_labs/locations_and_languages).
 * Countries Labs does not cover are marked `googleAdsOnly` and are served by
 * the DataForSEO Keywords Data API (Google Ads endpoints), which covers the
 * full Google geotarget list — see specs/0004-keyword-data-source-routing.md.
 * Google-Ads-only rows have no keyword difficulty or search intent.
 *
 * For countries with multiple Google-supported languages, we pick the
 * language with the largest keyword corpus (the primary search market)
 * as the default. The APIs accept a single location_code + language_code
 * pair per request, so we expose one entry per country. Language codes for
 * googleAdsOnly entries must exist in BOTH the Google Ads and SERP language
 * lists (rank tracking shares this picker and uses the SERP API).
 *
 * Entries are sorted alphabetically by country name; pick US as the
 * product-wide default via DEFAULT_LOCATION_CODE below.
 */
export const DEFAULT_LOCATION_CODE = 2840;

/**
 * Human-readable form of a canonical DataForSEO location_name, whose segments
 * are comma-separated with inconsistent spacing ("Portland-Auburn, ME,United
 * States"). Trims each segment; `maxSegments` truncates for compact display
 * ("Enid, Oklahoma").
 */
export function formatLocationLabel(
  locationName: string,
  maxSegments?: number,
): string {
  const parts = locationName.split(",").map((part) => part.trim());
  return (maxSegments ? parts.slice(0, maxSegments) : parts).join(", ");
}

/**
 * shortLabel is a *display* label; the one entry that diverges from ISO
 * 3166-1 alpha-2 is the United Kingdom ("UK" reads better, ISO is "GB").
 */
const ISO_COUNTRY_OVERRIDES: Record<string, string> = { UK: "GB" };

/**
 * Lowercase ISO 3166-1 alpha-2 code for a country location_code — the format
 * DataForSEO's per-country endpoints (e.g. SERP locations) require.
 */
export function getIsoCountryCode(locationCode: number): string {
  const shortLabel =
    LOCATION_OPTIONS.find((option) => option.code === locationCode)
      ?.shortLabel ?? "US";
  return (ISO_COUNTRY_OVERRIDES[shortLabel] ?? shortLabel).toLowerCase();
}

type KeywordDataProvider = "labs" | "google_ads";

type LocationOption = {
  code: number;
  label: string;
  shortLabel: string;
  languageCode: string;
  /** Set when DataForSEO Labs does not support this country. */
  googleAdsOnly?: true;
};

export const LOCATION_OPTIONS: readonly LocationOption[] = [
  { code: 2710, label: "África do Sul", shortLabel: "ZA", languageCode: "en" },
  { code: 2008, label: "Albânia", shortLabel: "AL", languageCode: "sq" },
  { code: 2276, label: "Alemanha", shortLabel: "DE", languageCode: "de" },
  {
    code: 2020,
    label: "Andorra",
    shortLabel: "AD",
    languageCode: "ca",
    googleAdsOnly: true,
  },
  { code: 2024, label: "Angola", shortLabel: "AO", languageCode: "pt" },
  { code: 2682, label: "Arábia Saudita", shortLabel: "SA", languageCode: "ar" },
  { code: 2012, label: "Argélia", shortLabel: "DZ", languageCode: "fr" },
  { code: 2032, label: "Argentina", shortLabel: "AR", languageCode: "es" },
  { code: 2051, label: "Armênia", shortLabel: "AM", languageCode: "hy" },
  { code: 2036, label: "Austrália", shortLabel: "AU", languageCode: "en" },
  { code: 2040, label: "Áustria", shortLabel: "AT", languageCode: "de" },
  { code: 2031, label: "Azerbaijão", shortLabel: "AZ", languageCode: "az" },
  {
    code: 2044,
    label: "Bahamas",
    shortLabel: "BS",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2048, label: "Bahrein", shortLabel: "BH", languageCode: "ar" },
  { code: 2050, label: "Bangladesh", shortLabel: "BD", languageCode: "bn" },
  {
    code: 2052,
    label: "Barbados",
    shortLabel: "BB",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2056, label: "Bélgica", shortLabel: "BE", languageCode: "nl" },
  {
    code: 2084,
    label: "Belize",
    shortLabel: "BZ",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2068, label: "Bolívia", shortLabel: "BO", languageCode: "es" },
  {
    code: 2070,
    label: "Bósnia e Herzegovina",
    shortLabel: "BA",
    languageCode: "bs",
  },
  {
    code: 2072,
    label: "Botsuana",
    shortLabel: "BW",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2076, label: "Brasil", shortLabel: "BR", languageCode: "pt" },
  {
    code: 2096,
    label: "Brunei",
    shortLabel: "BN",
    languageCode: "ms",
    googleAdsOnly: true,
  },
  { code: 2100, label: "Bulgária", shortLabel: "BG", languageCode: "bg" },
  { code: 2854, label: "Burkina Faso", shortLabel: "BF", languageCode: "fr" },
  { code: 2120, label: "Camarões", shortLabel: "CM", languageCode: "fr" },
  { code: 2116, label: "Camboja", shortLabel: "KH", languageCode: "en" },
  { code: 2124, label: "Canadá", shortLabel: "CA", languageCode: "en" },
  {
    code: 2634,
    label: "Catar",
    shortLabel: "QA",
    languageCode: "ar",
    googleAdsOnly: true,
  },
  { code: 2398, label: "Cazaquistão", shortLabel: "KZ", languageCode: "ru" },
  { code: 2152, label: "Chile", shortLabel: "CL", languageCode: "es" },
  { code: 2196, label: "Chipre", shortLabel: "CY", languageCode: "el" },
  { code: 2170, label: "Colômbia", shortLabel: "CO", languageCode: "es" },
  { code: 2410, label: "Coreia do Sul", shortLabel: "KR", languageCode: "ko" },
  {
    code: 2384,
    label: "Costa do Marfim",
    shortLabel: "CI",
    languageCode: "fr",
  },
  { code: 2188, label: "Costa Rica", shortLabel: "CR", languageCode: "es" },
  { code: 2191, label: "Croácia", shortLabel: "HR", languageCode: "hr" },
  { code: 2208, label: "Dinamarca", shortLabel: "DK", languageCode: "da" },
  { code: 2818, label: "Egito", shortLabel: "EG", languageCode: "ar" },
  { code: 2222, label: "El Salvador", shortLabel: "SV", languageCode: "es" },
  {
    code: 2784,
    label: "Emirados Árabes Unidos",
    shortLabel: "AE",
    languageCode: "en",
  },
  { code: 2218, label: "Equador", shortLabel: "EC", languageCode: "es" },
  { code: 2703, label: "Eslováquia", shortLabel: "SK", languageCode: "sk" },
  { code: 2705, label: "Eslovênia", shortLabel: "SI", languageCode: "sl" },
  { code: 2724, label: "Espanha", shortLabel: "ES", languageCode: "es" },
  { code: 2840, label: "Estados Unidos", shortLabel: "US", languageCode: "en" },
  { code: 2233, label: "Estônia", shortLabel: "EE", languageCode: "et" },
  {
    code: 2231,
    label: "Etiópia",
    shortLabel: "ET",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2242,
    label: "Fiji",
    shortLabel: "FJ",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2608, label: "Filipinas", shortLabel: "PH", languageCode: "en" },
  { code: 2246, label: "Finlândia", shortLabel: "FI", languageCode: "fi" },
  { code: 2250, label: "França", shortLabel: "FR", languageCode: "fr" },
  { code: 2288, label: "Gana", shortLabel: "GH", languageCode: "en" },
  {
    code: 2268,
    label: "Geórgia",
    shortLabel: "GE",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2300, label: "Grécia", shortLabel: "GR", languageCode: "el" },
  { code: 2320, label: "Guatemala", shortLabel: "GT", languageCode: "es" },
  {
    code: 2831,
    label: "Guernsey",
    shortLabel: "GG",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2328,
    label: "Guiana",
    shortLabel: "GY",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2332,
    label: "Haiti",
    shortLabel: "HT",
    languageCode: "fr",
    googleAdsOnly: true,
  },
  {
    code: 2340,
    label: "Honduras",
    shortLabel: "HN",
    languageCode: "es",
    googleAdsOnly: true,
  },
  { code: 2344, label: "Hong Kong", shortLabel: "HK", languageCode: "zh-TW" },
  { code: 2348, label: "Hungria", shortLabel: "HU", languageCode: "hu" },
  {
    code: 2833,
    label: "Ilha de Man",
    shortLabel: "IM",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2356, label: "Índia", shortLabel: "IN", languageCode: "en" },
  { code: 2360, label: "Indonésia", shortLabel: "ID", languageCode: "id" },
  {
    code: 2368,
    label: "Iraque",
    shortLabel: "IQ",
    languageCode: "ar",
    googleAdsOnly: true,
  },
  { code: 2372, label: "Irlanda", shortLabel: "IE", languageCode: "en" },
  {
    code: 2352,
    label: "Islândia",
    shortLabel: "IS",
    languageCode: "is",
    googleAdsOnly: true,
  },
  { code: 2376, label: "Israel", shortLabel: "IL", languageCode: "he" },
  { code: 2380, label: "Itália", shortLabel: "IT", languageCode: "it" },
  {
    code: 2388,
    label: "Jamaica",
    shortLabel: "JM",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2392, label: "Japão", shortLabel: "JP", languageCode: "ja" },
  {
    code: 2832,
    label: "Jersey",
    shortLabel: "JE",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2400, label: "Jordânia", shortLabel: "JO", languageCode: "ar" },
  {
    code: 2414,
    label: "Kuwait",
    shortLabel: "KW",
    languageCode: "ar",
    googleAdsOnly: true,
  },
  {
    code: 2418,
    label: "Laos",
    shortLabel: "LA",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2428, label: "Letônia", shortLabel: "LV", languageCode: "lv" },
  {
    code: 2422,
    label: "Líbano",
    shortLabel: "LB",
    languageCode: "ar",
    googleAdsOnly: true,
  },
  {
    code: 2438,
    label: "Liechtenstein",
    shortLabel: "LI",
    languageCode: "de",
    googleAdsOnly: true,
  },
  { code: 2440, label: "Lituânia", shortLabel: "LT", languageCode: "lt" },
  {
    code: 2442,
    label: "Luxemburgo",
    shortLabel: "LU",
    languageCode: "fr",
    googleAdsOnly: true,
  },
  {
    code: 2807,
    label: "Macedônia do Norte",
    shortLabel: "MK",
    languageCode: "mk",
  },
  {
    code: 2450,
    label: "Madagascar",
    shortLabel: "MG",
    languageCode: "fr",
    googleAdsOnly: true,
  },
  { code: 2458, label: "Malásia", shortLabel: "MY", languageCode: "en" },
  {
    code: 2454,
    label: "Malawi",
    shortLabel: "MW",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2462,
    label: "Maldivas",
    shortLabel: "MV",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2470, label: "Malta", shortLabel: "MT", languageCode: "en" },
  { code: 2504, label: "Marrocos", shortLabel: "MA", languageCode: "ar" },
  {
    code: 2480,
    label: "Maurício",
    shortLabel: "MU",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2484, label: "México", shortLabel: "MX", languageCode: "es" },
  {
    code: 2104,
    label: "Mianmar (Birmânia)",
    shortLabel: "MM",
    languageCode: "en",
  },
  {
    code: 2508,
    label: "Moçambique",
    shortLabel: "MZ",
    languageCode: "pt",
    googleAdsOnly: true,
  },
  { code: 2498, label: "Moldávia", shortLabel: "MD", languageCode: "ro" },
  { code: 2492, label: "Mônaco", shortLabel: "MC", languageCode: "fr" },
  {
    code: 2496,
    label: "Mongólia",
    shortLabel: "MN",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2499,
    label: "Montenegro",
    shortLabel: "ME",
    languageCode: "sr",
    googleAdsOnly: true,
  },
  {
    code: 2516,
    label: "Namíbia",
    shortLabel: "NA",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2524,
    label: "Nepal",
    shortLabel: "NP",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2558, label: "Nicarágua", shortLabel: "NI", languageCode: "es" },
  { code: 2566, label: "Nigéria", shortLabel: "NG", languageCode: "en" },
  { code: 2578, label: "Noruega", shortLabel: "NO", languageCode: "nb" },
  { code: 2554, label: "Nova Zelândia", shortLabel: "NZ", languageCode: "en" },
  {
    code: 2512,
    label: "Omã",
    shortLabel: "OM",
    languageCode: "ar",
    googleAdsOnly: true,
  },
  { code: 2528, label: "Países Baixos", shortLabel: "NL", languageCode: "nl" },
  {
    code: 2275,
    label: "Palestina",
    shortLabel: "PS",
    languageCode: "ar",
    googleAdsOnly: true,
  },
  { code: 2591, label: "Panamá", shortLabel: "PA", languageCode: "es" },
  {
    code: 2598,
    label: "Papua-Nova Guiné",
    shortLabel: "PG",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2586, label: "Paquistão", shortLabel: "PK", languageCode: "en" },
  { code: 2600, label: "Paraguai", shortLabel: "PY", languageCode: "es" },
  { code: 2604, label: "Peru", shortLabel: "PE", languageCode: "es" },
  { code: 2616, label: "Polônia", shortLabel: "PL", languageCode: "pl" },
  { code: 2620, label: "Portugal", shortLabel: "PT", languageCode: "pt" },
  { code: 2404, label: "Quênia", shortLabel: "KE", languageCode: "en" },
  {
    code: 2417,
    label: "Quirguistão",
    shortLabel: "KG",
    languageCode: "ru",
    googleAdsOnly: true,
  },
  {
    code: 2826,
    label: "Reino Unido",
    shortLabel: "UK",
    languageCode: "en",
  },
  {
    code: 2214,
    label: "República Dominicana",
    shortLabel: "DO",
    languageCode: "es",
    googleAdsOnly: true,
  },
  { code: 2642, label: "Romênia", shortLabel: "RO", languageCode: "ro" },
  {
    code: 2646,
    label: "Ruanda",
    shortLabel: "RW",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2674,
    label: "San Marino",
    shortLabel: "SM",
    languageCode: "it",
    googleAdsOnly: true,
  },
  { code: 2686, label: "Senegal", shortLabel: "SN", languageCode: "fr" },
  { code: 2688, label: "Sérvia", shortLabel: "RS", languageCode: "sr" },
  { code: 2702, label: "Singapura", shortLabel: "SG", languageCode: "en" },
  { code: 2144, label: "Sri Lanka", shortLabel: "LK", languageCode: "en" },
  { code: 2752, label: "Suécia", shortLabel: "SE", languageCode: "sv" },
  { code: 2756, label: "Suíça", shortLabel: "CH", languageCode: "de" },
  {
    code: 2740,
    label: "Suriname",
    shortLabel: "SR",
    languageCode: "nl",
    googleAdsOnly: true,
  },
  { code: 2764, label: "Tailândia", shortLabel: "TH", languageCode: "th" },
  { code: 2158, label: "Taiwan", shortLabel: "TW", languageCode: "zh-TW" },
  {
    code: 2762,
    label: "Tajiquistão",
    shortLabel: "TJ",
    languageCode: "ru",
    googleAdsOnly: true,
  },
  {
    code: 2834,
    label: "Tanzânia",
    shortLabel: "TZ",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2203, label: "Tchéquia", shortLabel: "CZ", languageCode: "cs" },
  {
    code: 2780,
    label: "Trinidad e Tobago",
    shortLabel: "TT",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2788, label: "Tunísia", shortLabel: "TN", languageCode: "ar" },
  {
    code: 2795,
    label: "Turcomenistão",
    shortLabel: "TM",
    languageCode: "ru",
    googleAdsOnly: true,
  },
  { code: 2792, label: "Turquia", shortLabel: "TR", languageCode: "tr" },
  { code: 2804, label: "Ucrânia", shortLabel: "UA", languageCode: "uk" },
  {
    code: 2800,
    label: "Uganda",
    shortLabel: "UG",
    languageCode: "en",
    googleAdsOnly: true,
  },
  { code: 2858, label: "Uruguai", shortLabel: "UY", languageCode: "es" },
  {
    code: 2860,
    label: "Uzbequistão",
    shortLabel: "UZ",
    languageCode: "ru",
    googleAdsOnly: true,
  },
  { code: 2862, label: "Venezuela", shortLabel: "VE", languageCode: "es" },
  { code: 2704, label: "Vietnã", shortLabel: "VN", languageCode: "vi" },
  {
    code: 2894,
    label: "Zâmbia",
    shortLabel: "ZM",
    languageCode: "en",
    googleAdsOnly: true,
  },
  {
    code: 2716,
    label: "Zimbábue",
    shortLabel: "ZW",
    languageCode: "en",
    googleAdsOnly: true,
  },
] as const;

/**
 * Languages selectable for rank tracking, which runs against the DataForSEO
 * SERP (Google) API. This is the full set of language codes that API accepts;
 * source/refresh it from the live endpoint (auth required):
 *   GET https://api.dataforseo.com/v3/serp/google/languages
 * (Country list above comes from the sibling Labs endpoint cited at the top of
 * this file: /v3/dataforseo_labs/locations_and_languages.)
 *
 * `code` is the DataForSEO `language_code` (authoritative); `label` is its
 * `language_name`, lightly cleaned for display. Deviations from the raw
 * endpoint: the deprecated `iw` Hebrew alias and the redundant `no` are
 * dropped (Norway uses `nb`, which both SERP and Labs accept). Every country
 * default in LOCATION_OPTIONS must appear here so the picker can show it.
 *
 * This is the master list. Rank tracking (SERP) offers all of it for any
 * country; the Labs-backed project picker shows a per-country subset via
 * getLanguageOptions() below.
 */
export const SERP_LANGUAGE_OPTIONS = [
  { code: "af", label: "Africâner" },
  { code: "ak", label: "Akan" },
  { code: "sq", label: "Albanês" },
  { code: "de", label: "Alemão" },
  { code: "am", label: "Amárico" },
  { code: "ar", label: "Árabe" },
  { code: "hy", label: "Armênio" },
  { code: "az", label: "Azerbaijano" },
  { code: "ban", label: "Balinês" },
  { code: "eu", label: "Basco" },
  { code: "bem", label: "Bemba" },
  { code: "bn", label: "Bengali" },
  { code: "be", label: "Bielorrusso" },
  { code: "my", label: "Birmanês" },
  { code: "bs", label: "Bósnio" },
  { code: "bg", label: "Búlgaro" },
  { code: "kn", label: "Canarês" },
  { code: "ca", label: "Catalão" },
  { code: "kk", label: "Cazaque" },
  { code: "ceb", label: "Cebuano" },
  { code: "ny", label: "Chichewa" },
  { code: "zh-CN", label: "Chinês (simplificado)" },
  { code: "zh-TW", label: "Chinês (tradicional)" },
  { code: "si", label: "Cingalês" },
  { code: "ko", label: "Coreano" },
  { code: "ht", label: "Crioulo haitiano" },
  { code: "mfe", label: "Crioulo mauriciano" },
  { code: "crs", label: "Crioulo seichelense" },
  { code: "hr", label: "Croata" },
  { code: "ckb", label: "Curdo" },
  { code: "da", label: "Dinamarquês" },
  { code: "sk", label: "Eslovaco" },
  { code: "sl", label: "Esloveno" },
  { code: "es", label: "Espanhol" },
  { code: "es-419", label: "Espanhol (América Latina)" },
  { code: "et", label: "Estoniano" },
  { code: "ee", label: "Ewe" },
  { code: "fo", label: "Feroês" },
  { code: "fil", label: "Filipino" },
  { code: "fi", label: "Finlandês" },
  { code: "fr", label: "Francês" },
  { code: "fy", label: "Frísio" },
  { code: "gaa", label: "Ga" },
  { code: "gl", label: "Galego" },
  { code: "cy", label: "Galês" },
  { code: "ka", label: "Georgiano" },
  { code: "el", label: "Grego" },
  { code: "gu", label: "Guzerate" },
  { code: "ha", label: "Hauçá" },
  { code: "he", label: "Hebraico" },
  { code: "hi", label: "Hindi" },
  { code: "nl", label: "Holandês" },
  { code: "hu", label: "Húngaro" },
  { code: "ig", label: "Igbo" },
  { code: "id", label: "Indonésio" },
  { code: "en", label: "Inglês" },
  { code: "yo", label: "Iorubá" },
  { code: "ga", label: "Irlandês" },
  { code: "is", label: "Islandês" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "Japonês" },
  { code: "km", label: "Khmer" },
  { code: "rw", label: "Kinyarwanda" },
  { code: "rn", label: "Kirundi" },
  { code: "kg", label: "Kongo" },
  { code: "kri", label: "Krio" },
  { code: "lo", label: "Laosiano" },
  { code: "lv", label: "Letão" },
  { code: "ln", label: "Lingala" },
  { code: "lt", label: "Lituano" },
  { code: "loz", label: "Lozi" },
  { code: "lg", label: "Luganda" },
  { code: "ach", label: "Luo" },
  { code: "mk", label: "Macedônio" },
  { code: "ml", label: "Malaiala" },
  { code: "ms", label: "Malaio" },
  { code: "mg", label: "Malgaxe" },
  { code: "mt", label: "Maltês" },
  { code: "mi", label: "Maori" },
  { code: "mr", label: "Marati" },
  { code: "mn", label: "Mongol" },
  { code: "ne", label: "Nepalês" },
  { code: "nb", label: "Norueguês (Bokmål)" },
  { code: "nyn", label: "Nyankole" },
  { code: "om", label: "Oromo" },
  { code: "ps", label: "Pashto" },
  { code: "fa", label: "Persa (farsi)" },
  { code: "pcm", label: "Pidgin" },
  { code: "pl", label: "Polonês" },
  { code: "pt", label: "Português" },
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "pt-PT", label: "Português (Portugal)" },
  { code: "pa", label: "Punjabi" },
  { code: "qu", label: "Quíchua" },
  { code: "ky", label: "Quirguiz" },
  { code: "rm", label: "Romanche" },
  { code: "ro", label: "Romeno" },
  { code: "ru", label: "Russo" },
  { code: "sr", label: "Sérvio" },
  { code: "sr-Latn", label: "Sérvio (latino)" },
  { code: "sr-ME", label: "Sérvio (Montenegro)" },
  { code: "st", label: "Sesotho" },
  { code: "sn", label: "Shona" },
  { code: "sd", label: "Sindi" },
  { code: "so", label: "Somali" },
  { code: "nso", label: "Sotho do Norte" },
  { code: "sw", label: "Suaíli" },
  { code: "sv", label: "Sueco" },
  { code: "tg", label: "Tadjique" },
  { code: "tl", label: "Tagalo" },
  { code: "th", label: "Tailandês" },
  { code: "ta", label: "Tâmil" },
  { code: "cs", label: "Tcheco" },
  { code: "te", label: "Telugo" },
  { code: "ti", label: "Tigrínia" },
  { code: "to", label: "Tonganês" },
  { code: "lua", label: "Tshiluba" },
  { code: "tn", label: "Tswana" },
  { code: "tum", label: "Tumbuka" },
  { code: "tr", label: "Turco" },
  { code: "tk", label: "Turcomeno" },
  { code: "uk", label: "Ucraniano" },
  { code: "ur", label: "Urdu" },
  { code: "uz", label: "Uzbeque" },
  { code: "vi", label: "Vietnamita" },
  { code: "wo", label: "Wolof" },
  { code: "xh", label: "Xhosa" },
  { code: "zu", label: "Zulu" },
] as const;
/** Countries usable by DataForSEO Labs features (domain overview etc.). */
export const LABS_LOCATION_OPTIONS = LOCATION_OPTIONS.filter(
  (option) => !option.googleAdsOnly,
);

const LOCATION_CODES = new Set<number>(
  LOCATION_OPTIONS.map((option) => option.code),
);

const LABS_LOCATION_CODES = new Set<number>(
  LABS_LOCATION_OPTIONS.map((option) => option.code),
);

export const LOCATIONS: Record<number, string> = Object.fromEntries(
  LOCATION_OPTIONS.map((option) => [option.code, option.shortLabel]),
);

const LOCATION_LANGUAGE: Record<number, string> = Object.fromEntries(
  LOCATION_OPTIONS.map((option) => [option.code, option.languageCode]),
);

const SUPPORTED_LANGUAGE_CODES = new Set<string>(
  SERP_LANGUAGE_OPTIONS.map((language) => language.code),
);

export function getLanguageCode(locationCode: number): string {
  return LOCATION_LANGUAGE[locationCode] ?? "en";
}

/**
 * Resolves a request's market against the project's default. The pair is
 * resolved together: overriding only the location snaps the language to that
 * location's default language, because the project's language was chosen for
 * the project's own location and may not be valid — or sensible — for the
 * override (e.g. a Vietnam project querying Germany must not default to
 * Vietnamese).
 */
export function resolveMarket(
  args: { locationCode?: number; languageCode?: string },
  project: { locationCode: number; languageCode: string },
): { locationCode: number; languageCode: string } {
  const locationCode = args.locationCode ?? project.locationCode;
  const languageCode =
    args.languageCode ??
    (locationCode === project.locationCode
      ? project.languageCode
      : getLanguageCode(locationCode));
  return { locationCode, languageCode };
}

/**
 * Whether DataForSEO serves this language for this location. Only Labs
 * locations have authoritative per-location language lists; Google Ads
 * locations are left to the metering safety net.
 */
export function isLanguageServedForLocation(
  locationCode: number,
  languageCode: string,
): boolean {
  if (getKeywordDataProvider(locationCode) !== "labs") return true;
  return getLanguageOptions(locationCode).some(
    (option) => option.code === languageCode,
  );
}

/**
 * Resolves the market for a Labs-only tool. Same as resolveMarket, except a
 * project default Labs cannot serve is replaced by the United States: the
 * caller never chose that market, so rejecting the call would dead-end on a
 * value it can't see — and passing the pair through would spend credits on a
 * task DataForSEO rejects. An explicit location is left alone, so a caller that
 * names an unserved country still fails loudly on its own assert.
 */
export function resolveLabsMarket(
  args: { locationCode?: number; languageCode?: string },
  project: { locationCode: number; languageCode: string },
): { locationCode: number; languageCode: string } {
  const projectIsServed =
    getKeywordDataProvider(project.locationCode) === "labs" &&
    isLanguageServedForLocation(project.locationCode, project.languageCode);

  return resolveMarket(
    args,
    projectIsServed
      ? project
      : { locationCode: DEFAULT_LOCATION_CODE, languageCode: "en" },
  );
}

/**
 * Language codes DataForSEO accepts — the master SERP_LANGUAGE_OPTIONS list.
 * Callers (e.g. MCP tools) can pass an arbitrary `language_code`; an
 * unsupported one is otherwise rejected by DataForSEO as an opaque *charged*
 * "Invalid Field: 'language_code'." failure, so we validate against this set
 * first (cost 0).
 */
export function isSupportedLanguageCode(languageCode: string): boolean {
  return SUPPORTED_LANGUAGE_CODES.has(languageCode);
}

/**
 * Countries where DataForSEO offers more than one language, from the Labs
 * locations_and_languages endpoint (each country's default is included).
 * Every other country offers just its single default (see getLanguageOptions);
 * googleAdsOnly countries have no per-country language data, so they fall back
 * to the default too. Keep each list's codes present in SERP_LANGUAGE_OPTIONS.
 */
const MULTI_LANGUAGE_LOCATIONS: Record<number, readonly string[]> = {
  2012: ["ar", "fr"], // Algeria
  2056: ["de", "fr", "nl"], // Belgium
  2124: ["en", "fr"], // Canada
  2196: ["el", "en"], // Cyprus
  2300: ["el", "en"], // Greece
  2344: ["en", "zh-TW"], // Hong Kong
  2356: ["en", "hi"], // India
  2360: ["en", "id"], // Indonesia
  2376: ["ar", "he"], // Israel
  2458: ["en", "ms"], // Malaysia
  2504: ["ar", "fr"], // Morocco
  2586: ["en", "ur"], // Pakistan
  2608: ["en", "tl"], // Philippines
  2702: ["en", "zh-CN"], // Singapore
  2756: ["de", "fr", "it"], // Switzerland
  2784: ["ar", "en"], // United Arab Emirates
  2804: ["ru", "uk"], // Ukraine
  2818: ["ar", "en"], // Egypt
  2840: ["en", "es"], // United States
  2704: ["en", "vi"], // Vietnam
};

/**
 * Languages to offer for a location. Restricts the global SERP_LANGUAGE_OPTIONS
 * list to the languages DataForSEO supports for that country, so a picker
 * isn't a wall of irrelevant options.
 */
export function getLanguageOptions(
  locationCode: number,
): readonly (typeof SERP_LANGUAGE_OPTIONS)[number][] {
  const codes = new Set(
    MULTI_LANGUAGE_LOCATIONS[locationCode] ?? [getLanguageCode(locationCode)],
  );
  return SERP_LANGUAGE_OPTIONS.filter((language) => codes.has(language.code));
}

/**
 * The language to send to the keyword-data APIs (Labs / Google Ads) for a
 * market whose language was chosen for the SERP API. SERP serves any language
 * in any country — rank tracking relies on that — but the keyword-data APIs
 * only serve a country's own languages and reject anything else as an opaque
 * *charged* "Invalid Field: 'language_code'." task failure. Falls back to the
 * country's default language.
 */
export function resolveKeywordDataLanguage(
  locationCode: number,
  languageCode: string,
): string {
  return getLanguageOptions(locationCode).some(
    (option) => option.code === languageCode,
  )
    ? languageCode
    : getLanguageCode(locationCode);
}

export function isSupportedLocationCode(locationCode: number): boolean {
  return LOCATION_CODES.has(locationCode);
}

export function isLabsLocationCode(locationCode: number): boolean {
  return LABS_LOCATION_CODES.has(locationCode);
}

/**
 * Which DataForSEO API serves keyword data for this location. Unknown codes
 * fall back to Labs so behavior for arbitrary codes is unchanged (Labs
 * rejects unsupported locations with its own error).
 */
export function getKeywordDataProvider(
  locationCode: number,
): KeywordDataProvider {
  return LOCATION_CODES.has(locationCode) &&
    !LABS_LOCATION_CODES.has(locationCode)
    ? "google_ads"
    : "labs";
}
