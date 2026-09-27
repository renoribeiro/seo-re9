import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/posthog";
import { triggerRankCheck } from "@/serverFunctions/rank-tracking";

export function useRankCheckTrigger({
  configId,
  isRunning,
  projectId,
  onSuccess,
}: {
  configId: string;
  isRunning: boolean;
  projectId: string;
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();

  const triggerMutation = useMutation({
    mutationFn: (opts: { keywordIds?: string[] }) =>
      triggerRankCheck({
        data: {
          projectId,
          configId,
          keywordIds: opts.keywordIds,
        },
      }),
    onSuccess: (result) => {
      onSuccess();
      void queryClient.invalidateQueries({
        queryKey: ["rankTrackingLatestRun", projectId, configId],
      });
      if (!result.ok) {
        toast.info("Já existe uma verificação de posições em andamento");
        return;
      }

      captureClientEvent("rank_tracking:check_trigger");
      toast.success("Verificação de posições iniciada");
    },
    onError: (error) => {
      toast.error(
        getStandardErrorMessage(
          error,
          "Não foi possível iniciar a verificação de posições",
        ),
      );
    },
  });

  const startCheck = (opts: { keywordIds?: string[] }) => {
    if (triggerMutation.isPending || isRunning) return;
    triggerMutation.mutate(opts);
  };

  return {
    startCheck,
    /** True while the trigger request is in-flight */
    isPending: triggerMutation.isPending,
    /** True when any check activity is happening (running, starting, or pending) */
    isBusy: isRunning || triggerMutation.isPending,
  };
}
