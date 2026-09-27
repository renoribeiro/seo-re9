import { FREE_MAX_AUDIT_PAGES } from "@/shared/audit-limits";
import { isErrorCode, type ErrorCode } from "@/shared/error-codes";

const STANDARD_MESSAGES: Record<ErrorCode, string> = {
  UNAUTHENTICATED: "Entre na sua conta e tente novamente.",
  AUTH_CONFIG_MISSING:
    "A autenticação do RE9 SEO não está configurada. Siga os passos de configuração do README para o Cloudflare Access.",
  PAYMENT_REQUIRED: "É necessária uma assinatura ativa para usar o RE9 SEO.",
  INSUFFICIENT_CREDITS:
    "Seus créditos acabaram. Adicione mais créditos ou faça upgrade do seu plano para continuar.",
  FORBIDDEN: "Você não tem acesso a este recurso.",
  NOT_FOUND: "O recurso solicitado não foi encontrado.",
  AUDIT_CAPACITY_REACHED:
    "Você atingiu o limite de auditorias da sua conta. Exclua auditorias antigas dos seus projetos para iniciar uma nova.",
  AUDIT_PAGE_LIMIT_EXCEEDED: `As auditorias do plano gratuito são limitadas a ${FREE_MAX_AUDIT_PAGES} páginas. Faça upgrade para rodar auditorias maiores.`,
  AUDIT_ALREADY_RUNNING:
    "Você atingiu o limite de auditorias em execução ao mesmo tempo. Aguarde uma terminar ou exclua-a antes de iniciar outra.",
  VALIDATION_ERROR: "Confira os dados informados e tente novamente.",
  CRAWL_TARGET_BLOCKED:
    "Este destino de rastreamento está bloqueado pela política de segurança.",
  BACKLINKS_BILLING_ISSUE:
    "A conta da DataForSEO conectada tem um problema de cobrança ou saldo.",
  AI_SEARCH_BILLING_ISSUE:
    "A conta da DataForSEO conectada tem um problema de cobrança ou saldo.",
  DATAFORSEO_AUTH_FAILED:
    "A DataForSEO rejeitou a chave de API. Verifique se DATAFORSEO_API_KEY é o base64 do seu login:senha da DataForSEO.",
  RATE_LIMITED: "Muitas solicitações. Aguarde e tente novamente.",
  UPSTREAM_UNAVAILABLE:
    "O provedor de dados está temporariamente indisponível. Tente novamente em instantes.",
  CONFLICT: "Esta solicitação entra em conflito com dados existentes.",
  INTERNAL_ERROR:
    "Ocorreu um erro inesperado. Confira os logs do servidor e tente novamente.",
};

// Setup errors cross the wire as "CODE: detail" (see toClientError) so the
// user sees the server's specific guidance while code-driven UI (error cards,
// redirects) still keys off the code.
function splitCodedMessage(
  message: string,
): { code: ErrorCode; detail: string } | null {
  const separatorIndex = message.indexOf(": ");
  if (separatorIndex === -1) return null;
  const code = message.slice(0, separatorIndex);
  if (!isErrorCode(code)) return null;
  return { code, detail: message.slice(separatorIndex + 2) };
}

export function getStandardErrorMessage(
  error: unknown,
  fallback: string = STANDARD_MESSAGES.INTERNAL_ERROR,
): string {
  if (!(error instanceof Error)) return fallback;
  if (isErrorCode(error.message)) return STANDARD_MESSAGES[error.message];
  const coded = splitCodedMessage(error.message);
  if (coded) return coded.detail;
  if (error.message) return error.message;
  return fallback;
}

export function getErrorCode(error: unknown): ErrorCode | null {
  if (!(error instanceof Error)) return null;
  if (isErrorCode(error.message)) return error.message;
  return splitCodedMessage(error.message)?.code ?? null;
}
