"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { BudgetSummaryCardProps } from "@contracts/pages/dashboard";

import { LcMetricValue } from "../atoms/LcMetricValue";

const toneColorMap = {
  primary: "primary.main",
  success: "success.main",
  warning: "warning.main",
} as const;

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  const theme = useTheme();
  const toneValue = toneColorMap[tone];
  const [palette, shade] = toneValue.split(".") as [string, string];
  const bgColor =
    theme.palette[palette as keyof typeof theme.palette]?.[
      shade as keyof (typeof theme.palette)[keyof typeof theme.palette]
    ] ?? theme.palette.primary.main;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: `${bgColor}0F`,
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        className="mb-1 block"
      >
        {label}
      </Typography>
      <LcMetricValue value={value} tone={tone} />
    </Box>
  );
};
