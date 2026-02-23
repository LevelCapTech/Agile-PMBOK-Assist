"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { BudgetSummaryCardProps } from "@contracts/pages/dashboard";
import { LcMetricValue } from "../../atoms/LcMetricValue/LcMetricValue";

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  const theme = useTheme();
  const bgColorMap: Record<BudgetSummaryCardProps["tone"], string> = {
    primary: `${theme.palette.primary.main}1a`,
    success: `${theme.palette.success.main}1a`,
    warning: `${theme.palette.warning.main}1a`,
  };
  const bg = bgColorMap[tone];

  return (
    <Box
      sx={{
        bgcolor: bg,
        borderRadius: 2,
        padding: "16px",
      }}
    >
      <Typography
        variant="caption"
        component="p"
        sx={{ color: "text.secondary", mb: 0.5 }}
      >
        {label}
      </Typography>
      <LcMetricValue value={value} tone={tone} />
    </Box>
  );
};
