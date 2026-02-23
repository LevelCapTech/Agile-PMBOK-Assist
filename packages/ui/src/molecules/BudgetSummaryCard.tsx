"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import type { BudgetSummaryCardProps } from "@contracts/pages/dashboard";
import { LcMetricValue } from "@ui/atoms/LcMetricValue";

export const BudgetSummaryCard = ({
  label,
  value,
  tone,
}: BudgetSummaryCardProps) => {
  const theme = useTheme();

  const bgMap: Record<BudgetSummaryCardProps["tone"], string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
  };

  return (
    <Card
      sx={{
        backgroundColor: bgMap[tone],
        color: theme.palette.common.white,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="caption"
          component="p"
          sx={{ color: "inherit", mb: 0.5 }}
        >
          {label}
        </Typography>
        <Box sx={{ "& *": { color: "inherit !important" } }}>
          <LcMetricValue value={value} tone={tone} />
        </Box>
      </CardContent>
    </Card>
  );
};
