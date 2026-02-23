"use client";

import { Card, styled } from "@mui/material";
import type { BudgetSummaryCardProps } from "../../types/dashboard";
import { LcMetricValue } from "../../atoms/LcMetricValue";

const StyledCard = styled(Card)<{ $tone: string }>(({ theme, $tone }) => {
  const toneBackgroundMap: Record<string, string> = {
    primary: `${theme.palette.primary.main}0F`,
    success: "#D1FAE5",
    warning: "#FEF3C7",
  };

  const bgColor = toneBackgroundMap[$tone] || toneBackgroundMap.primary;

  return {
    backgroundColor: bgColor,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    border: "none",
    boxShadow: "none",
  };
});

const Label = styled("div")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  return (
    <StyledCard $tone={tone}>
      <Label>{label}</Label>
      <LcMetricValue value={value} tone={tone} />
    </StyledCard>
  );
};
