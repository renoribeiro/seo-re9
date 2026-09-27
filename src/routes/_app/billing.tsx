import { createFileRoute, notFound } from "@tanstack/react-router";
import { useCustomer } from "autumn-js/react";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import { useCanManageBilling } from "@/client/features/team/organizationQueries";
import { captureClientEvent } from "@/client/lib/posthog";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { buildCheckoutSuccessUrl } from "@/client/features/billing/checkout-url";
import { BillingUsageChart } from "@/client/features/billing/BillingUsageChart";
import { BillingFeatureBreakdown } from "@/client/features/billing/BillingFeatureBreakdown";
import { parseTopUpAmount } from "@/client/features/billing/HostedBillingContentUtils";
import { getBillingRouteState } from "@/client/features/billing/route-state";
import { getCustomerPlanStatus } from "@/client/features/billing/plan-detection";
import {
  AUTUMN_CHECKOUT_SESSION_PARAMS,
  AUTUMN_PAID_PLAN_ID,
  BILLING_ROUTE,
  AUTUMN_SEO_DATA_BALANCE_FEATURE_ID,
  LOW_CREDITS_THRESHOLD_USD,
  AUTUMN_SEO_DATA_CREDITS_PER_USD,
  AUTUMN_SEO_DATA_TOP_UP_PLAN_ID,
  AUTUMN_SEO_DATA_TOPUP_BALANCE_FEATURE_ID,
  autumnSeoDataCreditsToUsd,
} from "@/shared/billing";

export const Route = createFileRoute("/_app/billing")({
  beforeLoad: () => {
    if (!isHostedClientAuthMode()) {
      throw notFound();
    }
  },
  component: BillingPage,
});

function BillingPage() {
  const { data: session, isPending: isSessionPending } = useSession();
  const [topUpAmount, setTopUpAmount] = useState("20");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const customerQuery = useCustomer({
    queryOptions: {
      enabled: Boolean(session?.user?.id),
    },
  });

  // Subscription changes are owner-only; other members see balances but are
  // pointed at the owner instead of checkout (the server enforces this too).
  const canManageBilling = useCanManageBilling();

  const planStatus = getCustomerPlanStatus(customerQuery.data);
  const isFreePlan = planStatus === "free";
  const billingRouteState = getBillingRouteState({
    hasSession: Boolean(session?.user?.id),
    isSessionPending,
    isCustomerLoading: customerQuery.isLoading,
    isCustomerError: customerQuery.isError,
  });

  const monthlyRemaining = autumnSeoDataCreditsToUsd(
    customerQuery.data?.balances?.[AUTUMN_SEO_DATA_BALANCE_FEATURE_ID]
      ?.remaining ?? 0,
  );
  const topUpRemaining = autumnSeoDataCreditsToUsd(
    customerQuery.data?.balances?.[AUTUMN_SEO_DATA_TOPUP_BALANCE_FEATURE_ID]
      ?.remaining ?? 0,
  );
  const totalRemaining = monthlyRemaining + topUpRemaining;

  const { isValid: isValidTopUp, parsed: parsedTopUpAmount } =
    parseTopUpAmount(topUpAmount);

  if (billingRouteState === "loading") {
    return null;
  }

  if (billingRouteState === "error") {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-4 p-4 py-10 md:p-6 md:py-12">
        <h1 className="text-xl font-semibold">Cobrança indisponível</h1>
        <p className="text-sm text-base-content/70">
          {getStandardErrorMessage(
            customerQuery.error,
            "Não foi possível carregar os dados de cobrança agora. Tente novamente.",
          )}
        </p>
        <button
          type="button"
          className="btn btn-soft btn-sm"
          onClick={() => {
            void customerQuery.refetch();
          }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  function startUpgradeCheckout() {
    captureClientEvent("billing:checkout_start");
    return customerQuery.attach({
      planId: AUTUMN_PAID_PLAN_ID,
      redirectMode: "always",
      successUrl: buildCheckoutSuccessUrl(BILLING_ROUTE),
      checkoutSessionParams: AUTUMN_CHECKOUT_SESSION_PARAMS,
    });
  }

  async function runAction(
    callback: () => Promise<unknown>,
    fallbackMessage: string,
  ) {
    setError(null);
    setIsPending(true);
    try {
      await callback();
      await customerQuery.refetch();
    } catch (err) {
      setError(getStandardErrorMessage(err, fallbackMessage));
    } finally {
      setIsPending(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-base-content/50">
          Redirecionando para o Stripe...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5 p-4 py-10 md:p-6 md:py-12">
      <h1 className="text-xl font-semibold">Cobrança</h1>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Subscription card */}
        <div className="flex flex-col justify-between rounded-lg border border-base-300 bg-base-100 p-4 gap-4">
          <div>
            <div className="text-2xl font-semibold tabular-nums">
              ${totalRemaining.toFixed(2)}{" "}
              <span className="text-sm font-normal text-base-content/50">
                restantes
              </span>
            </div>
            {!isFreePlan ? (
              <div className="mt-1 flex gap-3 text-xs text-base-content/50">
                <span className="tabular-nums">
                  Mensal ${monthlyRemaining.toFixed(2)}
                </span>
                <span>&middot;</span>
                <span className="tabular-nums">
                  Recargas ${topUpRemaining.toFixed(2)}
                </span>
              </div>
            ) : null}
            {totalRemaining <= 0 ? (
              <p className="mt-2 text-xs text-error">
                Você usou todos os seus créditos.{" "}
                {isFreePlan
                  ? "Faça upgrade do plano para continuar."
                  : "Compre mais créditos abaixo para continuar."}
              </p>
            ) : totalRemaining < LOW_CREDITS_THRESHOLD_USD ? (
              <p className="mt-2 text-xs text-amber-600">
                Seus créditos estão acabando.{" "}
                {isFreePlan
                  ? "Faça upgrade para receber $10/mês."
                  : "Compre mais créditos abaixo."}
              </p>
            ) : null}
          </div>

          <div className="text-sm">
            <span className="font-medium">Plano</span>{" "}
            <span className="text-base-content/50">
              {isFreePlan ? "Plano gratuito" : "Plano Base"}
            </span>
          </div>

          {!canManageBilling ? (
            <p className="border-t border-base-300 pt-3 text-sm text-base-content/60">
              Somente o proprietário da organização pode mudar o plano ou
              comprar créditos. Fale com ele se precisar de mais.
            </p>
          ) : isFreePlan ? (
            <div className="space-y-3 border-t border-base-300 pt-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium">Plano Base</span>
                <span className="text-sm font-medium tabular-nums">
                  $10/mês
                </span>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Acesso a todos os recursos do RE9 SEO",
                  "Inclui $10.00 em créditos de uso por mês",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-xs text-base-content/60"
                  >
                    <span className="text-base-content/30 mt-[1px] shrink-0">
                      &mdash;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-soft btn-sm w-full"
                disabled={isPending}
                onClick={() =>
                  void runAction(
                    startUpgradeCheckout,
                    "Não foi possível iniciar o pagamento. Tente novamente.",
                  )
                }
              >
                Fazer upgrade do plano
              </button>
            </div>
          ) : (
            <button
              className="btn btn-soft btn-sm w-full"
              disabled={isPending}
              onClick={() =>
                void runAction(
                  () =>
                    customerQuery.openCustomerPortal({
                      returnUrl: window.location.href,
                    }),
                  "Não foi possível abrir o portal de cobrança. Tente novamente.",
                )
              }
            >
              Gerenciar assinatura
            </button>
          )}
        </div>

        {/* Buy credits card — paid plan only, owner-only */}
        {!isFreePlan && canManageBilling ? (
          <div className="rounded-lg border border-base-300 bg-base-100 p-4 space-y-3">
            <div>
              <span className="font-semibold">Comprar créditos</span>
              <p className="mt-1 text-sm text-base-content/60">
                Os créditos de recarga nunca expiram e são usados depois dos
                créditos mensais.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/60">$</span>
                <input
                  type="number"
                  min={10}
                  max={99}
                  step={1}
                  inputMode="numeric"
                  className="input input-bordered input-sm w-full"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                />
              </div>
              {topUpAmount.trim() !== "" && !isValidTopUp ? (
                <p className="mt-1 text-xs text-error">
                  Informe um valor entre $10 e $99.
                </p>
              ) : null}
            </div>

            <button
              className="btn btn-soft btn-sm w-full"
              disabled={isPending || !isValidTopUp}
              onClick={() =>
                void runAction(
                  () =>
                    customerQuery.attach({
                      planId: AUTUMN_SEO_DATA_TOP_UP_PLAN_ID,
                      redirectMode: "always",
                      successUrl: window.location.href,
                      checkoutSessionParams: AUTUMN_CHECKOUT_SESSION_PARAMS,
                      featureQuantities: [
                        {
                          featureId: AUTUMN_SEO_DATA_TOPUP_BALANCE_FEATURE_ID,
                          quantity: Math.round(
                            parsedTopUpAmount * AUTUMN_SEO_DATA_CREDITS_PER_USD,
                          ),
                        },
                      ],
                    }),
                  "Não foi possível iniciar o pagamento. Tente novamente.",
                )
              }
            >
              Comprar créditos
            </button>
          </div>
        ) : null}
      </div>

      {/* Usage chart */}
      <BillingUsageChart />

      {/* Per-feature usage breakdown */}
      <BillingFeatureBreakdown />

      {error ? <p className="text-sm text-error">{error}</p> : null}

      <p className="text-xs text-base-content/40">
        A cobrança é processada pelo Stripe.
      </p>
    </div>
  );
}
