import { useEffect, useRef, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { identity, sortBy } from "remeda";
import {
  AlertCircle,
  ArrowLeft,
  Columns3,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { explorePrompt } from "@/serverFunctions/ai-search";
import {
  HostedPlanGate,
  type HostedPlanGateState,
} from "@/client/features/billing/HostedPlanGate";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { PromptExplorerForm } from "@/client/features/ai-search/components/PromptExplorerForm";
import { PromptExplorerResults } from "@/client/features/ai-search/components/PromptExplorerResults";
import { PromptExplorerLoadingState } from "@/client/features/ai-search/components/PromptExplorerLoadingState";
import { PromptExplorerHistorySection } from "@/client/features/ai-search/components/PromptExplorerHistorySection";
import { AiSearchPaidPlanGate } from "@/client/features/ai-search/components/AiSearchPaidPlanGate";
import { usePromptExplorerSearchHistory } from "@/client/hooks/usePromptExplorerSearchHistory";
import {
  PROMPT_EXPLORER_MAX_PROMPT_LENGTH,
  type PromptExplorerModel,
  type WebSearchCountryCode,
} from "@/types/schemas/ai-search";

type PromptExplorerFormValues = {
  prompt: string;
  highlightBrand: string;
  models: PromptExplorerModel[];
  webSearch: boolean;
  webSearchCountryCode: WebSearchCountryCode;
};

type Props = {
  projectId: string;
  urlState: PromptExplorerFormValues;
  onSubmit: (values: PromptExplorerFormValues) => void;
};

const PROMPT_EXPLORER_BULLETS = [
  {
    icon: Columns3,
    title: "Quatro modelos lado a lado",
    body: "Execute um prompt no ChatGPT, Claude, Gemini e Perplexity e compare as respostas em uma única tela.",
  },
  {
    icon: SearchCheck,
    title: "Veja o que os modelos citam",
    body: "Cada resposta lista as fontes usadas, para você verificar de onde cada modelo tira as informações.",
  },
  {
    icon: Sparkles,
    title: "Confira menções à marca",
    body: "Destaque uma marca para ver na hora se ela aparece no texto da resposta ou nas fontes citadas.",
  },
];

export function PromptExplorerPage(props: Props) {
  return (
    <HostedPlanGate>
      {(planGate) => <PromptExplorerPageInner {...props} planGate={planGate} />}
    </HostedPlanGate>
  );
}

function PromptExplorerPageInner({
  projectId,
  urlState,
  onSubmit,
  planGate,
}: Props & { planGate: HostedPlanGateState }) {
  const [form, setForm] = useState<PromptExplorerFormValues>(urlState);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    history,
    isLoaded: historyLoaded,
    addSearch,
    removeHistoryItem,
  } = usePromptExplorerSearchHistory(projectId);

  const trimmedPrompt = urlState.prompt.trim();
  const hasActivePrompt = trimmedPrompt.length > 0;

  const exploreQuery = useQuery({
    queryKey: [
      "prompt-explorer",
      projectId,
      trimmedPrompt,
      sortBy(urlState.models, identity()).join(","),
      urlState.webSearch,
      urlState.webSearchCountryCode,
      urlState.highlightBrand.trim(),
    ],
    queryFn: () =>
      explorePrompt({
        data: {
          projectId,
          prompt: trimmedPrompt,
          models: urlState.models,
          highlightBrand: urlState.highlightBrand.trim() || undefined,
          webSearch: urlState.webSearch,
          webSearchCountryCode: urlState.webSearchCountryCode,
        },
      }),
    // Client-side gate is a UX optimization only; the paywall is enforced
    // server-side (explorePrompt → assertPaidPlan) before any DataForSEO spend,
    // so a stale free-plan window here just yields a rejected request, not cost.
    enabled:
      hasActivePrompt && urlState.models.length > 0 && !planGate.isFreePlan,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  // Sync form to URL state — covers initial mount, browser back/forward, and
  // cmd+click history navigation (in the originating tab nothing changes; in
  // a new tab the form mounts populated from the URL).
  useEffect(() => {
    setForm(urlState);
    setValidationError(null);
  }, [urlState]);

  // Persist successful searches to history. Run on isSuccess so failed
  // requests don't pollute recent searches. The dedup ref prevents repeat
  // adds when downstream renders create new urlState references.
  const lastAddedKeyRef = useRef<string | null>(null);
  useEffect(() => {
    if (!hasActivePrompt || !exploreQuery.isSuccess) return;
    const key = [
      trimmedPrompt,
      urlState.highlightBrand.trim(),
      sortBy(urlState.models, identity()).join(","),
      urlState.webSearch,
      urlState.webSearchCountryCode,
    ].join("|");
    if (lastAddedKeyRef.current === key) return;
    lastAddedKeyRef.current = key;
    addSearch({
      prompt: trimmedPrompt,
      highlightBrand: urlState.highlightBrand.trim(),
      models: urlState.models,
      webSearch: urlState.webSearch,
      webSearchCountryCode: urlState.webSearchCountryCode,
    });
  }, [
    hasActivePrompt,
    exploreQuery.isSuccess,
    trimmedPrompt,
    urlState.highlightBrand,
    urlState.models,
    urlState.webSearch,
    urlState.webSearchCountryCode,
    addSearch,
  ]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = form.prompt.trim();
    if (trimmed.length === 0) {
      setValidationError("Digite um prompt");
      return;
    }
    if (trimmed.length > PROMPT_EXPLORER_MAX_PROMPT_LENGTH) {
      setValidationError(
        `O prompt deve ter menos de ${PROMPT_EXPLORER_MAX_PROMPT_LENGTH} caracteres`,
      );
      return;
    }
    if (form.models.length === 0) {
      setValidationError("Selecione pelo menos um modelo");
      return;
    }
    setValidationError(null);
    onSubmit({
      ...form,
      prompt: trimmed,
      highlightBrand: form.highlightBrand.trim(),
    });
  };

  const errorMessage = exploreQuery.isError
    ? getStandardErrorMessage(exploreQuery.error)
    : null;
  const isLoading = hasActivePrompt && exploreQuery.isPending;
  const resultData = hasActivePrompt ? exploreQuery.data : undefined;

  const updateForm = <K extends keyof PromptExplorerFormValues>(
    key: K,
    value: PromptExplorerFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (validationError) setValidationError(null);
  };

  return (
    <div className="px-4 py-4 pb-24 overflow-auto md:px-6 md:py-6 md:pb-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Explorador de prompts</h1>
          <p className="text-sm text-base-content/70">
            Envie qualquer prompt ao ChatGPT, Claude, Gemini e Perplexity e veja
            as respostas lado a lado.
          </p>
        </div>

        {planGate.isFreePlan ? (
          <AiSearchPaidPlanGate
            feature="Explorador de prompts"
            description="Envie um prompt ao ChatGPT, Claude, Gemini e Perplexity ao mesmo tempo e compare as respostas — incluindo as fontes que cada modelo cita."
            bullets={PROMPT_EXPLORER_BULLETS}
          />
        ) : (
          <>
            <PromptExplorerForm
              form={form}
              onPromptChange={(value) => updateForm("prompt", value)}
              onHighlightBrandChange={(value) =>
                updateForm("highlightBrand", value)
              }
              onModelsChange={(value) => updateForm("models", value)}
              onWebSearchChange={(value) => updateForm("webSearch", value)}
              onCountryChange={(value) =>
                updateForm("webSearchCountryCode", value)
              }
              onSubmit={handleSubmit}
              isLoading={isLoading}
              validationError={validationError}
            />

            {errorMessage ? (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            ) : null}

            {isLoading ? (
              <PromptExplorerLoadingState modelCount={form.models.length} />
            ) : resultData ? (
              <>
                <div>
                  <Link
                    from="/p/$projectId/prompt-explorer"
                    to="/p/$projectId/prompt-explorer"
                    params={{ projectId }}
                    search={{}}
                    replace
                    className="btn btn-ghost btn-sm gap-2 px-0 text-base-content/70 hover:bg-transparent"
                  >
                    <ArrowLeft className="size-4" />
                    Buscas recentes
                  </Link>
                </div>
                <PromptExplorerResults result={resultData} />
              </>
            ) : !errorMessage ? (
              <PromptExplorerHistorySection
                projectId={projectId}
                history={history}
                historyLoaded={historyLoaded}
                onRemoveHistoryItem={removeHistoryItem}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
