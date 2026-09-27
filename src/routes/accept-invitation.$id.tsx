import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AuthPageCard, AuthPageShell } from "@/client/features/auth/AuthPage";
import { captureClientEvent } from "@/client/lib/posthog";
import { authClient, signOutAndRedirect, useSession } from "@/lib/auth-client";
import { isHostedClientAuthMode } from "@/lib/auth-mode";

export const Route = createFileRoute("/accept-invitation/$id")({
  beforeLoad: () => {
    if (!isHostedClientAuthMode()) {
      throw notFound();
    }
  },
  component: AcceptInvitationPage,
});

function AcceptInvitationPage() {
  const { id } = Route.useParams();
  const { data: session, isPending: isSessionPending } = useSession();

  return (
    <AuthPageShell>
      {isSessionPending ? null : session?.user ? (
        <InvitationCard invitationId={id} userEmail={session.user.email} />
      ) : (
        <SignedOutInvitationCard invitationId={id} />
      )}
    </AuthPageShell>
  );
}

// getInvitation requires a session matching the invited email, so a
// logged-out visitor gets a generic shell — no invitation details are
// exposed pre-auth by design.
function SignedOutInvitationCard({ invitationId }: { invitationId: string }) {
  const redirect = `/accept-invitation/${invitationId}`;

  return (
    <AuthPageCard title="Você recebeu um convite">
      <p className="text-sm text-base-content/70">
        Você foi convidado para entrar em uma organização no RE9 SEO. Entre com
        o e-mail que recebeu o convite para aceitá-lo.
      </p>
      <div className="space-y-2">
        <Link
          to="/sign-up"
          search={{ redirect }}
          className="btn btn-soft w-full"
        >
          Criar conta
        </Link>
        <Link
          to="/sign-in"
          search={{ redirect }}
          className="btn btn-ghost w-full"
        >
          Entrar
        </Link>
      </div>
    </AuthPageCard>
  );
}

function InvitationCard({
  invitationId,
  userEmail,
}: {
  invitationId: string;
  userEmail: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [declined, setDeclined] = useState(false);

  const invitationQuery = useQuery({
    queryKey: ["invitation", invitationId],
    queryFn: async () => {
      const result = await authClient.organization.getInvitation({
        query: { id: invitationId },
      });
      if (result.error) {
        throw new Error(result.error.message || "Convite não encontrado");
      }
      return result.data;
    },
    retry: false,
  });

  async function handleAccept() {
    setActionError(null);
    setIsSubmitting(true);
    try {
      const accepted = await authClient.organization.acceptInvitation({
        invitationId,
      });
      if (accepted.error) {
        setActionError(
          accepted.error.message || "Não foi possível aceitar o convite.",
        );
        setIsSubmitting(false);
        return;
      }

      // Accepting updates the session row but not the session cookie cache;
      // setActive refreshes the cookie so the app opens in the joined org
      // immediately instead of after the cache expires.
      await authClient.organization.setActive({
        organizationId: accepted.data.invitation.organizationId,
      });
      captureClientEvent("team:invitation_accept");
      // Full navigation: every cached query in this tab belongs to the old
      // workspace.
      window.location.assign("/");
    } catch {
      setActionError("Não foi possível aceitar o convite. Tente novamente.");
      setIsSubmitting(false);
    }
  }

  async function handleDecline() {
    setActionError(null);
    setIsSubmitting(true);
    try {
      const result = await authClient.organization.rejectInvitation({
        invitationId,
      });
      if (result.error) {
        setActionError(
          result.error.message || "Não foi possível recusar o convite.",
        );
        setIsSubmitting(false);
        return;
      }
      captureClientEvent("team:invitation_decline");
      setDeclined(true);
    } catch {
      setActionError("Não foi possível recusar o convite. Tente novamente.");
      setIsSubmitting(false);
    }
  }

  if (invitationQuery.isPending) {
    return (
      <AuthPageCard title="Verificando convite...">
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-md" />
        </div>
      </AuthPageCard>
    );
  }

  if (invitationQuery.isError) {
    return (
      <AuthPageCard title="Convite indisponível">
        <p className="text-sm text-base-content/70">
          Este convite pode ter expirado, sido cancelado ou pertencer a outro
          e-mail. Você entrou como{" "}
          <span className="font-medium" data-ph-mask>
            {userEmail}
          </span>
          .
        </p>
        <p className="text-sm text-base-content/70">
          Se o convite foi enviado para outro endereço, saia e entre novamente
          com esse e-mail. Caso contrário, peça para alguém da sua equipe enviar
          um novo convite.
        </p>
        <div className="space-y-2">
          <button
            type="button"
            className="btn btn-soft w-full"
            onClick={() => {
              // Signs out, then lands on sign-in with a redirect back to this
              // invitation (staying signed in would bounce straight back here).
              signOutAndRedirect();
            }}
          >
            Usar outra conta
          </button>
          <Link to="/" className="btn btn-ghost w-full">
            Ir para o painel
          </Link>
        </div>
      </AuthPageCard>
    );
  }

  if (declined) {
    return (
      <AuthPageCard title="Convite recusado">
        <p className="text-sm text-base-content/70">
          Você recusou o convite para entrar em{" "}
          <span className="font-medium">
            {invitationQuery.data.organizationName}
          </span>
          .
        </p>
        <Link to="/" className="btn btn-ghost w-full">
          Ir para o painel
        </Link>
      </AuthPageCard>
    );
  }

  return (
    <AuthPageCard title="Entrar na organização">
      <p className="text-sm text-base-content/70">
        <span className="font-medium" data-ph-mask>
          {invitationQuery.data.inviterEmail}
        </span>{" "}
        convidou você para entrar em{" "}
        <span className="font-medium">
          {invitationQuery.data.organizationName}
        </span>{" "}
        no RE9 SEO.
      </p>
      {actionError ? <p className="text-sm text-error">{actionError}</p> : null}
      <div className="space-y-2">
        <button
          type="button"
          className="btn btn-soft w-full"
          disabled={isSubmitting}
          onClick={() => void handleAccept()}
        >
          {isSubmitting ? "Entrando..." : "Aceitar convite"}
        </button>
        <button
          type="button"
          className="btn btn-ghost w-full"
          disabled={isSubmitting}
          onClick={() => void handleDecline()}
        >
          Recusar
        </button>
      </div>
    </AuthPageCard>
  );
}
