import { errors as joseErrors } from "jose";
import { AppError } from "@/server/lib/errors";

// Maps a jwtVerify failure to the right AppError. Config mistakes (wrong
// POLICY_AUD, TEAM_DOMAIN pointing at the wrong team, unreachable JWKS) must
// surface as AUTH_CONFIG_MISSING with guidance — collapsing them into bare
// UNAUTHENTICATED puts self-hosters in a sign-in loop with no signal anywhere,
// since UNAUTHENTICATED is a non-reportable code. Token-level failures
// (expired, bad signature) stay UNAUTHENTICATED: re-authenticating fixes them.
export function classifyAccessVerificationError(error: unknown): AppError {
  if (error instanceof joseErrors.JWTExpired) {
    return new AppError("UNAUTHENTICATED");
  }

  if (error instanceof joseErrors.JWTClaimValidationFailed) {
    if (error.claim === "aud") {
      return new AppError(
        "AUTH_CONFIG_MISSING",
        "Token do Cloudflare Access rejeitado: audience incompatível. O POLICY_AUD não corresponde à AUD tag do seu aplicativo do Access — copie-a em Zero Trust -> Access controls -> Applications -> Configure -> Additional settings.",
      );
    }
    if (error.claim === "iss") {
      return new AppError(
        "AUTH_CONFIG_MISSING",
        "Token do Cloudflare Access rejeitado: emissor incompatível. O TEAM_DOMAIN não corresponde à equipe do Cloudflare que emitiu o token — confira com o domínio da sua equipe nas configurações do Zero Trust.",
      );
    }
    return new AppError("UNAUTHENTICATED");
  }

  if (
    error instanceof joseErrors.JWKSNoMatchingKey ||
    error instanceof joseErrors.JWKSInvalid ||
    error instanceof joseErrors.JWKSTimeout ||
    // The caller only classifies errors thrown by jwtVerify itself, so a
    // non-jose error can only come from the remote JWKS fetch (TypeError in
    // browsers/node, plain Error like "Network connection lost" in workerd).
    !(error instanceof joseErrors.JOSEError)
  ) {
    return new AppError(
      "AUTH_CONFIG_MISSING",
      "Não foi possível verificar o token do Cloudflare Access com as chaves de assinatura do TEAM_DOMAIN. Confira se o TEAM_DOMAIN é o domínio https://<team>.cloudflareaccess.com da sua equipe.",
    );
  }

  return new AppError("UNAUTHENTICATED");
}
