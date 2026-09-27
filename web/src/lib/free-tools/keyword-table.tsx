import { ToolTable } from "./tool-table";
import { formatCount } from "./metric-grid";
import type { RankedKeywordRow as KeywordRow } from "./labs";

export function KeywordTable({
  rows,
  showTraffic = false,
}: {
  rows: Array<KeywordRow & { traffic?: number | null }>;
  showTraffic?: boolean;
}) {
  if (rows.length === 0) {
    return (
      <p className="mt-3 rounded-lg border border-[var(--color-border-subtle)] bg-white p-5 text-sm text-neutral-700">
        Nenhuma palavra-chave ranqueada encontrada nos dados disponíveis para
        este país.
      </p>
    );
  }

  return (
    <ToolTable
      label={
        showTraffic
          ? "Palavras-chave só do concorrente"
          : "Principais palavras-chave do concorrente"
      }
      className="mt-3"
    >
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border-subtle)] text-xs text-[var(--color-brand-muted)]">
            <th className="px-4 py-3 font-medium">Palavra-chave</th>
            <th className="px-4 py-3 font-medium">Volume</th>
            <th className="px-4 py-3 font-medium">Dificuldade</th>
            <th className="px-4 py-3 font-medium">Posição</th>
            {showTraffic ? (
              <th className="px-4 py-3 font-medium">Tráfego</th>
            ) : null}
            <th className="px-4 py-3 font-medium">URL ranqueada</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-subtle)]">
          {rows.map((row) => (
            <tr key={`${row.keyword}-${row.url}`}>
              <td className="max-w-[240px] truncate px-4 py-3 align-top font-medium text-neutral-950">
                {row.keyword ?? "—"}
              </td>
              <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                {formatCount(row.searchVolume)}
              </td>
              <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                {formatCount(row.difficulty)}
              </td>
              <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                {formatCount(row.position)}
              </td>
              {showTraffic ? (
                <td className="px-4 py-3 align-top tabular-nums text-neutral-700">
                  {formatCount(row.traffic ?? null)}
                </td>
              ) : null}
              <td className="max-w-[260px] px-4 py-3 align-top">
                {row.url ? (
                  <a
                    href={row.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block truncate text-xs text-[var(--color-brand-muted)] hover:text-neutral-900 hover:underline"
                  >
                    {row.url}
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ToolTable>
  );
}
