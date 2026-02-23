"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { LcMetricValueProps } from "@contracts/dashboard/types";

const toneColorMap = {
  primary: "primary.main",
  success: "success.main",
  warning: "warning.main",
  error: "error.main",
  neutral: "text.secondary",
} as const;

export const LcMetricValue = ({
  value,
  unit,
  tone = "neutral",
}: LcMetricValueProps) => {
  return (
    <Box className="flex items-baseline gap-1">
      <Typography
        variant="h5"
        component="p"
        sx={{ color: toneColorMap[tone] }}
      >
        {value.toLocaleString()}
      </Typography>
      {unit && (
        <Typography
          variant="caption"
          component="span"
          sx={{ color: toneColorMap[tone] }}
        >
          {unit}
        </Typography>
      )}
    </Box>
  );
};
