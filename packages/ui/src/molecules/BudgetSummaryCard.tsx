"use client";

import { Card, CardContent, Typography } from "@mui/material";

import type { BudgetSummaryCardProps } from "@contracts/pages/dashboard";

import { LcMetricValue } from "../atoms/LcMetricValue";
import { resolveToneBackground } from "../utils/tone";

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        borderColor: theme.palette.divider,
        backgroundColor: resolveToneBackground(theme, tone),
      })}
    >
      <CardContent className="flex flex-col gap-1">
        <Typography variant="body2" component="p" color="text.secondary">
          {label}
        </Typography>
        <LcMetricValue value={value} tone={tone} />
      </CardContent>
    </Card>
  );
};
