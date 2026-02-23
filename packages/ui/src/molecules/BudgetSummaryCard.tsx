"use client";

import { Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { BudgetSummaryCardProps } from "../types/dashboard";
import { LcMetricValue } from "../atoms/LcMetricValue";

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  const theme = useTheme();
  const unit = label.includes("率") ? "%" : "円";

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <LcMetricValue value={value} unit={unit} tone={tone} />
    </Card>
  );
};
