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
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
});

export const Route = createFileRoute("/forgot-password")({
  validateSearch: authRedirectSearchSchema,
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const search = Route.useSearch();
  const redirectTo = normalizeAuthRedirect(search.redirect);
  const isHostedMode = isHostedClientAuthMode();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ formApi, value }) => {
      try {
        const redirectUrl = new URL("/reset-password", window.location.origin);
        if (redirectTo !== "/")
          redirectUrl.searchParams.set("redirect", redirectTo);
        const result = await authClient.requestPasswordReset({
          email: value.email.trim(),
          redirectTo: redirectUrl.toString(),
        });

        if (result.error) {
          formApi.setErrorMap({
            onSubmit: {
              form:
                result.error.message ||
                "Não foi possível enviar o e-mail de redefinição.",
              fields: {},
            },
          });
          return;
        }
      } catch {
        formApi.setErrorMap({
          onSubmit: {
            form: "Não foi possível enviar o e-mail de redefinição agora. Tente novamente.",
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
          isSuccess: state.isSubmitSuccessful && !state.errorMap.onSubmit,
          submittedEmail: state.values.email,
          submitError: state.errorMap.onSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ isSuccess, submittedEmail, submitError, isSubmitting }) => {
          const errorMessage = getFormError(submitError);

          return (
            <AuthPageCard
              title={isSuccess ? "Confira seu e-mail" : "Esqueci minha senha"}
              helperText={
                isSuccess
                  ? `Se existir uma conta para ${submittedEmail}, enviamos um link de redefinição.`
                  : isHostedMode
                    ? "Informe seu e-mail e enviaremos um link para redefinir sua senha."
                    : "A redefinição de senha não está disponível no momento."
              }
              footer={
                <p className="text-sm">
                  <Link
                    to="/sign-in"
                    search={getSignInSearch(redirectTo)}
                    className="text-base-content/50 hover:text-base-content transition-colors"
                  >
                    Voltar para Entrar
                  </Link>
                </p>
              }
            >
              {isSuccess ? (
                <div className="alert alert-success">
                  <span>
                    Se existir uma conta com esse e-mail, você vai receber as
                    instruções para redefinir a senha em instantes.
                  </span>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void form.handleSubmit();
                  }}
                >
                  <form.Field name="email">
                    {(field) => {
                      const error = getFieldError(field.state.meta.errors);

                      return (
                        <div>
                          <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Endereço de e-mail..."
                            value={field.state.value}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            autoComplete="email"
                            disabled={!isHostedMode}
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
                    disabled={!isHostedMode || isSubmitting}
                  >
                    {isSubmitting
                      ? "Enviando link..."
                      : "Enviar link de redefinição"}
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
