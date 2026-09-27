import { createColumnHelper } from "@tanstack/react-table";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { useMemo } from "react";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { HeaderHelpLabel } from "@/client/features/keywords/components";
import { EmptyTableState } from "./BacklinksPageEmptyTableState";
import type { ReferringDomainRow } from "./backlinksPageTypes";
import type { ReferringDomainsSortField } from "@/types/schemas/backlinks";
import {
  formatCompactDate,
  formatDecimal,
  formatNumber,
} from "./backlinksPageUtils";
import type { DomainRatings } from "./useAhrefsDomainRatings";

const columnHelper = createColumnHelper<ReferringDomainRow>();

// Column ids map to server-side sort fields; sorting re-queries DataForSEO
// across all referring domains, not just the loaded page.
const baseColumns = [
  columnHelper.accessor("domain", {
    id: "domain" satisfies ReferringDomainsSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Domínio"
        helpText="Site de referência que aponta para o seu alvo."
      />
    ),
    cell: ({ getValue }) => {
      const domain = getValue();
      if (!domain) return "-";
      return (
        <SafeExternalLink
          url={getDomainWebsiteHref(domain)}
          label={domain}
          className="link link-primary link-hover break-all inline-flex items-center gap-1"
        />
      );
    },
  }),
  columnHelper.accessor("backlinks", {
    id: "backlinks" satisfies ReferringDomainsSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Backlinks"
        helpText="Total de backlinks encontrados vindos deste domínio."
      />
    ),
    cell: ({ getValue }) => formatNumber(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("referringPages", {
    id: "referringPages" satisfies ReferringDomainsSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Páginas de referência"
        helpText="Páginas únicas deste domínio que apontam para o seu alvo."
      />
    ),
    cell: ({ getValue }) => formatNumber(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("rank", {
    id: "rank" satisfies ReferringDomainsSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Autoridade"
        helpText="Pontuação de autoridade do domínio de referência."
      />
    ),
    cell: ({ getValue }) => formatNumber(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("spamScore", {
    id: "spamScore" satisfies ReferringDomainsSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Spam"
        helpText="Pontuação de risco de spam deste domínio de referência."
      />
    ),
    cell: ({ getValue }) => formatDecimal(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("firstSeen", {
    id: "firstSeen" satisfies ReferringDomainsSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Descoberto em"
        helpText="Quando este domínio foi descoberto pela primeira vez apontando para o seu alvo."
      />
    ),
    cell: ({ getValue }) => formatCompactDate(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("brokenBacklinks", {
    id: "brokenBacklinks" satisfies ReferringDomainsSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Problemas"
        helpText="Quantidade de links quebrados e páginas quebradas ligados a este domínio."
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        <div>Links quebrados: {formatNumber(row.original.brokenBacklinks)}</div>
        <div className="text-base-content/55">
          Páginas quebradas: {formatNumber(row.original.brokenPages)}
        </div>
      </div>
    ),
    sortDescFirst: true,
  }),
];

/**
 * Columns for the referring domains table. When `domainRatings` is provided
 * (the user clicked "Ahrefs DR"), an Ahrefs DR column is inserted after Rank;
 * otherwise it stays hidden. DR is loaded client-side from Ahrefs, so it can't
 * participate in server-side sorting.
 */
function buildReferringDomainColumns(domainRatings: DomainRatings | null) {
  if (!domainRatings) return baseColumns;

  const ratings = domainRatings;
  const drColumn = columnHelper.display({
    id: "ahrefsDr",
    header: () => (
      <HeaderHelpLabel
        label="Ahrefs DR"
        helpText="Domain Rating da Ahrefs (0-100) deste domínio de referência."
      />
    ),
    cell: ({ row }) => {
      const domain = row.original.domain;
      const dr = domain ? (ratings[domain] ?? null) : null;
      return dr == null ? "—" : formatDecimal(dr);
    },
  });

  const insertAt = baseColumns.findIndex((column) => column.id === "rank") + 1;
  return [
    ...baseColumns.slice(0, insertAt),
    drColumn,
    ...baseColumns.slice(insertAt),
  ];
}

function getDomainWebsiteHref(domain: string) {
  try {
    return new URL(domain).toString();
  } catch {
    return `https://${domain}`;
  }
}

export function ReferringDomainsTable({
  rows,
  domainRatings,
  sorting,
  onSortingChange,
}: {
  rows: ReferringDomainRow[];
  domainRatings: DomainRatings | null;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
}) {
  const columns = useMemo(
    () => buildReferringDomainColumns(domainRatings),
    [domainRatings],
  );

  const table = useAppTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange,
    manualSorting: true,
  });

  if (rows.length === 0) {
    return (
      <EmptyTableState label="Nenhum domínio de referência corresponde a este filtro." />
    );
  }

  return (
    <AppDataTable
      table={table}
      getCellClassName={(_, columnId) =>
        columnId === "domain" ? "font-medium break-all" : undefined
      }
    />
  );
}
