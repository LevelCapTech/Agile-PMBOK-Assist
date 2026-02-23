"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import type { BudgetExecutionPanelProps } from "@contracts/pages/dashboard";
import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { BudgetSummaryCard } from "@ui/molecules/BudgetSummaryCard";

export const BudgetExecutionPanel = ({
  title,
  summary,
  // TODO: seriesはチャートライブラリ統合時に使用する
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  series,
  isLoading = false,
  error,
}: BudgetExecutionPanelProps) => {
  if (error) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  const rateDisplay = `${summary.executionRate.toFixed(1)}%`;
  const budgetDisplay = summary.totalBudget / 1000000;
  const actualDisplay = summary.totalActual / 1000000;

  return (
    <Box>
      <LcSectionTitle title={title} />
      <Box className="mb-4">
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textAlign: "center", py: 4 }}
        >
          グラフエリア（チャートライブラリ統合時に実装）
        </Typography>
      </Box>
      <Box className="grid grid-cols-3 gap-4">
        <BudgetSummaryCard
          label="総予算"
          value={budgetDisplay}
          tone="primary"
        />
        <BudgetSummaryCard
          label="総執行額"
          value={actualDisplay}
          tone="success"
        />
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            執行率
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={(theme) => ({
              color: theme.palette.warning.main,
              fontWeight: 700,
            })}
          >
            {rateDisplay}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
