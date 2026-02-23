"use client";

import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

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
  return (
    <Stack spacing={2.5}>
      <LcSectionTitle description="全プロジェクトの予算と執行状況の推移" title={title} />
      {isLoading ? <Typography>読み込み中...</Typography> : null}
      {error ? (
        <Typography color="error.main">{error.message}</Typography>
      ) : null}
      {!isLoading && !error ? (
        <Paper
          sx={(theme) => ({
            p: 2,
            border: 1,
            borderColor: theme.palette.divider,
            background: theme.palette.background.paper,
          })}
          variant="outlined"
        >
          <Stack spacing={2}>
            <Box sx={{ minHeight: 140 }}>
              <Typography color="text.secondary" variant="caption">
                予算推移データ点: {series.length}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <BudgetSummaryCard label="総予算（6ヶ月）" tone="primary" value={summary.totalBudget} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <BudgetSummaryCard label="総執行額（6ヶ月）" tone="success" value={summary.totalActual} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <BudgetSummaryCard label="執行率" tone="warning" value={summary.executionRate} />
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
};
