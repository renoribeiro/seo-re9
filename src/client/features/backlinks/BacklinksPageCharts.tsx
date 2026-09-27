import { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BacklinksOverviewData } from "./backlinksPageTypes";
import {
  formatCompactDate,
  formatMonthLabel,
  formatTooltipValue,
} from "./backlinksPageUtils";

export function BacklinksTrendChart({
  data,
}: {
  data: BacklinksOverviewData["trends"];
}) {
  const { containerRef, chartWidth } = useChartWidth();

  if (data.length === 0) {
    return <EmptyChartState />;
  }

  return (
    <div
      ref={containerRef}
      className="h-56 min-w-0"
      aria-label="Gráfico de tendência de backlinks"
    >
      {chartWidth > 0 ? (
        <LineChart
          width={chartWidth}
          height={224}
          data={data}
          margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            opacity={0.12}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartTick}
            minTickGap={24}
          />
          <YAxis yAxisId="left" tickFormatter={formatAxisValue} width={60} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={formatAxisValue}
            width={60}
          />
          <Tooltip
            formatter={formatTooltipValue}
            labelFormatter={formatChartLabel}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="backlinks"
            stroke="#ED1C24"
            strokeWidth={2}
            dot={false}
            name="Backlinks"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="referringDomains"
            stroke="#6b7280"
            strokeWidth={2}
            dot={false}
            name="Domínios de referência"
          />
        </LineChart>
      ) : null}
    </div>
  );
}

export function BacklinksNewLostChart({
  data,
}: {
  data: BacklinksOverviewData["newLostTrends"];
}) {
  const { containerRef, chartWidth } = useChartWidth();

  if (data.length === 0) {
    return <EmptyChartState />;
  }

  return (
    <div
      ref={containerRef}
      className="h-56 min-w-0"
      aria-label="Gráfico de backlinks novos e perdidos"
    >
      {chartWidth > 0 ? (
        <LineChart
          width={chartWidth}
          height={224}
          data={data}
          margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            opacity={0.12}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartTick}
            minTickGap={24}
          />
          <YAxis tickFormatter={formatAxisValue} width={60} />
          <Tooltip
            formatter={formatTooltipValue}
            labelFormatter={formatChartLabel}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="lostBacklinks"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Backlinks perdidos"
          />
          <Line
            type="monotone"
            dataKey="newBacklinks"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
            name="Backlinks novos"
          />
        </LineChart>
      ) : null}
    </div>
  );
}

function useChartWidth() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateWidth = () => {
      setChartWidth(container.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { containerRef, chartWidth };
}

function EmptyChartState() {
  return (
    <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-base-300 text-sm text-base-content/55">
      Ainda não há dados históricos suficientes.
    </div>
  );
}

function formatAxisValue(value: unknown) {
  if (typeof value !== "number") return "";
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".", ",")} mi`;
  }
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} mil`;
  return String(value);
}

function formatChartTick(value: unknown) {
  return typeof value === "string" ? formatMonthLabel(value) : "";
}

function formatChartLabel(value: unknown) {
  return typeof value === "string" ? formatCompactDate(value) : "";
}
