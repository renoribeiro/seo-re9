import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PortalMenu } from "@/client/components/PortalMenu";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/posthog";
import { authClient } from "@/lib/auth-client";

// Better Auth rejects longer names with INVALID_NAME_LENGTH.
const MAX_KEY_NAME_LENGTH = 32;

export function ApiKeySettings() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const mcpUrl =
    typeof window === "undefined"
      ? "https://app.openseo.so/mcp"
      : `${window.location.origin}/mcp`;

  const apiKeysQuery = useQuery({
    queryKey: ["apiKeys"],
    queryFn: async () => {
      const result = await authClient.apiKey.list();
      if (result.error) {
        throw new Error(
          result.error.message ?? "Não foi possível carregar as chaves de API",
        );
      }
      return result.data.apiKeys.map((key) => ({
        id: key.id,
        name: key.name,
        start: key.start,
        createdAt: new Date(key.createdAt),
        lastRequest: key.lastRequest ? new Date(key.lastRequest) : null,
      }));
    },
  });

  const createMutation = useMutation({
    mutationFn: async (keyName: string) => {
      const result = await authClient.apiKey.create({ name: keyName });
      if (result.error || !result.data?.key) {
        throw new Error(
          result.error?.message ?? "Não foi possível criar a chave",
        );
      }
      return result.data.key;
    },
    onSuccess: (key) => {
      setCreatedKey(key);
      setName("");
      captureClientEvent("mcp:api_key_created");
      void queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
    onError: (error) => {
      toast.error(getStandardErrorMessage(error));
    },
  });

  const revokeMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const result = await authClient.apiKey.delete({ keyId });
      if (result.error) {
        throw new Error(
          result.error.message ?? "Não foi possível revogar a chave",
        );
      }
    },
    onSuccess: () => {
      captureClientEvent("mcp:api_key_revoked");
      toast.success("Chave de API revogada");
      void queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
    onError: (error) => {
      toast.error(getStandardErrorMessage(error));
    },
  });

  const apiKeys = apiKeysQuery.data ?? [];

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    setCreatedKey(null);
    setName("");
  };

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-base-content/50">
        Chaves de API
      </h2>
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm">
            Autentique clientes MCP quando o OAuth não funcionar
          </p>
          <p className="mt-1 text-sm text-base-content/60">
            Use em agentes remotos, como o Hermes, em que o fluxo normal de
            login não funciona.
          </p>
          <p className="mt-1 text-sm">
            <a
              className="link link-primary"
              href="https://openseo.so/docs/mcp"
              target="_blank"
              rel="noreferrer"
            >
              Guia de configuração
            </a>
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setIsCreateOpen(true)}
        >
          Criar chave de API
        </button>
      </div>

      {apiKeysQuery.isError ? (
        <p className="text-sm text-error">
          Não foi possível carregar suas chaves de API.
        </p>
      ) : apiKeys.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-base-300">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Chave</th>
                <th>Criada em</th>
                <th>Último uso</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover">
                  <td className="max-w-[220px] truncate font-medium">
                    {key.name || "Chave sem nome"}
                  </td>
                  <td
                    className="font-mono text-xs text-base-content/70"
                    data-ph-mask
                  >
                    {key.start || "oseo_"}…
                  </td>
                  <td className="text-xs text-base-content/70">
                    {key.createdAt.toLocaleDateString("pt-BR")}
                  </td>
                  <td className="text-xs text-base-content/70">
                    {key.lastRequest
                      ? key.lastRequest.toLocaleDateString("pt-BR")
                      : "Nunca"}
                  </td>
                  <td>
                    <PortalMenu
                      ariaLabel={`Ações para ${key.name || "chave de API"}`}
                    >
                      {(close) => (
                        <li>
                          <button
                            className="text-error"
                            disabled={
                              revokeMutation.isPending &&
                              revokeMutation.variables === key.id
                            }
                            onClick={() => {
                              close();
                              if (
                                window.confirm(
                                  `Revogar "${key.name || "Chave sem nome"}"? Os clientes que usam essa chave vão parar de funcionar.`,
                                )
                              ) {
                                revokeMutation.mutate(key.id);
                              }
                            }}
                          >
                            <Trash2 className="size-3.5" />
                            Revogar chave
                          </button>
                        </li>
                      )}
                    </PortalMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {isCreateOpen ? (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            {createdKey ? (
              <>
                <h3 className="text-lg font-bold">
                  Copie sua nova chave de API
                </h3>
                <p className="mt-2 text-sm text-base-content/60">
                  Ela não será mostrada de novo. Envie-a como{" "}
                  <span className="font-mono text-xs">
                    Authorization: Bearer
                  </span>{" "}
                  para <span className="font-mono text-xs">{mcpUrl}</span>.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <code
                    className="min-w-0 flex-1 overflow-x-auto rounded bg-base-200 px-2.5 py-2 font-mono text-xs"
                    data-ph-mask
                  >
                    {createdKey}
                  </code>
                  <CopyButton
                    value={createdKey}
                    successMessage="Chave de API copiada"
                    iconOnly
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={closeCreateModal}
                  >
                    Concluir
                  </button>
                </div>
              </>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (name.trim()) createMutation.mutate(name.trim());
                }}
              >
                <h3 className="text-lg font-bold">Criar chave de API</h3>
                <label className="form-control mt-4 w-full">
                  <span className="label-text pb-1 text-xs text-base-content/60">
                    Nome
                  </span>
                  <input
                    className="input input-sm input-bordered w-full"
                    placeholder="Claude Code no notebook"
                    value={name}
                    maxLength={MAX_KEY_NAME_LENGTH}
                    onChange={(event) => setName(event.currentTarget.value)}
                    required
                    autoFocus
                  />
                </label>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={closeCreateModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={createMutation.isPending || !name.trim()}
                  >
                    {createMutation.isPending ? "Criando…" : "Criar"}
                  </button>
                </div>
              </form>
            )}
          </div>
          {/* No backdrop close on the reveal step: the key is shown once. */}
          {createdKey ? (
            <div className="modal-backdrop" />
          ) : (
            <div className="modal-backdrop" onClick={closeCreateModal} />
          )}
        </div>
      ) : null}
    </section>
  );
}
