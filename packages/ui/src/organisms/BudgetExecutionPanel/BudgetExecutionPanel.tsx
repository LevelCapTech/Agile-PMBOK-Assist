"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type {
  BudgetExecutionPanelProps,
  BudgetSeriesPoint,
} from "@contracts/pages/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle/LcSectionTitle";
import { BudgetSummaryCard } from "../../molecules/BudgetSummaryCard/BudgetSummaryCard";

const CHART_WIDTH = 600;
const CHART_HEIGHT = 300;
const PADDING = { top: 20, right: 20, bottom: 40, left: 60 };

function buildPath(
  points: Array<{ x: number; y: number }>
): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
}

interface BudgetChartProps {
  series: BudgetSeriesPoint[];
}

const BudgetChart = ({ series }: BudgetChartProps) => {
  const theme = useTheme();

  if (series.length === 0) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          データがありません
        </Typography>
      </Box>
    );
  }

  const innerW = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerH = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const allValues = series.flatMap((d) => [d.budget, d.actual]);
  const maxVal = Math.max(...allValues, 1);

  const xStep = innerW / Math.max(series.length - 1, 1);

  const toPoint = (value: number, idx: number) => ({
    x: PADDING.left + idx * xStep,
    y: PADDING.top + innerH - (value / maxVal) * innerH,
  });

  const budgetPoints = series.map((d, i) => toPoint(d.budget, i));
  const actualPoints = series.map((d, i) => toPoint(d.actual, i));

  const formatY = (v: number) =>
    `¥${(v / 1_000_000).toFixed(1)}M`;

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
    (maxVal * i) / yTicks
  );

  return (
    <Box sx={{ overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        style={{ width: "100%", height: "auto" }}
        aria-label="予算・執行額グラフ"
        role="img"
      >
        {/* Grid lines */}
        {yTickValues.map((v, i) => {
          const y = PADDING.top + innerH - (v / maxVal) * innerH;
          return (
            <g key={i}>
              <line
                x1={PADDING.left}
                y1={y}
                x2={PADDING.left + innerW}
                y2={y}
                stroke={theme.palette.divider}
                strokeDasharray="3 3"
              />
              <text
                x={PADDING.left - 6}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={10}
                fill={theme.palette.text.secondary}
              >
                {formatY(v)}
              </text>
            </g>
          );
        })}

        {/* X axis labels */}
        {series.map((d, i) => {
          const x = PADDING.left + i * xStep;
          return (
            <text
              key={i}
              x={x}
              y={CHART_HEIGHT - 8}
              textAnchor="middle"
              fontSize={10}
              fill={theme.palette.text.secondary}
            >
              {d.month}
            </text>
          );
        })}

        {/* Budget line */}
        <path
          d={buildPath(budgetPoints)}
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
        />
        {budgetPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={theme.palette.primary.main}
          />
        ))}

        {/* Actual line */}
        <path
          d={buildPath(actualPoints)}
          fill="none"
          stroke={theme.palette.success.main}
          strokeWidth={2}
        />
        {actualPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill={theme.palette.success.main}
          />
        ))}

        {/* Legend */}
        <g transform={`translate(${PADDING.left}, ${CHART_HEIGHT - 6})`}>
          <circle cx={0} cy={0} r={4} fill={theme.palette.primary.main} />
          <text
            x={8}
            y={0}
            dominantBaseline="middle"
            fontSize={10}
            fill={theme.palette.text.secondary}
          >
            予算
          </text>
          <circle cx={50} cy={0} r={4} fill={theme.palette.success.main} />
          <text
            x={58}
            y={0}
            dominantBaseline="middle"
            fontSize={10}
            fill={theme.palette.text.secondary}
          >
            執行額
          </text>
        </g>
      </svg>
    </Box>
  );
};

export const BudgetExecutionPanel = ({
  title,
  summary,
  series,
  isLoading = false,
  error,
}: BudgetExecutionPanelProps) => {
  const theme = useTheme();

  const totalBudgetM = summary.totalBudget / 1_000_000;
  const totalActualM = summary.totalActual / 1_000_000;
  const executionPct = summary.executionRate;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <LcSectionTitle title={title} />
      </Box>

      {isLoading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", py: 8 }}
          role="status"
          aria-label="読み込み中"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            border: `1px solid ${theme.palette.error.main}`,
            borderRadius: 2,
            bgcolor: `${theme.palette.error.main}0a`,
          }}
          role="alert"
        >
          <Typography variant="body2" sx={{ color: theme.palette.error.main }}>
            {error.message}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            エラーコード: {error.code}
          </Typography>
        </Box>
      )}

      {!isLoading && !error && (
        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            p: 3,
          }}
        >
          <BudgetChart series={series} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mt: 3,
            }}
          >
            <BudgetSummaryCard
              label="総予算（6ヶ月）"
              value={totalBudgetM}
              tone="primary"
            />
            <BudgetSummaryCard
              label="総執行額（6ヶ月）"
              value={totalActualM}
              tone="success"
            />
            <BudgetSummaryCard
              label="執行率"
              value={executionPct}
              tone="warning"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
