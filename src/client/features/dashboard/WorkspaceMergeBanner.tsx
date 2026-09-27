import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { isHostedClientAuthMode } from "@/lib/auth-mode";
import {
  getWorkspaceMergeStatus,
  mergeLegacyWorkspaces,
} from "@/serverFunctions/workspace";

// Shown on self-hosted Cloudflare Access deployments that still have per-user
// workspaces from before the shared workspace existed. The server decides
// visibility (AUTH_MODE is a runtime var there); hosted builds skip the query
// entirely since the mode is known at build time.
export function WorkspaceMergeBanner() {
  const queryClient = useQueryClient();

  const statusQuery = useQuery({
    queryKey: ["workspaceMergeStatus"],
    queryFn: () => getWorkspaceMergeStatus(),
    enabled: !isHostedClientAuthMode(),
  });

  const mergeMutation = useMutation({
    mutationFn: () => mergeLegacyWorkspaces(),
    onSuccess: ({ mergedWorkspaces }) => {
      toast.success(
        mergedWorkspaces === 1
          ? "1 organização migrada para a organização compartilhada."
          : `${mergedWorkspaces} organizações migradas para a organização compartilhada.`,
      );
      // The merge changes projects, connections, and the banner's own status —
      // refetch everything rather than enumerating keys.
      void queryClient.invalidateQueries();
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          "Não foi possível migrar as organizações. Tente novamente.",
        ),
      ),
  });

  if (!statusQuery.data || statusQuery.data.legacyWorkspaceCount === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-warning/40 bg-warning/10 p-5">
      <p className="max-w-3xl text-sm">
        Na hospedagem própria no Cloudflare, havia um bug em que cada usuário
        tinha o próprio espaço de trabalho. A intenção era que todos ficassem em
        um único espaço. Clique no botão abaixo para migrar o trabalho anterior
        de todos para este espaço de trabalho compartilhado.
      </p>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-4"
        disabled={mergeMutation.isPending}
        onClick={() => mergeMutation.mutate()}
      >
        {mergeMutation.isPending ? "Migrando…" : "Migrar organizações"}
      </button>
    </div>
  );
}
