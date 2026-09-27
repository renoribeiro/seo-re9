import { z } from "zod";
import {
  LIGHTHOUSE_CATEGORIES,
  LIGHTHOUSE_CATEGORY_TABS,
} from "@/shared/lighthouse";

export const lighthouseAuditIssueSchema = z.object({
  projectId: z.string().min(1, "Informe o ID do projeto"),
  resultId: z.string().min(1, "Informe o ID do resultado"),
});

export const lighthouseAuditExportSchema = z.object({
  projectId: z.string().min(1, "Informe o ID do projeto"),
  resultId: z.string().min(1, "Informe o ID do resultado"),
  mode: z.enum(["full", "issues", "category"]),
  category: z.enum(LIGHTHOUSE_CATEGORIES).optional(),
});

export const lighthouseIssuesSearchSchema = z.object({
  auditId: z.string().optional().catch(undefined),
  category: z.enum(LIGHTHOUSE_CATEGORY_TABS).catch("all").default("all"),
});
