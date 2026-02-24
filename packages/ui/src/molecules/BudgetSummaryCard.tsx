"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";
import { alpha, useTheme } from "@mui/material/styles";

import type { BudgetSummaryCardProps } from "@contracts/pages/dashboard";

import { LcMetricValue } from "../atoms/LcMetricValue";

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
      data-testid="budget-summary-card"
      variant="outlined"
      sx={{
        backgroundColor: alpha(toneColor, 0.12),
        borderColor: alpha(toneColor, 0.4),
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box className="flex h-full flex-col gap-2 p-4">
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
