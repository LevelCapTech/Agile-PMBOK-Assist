"use client";

import { Box, CircularProgress, Typography, styled } from "@mui/material";
import type { BudgetExecutionPanelProps } from "../../types/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle";
import { BudgetSummaryCard } from "../../molecules/BudgetSummaryCard";

const PanelContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
});

const ErrorContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.error.main,
}));

const SummaryCardGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const ChartPlaceholder = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "300px",
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  border: `1px dashed ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  fontSize: "16px",
  fontWeight: 500,
}));

export const BudgetExecutionPanel = ({
  title,
  summary,
  isLoading,
  error,
}: BudgetExecutionPanelProps) => {
  return (
    <PanelContainer>
      <LcSectionTitle title={title} />

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <Typography variant="h6" className="mb-2">
            エラーが発生しました
          </Typography>
          <Typography variant="body2">
            {error.code}: {error.message}
          </Typography>
        </ErrorContainer>
      ) : (
        <>
          <SummaryCardGrid>
            <BudgetSummaryCard
              label="予算"
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
          </SummaryCardGrid>

          <ChartPlaceholder>グラフ領域</ChartPlaceholder>
        </>
      )}
    </PanelContainer>
  );
};
