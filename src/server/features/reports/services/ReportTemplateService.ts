import { ReportTemplateRepository } from "@/server/features/reports/repositories/ReportTemplateRepository";
import { AppError } from "@/server/lib/errors";
import { formatCount } from "@/shared/format";
import {
  REPORT_TEMPLATE_MAX_DESCRIPTION_CHARS,
  REPORT_TEMPLATE_MAX_INSTRUCTIONS_CHARS,
  REPORT_TEMPLATE_MAX_NAME_CHARS,
  REPORT_TEMPLATE_MAX_PER_PROJECT,
  type ReportTemplate,
} from "@/types/schemas/report-templates";

// Report templates: the named briefs agents follow when writing a report.
// Every caller (server function, MCP tool, SAM) comes through here, so the caps
// and the refusal copy exist once. Authorization is NOT done here — the caller
// has already authorized `projectId` and every query is scoped to it.

/** This project's templates, and the room left under the cap. */
async function listReportTemplates(projectId: string): Promise<{
  templates: ReportTemplate[];
  remaining: number;
}> {
  const templates = await ReportTemplateRepository.listTemplates(projectId);
  return {
    templates,
    remaining: Math.max(0, REPORT_TEMPLATE_MAX_PER_PROJECT - templates.length),
  };
}

async function getReportTemplate(
  projectId: string,
  templateId: string,
): Promise<ReportTemplate> {
  const template = await ReportTemplateRepository.getTemplate(
    projectId,
    templateId,
  );
  if (!template) throw notFound(templateId);
  return template;
}

function notFound(templateId: string) {
  return new AppError(
    "NOT_FOUND",
    `Não há modelo de relatório ${templateId} neste projeto. Chame list_report_templates para ver o que existe.`,
  );
}

type SaveParams = {
  projectId: string;
  templateId?: string;
  name: string;
  description: string;
  instructions: string;
  /** Client label, stamped by the server. Never taken from the model. */
  createdBy: string;
  /** From the authenticated context, and nowhere else. */
  createdByUserId: string;
};

/**
 * Create-or-update in one call. Everything is validated before anything is
 * written, so a rejected save leaves the stored template untouched.
 */
export async function saveReportTemplate(params: SaveParams): Promise<{
  templateId: string;
  name: string;
  created: boolean;
}> {
  const name = params.name.trim();
  const description = params.description.trim();
  const instructions = params.instructions.trim();

  if (name.length === 0) {
    throw new AppError("VALIDATION_ERROR", "Dê um nome ao modelo.");
  }
  if (name.length > REPORT_TEMPLATE_MAX_NAME_CHARS) {
    throw new AppError(
      "VALIDATION_ERROR",
      `O nome tem ${formatCount(name.length)} caracteres; o limite é ${formatCount(REPORT_TEMPLATE_MAX_NAME_CHARS)}. Encurte-o e salve novamente.`,
    );
  }
  if (description.length === 0) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Adicione uma descrição de uma linha dizendo quando usar este modelo. É o que um agente lê para decidir.",
    );
  }
  if (description.length > REPORT_TEMPLATE_MAX_DESCRIPTION_CHARS) {
    throw new AppError(
      "VALIDATION_ERROR",
      `A descrição tem ${formatCount(description.length)} caracteres; o limite é ${formatCount(REPORT_TEMPLATE_MAX_DESCRIPTION_CHARS)}. Ela é uma linha dizendo quando usar o modelo — mova os detalhes para as instruções.`,
    );
  }
  if (instructions.length === 0) {
    throw new AppError(
      "VALIDATION_ERROR",
      "Adicione instruções: o público, as seções em ordem, o tom e o encerramento.",
    );
  }
  if (instructions.length > REPORT_TEMPLATE_MAX_INSTRUCTIONS_CHARS) {
    throw new AppError(
      "VALIDATION_ERROR",
      `As instruções têm ${formatCount(instructions.length)} caracteres; o limite é ${formatCount(REPORT_TEMPLATE_MAX_INSTRUCTIONS_CHARS)}. Um modelo é um briefing, não o relatório — diga o público, as seções em ordem, o tom e o encerramento, e corte o resto.`,
    );
  }

  // One read serves the existence check, the duplicate-name check and the cap.
  const templates = await ReportTemplateRepository.listTemplates(
    params.projectId,
  );
  const existing = params.templateId
    ? templates.find((template) => template.id === params.templateId)
    : undefined;
  if (params.templateId && !existing) {
    throw new AppError(
      "NOT_FOUND",
      `Não há modelo de relatório ${params.templateId} neste projeto. Chame list_report_templates ou omita templateId para criar um novo.`,
    );
  }

  // A name that appears twice in a project makes "use the monthly check-in
  // template" ambiguous, so a rename clears the same bar as a create.
  const lowerName = name.toLowerCase();
  const clash = templates.find(
    (template) =>
      template.name.toLowerCase() === lowerName && template.id !== existing?.id,
  );
  if (clash) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Já existe um modelo chamado "${clash.name}" neste projeto (id ${clash.id}). Passe o templateId dele para atualizá-lo ou escolha outro nome.`,
    );
  }

  if (existing) {
    await ReportTemplateRepository.updateTemplate({
      templateId: existing.id,
      projectId: params.projectId,
      name,
      description,
      instructions,
    });
    return { templateId: existing.id, name, created: false };
  }

  // Plain read-then-write: concurrent saves can both pass at the cap, which is
  // accepted — this is a guardrail, not an invariant, and the next save refuses.
  if (templates.length >= REPORT_TEMPLATE_MAX_PER_PROJECT) {
    throw new AppError(
      "VALIDATION_ERROR",
      `Este projeto tem ${formatCount(REPORT_TEMPLATE_MAX_PER_PROJECT)} modelos de relatório, o limite. Exclua um na página Modelos.`,
    );
  }

  const id = crypto.randomUUID();
  await ReportTemplateRepository.insertTemplate({
    id,
    projectId: params.projectId,
    name,
    description,
    instructions,
    createdBy: params.createdBy,
    createdByUserId: params.createdByUserId,
  });
  return { templateId: id, name, created: true };
}

export async function deleteReportTemplate(
  projectId: string,
  templateId: string,
): Promise<void> {
  const deleted = await ReportTemplateRepository.deleteTemplate(
    projectId,
    templateId,
  );
  if (!deleted) throw notFound(templateId);
}

export const ReportTemplateService = {
  listReportTemplates,
  getReportTemplate,
  saveReportTemplate,
  deleteReportTemplate,
} as const;
