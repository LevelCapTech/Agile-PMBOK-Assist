"use client";

import { Box, Typography } from "@mui/material";

import type { BudgetExecutionPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { BudgetSummaryCard } from "../molecules/BudgetSummaryCard";

const chartHeight = 200;

export const BudgetExecutionPanel = ({
  title,
  summary,
  series,
  isLoading,
  error,
}: BudgetExecutionPanelProps) => {
  const maxValue = Math.max(
    0,
    ...series.map((point) => Math.max(point.budget, point.actual)),
  );

  return (
    <Box className="flex flex-col gap-6">
      <LcSectionTitle title={title} />

      {isLoading ? (
        <Typography variant="body2" color="text.secondary">
          読み込み中...
        </Typography>
      ) : null}

      {!isLoading && error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : null}

      {!isLoading && !error ? (
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(3),
          })}
        >
          {series.length > 0 ? (
            <div className="flex items-end gap-6">
              {series.map((point) => {
                const budgetHeight = maxValue
                  ? (point.budget / maxValue) * chartHeight
                  : 0;
                const actualHeight = maxValue
                  ? (point.actual / maxValue) * chartHeight
                  : 0;

                return (
                  <div key={point.month} className="flex flex-col gap-2">
                    <div
                      className="flex items-end gap-2"
                      style={{ height: chartHeight }}
                    >
                      <Box
                        sx={(theme) => ({
                          width: 12,
                          height: budgetHeight,
                          borderRadius: theme.spacing(0.5),
                          backgroundColor: theme.palette.primary.main,
                        })}
                      />
                      <Box
                        sx={(theme) => ({
                          width: 12,
                          height: actualHeight,
                          borderRadius: theme.spacing(0.5),
                          backgroundColor: theme.palette.success.main,
                        })}
                      />
                    </div>
                    <Typography variant="caption" color="text.secondary">
                      {point.month}
                    </Typography>
                  </div>
                );
              })}
            </div>
          ) : (
            <Typography variant="body2" color="text.secondary">
              予算データがありません
            </Typography>
          )}

          <div className="mt-6 grid grid-cols-3 gap-4">
            <BudgetSummaryCard
              label="総予算"
              value={summary.totalBudget}
              tone="primary"
            />
            <BudgetSummaryCard
              label="総執行額"
              value={summary.totalActual}
              tone="success"
            />
            <BudgetSummaryCard
              label="執行率"
              value={summary.executionRate}
              tone="warning"
            />
          </div>
        </Box>
      ) : null}
    </Box>
  );
};
