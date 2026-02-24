"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { BudgetExecutionPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { BudgetSummaryCard } from "../molecules/BudgetSummaryCard";

export const BudgetExecutionPanel = ({
  title,
  summary,
  series,
  isLoading,
  error,
}: BudgetExecutionPanelProps) => {
  const theme = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return (
        <Typography component="p" variant="body2">
          読み込み中...
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.error.main }}
        >
          {error.message}
        </Typography>
      );
    }

    return (
      <Box className="flex flex-col gap-4">
        <Box
          className="flex flex-col gap-2"
          sx={{
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Typography component="p" variant="body2" fontWeight={600}>
            予算推移
          </Typography>
          <Box className="grid grid-cols-6 gap-2">
            {series.map((point) => (
              <Box key={point.month} className="flex flex-col gap-1">
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {point.month}
                </Typography>
                <Divider />
                <Typography component="span" variant="caption">
                  予算: {point.budget.toLocaleString()}
                </Typography>
                <Typography component="span" variant="caption">
                  実績: {point.actual.toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="grid grid-cols-3 gap-4">
          <BudgetSummaryCard
            label="総予算 (円)"
            tone="primary"
            value={summary.totalBudget}
          />
          <BudgetSummaryCard
            label="執行額 (円)"
            tone="success"
            value={summary.totalActual}
          />
          <BudgetSummaryCard
            label="執行率 (%)"
            tone="warning"
            value={summary.executionRate}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box className="flex flex-col gap-4">
      <LcSectionTitle title={title} />
      {renderContent()}
    </Box>
  );
};
