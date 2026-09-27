import { createColumnHelper } from "@tanstack/react-table";
import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import {
  AppDataTable,
  useAppTable,
} from "@/client/components/table/AppDataTable";
import { SortableHeader } from "@/client/components/table/SortableHeader";
import { HeaderHelpLabel } from "@/client/features/keywords/components";
import { EmptyTableState } from "./BacklinksPageEmptyTableState";
import type { TopPageRow } from "./backlinksPageTypes";
import type { TopPagesSortField } from "@/types/schemas/backlinks";
import { formatNumber } from "./backlinksPageUtils";

const columnHelper = createColumnHelper<TopPageRow>();

// Column ids map to server-side sort fields; sorting re-queries DataForSEO
// across all pages, not just the loaded page of results.
const columns = [
  columnHelper.accessor("page", {
    id: "page",
    enableSorting: false,
    header: () => (
      <HeaderHelpLabel
        label="Página"
        helpText="Página do site-alvo que recebe backlinks."
      />
    ),
    cell: ({ getValue }) => {
      const page = getValue();
      return page ? (
        <SafeExternalLink
          url={page}
          label={page}
          className="link link-hover break-all inline-flex items-center gap-1"
        />
      ) : (
        "-"
      );
    },
  }),
  columnHelper.accessor("backlinks", {
    id: "backlinks" satisfies TopPagesSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Backlinks"
        helpText="Total de backlinks que apontam para esta página."
      />
    ),
    cell: ({ getValue }) => formatNumber(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("referringDomains", {
    id: "referringDomains" satisfies TopPagesSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Domínios de referência"
        helpText="Domínios únicos que apontam para esta página."
      />
    ),
    cell: ({ getValue }) => formatNumber(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("rank", {
    id: "rank" satisfies TopPagesSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Autoridade"
        helpText="Pontuação de autoridade desta página de destino."
      />
    ),
    cell: ({ getValue }) => formatNumber(getValue()),
    sortDescFirst: true,
  }),
  columnHelper.accessor("brokenBacklinks", {
    id: "brokenBacklinks" satisfies TopPagesSortField,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Backlinks quebrados"
        helpText="Backlinks que apontam para cá e estão quebrados no momento."
      />
    ),
    cell: ({ getValue }) => formatNumber(getValue()),
    sortDescFirst: true,
  }),
];

export function TopPagesTable({
  rows,
  sorting,
  onSortingChange,
}: {
  rows: TopPageRow[];
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
}) {
  const table = useAppTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange,
    manualSorting: true,
  });

  if (rows.length === 0) {
    return (
      <EmptyTableState label="Nenhuma página corresponde a este filtro." />
    );
  }

  return (
    <AppDataTable
      table={table}
      getCellClassName={(_, columnId) =>
        columnId === "page" ? "min-w-80" : undefined
      }
    />
  );
}
