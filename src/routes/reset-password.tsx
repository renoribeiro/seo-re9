import { useForm } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AuthPageCard,
  AuthPageShell,
  authRedirectSearchSchema,
} from "@/client/features/auth/AuthPage";
import { getFieldError, getFormError } from "@/client/lib/forms";
import { authClient } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { getSignInSearch, normalizeAuthRedirect } from "@/lib/auth-redirect";
import {
  HOSTED_PASSWORD_MAX_LENGTH,
  HOSTED_PASSWORD_MIN_LENGTH,
} from "@/lib/auth-options";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(
        HOSTED_PASSWORD_MIN_LENGTH,
        `A senha deve ter pelo menos ${HOSTED_PASSWORD_MIN_LENGTH} caracteres.`,
      )
      .max(
        HOSTED_PASSWORD_MAX_LENGTH,
        `A senha deve ter no máximo ${HOSTED_PASSWORD_MAX_LENGTH} caracteres.`,
      ),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

const resetPasswordSearchSchema = authRedirectSearchSchema.extend({
  error: z.string().optional(),
  token: z.string().optional(),
});

export const Route = createFileRoute("/reset-password")({
  validateSearch: resetPasswordSearchSchema,
  component: ResetPasswordPage,
});

function getResetPasswordErrorMessage(error: string | undefined) {
  switch ((error ?? "").toLowerCase()) {
    case "invalid_token":
      return "Este link de redefinição não é mais válido. Peça um novo para continuar.";
    case "token_expired":
      return "Este link de redefinição expirou. Peça um novo para continuar.";
    default:
      return error
        ? "Este link de redefinição não pode mais ser usado. Peça um novo e tente novamente."
        : null;
  }
}

function getResetPasswordPageCopy({
  isHostedMode,
  isComplete,
  routeError,
  hasToken,
}: {
  isHostedMode: boolean;
  isComplete: boolean;
  routeError: string | null;
  hasToken: boolean;
}) {
  if (!isHostedMode) {
    return {
      title: "Redefinir senha",
      helperText: "A redefinição de senha não está disponível no momento.",
    };
  }

  if (isComplete) {
    return {
      title: "Senha atualizada",
      helperText: "Sua senha foi atualizada. Entre com a nova senha.",
    };
  }

  if (routeError || !hasToken) {
    return {
      title: "Link de redefinição expirado",
      helperText:
        routeError ||
        "Este link de redefinição não é mais válido. Peça um novo para continuar.",
    };
  }

  return {
    title: "Redefinir senha",
    helperText: "Escolha uma nova senha para sua conta.",
  };
}

function ResetPasswordPage() {
  const search = Route.useSearch();
  const redirectTo = normalizeAuthRedirect(search.redirect);
  const isHostedMode = isHostedClientAuthMode();
  const routeError = getResetPasswordErrorMessage(search.error);
  const token = typeof search.token === "string" ? search.token : null;
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ formApi, value }) => {
      if (!token) {
        formApi.setErrorMap({
          onSubmit: {
            form: "Este link de redefinição não é mais válido. Peça um novo e tente novamente.",
            fields: {},
          },
        });
        return;
      }

      try {
        const result = await authClient.resetPassword({
          newPassword: value.password,
          token,
        });

        if (result.error) {
          formApi.setErrorMap({
            onSubmit: {
              form: "Este link de redefinição não é mais válido. Peça um novo e tente novamente.",
              fields: {},
            },
          });
          return;
        }
      } catch {
        formApi.setErrorMap({
          onSubmit: {
            form: "Não foi possível atualizar sua senha agora. Tente novamente.",
            fields: {},
          },
        });
      }
    },
  });

  return (
    <AuthPageShell>
      <form.Subscribe
        selector={(state) => ({
          isComplete: state.isSubmitSuccessful && !state.errorMap.onSubmit,
          submitError: state.errorMap.onSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ isComplete, submitError, isSubmitting }) => {
          const errorMessage = getFormError(submitError);
          const pageCopy = getResetPasswordPageCopy({
            isHostedMode,
            isComplete,
            routeError,
            hasToken: !!token,
          });

          return (
            <AuthPageCard
              title={pageCopy.title}
              helperText={pageCopy.helperText}
              footer={
                <p className="text-sm">
                  <Link
                    to="/sign-in"
                    search={getSignInSearch(redirectTo)}
                    className="text-base-content/50 hover:text-base-content transition-colors"
                  >
                    Entrar
                  </Link>
                </p>
              }
            >
              {!isHostedMode ? null : isComplete ? (
                <a
                  href={
                    redirectTo === "/"
                      ? "/sign-in"
                      : `/sign-in?redirect=${encodeURIComponent(redirectTo)}`
                  }
                  className="btn btn-soft w-full"
                >
                  Continuar para Entrar
                </a>
              ) : routeError || !token ? (
                <Link
                  to="/forgot-password"
                  search={getSignInSearch(redirectTo)}
                  className="btn btn-soft w-full"
                >
                  Pedir um novo link de redefinição
                </Link>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void form.handleSubmit();
                  }}
                >
                  <form.Field name="password">
                    {(field) => {
                      const error = getFieldError(field.state.meta.errors);

                      return (
                        <div>
                          <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Nova senha..."
                            value={field.state.value}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            autoComplete="new-password"
                            minLength={HOSTED_PASSWORD_MIN_LENGTH}
                            maxLength={HOSTED_PASSWORD_MAX_LENGTH}
                            required
                          />
                          {error ? (
                            <p className="mt-1 text-sm text-error">{error}</p>
                          ) : null}
                        </div>
                      );
                    }}
                  </form.Field>

                  <form.Field name="confirmPassword">
                    {(field) => {
                      const error = getFieldError(field.state.meta.errors);

                      return (
                        <div>
                          <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Confirme a nova senha..."
                            value={field.state.value}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            autoComplete="new-password"
                            minLength={HOSTED_PASSWORD_MIN_LENGTH}
                            maxLength={HOSTED_PASSWORD_MAX_LENGTH}
                            required
                          />
                          {error ? (
                            <p className="mt-1 text-sm text-error">{error}</p>
                          ) : null}
                        </div>
                      );
                    }}
                  </form.Field>

                  {errorMessage ? (
                    <p className="text-sm text-error">{errorMessage}</p>
                  ) : null}
                  <button
                    className="btn btn-soft w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Atualizando senha..." : "Atualizar senha"}
                  </button>
                </form>
              )}
            </AuthPageCard>
          );
        }}
      </form.Subscribe>
    </AuthPageShell>
  );
}
