"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { LcMetricValueProps } from "../types/dashboard";
import { resolveToneColor } from "../utils/tone";

export const LcMetricValue = ({
  value,
  unit,
  tone = "neutral",
}: LcMetricValueProps) => {
  const theme = useTheme();
  const toneColor = resolveToneColor(theme, tone);

  return (
    <Box className="flex items-baseline gap-1">
      <Typography component="p" variant="h5" color={toneColor}>
        {value.toLocaleString()}
      </Typography>
      {unit ? (
        <Typography component="span" variant="caption" color={toneColor}>
          {unit}
        </Typography>
      ) : null}
    </Box>
  );
};
