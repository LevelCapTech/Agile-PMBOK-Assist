"use client";

import { Card, CardContent, Stack, Typography } from "@mui/material";

import type { BudgetSummaryCardProps } from "@contracts/pages/dashboard";

import { LcMetricValue } from "../atoms/LcMetricValue";

export const BudgetSummaryCard = ({ label, value, tone }: BudgetSummaryCardProps) => {
  return (
    <Card
      sx={(theme) => ({
        background:
          tone === "success"
            ? theme.palette.success.light
            : tone === "warning"
              ? theme.palette.warning.light
              : theme.palette.primary.light,
      })}
      variant="outlined"
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography color="text.secondary" variant="body2">
            {label}
          </Typography>
          <LcMetricValue tone={tone} unit={label === "執行率" ? "%" : "M"} value={value} />
        </Stack>
      </CardContent>
    </Card>
  );
};
