"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";
import { alpha, useTheme } from "@mui/material/styles";

import type { BudgetSummaryCardProps } from "@contracts/pages/dashboard";

import { LcMetricValue } from "../atoms/LcMetricValue";

export const BUDGET_SUMMARY_CARD_TEST_ID = "budget-summary-card";

const resolveToneColor = (
  palette: Theme["palette"],
  tone: BudgetSummaryCardProps["tone"],
) => {
  switch (tone) {
    case "primary":
      return palette.primary.main;
    case "success":
      return palette.success.main;
    case "warning":
      return palette.warning.main;
    default:
      return palette.text.primary;
  }
};

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  const theme = useTheme();
  const toneColor = resolveToneColor(theme.palette, tone);

  return (
    <Card
      data-testid={BUDGET_SUMMARY_CARD_TEST_ID}
      variant="outlined"
      sx={{
        backgroundColor: alpha(toneColor, 0.12),
        borderColor: alpha(toneColor, 0.4),
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "100%",
          padding: 2,
        }}
      >
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {label}
        </Typography>
        <LcMetricValue tone={tone} value={value} />
      </Box>
    </Card>
  );
};
