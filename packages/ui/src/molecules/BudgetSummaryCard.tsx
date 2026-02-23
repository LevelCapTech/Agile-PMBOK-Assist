"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import type { BudgetSummaryCardProps } from "@contracts/dashboard/types";

import { LcMetricValue } from "@ui/atoms/LcMetricValue";

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  return (
    <Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {label}
        </Typography>
        <LcMetricValue value={value} tone={tone} />
      </CardContent>
    </Card>
  );
};
