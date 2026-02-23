"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import type { BudgetExecutionPanelProps } from "@contracts/dashboard/types";

import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { BudgetSummaryCard } from "@ui/molecules/BudgetSummaryCard";

export const BudgetExecutionPanel = ({
  title,
  summary,
  series,
  isLoading = false,
  error,
}: BudgetExecutionPanelProps) => {
  return (
    <Box component="section">
      <LcSectionTitle
        title={title}
        description="全プロジェクトの予算と執行状況の推移"
      />

      {isLoading && (
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Alert severity="error">
          {error.message}
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          <Box
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
            }}
            className="mb-4 p-4"
          >
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {series.length > 0
                ? `${series[0].month}〜${series[series.length - 1].month}`
                : "データなし"}
            </Typography>
          </Box>

          <Box className="grid grid-cols-3 gap-4">
            <BudgetSummaryCard
              label={`総予算（${series.length}ヶ月）`}
              value={summary.totalBudget}
              tone="primary"
            />
            <BudgetSummaryCard
              label={`総執行額（${series.length}ヶ月）`}
              value={summary.totalActual}
              tone="success"
            />
            <BudgetSummaryCard
              label="執行率"
              value={summary.executionRate}
              tone="warning"
            />
          </Box>
        </>
      )}
    </Box>
  );
};
