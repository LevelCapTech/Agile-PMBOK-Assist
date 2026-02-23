"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { BudgetExecutionPanelProps } from "../types/dashboard";
import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { BudgetSummaryCard } from "../molecules/BudgetSummaryCard";

const CHART_HEIGHT = 200;
const CHART_WIDTH = 600;

const buildPoints = (
  series: BudgetExecutionPanelProps["series"],
  key: "budget" | "actual",
  maxValue: number,
) => {
  const safeMax = maxValue === 0 ? 1 : maxValue;
  const step = series.length > 1 ? CHART_WIDTH / (series.length - 1) : 0;

  return series
    .map((point, index) => {
      const x = index * step;
      const y = CHART_HEIGHT - (point[key] / safeMax) * CHART_HEIGHT;
      return `${x},${y}`;
    })
    .join(" ");
};

export const BudgetExecutionPanel = ({
  title,
  summary,
  series,
  isLoading,
  error,
}: BudgetExecutionPanelProps) => {
  const theme = useTheme();
  const maxValue = Math.max(
    0,
    ...series.map((point) => Math.max(point.budget, point.actual)),
  );

  return (
    <Box className="flex flex-col gap-4">
      <LcSectionTitle title={title} />
      {isLoading ? (
        <Box
          className="flex items-center gap-2"
          sx={{ color: theme.palette.text.secondary }}
        >
          <CircularProgress size={20} />
          <Typography variant="body2">読み込み中...</Typography>
        </Box>
      ) : error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : (
        <Box className="flex flex-col gap-4">
          <Box
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              padding: theme.spacing(3),
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {series.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                予算推移データがありません
              </Typography>
            ) : (
              <Box className="flex flex-col gap-2">
                <Box
                  component="svg"
                  viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                  role="img"
                  aria-label="予算執行状況チャート"
                  sx={{ width: "100%", height: CHART_HEIGHT }}
                >
                  <line
                    x1="0"
                    y1={CHART_HEIGHT}
                    x2={CHART_WIDTH}
                    y2={CHART_HEIGHT}
                    stroke={theme.palette.divider}
                    strokeWidth="1"
                  />
                  <polyline
                    fill="none"
                    stroke={theme.palette.primary.main}
                    strokeWidth="2"
                    points={buildPoints(series, "budget", maxValue)}
                  />
                  <polyline
                    fill="none"
                    stroke={theme.palette.success.main}
                    strokeWidth="2"
                    points={buildPoints(series, "actual", maxValue)}
                  />
                </Box>
                <Box className="flex items-center justify-between">
                  {series.map((point) => (
                    <Typography
                      key={point.month}
                      variant="caption"
                      color="text.secondary"
                    >
                      {point.month}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
          <Box className="grid grid-cols-3 gap-4">
            <BudgetSummaryCard
              label="総予算"
              value={summary.totalBudget}
              tone="primary"
            />
            <BudgetSummaryCard
              label="実績"
              value={summary.totalActual}
              tone="success"
            />
            <BudgetSummaryCard
              label="執行率"
              value={summary.executionRate}
              tone="warning"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
