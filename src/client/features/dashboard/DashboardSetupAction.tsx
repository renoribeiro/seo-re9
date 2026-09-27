import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAgentSetupPrompt } from "@/client/features/ai-mcp/agentSetupPrompt";
import {
  AgentSetupPanel,
  AGENT_SETUP_DESCRIPTION,
} from "@/client/features/ai-mcp/AgentSetupPanel";
import { CopyButton } from "@/client/features/ai-mcp/SetupControls";
import { SearchConsoleConnectionCard } from "@/client/features/gsc/SearchConsoleConnectionCard";
import { CreateProjectModal } from "@/client/features/projects/CreateProjectModal";
import { ProjectMarketFields } from "@/client/features/projects/ProjectMarketFields";
import type { ProjectSummary } from "@/client/features/projects/types";
import { InviteTeammateModal } from "@/client/features/team/InviteTeammateModal";
import { organizationContextQueryOptions } from "@/client/features/team/organizationQueries";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import { captureClientEvent } from "@/client/lib/posthog";
import { hasOrgPermission } from "@/lib/org-permissions";
import { getProjects, setProjectWebsite } from "@/serverFunctions/projects";
import { markDashboardCompetitorClicked } from "@/serverFunctions/dashboard";
import type { DashboardSetupStep } from "@/types/schemas/dashboard";
import { parseResearchTarget } from "@/shared/researchScope";

const projectPrompt = `Use o RE9 SEO para criar um projeto separado para cada site abaixo. Liste primeiro meus projetos existentes e reaproveite os que coincidirem, para não criar duplicados. Defina o país e o idioma de cada site e me pergunte sobre o que estiver faltando.

Substitua esta lista pelos meus sites:
- Nome do projeto — site — país — idioma`;

export function DashboardSetupAction({
  step,
  projectId,
  onComplete,
}: {
  step: DashboardSetupStep;
  projectId: string;
  onComplete: () => void;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const org = useQuery(organizationContextQueryOptions());
  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    enabled: step === "domain",
  });
  const project = projects.data?.find((item) => item.id === projectId);
  const competitor = useMutation({
    mutationFn: () => markDashboardCompetitorClicked({ data: { projectId } }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dashboardActivation", projectId],
      });
      onComplete();
      void navigate({ to: "/p/$projectId/domain", params: { projectId } });
    },
    onError: (error) => toast.error(getStandardErrorMessage(error)),
  });
  if (step === "domain")
    return project ? (
      <WebsiteForm project={project} onComplete={onComplete} />
    ) : projects.isError ? (
      <p role="alert" className="text-sm text-error">
        {getStandardErrorMessage(projects.error)}
      </p>
    ) : (
      <div className="skeleton h-36" aria-busy />
    );
  if (step === "mcp")
    return (
      <div className="max-w-2xl space-y-4">
        <p className="text-sm leading-relaxed text-base-content/65">
          {AGENT_SETUP_DESCRIPTION}
        </p>
        <AgentSetupPanel
          prompt={getAgentSetupPrompt(
            typeof window === "undefined"
              ? "https://seo.agenciare9.com.br"
              : window.location.origin,
          )}
          onCopy={() =>
            captureClientEvent("onboarding:setup_prompt_copy", {
              source: "dashboard",
            })
          }
        />
      </div>
    );
  if (step === "competitor")
    return (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-base-content/65">
          Explore o domínio de um concorrente para descobrir os temas em que ele
          ranqueia e os sites que apontam links para ele.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={competitor.isPending}
          onClick={() => competitor.mutate()}
        >
          Abrir consulta de domínio
        </button>
      </div>
    );

  const canManage =
    org.data &&
    hasOrgPermission(
      org.data.role,
      step === "project"
        ? { project: ["create"] }
        : step === "team"
          ? { invitation: ["create"] }
          : { integration: ["manage"] },
    );
  if (!canManage)
    return (
      <p className="text-sm text-base-content/65">
        {org.isPending
          ? "Verificando permissões do espaço de trabalho…"
          : org.isError
            ? getStandardErrorMessage(org.error)
            : "Peça ajuda com esta etapa a um proprietário ou administrador do espaço de trabalho."}
      </p>
    );
  if (step === "gsc")
    return (
      <SearchConsoleConnectionCard
        projectId={projectId}
        returnTo={
          typeof window === "undefined"
            ? undefined
            : `${window.location.href.split("#")[0]}#connect-gsc`
        }
      />
    );
  if (step === "project")
    return (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-base-content/65">
          Mantenha as pesquisas, os ranqueamentos e as conexões de cada site em
          um projeto próprio. Use o seletor de projetos na barra lateral → Novo
          projeto quando quiser.
        </p>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowModal(true)}
        >
          Criar outro projeto
        </button>
        <details className="rounded-lg border border-base-300 p-4">
          <summary className="cursor-pointer text-sm font-medium">
            Tem uma lista de sites? Deixe seu agente configurá-los.
          </summary>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-base-content/65">
              <Link to="/ai" className="link">
                Conecte seu agente
              </Link>{" "}
              e depois cole este prompt com a sua lista de sites.
            </p>
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-base-content/65">
              {projectPrompt}
            </pre>
            <CopyButton
              value={projectPrompt}
              label="Copiar prompt de projetos"
              successMessage="Prompt de projetos copiado"
            />
          </div>
        </details>
        {showModal && (
          <CreateProjectModal onClose={() => setShowModal(false)} />
        )}
      </div>
    );
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-base-content/65">
        Traga alguém da equipe para o seu espaço de trabalho e compartilhe
        projetos, pesquisas e resultados.
      </p>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => setShowModal(true)}
      >
        Convidar alguém da equipe
      </button>
      {showModal && (
        <InviteTeammateModal
          onClose={() => setShowModal(false)}
          onInvited={() => {
            void queryClient.invalidateQueries({
              queryKey: ["organization-team"],
            });
            void queryClient.invalidateQueries({
              queryKey: ["dashboardActivation"],
            });
          }}
        />
      )}
    </div>
  );
}

function WebsiteForm({
  project,
  onComplete,
}: {
  project: ProjectSummary;
  onComplete: () => void;
}) {
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: (value: {
      domain: string;
      locationCode: number;
      languageCode: string;
    }) => setProjectWebsite({ data: { projectId: project.id, ...value } }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardActivation", project.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardOverview", project.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["projectAccess", project.id],
        }),
      ]);
      toast.success("Site salvo");
      onComplete();
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(
          error,
          "Não foi possível salvar seu site. Tente novamente.",
        ),
      ),
  });
  const form = useForm({
    defaultValues: {
      domain: project.domain ?? "",
      market: {
        locationCode: project.locationCode,
        languageCode: project.languageCode,
      },
    },
    onSubmit: ({ value }) =>
      save.mutate({ domain: value.domain.trim(), ...value.market }),
  });
  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <p className="text-sm leading-relaxed text-base-content/65">
        Adicione o site deste projeto e escolha o país de onde seus clientes
        fazem buscas. Você pode alterar isso quando quiser nas configurações do
        projeto.
      </p>
      <form.Field
        name="domain"
        validators={{
          onChange: ({ value }) => {
            const parsed = parseResearchTarget(value);
            return parsed.ok ? undefined : parsed.message;
          },
        }}
      >
        {(field) => (
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Site</span>
            <input
              type="text"
              required
              maxLength={255}
              placeholder="exemplo.com.br"
              className="input input-bordered w-full"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <span className="text-xs text-error">
                {field.state.meta.errors.join(", ")}
              </span>
            )}
          </label>
        )}
      </form.Field>
      <form.Field name="market">
        {(field) => (
          <ProjectMarketFields
            value={field.state.value}
            onChange={field.handleChange}
          />
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!canSubmit || isSubmitting || save.isPending}
          >
            {save.isPending ? "Salvando…" : "Salvar site"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
