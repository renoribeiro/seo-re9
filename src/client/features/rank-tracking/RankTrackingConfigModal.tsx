import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Info, Loader2, X } from "lucide-react";
import { Modal } from "@/client/components/Modal";
import type { RankTrackingConfig } from "@/types/schemas/rank-tracking";
import { domainField, normalizeDomain } from "@/types/schemas/domain";
import {
  depthToPages,
  pagesToDepth,
  estimateRankCheckCredits,
} from "@/shared/rank-tracking";
import { getLanguageCode } from "@/client/features/keywords/locations";
import {
  SERP_LANGUAGE_OPTIONS,
  getIsoCountryCode,
} from "@/shared/keyword-locations";
import { LocationSelect } from "@/client/components/LocationSelect";
import type { ProjectMarket } from "@/client/features/projects/types";
import { useProjectMarket } from "@/client/features/projects/useProjectMarket";
import { SearchTargetingField } from "./SearchTargetingField";
import { KeywordSuggestionStep } from "./KeywordSuggestionStep";
import { useSaveConfigMutations } from "./useSaveConfigMutations";

type Props = {
  projectId: string;
  existingConfig?: RankTrackingConfig | null;
  onClose: () => void;
  onSaved: (createdConfigId?: string) => void;
  onConfigCreated?: () => void;
};

export function RankTrackingConfigModal({
  projectId,
  existingConfig,
  onClose,
  onSaved,
  onConfigCreated,
}: Props) {
  const projectMarket = useProjectMarket(projectId);

  if (!existingConfig && !projectMarket) {
    return (
      <Modal
        maxWidth="max-w-lg"
        onClose={onClose}
        labelledBy="rank-config-modal-title"
      >
        <h2 id="rank-config-modal-title" className="sr-only">
          Adicionar domínio
        </h2>
        <div className="flex min-h-40 items-center justify-center">
          <Loader2 className="size-5 animate-spin text-base-content/50" />
        </div>
      </Modal>
    );
  }

  return (
    <RankTrackingConfigModalContent
      projectId={projectId}
      existingConfig={existingConfig}
      initialMarket={existingConfig ?? projectMarket!}
      onClose={onClose}
      onSaved={onSaved}
      onConfigCreated={onConfigCreated}
    />
  );
}

function RankTrackingConfigModalContent({
  projectId,
  existingConfig,
  initialMarket,
  onClose,
  onSaved,
  onConfigCreated,
}: Props & { initialMarket: ProjectMarket }) {
  const isEdit = !!existingConfig;
  const [step, setStep] = useState<"config" | "keywords">("config");
  const [domain, setDomain] = useState(existingConfig?.domain ?? "");
  const [devices, setDevices] = useState<"both" | "desktop" | "mobile">(
    existingConfig?.devices ?? "mobile",
  );
  const [locationCode, setLocationCode] = useState(
    existingConfig?.locationCode ?? initialMarket.locationCode,
  );
  const [languageCode, setLanguageCode] = useState(
    existingConfig?.languageCode ?? initialMarket.languageCode,
  );
  const [serpDepth, setSerpDepth] = useState(existingConfig?.serpDepth ?? 40);
  const [schedule, setSchedule] = useState<
    RankTrackingConfig["scheduleInterval"]
  >(existingConfig?.scheduleInterval ?? "weekly");
  const [targetingMode, setTargetingMode] = useState<"national" | "local">(
    existingConfig?.locationName ? "local" : "national",
  );
  const [locationName, setLocationName] = useState<string | undefined>(
    existingConfig?.locationName ?? undefined,
  );
  const [createdConfigId, setCreatedConfigId] = useState<string | null>(null);

  const selectedCountryCode = useMemo(
    () => getIsoCountryCode(locationCode),
    [locationCode],
  );

  const { createMutation, updateMutation } = useSaveConfigMutations({
    projectId,
    existingConfig,
    fields: {
      devices,
      serpDepth,
      locationCode,
      languageCode,
      targetingMode,
      locationName,
      schedule,
    },
    onCreated: (configId) => {
      setCreatedConfigId(configId);
      onConfigCreated?.();
      setStep("keywords");
    },
    onUpdated: () => onSaved(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    if (!domain.trim()) {
      toast.error("Informe um domínio");
      return;
    }
    if (targetingMode === "local" && !locationName) {
      toast.error("Selecione uma cidade ou região para a segmentação local");
      return;
    }
    const parsedDomain = domainField.safeParse(domain);
    if (!parsedDomain.success) {
      toast.error("Informe um domínio válido");
      return;
    }
    setDomain(parsedDomain.data);
    if (isEdit) {
      updateMutation.mutate(parsedDomain.data);
    } else {
      createMutation.mutate(parsedDomain.data);
    }
  };

  const handleDomainBlur = () => {
    try {
      setDomain(normalizeDomain(domain));
    } catch {
      // Keep invalid partial input editable; submit validation will show the error.
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (step === "keywords" && createdConfigId) {
    const closeKeywordStep = () => onSaved(createdConfigId);

    return (
      <Modal
        maxWidth="max-w-3xl"
        onClose={closeKeywordStep}
        labelledBy="keyword-suggestions-title"
      >
        <KeywordSuggestionStep
          configId={createdConfigId}
          projectId={projectId}
          domain={domain}
          locationCode={locationCode}
          onDone={(id) => onSaved(id)}
          onClose={closeKeywordStep}
        />
      </Modal>
    );
  }

  return (
    <Modal
      maxWidth="max-w-lg"
      onClose={onClose}
      labelledBy="rank-config-modal-title"
    >
      <div className="flex items-center justify-between">
        <h2 id="rank-config-modal-title" className="text-lg font-semibold">
          {isEdit ? "Editar configuração do domínio" : "Adicionar domínio"}
        </h2>
        <button className="btn btn-ghost btn-sm btn-square" onClick={onClose}>
          <X className="size-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Domínio-alvo</span>
          </label>
          <input
            type="text"
            placeholder="exemplo.com.br"
            className="input input-bordered w-full"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onBlur={handleDomainBlur}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">País</span>
          </label>
          <LocationSelect
            value={locationCode}
            onChange={(newLocationCode) => {
              setLocationCode(newLocationCode);
              setLanguageCode(getLanguageCode(newLocationCode));
              // A picked city belongs to the previous country.
              setLocationName(undefined);
            }}
          />
        </div>

        <SearchTargetingField
          mode={targetingMode}
          onModeChange={setTargetingMode}
          locationName={locationName}
          onLocationNameChange={setLocationName}
          countryCode={selectedCountryCode}
        />

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Idioma</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
          >
            {SERP_LANGUAGE_OPTIONS.map((language) => (
              <option key={language.code} value={language.code}>
                {language.label}
              </option>
            ))}
          </select>
          <div className="mt-1.5 text-xs text-base-content/50">
            Por padrão, usa o idioma do país. Qualquer idioma pode ser
            monitorado em qualquer país — escolha aquele em que seus clientes
            buscam.
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Dispositivos</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={devices}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "both" ||
                value === "desktop" ||
                value === "mobile"
              ) {
                setDevices(value);
              }
            }}
          >
            <option value="both">Desktop + Mobile</option>
            <option value="desktop">Somente Desktop</option>
            <option value="mobile">Somente Mobile</option>
          </select>
          <div className="mt-1.5 text-xs text-base-content/50">
            A maioria das buscas no Google vem do celular, mas escolha com base
            no seu cliente.
          </div>
          {devices === "both" && (
            <div className="mt-1.5 flex items-start gap-1.5 text-xs text-info">
              <Info className="size-3.5 shrink-0 mt-0.5" />
              <span>
                Monitorar os dois dispositivos consome 2x créditos por
                verificação de palavra-chave
              </span>
            </div>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Frequência</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={schedule}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "daily" ||
                value === "weekly" ||
                value === "monthly" ||
                value === "manual"
              ) {
                setSchedule(value);
              }
            }}
          >
            <option value="daily">Diária</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensal (fim do mês)</option>
            <option value="manual">Somente manual</option>
          </select>
          {schedule === "daily" && (
            <div className="mt-1.5 flex items-start gap-1.5 text-xs text-warning">
              <Info className="size-3.5 shrink-0 mt-0.5" />
              <span>
                Verificações diárias consomem 7x mais créditos que as semanais
              </span>
            </div>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Profundidade da busca
            </span>
          </label>
          <select
            className="select select-bordered w-full"
            value={depthToPages(serpDepth)}
            onChange={(e) => setSerpDepth(pagesToDepth(Number(e.target.value)))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((pages) => (
              <option key={pages} value={pages}>
                {pages} {pages === 1 ? "página" : "páginas"} (top {pages * 10}{" "}
                resultados)
              </option>
            ))}
          </select>
          <div className="mt-1.5 text-xs text-base-content/50">
            10 páginas custam ~8x mais que 1 página
          </div>
        </div>

        {(() => {
          // Scheduled checks run through the cheaper task queue; manual
          // configs only ever pay the live price.
          const { costUsd: costPerKeyword } = estimateRankCheckCredits(
            1,
            devices,
            serpDepth,
            schedule === "manual" ? "live" : "queued",
          );
          const checksPerMonth =
            schedule === "daily" ? 30 : schedule === "weekly" ? 4 : 1;
          return (
            <div className="rounded-lg bg-base-200/50 px-3 py-2.5 text-xs text-base-content/70 space-y-0.5">
              <div>
                <span className="font-mono font-semibold text-base-content">
                  ~${costPerKeyword.toFixed(4)}
                </span>{" "}
                por palavra-chave por verificação
              </div>
              {schedule !== "manual" && (
                <div>
                  50 palavras-chave custariam{" "}
                  <span className="font-mono font-semibold text-base-content">
                    ~${(costPerKeyword * 50 * checksPerMonth).toFixed(2)}
                  </span>
                  /mês
                </div>
              )}
            </div>
          );
        })()}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isPending || !domain.trim()}
          >
            {isPending && <Loader2 className="size-3.5 animate-spin" />}
            {isEdit ? "Salvar alterações" : "Adicionar domínio"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
