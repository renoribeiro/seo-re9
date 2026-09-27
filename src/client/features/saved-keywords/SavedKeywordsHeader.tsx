import {
  ChevronDown,
  Download,
  FileDown,
  Loader2,
  RefreshCw,
  Sheet,
} from "lucide-react";

export function SavedKeywordsHeader({
  totalCount,
  exporting,
  metricsRefreshing,
  onExportCsv,
  onExportSheets,
  onRefreshMetrics,
}: {
  totalCount: number;
  exporting: "csv" | "sheets" | null;
  metricsRefreshing: boolean;
  onExportCsv: () => void;
  onExportSheets: () => void;
  onRefreshMetrics: () => void;
}) {
  const disabled = totalCount === 0 || exporting != null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Palavras-chave salvas</h1>
        <p className="text-sm text-base-content/70">
          Salve ideias de palavras-chave da pesquisa, organize com tags e volte
          a elas quando estiver pronto para agir.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            disabled={disabled || metricsRefreshing}
            aria-haspopup="menu"
            className={`btn btn-ghost btn-sm gap-1.5 ${disabled || metricsRefreshing ? "btn-disabled" : ""}`}
          >
            <RefreshCw
              className={`size-4 ${metricsRefreshing ? "animate-spin" : ""}`}
            />
            {metricsRefreshing ? "Atualizando..." : "Ações"}
            <ChevronDown className="size-3 opacity-60" />
          </button>
          <ul
            tabIndex={0}
            role="menu"
            className="dropdown-content menu z-10 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
          >
            <li>
              <button
                type="button"
                onClick={onRefreshMetrics}
                disabled={disabled || metricsRefreshing}
              >
                <RefreshCw className="size-4" />
                <span className="flex flex-col items-start">
                  <span>Atualizar métricas das palavras-chave</span>
                  <span className="text-xs text-base-content/50">
                    Volume, dificuldade e CPC
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            disabled={disabled}
            aria-haspopup="menu"
            className={`btn btn-ghost btn-sm gap-1.5 ${disabled ? "btn-disabled" : ""}`}
          >
            {exporting != null ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            Exportar
            <ChevronDown className="size-3 opacity-60" />
          </button>
          <ul
            tabIndex={0}
            role="menu"
            className="dropdown-content menu z-10 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
          >
            <li>
              <button
                type="button"
                onClick={onExportSheets}
                disabled={disabled}
              >
                <Sheet className="size-4" />
                Exportar para o Sheets
              </button>
            </li>
            <li>
              <button type="button" onClick={onExportCsv} disabled={disabled}>
                <FileDown className="size-4" />
                Exportar CSV
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
