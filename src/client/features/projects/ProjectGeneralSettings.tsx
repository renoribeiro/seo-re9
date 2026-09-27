import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProjectMarketFields } from "@/client/features/projects/ProjectMarketFields";
import { getStandardErrorMessage } from "@/client/lib/error-messages";
import {
  clearLastProjectId,
  getLastProjectId,
} from "@/client/lib/active-project";
import {
  archiveProject,
  getProjects,
  updateProject,
} from "@/serverFunctions/projects";
import type { ProjectSummary } from "./types";

export function ProjectGeneralSettings({ projectId }: { projectId: string }) {
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  const projects = projectsQuery.data ?? [];
  const project = projects.find((entry) => entry.id === projectId) ?? null;

  if (!project) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* key resets the form's local state when switching between projects */}
      <GeneralSection key={project.id} project={project} />
      <DangerSection project={project} canArchive={projects.length > 1} />
    </div>
  );
}

function GeneralSection({ project }: { project: ProjectSummary }) {
  const queryClient = useQueryClient();
  const [name, setName] = React.useState(project.name);
  const [domain, setDomain] = React.useState(project.domain ?? "");
  const [market, setMarket] = React.useState({
    locationCode: project.locationCode,
    languageCode: project.languageCode,
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateProject({
        data: {
          projectId: project.id,
          name: name.trim(),
          domain: domain.trim() || undefined,
          ...market,
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projeto atualizado");
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(error, "Não foi possível atualizar o projeto"),
      ),
  });

  const isDirty =
    name.trim() !== project.name ||
    (domain.trim() || "") !== (project.domain ?? "") ||
    market.locationCode !== project.locationCode ||
    market.languageCode !== project.languageCode;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (updateMutation.isPending) return;
    if (!name.trim()) {
      toast.error("Informe o nome do projeto");
      return;
    }
    updateMutation.mutate();
  };

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-base-content/50">Geral</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Nome</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={120}
            className="input input-bordered w-full"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">
            Domínio <span className="text-base-content/50">(opcional)</span>
          </span>
          <input
            type="text"
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            placeholder="exemplo.com.br"
            maxLength={255}
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <ProjectMarketFields value={market} onChange={setMarket} />
          <span className="text-xs text-base-content/50">
            Os dados de palavras-chave, SERP e domínio usam este país e idioma,
            a menos que uma consulta peça outros.
          </span>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={updateMutation.isPending || !isDirty}
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </section>
  );
}

function DangerSection({
  project,
  canArchive,
}: {
  project: ProjectSummary;
  canArchive: boolean;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = React.useState(false);

  const archiveMutation = useMutation({
    mutationFn: () => archiveProject({ data: { projectId: project.id } }),
    onSuccess: async () => {
      if (getLastProjectId() === project.id) clearLastProjectId();
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Projeto arquivado");
      // Re-resolve to a remaining project via the landing redirect.
      void navigate({ to: "/" });
    },
    onError: (error) =>
      toast.error(
        getStandardErrorMessage(error, "Não foi possível arquivar o projeto"),
      ),
  });

  return (
    <section className="space-y-3 border-t border-base-300 pt-8">
      <h2 className="text-sm font-medium text-base-content/50">
        Arquivar projeto
      </h2>

      {confirming ? (
        <div className="space-y-3">
          <p className="text-sm text-base-content/70">
            Arquivar{" "}
            <span className="font-medium text-base-content">
              {project.name}
            </span>{" "}
            remove o projeto do seu espaço de trabalho e interrompe o
            monitoramento de posições agendado. Você pode restaurá-lo depois na
            página Projetos.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-error btn-sm"
              onClick={() => archiveMutation.mutate()}
              disabled={archiveMutation.isPending}
            >
              Sim, arquivar projeto
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setConfirming(false)}
              disabled={archiveMutation.isPending}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-base-content/60">
            {canArchive
              ? "Arquive este projeto para removê-lo da sua organização."
              : "Você não pode arquivar seu único projeto."}
          </p>
          <button
            type="button"
            className="btn btn-outline btn-error btn-sm shrink-0"
            onClick={() => setConfirming(true)}
            disabled={!canArchive}
          >
            Arquivar projeto
          </button>
        </div>
      )}
    </section>
  );
}
