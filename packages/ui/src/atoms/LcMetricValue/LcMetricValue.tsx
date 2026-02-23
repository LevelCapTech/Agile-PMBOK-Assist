"use client";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { LcMetricValueProps } from "@contracts/pages/dashboard";

export const LcMetricValue = ({
  value,
  unit,
  tone = "neutral",
}: LcMetricValueProps) => {
  const theme = useTheme();
  const colorMap: Record<
    NonNullable<LcMetricValueProps["tone"]>,
    string
  > = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    neutral: theme.palette.text.secondary,
  };
  const color = colorMap[tone];

  return (
    <div className="flex items-baseline gap-1">
      <Typography
        variant="h5"
        component="p"
        sx={{ color, fontWeight: 600 }}
      >
        {value}
      </Typography>
      {unit && (
        <Typography
          variant="caption"
          component="span"
          sx={{ color: "text.secondary" }}
        >
          {unit}
        </Typography>
      )}
    </div>
  );
};
