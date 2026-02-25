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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            padding: 2,
          }}
        >
          <Typography component="p" variant="body2" fontWeight={600}>
            予算推移
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            }}
          >
            {series.map((point) => (
              <Box
                key={point.month}
                sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
              >
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
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <LcSectionTitle title={title} />
      {renderContent()}
    </Box>
  );
};
