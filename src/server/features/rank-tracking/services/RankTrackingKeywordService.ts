import { RankTrackingRepository } from "@/server/features/rank-tracking/repositories/RankTrackingRepository";
import type { rankTrackingKeywords } from "@/db/schema";
import { AppError } from "@/server/lib/errors";
import {
  devicesCount,
  estimateRankCheckCredits,
  estimateScheduledRankCheckCredits,
  isScheduledRankTrackingInterval,
  MAX_KEYWORDS_PER_CONFIG,
  scheduleLabel,
} from "@/shared/rank-tracking";

async function addKeywords(
  configId: string,
  projectId: string,
  keywords: string[],
  approval:
    | { kind: "direct_user_action" }
    | {
        kind: "credit_ceiling";
        maxEstimatedScheduledCheckCredits?: number;
      },
  // Keep the keyword exactly as typed instead of lowercasing it. "Nodex" and
  // "nodex" are then two separately tracked (and separately billed) keywords.
  matchCase = false,
) {
  const config = await getValidatedConfig(configId, projectId);
  const existing = await RankTrackingRepository.getKeywordsForConfig(configId);

  if (existing.length >= MAX_KEYWORDS_PER_CONFIG) {
    throw new AppError(
      "INTERNAL_ERROR",
      `Máximo de ${MAX_KEYWORDS_PER_CONFIG} palavras-chave por domínio. Monitorando atualmente: ${existing.length}.`,
    );
  }

  const existingKeywords = new Set(existing.map((kw) => kw.keyword));
  const available = MAX_KEYWORDS_PER_CONFIG - existing.length;
  const seen = new Set<string>();
  const rows: (typeof rankTrackingKeywords.$inferInsert)[] = [];

  for (const raw of keywords) {
    if (rows.length >= available) break;
    const trimmed = raw.trim();
    const normalized = matchCase ? trimmed : trimmed.toLowerCase();
    if (
      normalized &&
      !seen.has(normalized) &&
      !existingKeywords.has(normalized)
    ) {
      seen.add(normalized);
      rows.push({
        id: crypto.randomUUID(),
        configId,
        keyword: normalized,
        matchCase,
      });
    }
  }

  const scheduleInterval = isScheduledRankTrackingInterval(
    config.scheduleInterval,
  )
    ? config.scheduleInterval
    : null;
  let scheduledEstimate:
    | ReturnType<typeof estimateScheduledRankCheckCredits>
    | undefined;
  if (rows.length > 0 && scheduleInterval) {
    scheduledEstimate = estimateScheduledRankCheckCredits(
      existing.length + rows.length,
      config.devices,
      config.serpDepth,
      scheduleInterval,
    );
    if (
      approval.kind === "credit_ceiling" &&
      (approval.maxEstimatedScheduledCheckCredits == null ||
        scheduledEstimate.costCredits >
          approval.maxEstimatedScheduledCheckCredits)
    ) {
      throw scheduledApprovalError(scheduleInterval, scheduledEstimate);
    }
  }

  const addedIds =
    rows.length > 0
      ? await RankTrackingRepository.addKeywordsToConfig(rows)
      : [];

  if (
    scheduledEstimate &&
    scheduleInterval &&
    addedIds.length > 0 &&
    approval.kind === "credit_ceiling"
  ) {
    const persistedKeywordCount =
      await RankTrackingRepository.getKeywordCountForConfig(configId);
    scheduledEstimate = estimateScheduledRankCheckCredits(
      persistedKeywordCount,
      config.devices,
      config.serpDepth,
      scheduleInterval,
    );
    if (
      approval.maxEstimatedScheduledCheckCredits == null ||
      scheduledEstimate.costCredits > approval.maxEstimatedScheduledCheckCredits
    ) {
      await RankTrackingRepository.removeKeywordsFromConfig(addedIds, configId);
      throw scheduledApprovalError(scheduleInterval, scheduledEstimate);
    }
  }

  return { added: addedIds.length, addedIds, scheduledEstimate };
}

async function removeKeywords(
  configId: string,
  projectId: string,
  keywordIds: string[],
) {
  await getValidatedConfig(configId, projectId);
  const uniqueIds = [...new Set(keywordIds)];
  const removedIds = await RankTrackingRepository.removeKeywordsFromConfig(
    uniqueIds,
    configId,
  );
  return { removed: removedIds.length, removedIds };
}

async function estimateCost(
  configId: string,
  projectId: string,
  additionalKeywordCount = 0,
) {
  const config = await getValidatedConfig(configId, projectId);
  const existingKeywordCount =
    await RankTrackingRepository.getKeywordCountForConfig(configId);
  const keywordCount = Math.max(
    existingKeywordCount,
    Math.min(
      MAX_KEYWORDS_PER_CONFIG,
      existingKeywordCount + additionalKeywordCount,
    ),
  );
  const { costUsd, costCredits } = estimateRankCheckCredits(
    keywordCount,
    config.devices,
    config.serpDepth,
    "live",
  );
  const scheduleInterval = isScheduledRankTrackingInterval(
    config.scheduleInterval,
  )
    ? config.scheduleInterval
    : null;
  return {
    costUsd,
    costCredits,
    keywordCount,
    devicesCount: devicesCount(config.devices),
    totalChecks: keywordCount * devicesCount(config.devices),
    method: "live" as const,
    existingKeywordCount,
    additionalKeywordCount: keywordCount - existingKeywordCount,
    scheduledEstimate: scheduleInterval
      ? estimateScheduledRankCheckCredits(
          keywordCount,
          config.devices,
          config.serpDepth,
          scheduleInterval,
        )
      : undefined,
  };
}

async function getValidatedConfig(configId: string, projectId: string) {
  const config = await RankTrackingRepository.getConfigById({
    configId,
    projectId,
  });
  if (!config) {
    throw new AppError(
      "NOT_FOUND",
      "Configuração de monitoramento de posições não encontrada",
    );
  }
  return config;
}

function scheduledApprovalError(
  scheduleInterval: "daily" | "weekly" | "monthly",
  estimate: ReturnType<typeof estimateScheduledRankCheckCredits>,
) {
  return new AppError(
    "VALIDATION_ERROR",
    `Adicionar estas palavras-chave faria cada verificação agendada (${scheduleLabel(scheduleInterval).toLowerCase()}) custar uma estimativa nominal em fila de ${estimate.costCredits} créditos (~$${estimate.costUsd.toFixed(4)} por verificação; ~${estimate.monthlyCostCredits} créditos/mês). Chame estimate_rank_tracker_cost com additionalKeywordCount, mostre ao usuário a estimativa recorrente e o aviso sobre o fallback ao vivo e tente novamente com maxEstimatedScheduledCheckCredits definido como a estimativa aprovada por verificação. O fallback ao vivo para tarefas em fila rejeitadas, com falha ou expiradas pode usar créditos adicionais cobrados separadamente.`,
  );
}

export const RankTrackingKeywordService = {
  addKeywords,
  removeKeywords,
  estimateCost,
};
