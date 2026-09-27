import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCustomer } from "autumn-js/react";
import { useEffect, useState } from "react";
import { ArrowRight, Settings, User } from "lucide-react";
import { ThemePreferenceMenuItems } from "@/client/components/ThemePreferenceMenuItems";
import { captureClientEvent } from "@/client/lib/posthog";
import { signOutAndRedirect, useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { getSubscribeRouteState } from "@/client/features/billing/route-state";
import { getCustomerPlanStatus } from "@/client/features/billing/plan-detection";
import { normalizeAuthRedirect } from "@/lib/auth-redirect";
import { useCanManageBilling } from "@/client/features/team/organizationQueries";
import {
  AUTUMN_CHECKOUT_SESSION_PARAMS,
  AUTUMN_MANAGED_ACCESS_FEATURE_ID,
  AUTUMN_PAID_PLAN_ID,
} from "@/shared/billing";

const SUPPORT_EMAIL = "trafego@re9.online";

const PLAN_FEATURES = [
  "Pesquisa de palavras-chave, backlinks, monitoramento de posições e auditorias do site",
  "Servidor MCP e habilidades de agente para Claude, Cursor e ChatGPT",
  "Integração com o Google Search Console",
  "Inclui $10.00 em créditos de uso por mês",
];

// How long the post-checkout "finalizing" screen polls Autumn before giving
// up and letting the user through anyway.
const FINALIZING_TIMEOUT_MS = 30_000;

export const Route = createFileRoute("/_authenticated/subscribe")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { upgrade?: true; redirect?: string; checkout?: "success" } => ({
    upgrade:
      search.upgrade === true || search.upgrade === "true" ? true : undefined,
    redirect:
      typeof search.redirect === "string"
        ? normalizeAuthRedirect(search.redirect)
        : undefined,
    checkout: search.checkout === "success" ? "success" : undefined,
  }),
  component: SubscribePage,
});

function SubscribePage() {
  const navigate = useNavigate();
  const { upgrade: isUpgradeFlow, redirect, checkout } = Route.useSearch();
  const { data: session } = useSession();
  const [isAttaching, setIsAttaching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalizingTimedOut, setFinalizingTimedOut] = useState(false);
  const checkoutCompleted = checkout === "success";

  const hasSession = Boolean(session?.user?.id);
  const customerQuery = useCustomer({
    queryOptions: {
      enabled: hasSession,
    },
  });

  // Checkout is owner-only; other members hitting the paywall are pointed at
  // their organization owner instead of a Subscribe button that would 403.
  const canManageBilling = useCanManageBilling();

  // Read managed access from the already-loaded Autumn customer (local, no API
  // call) instead of a separate server round-trip. Self-hosted has no Autumn
  // customer, so mirror the server's "always granted" behavior there.
  const hasManagedAccess = isHostedClientAuthMode()
    ? customerQuery.check({ featureId: AUTUMN_MANAGED_ACCESS_FEATURE_ID })
        .allowed
    : true;

  const planStatus = getCustomerPlanStatus(customerQuery.data);
  const subscribeRouteState = getSubscribeRouteState({
    hasSession,
    isCustomerLoading: customerQuery.isLoading,
    isCustomerError: customerQuery.isError,
    hasManagedAccess,
    planStatus,
    isUpgradeFlow: isUpgradeFlow === true,
    checkoutCompleted,
    finalizingTimedOut,
  });

  // Autumn can lag Stripe by a few seconds after checkout; poll until the
  // subscription shows up so the just-paid user isn't shown the paywall again.
  const isFinalizing = subscribeRouteState === "finalizing";
  const { refetch: refetchCustomer } = customerQuery;
  useEffect(() => {
    if (!isFinalizing) return;
    const interval = setInterval(() => {
      void refetchCustomer();
    }, 2000);
    return () => clearInterval(interval);
  }, [refetchCustomer, isFinalizing]);

  // Armed once on landing with checkout=success (not on the finalizing state,
  // which a transient poll error can leave and re-enter) so the deadline is a
  // hard bound from arrival.
  useEffect(() => {
    if (!checkoutCompleted || finalizingTimedOut) return;
    const timeout = setTimeout(
      () => setFinalizingTimedOut(true),
      FINALIZING_TIMEOUT_MS,
    );
    return () => clearTimeout(timeout);
  }, [checkoutCompleted, finalizingTimedOut]);

  useEffect(() => {
    if (subscribeRouteState === "redirectToApp") {
      if (checkoutCompleted) {
        captureClientEvent("billing:checkout_success");
      }
      void navigate({ href: redirect ?? "/", replace: true });
    }
  }, [checkoutCompleted, navigate, redirect, subscribeRouteState]);

  useEffect(() => {
    if (subscribeRouteState === "showPaywall" && !isUpgradeFlow) {
      captureClientEvent("billing:paywall_viewed");
    }
  }, [isUpgradeFlow, subscribeRouteState]);

  if (
    subscribeRouteState === "loading" ||
    subscribeRouteState === "redirectToApp"
  ) {
    return null;
  }

  if (subscribeRouteState === "finalizing") {
    return (
      <div className="w-full max-w-xs space-y-4 text-center">
        <img
          src="/transparent-logo.png"
          alt="RE9 SEO"
          className="mx-auto size-10 rounded-lg"
        />
        <h1 className="text-xl font-semibold">
          Finalizando sua assinatura&hellip;
        </h1>
        <span className="loading loading-spinner loading-md" />
        <p className="text-sm text-base-content/60">
          Isso costuma levar alguns segundos.
        </p>
        <p className="text-xs text-base-content/50">
          Está demorando?{" "}
          <a className="link" href={`mailto:${SUPPORT_EMAIL}`}>
            Envie um e-mail para {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  if (subscribeRouteState === "error") {
    return (
      <div className="w-full max-w-xs space-y-4">
        <div className="text-center space-y-3">
          <img
            src="/transparent-logo.png"
            alt="RE9 SEO"
            className="mx-auto size-10 rounded-lg"
          />
          <h1 className="text-xl font-semibold">Cobrança indisponível</h1>
        </div>

        <p className="text-sm text-center text-base-content/70">
          {getStandardErrorMessage(
            customerQuery.error,
            "Não foi possível verificar sua situação de cobrança agora. Tente novamente.",
          )}
        </p>

        <button
          type="button"
          className="btn btn-soft w-full"
          onClick={() => {
            void customerQuery.refetch();
          }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  async function handleSubscribe() {
    setError(null);
    setIsAttaching(true);

    try {
      captureClientEvent("billing:checkout_start");
      const successUrl = new URL(window.location.href);
      successUrl.searchParams.set("checkout", "success");
      await customerQuery.attach({
        planId: AUTUMN_PAID_PLAN_ID,
        redirectMode: "always",
        successUrl: successUrl.toString(),
        checkoutSessionParams: AUTUMN_CHECKOUT_SESSION_PARAMS,
      });
    } catch (err) {
      setError(
        getStandardErrorMessage(
          err,
          "Não foi possível iniciar o pagamento. Tente novamente.",
        ),
      );
      setIsAttaching(false);
    }
  }

  const firstName = session?.user?.name?.split(" ")[0] || "";

  return (
    <div className="w-full max-w-sm space-y-6">
      <SubscribePageAccountMenu email={session?.user?.email} />

      <div className="text-center space-y-3">
        <img
          src="/transparent-logo.png"
          alt="RE9 SEO"
          className="mx-auto size-10 rounded-lg"
        />
        <h1 className="text-xl font-semibold">
          {isUpgradeFlow
            ? "Faça upgrade do seu plano"
            : firstName
              ? `Boas-vindas ao RE9 SEO, ${firstName}!`
              : "Boas-vindas ao RE9 SEO!"}
        </h1>
        <p className="text-sm text-base-content/60">
          SEO do seu jeito. Todas as suas ferramentas de SEO em um só lugar, por
          um preço justo.
        </p>
      </div>

      <div className="rounded-lg border border-base-300 p-5 space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-semibold">Plano Base</span>
          <span className="text-lg font-semibold tabular-nums">$10/mês</span>
        </div>

        <ul className="space-y-2">
          {PLAN_FEATURES.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-sm text-base-content/70"
            >
              <span className="text-base-content/40 mt-[2px] shrink-0">
                &mdash;
              </span>
              {item}
            </li>
          ))}
          {/* Sub-bullet of the Usage Credits line above. */}
          <li className="-mt-1 pl-6 text-xs">
            <a
              className="text-base-content/60 underline decoration-base-content/40 decoration-dotted underline-offset-4 transition-colors hover:text-base-content"
              href="https://openseo.so/pricing"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                captureClientEvent("billing:pricing_estimator_click")
              }
            >
              Quanto rendem os créditos de uso?{" "}
              <span aria-hidden="true">&#8599;</span>
            </a>
          </li>
        </ul>

        {error ? <p className="text-sm text-error">{error}</p> : null}

        {canManageBilling ? (
          <button
            className="btn btn-soft w-full"
            disabled={isAttaching}
            onClick={() => void handleSubscribe()}
          >
            {isAttaching ? "Redirecionando..." : "Assinar"}
          </button>
        ) : (
          <p className="text-sm text-base-content/60">
            Somente o proprietário da organização pode assinar. Peça a ele para
            fazer upgrade desta organização.
          </p>
        )}

        <p className="text-center text-xs text-base-content/50">
          <span
            className="tooltip before:max-w-60 before:whitespace-normal"
            data-tip={`Ainda não é para você? Envie um e-mail para ${SUPPORT_EMAIL} em até 30 dias após a cobrança e reembolsaremos sua assinatura.`}
          >
            <span className="cursor-help underline decoration-dotted">
              Garantia de reembolso de 30 dias
            </span>
          </span>
          . Cancele quando quiser. Pagamento processado pelo Stripe.
        </p>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-base-content/60">
          Dúvidas? Envie um e-mail para {SUPPORT_EMAIL}.
        </p>
        {isUpgradeFlow ? (
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-base-content/70 hover:text-base-content transition-colors"
            onClick={() => void navigate({ to: "/", replace: true })}
          >
            <ArrowRight className="size-3.5 rotate-180" />
            Voltar para o app
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SubscribePageAccountMenu({ email }: { email: string | undefined }) {
  if (!email) return null;

  const handleSignOut = () => signOutAndRedirect();

  return (
    <div className="fixed top-4 right-4">
      <div className="dropdown dropdown-end">
        <button
          type="button"
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          aria-label="Abrir menu da conta"
        >
          <User className="h-5 w-5" />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-20 menu mt-3 min-w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
        >
          <li className="menu-title max-w-full">
            <span className="truncate text-base-content" data-ph-mask>
              {email}
            </span>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </Link>
          </li>
          <ThemePreferenceMenuItems />
          <li>
            <button
              type="button"
              className="text-error"
              onClick={handleSignOut}
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
