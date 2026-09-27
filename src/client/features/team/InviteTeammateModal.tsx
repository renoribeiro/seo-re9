import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorCode } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/posthog";
import { sendTeamInvitation } from "@/serverFunctions/organization";

export function inviteErrorMessage(error: Error) {
  const code = getErrorCode(error);
  if (code === "RATE_LIMITED") {
    return "Limite de convites de hoje atingido. Tente novamente amanhã.";
  }
  if (code === "UPSTREAM_UNAVAILABLE") {
    return "O convite foi salvo, mas não foi possível enviar o e-mail. Use Reenviar convite daqui a pouco para tentar de novo.";
  }
  return "Não foi possível enviar esse convite.";
}

export function InviteTeammateModal({
  onClose,
  onInvited,
}: {
  onClose: () => void;
  onInvited: () => void;
}) {
  const [email, setEmail] = useState("");

  // Server function (not authClient.inviteMember): it enforces the daily send
  // limits and fails visibly when the invite email doesn't send.
  const inviteMutation = useMutation({
    mutationFn: (inviteeEmail: string) =>
      sendTeamInvitation({ data: { email: inviteeEmail } }),
    onSuccess: () => {
      captureClientEvent("team:invitation_send");
      toast.success("Convite enviado");
      onInvited();
      onClose();
    },
    onError: (error: Error) => {
      toast.error(inviteErrorMessage(error));
      // An email-send failure still creates the pending row — show it.
      onInvited();
    },
  });

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = email.trim();
            if (trimmed) inviteMutation.mutate(trimmed);
          }}
        >
          <h3 className="text-lg font-bold">Convidar para a equipe</h3>
          <p className="mt-2 text-sm text-base-content/60">
            A pessoa entra como Administrador, com acesso total a todos os
            projetos, exceto à cobrança. O link do convite expira em 7 dias.
          </p>
          <label className="form-control mt-4 w-full">
            <span className="label-text pb-1 text-xs text-base-content/60">
              E-mail
            </span>
            <input
              type="email"
              className="input input-sm input-bordered w-full"
              placeholder="colega@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
              autoFocus
            />
          </label>
          <div className="modal-action">
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
              disabled={inviteMutation.isPending || !email.trim()}
            >
              {inviteMutation.isPending ? "Enviando…" : "Enviar convite"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}
