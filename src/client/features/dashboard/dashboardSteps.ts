import { Bot, FolderPlus, Globe, Search, Users } from "lucide-react";
import type { DashboardActivation } from "@/server/features/dashboard/services/DashboardService";
import type { DashboardSetupStep } from "@/types/schemas/dashboard";

export const setupSteps: {
  id: DashboardSetupStep;
  label: string;
  detail: string;
  icon: typeof Globe;
}[] = [
  {
    id: "domain",
    label: "Adicione seu site",
    detail: "Defina o site e o país deste projeto.",
    icon: Globe,
  },
  {
    id: "project",
    label: "Trabalha com vários sites?",
    detail:
      "Crie outro projeto ou deixe seu agente de IA configurar uma lista de sites.",
    icon: FolderPlus,
  },
  {
    id: "competitor",
    label: "Explore um concorrente",
    detail: "Encontre temas e links com os quais vale a pena aprender.",
    icon: Search,
  },
  {
    id: "mcp",
    label: "Conecte seu agente de IA",
    detail: "Use o RE9 SEO dentro do Claude ou do seu agente favorito.",
    icon: Bot,
  },
  {
    id: "gsc",
    label: "Conecte o Search Console",
    detail: "Veja seus cliques e consultas reais.",
    icon: Search,
  },
  {
    id: "team",
    label: "Convide alguém da equipe",
    detail: "Divida o trabalho ou siga sozinho por enquanto.",
    icon: Users,
  },
];

export function getStepStatus(
  activation: DashboardActivation,
  step: DashboardSetupStep,
): "done" | "skipped" | "todo" {
  const completed: Record<DashboardSetupStep, boolean> = {
    domain: activation.domain !== null,
    project: activation.hasMultipleProjects,
    competitor: activation.competitorClickedAt !== null,
    mcp:
      activation.mcp.authorizedAt !== null ||
      activation.mcp.firstToolCallAt !== null,
    gsc: activation.gsc.connected,
    team: activation.hasTeammate,
  };
  if (completed[step]) return "done";
  // Preserve previous MCP dismissals without treating them as authorization.
  if (
    activation.dismissedSteps.includes(step) ||
    (step === "mcp" && activation.mcp.cardDismissedAt !== null)
  )
    return "skipped";
  return "todo";
}
