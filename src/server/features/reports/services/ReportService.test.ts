import { beforeEach, describe, expect, it, vi } from "vitest";
import { isHostedServerAuthMode } from "@/server/lib/runtime-env";
import { formatCount } from "@/shared/format";
import {
  REPORT_MAX_BYTES_PER_ORG,
  REPORT_MAX_PER_PROJECT,
} from "@/types/schemas/reports";
import {
  deleteReport,
  getReport,
  ReportService,
  saveReport,
} from "./ReportService";

const mocks = vi.hoisted(() => ({
  listReports: vi.fn(),
  getReport: vi.fn(),
  findReportByTitle: vi.fn(),
  countReports: vi.fn(),
  sumReportBytesForOrganization: vi.fn(),
  insertReport: vi.fn(),
  updateReportContent: vi.fn(),
  deleteReport: vi.fn(),
  setShareToken: vi.fn(),
}));

vi.mock("@/server/features/reports/repositories/ReportRepository", () => ({
  ReportRepository: mocks,
}));
vi.mock("@/server/lib/posthog", () => ({ captureServerEvent: vi.fn() }));
vi.mock("@/server/lib/runtime-env", () => ({
  isHostedServerAuthMode: vi.fn(),
}));

const html = "<!doctype html><html><body>Hi</body></html>";

const save = (overrides: Partial<Parameters<typeof saveReport>[0]> = {}) =>
  saveReport({
    projectId: "project_1",
    organizationId: "org_1",
    title: "badseo.dev SEO audit, Sep 2026",
    summary: "One clear verdict.",
    html,
    createdBy: "Claude Code",
    createdByUserId: "user_1",
    ...overrides,
  });

const storedReport = {
  id: "report_1",
  projectId: "project_1",
  title: "badseo.dev SEO audit, Sep 2026",
  summary: "One clear verdict.",
  skill: "seo-audit",
  createdBy: "Codex",
  createdByUserId: "user_original",
  sizeBytes: 42,
  shareToken: null,
  sharedAt: null,
  createdAt: "2026-09-01T10:00:00.000Z",
  updatedAt: "2026-09-01T10:00:00.000Z",
};

describe("saveReport", () => {
  beforeEach(() => {
    mocks.findReportByTitle.mockResolvedValue(null);
    mocks.countReports.mockResolvedValue(0);
    mocks.sumReportBytesForOrganization.mockResolvedValue(0);
    mocks.getReport.mockResolvedValue(storedReport);
  });

  it("updates in place, keeping the stored skill and attribution", async () => {
    const result = await save({ reportId: "report_1", title: "New title" });

    expect(result).toEqual({
      reportId: "report_1",
      title: "New title",
      created: false,
      htmlBytes: html.length,
    });
    expect(mocks.insertReport).not.toHaveBeenCalled();
    // Exact payload: the attribution columns are absent, so an overwrite keeps
    // the original saver, and an omitted `skill` keeps the stored slug rather
    // than clearing it.
    expect(mocks.updateReportContent).toHaveBeenCalledWith({
      reportId: "report_1",
      projectId: "project_1",
      title: "New title",
      summary: "One clear verdict.",
      html,
      skill: "seo-audit",
      sizeBytes: html.length,
    });
  });

  it("refuses an unknown reportId", async () => {
    mocks.getReport.mockResolvedValue(null);

    await expect(save({ reportId: "report_gone" })).rejects.toThrow(
      "Não há relatório report_gone neste projeto. Chame list_reports ou omita reportId para criar um novo.",
    );
    expect(mocks.updateReportContent).not.toHaveBeenCalled();
  });

  it("refuses an over-long title and writes nothing", async () => {
    await expect(save({ title: "T".repeat(143) })).rejects.toThrow(
      "O título tem 143 caracteres; o limite é 120. Encurte-o e salve novamente.",
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("refuses an over-long summary", async () => {
    await expect(save({ summary: "s".repeat(2720) })).rejects.toThrow(
      "O resumo tem 2,720 caracteres; o limite é 2,500. Encurte-o e salve novamente.",
    );
  });

  it("measures the byte cap in UTF-8, not code units", async () => {
    // 320,000 two-byte characters: under the cap by String.length, over it by
    // the bytes that actually reach the column.
    await expect(save({ html: "é".repeat(320_000) })).rejects.toThrow(
      "O relatório tem 640 KB; o limite é 500 KB. Imagens embutidas costumam ser a causa. Remova-as e salve novamente.",
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("refuses a document that stopped mid-write", async () => {
    await expect(save({ html: "<html><body>half a repo" })).rejects.toThrow(
      "O HTML não tem o fechamento </html>; o modelo parou antes do fim. No Codex, escape as crases e ${.",
    );
  });

  it("refuses a rename onto another report's title", async () => {
    mocks.findReportByTitle.mockResolvedValue({
      id: "report_2",
      title: "Taken",
    });

    await expect(
      save({ reportId: "report_1", title: "Taken" }),
    ).rejects.toThrow(
      "Já existe um relatório com o título 'Taken' (id report_2). Passe reportId para atualizá-lo ou altere o título.",
    );
    expect(mocks.updateReportContent).not.toHaveBeenCalled();
  });

  it("refuses a create at the per-project cap", async () => {
    mocks.countReports.mockResolvedValue(REPORT_MAX_PER_PROJECT);

    await expect(save()).rejects.toThrow(
      `Este projeto tem ${formatCount(REPORT_MAX_PER_PROJECT)} relatórios, o limite. Exclua um na página Relatórios.`,
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("applies the cap to creates only, not updates", async () => {
    mocks.countReports.mockResolvedValue(REPORT_MAX_PER_PROJECT);

    await expect(save({ reportId: "report_1" })).resolves.toMatchObject({
      created: false,
    });
  });

  // The per-project cap bounds nothing on its own: projects are unlimited, and
  // save_report is free, so this is the guardrail on total storage.
  it("refuses a save that would push the organization over its byte ceiling", async () => {
    mocks.sumReportBytesForOrganization.mockResolvedValue(
      REPORT_MAX_BYTES_PER_ORG,
    );

    await expect(save()).rejects.toThrow(
      `Esta organização está armazenando ${formatCount(REPORT_MAX_BYTES_PER_ORG / 1_000_000)} MB de relatórios, o limite. Exclua os relatórios de que não precisa mais na página Relatórios.`,
    );
    expect(mocks.insertReport).not.toHaveBeenCalled();
  });

  it("counts an update against the ceiling net of the bytes it replaces", async () => {
    // At the ceiling, but the row being replaced is bigger than the new one.
    mocks.sumReportBytesForOrganization.mockResolvedValue(
      REPORT_MAX_BYTES_PER_ORG,
    );
    mocks.getReport.mockResolvedValue({ ...storedReport, sizeBytes: 1_000 });

    await expect(save({ reportId: "report_1" })).resolves.toMatchObject({
      created: false,
    });
  });
});

describe("reads and deletes", () => {
  it("scopes a read to the project and refuses an unknown id", async () => {
    mocks.getReport.mockResolvedValue(null);

    await expect(getReport("project_1", "report_gone")).rejects.toThrow(
      "Não há relatório report_gone neste projeto. Chame list_reports para ver o que existe.",
    );
    expect(mocks.getReport).toHaveBeenCalledWith("project_1", "report_gone");
  });

  it("refuses a delete whose id is not in this project", async () => {
    mocks.deleteReport.mockResolvedValue(false);

    await expect(deleteReport("project_1", "report_gone")).rejects.toThrow(
      "Não há relatório report_gone neste projeto.",
    );
    expect(mocks.deleteReport).toHaveBeenCalledWith("project_1", "report_gone");
  });
});

describe("sharing", () => {
  const share = () =>
    ReportService.shareReport({
      projectId: "project_1",
      reportId: "report_1",
      userId: "user_1",
      organizationId: "org_1",
    });

  beforeEach(() => {
    vi.mocked(isHostedServerAuthMode).mockResolvedValue(true);
    mocks.getReport.mockResolvedValue(storedReport);
  });

  it("mints, revokes and re-mints a different token", async () => {
    const first = await share();

    expect(first.shareToken).toMatch(/^[A-Za-z0-9_-]{32}$/);
    expect(mocks.setShareToken).toHaveBeenCalledWith("project_1", "report_1", {
      shareToken: first.shareToken,
      sharedAt: first.sharedAt,
    });

    mocks.getReport.mockResolvedValue({
      ...storedReport,
      shareToken: first.shareToken,
      sharedAt: first.sharedAt,
    });
    await expect(
      ReportService.unshareReport({
        projectId: "project_1",
        reportId: "report_1",
        userId: "user_1",
        organizationId: "org_1",
      }),
    ).resolves.toMatchObject({ shareToken: null, sharedAt: null });
    expect(mocks.setShareToken).toHaveBeenLastCalledWith(
      "project_1",
      "report_1",
      null,
    );

    mocks.getReport.mockResolvedValue(storedReport);
    const second = await share();
    expect(second.shareToken).not.toBe(first.shareToken);
  });

  // A double-clicked toggle must not invalidate the link the user just copied.
  it("returns the existing token instead of minting a second one", async () => {
    mocks.getReport.mockResolvedValue({
      ...storedReport,
      shareToken: "a".repeat(32),
      sharedAt: "2026-09-10T10:00:00.000Z",
    });

    await expect(share()).resolves.toMatchObject({
      shareToken: "a".repeat(32),
      sharedAt: "2026-09-10T10:00:00.000Z",
    });
    expect(mocks.setShareToken).not.toHaveBeenCalled();
  });

  // A self-hosted deployment cannot serve the link, so a minted token would be
  // a link that silently does nothing. Refused before the report is even read.
  it("refuses to mint when the deployment is not hosted", async () => {
    vi.mocked(isHostedServerAuthMode).mockResolvedValue(false);

    await expect(share()).rejects.toThrow(
      "O compartilhamento só está disponível no RE9 SEO hospedado.",
    );
    expect(mocks.setShareToken).not.toHaveBeenCalled();
    expect(mocks.getReport).not.toHaveBeenCalled();
  });
});
