import { ToolTable } from "@/lib/free-tools/tool-table";
import { useState } from "react";
import { FIELD_CLASS, SubmitButton, ToolForm } from "@/lib/free-tools/form";
import { UpsellCard } from "@/lib/free-tools/upsell-card";
import { useToolRun } from "@/lib/free-tools/use-tool-run";

const TOOL = "domain-age-checker";
const MAX_DOMAINS = 10;

type AgeRow = {
  domain: string;
  created: string | null;
  updated: string | null;
  expires: string | null;
  registrar: string | null;
  ageYears: number | null;
  ageMonths: number | null;
  error: string | null;
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatAge(row: AgeRow): string {
  if (row.ageYears === null || row.ageMonths === null) return "—";
  const years = row.ageYears === 1 ? "1 ano" : `${row.ageYears} anos`;
  const months = row.ageMonths === 1 ? "1 mês" : `${row.ageMonths} meses`;
  return row.ageYears === 0 ? months : `${years} e ${months}`;
}

export function DomainAgeCheckerTool() {
  const [domains, setDomains] = useState("");
  const { status, errorMessage, result, run } = useToolRun<{
    rows: AgeRow[];
  }>(TOOL, "/api/domain-age-checker");

  const entered = domains
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const overLimit = entered.length > MAX_DOMAINS;

  return (
    <div>
      <ToolForm
        onSubmit={run}
        input={{ domains: entered.slice(0, MAX_DOMAINS) }}
        status={status}
        errorMessage={errorMessage}
        cacheDuration="7 dias"
      >
        <label htmlFor="age-domains" className="sr-only">
          Domínios para verificar, um por linha
        </label>
        <textarea
          id="age-domains"
          name="domains"
          rows={5}
          required
          spellCheck={false}
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          placeholder={"exemplo.com.br\nconcorrente.com.br"}
          disabled={status === "loading"}
          className={`${FIELD_CLASS} h-auto py-2.5`}
        />
        <p className="mt-2 text-xs text-[var(--color-brand-muted)]">
          Um domínio por linha, até {MAX_DOMAINS}.
        </p>
        {overLimit ? (
          <p className="mt-1 text-xs text-neutral-900">
            Você colou {entered.length} domínios. Só os {MAX_DOMAINS} primeiros
            serão verificados.
          </p>
        ) : null}
        <div className="mt-3">
          <SubmitButton
            status={status}
            idleLabel="Verificar idade do domínio"
          />
        </div>
      </ToolForm>

      {status === "done" && result ? (
        <div className="mt-6">
          <ToolTable label="Resultados do verificador de idade de domínio">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-brand-muted)]">
                  <th className="px-4 py-3 font-medium">Domínio</th>
                  <th className="px-4 py-3 font-medium">Idade</th>
                  <th className="px-4 py-3 font-medium">Registrado em</th>
                  <th className="px-4 py-3 font-medium">Atualizado em</th>
                  <th className="px-4 py-3 font-medium">Expira em</th>
                  <th className="px-4 py-3 font-medium">Registrador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-subtle)]">
                {result.rows.map((row) => (
                  <tr key={row.domain}>
                    <td className="px-4 py-3 align-top font-medium text-neutral-950">
                      {row.domain}
                    </td>
                    {row.error ? (
                      <td
                        colSpan={5}
                        className="px-4 py-3 align-top text-neutral-600"
                      >
                        {row.error}
                      </td>
                    ) : (
                      <>
                        <td className="px-4 py-3 align-top text-neutral-950">
                          {formatAge(row)}
                        </td>
                        <td className="px-4 py-3 align-top text-neutral-700">
                          {formatDate(row.created)}
                        </td>
                        <td className="px-4 py-3 align-top text-neutral-700">
                          {formatDate(row.updated)}
                        </td>
                        <td className="px-4 py-3 align-top text-neutral-700">
                          {formatDate(row.expires)}
                        </td>
                        <td className="max-w-[200px] truncate px-4 py-3 align-top text-neutral-700">
                          {row.registrar ?? "—"}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </ToolTable>

          <UpsellCard tool={TOOL} cta="Ver palavras-chave ranqueadas">
            A idade sozinha diz muito pouco. O que importa é se o domínio
            conquistou links e posições ao longo desses anos — o RE9 SEO mostra
            as duas coisas.
          </UpsellCard>
        </div>
      ) : null}
    </div>
  );
}
