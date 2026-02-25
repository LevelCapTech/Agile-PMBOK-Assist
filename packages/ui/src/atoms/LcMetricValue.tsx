"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

import type { LcMetricValueProps } from "@contracts/pages/dashboard";

const resolveToneColor = (
  palette: Theme["palette"],
  tone: LcMetricValueProps["tone"],
) => {
  switch (tone) {
    case "primary":
      return palette.primary.main;
    case "success":
      return palette.success.main;
    case "warning":
      return palette.warning.main;
    case "error":
      return palette.error.main;
    case "neutral":
      return palette.text.secondary;
    default:
      return palette.text.primary;
  }
};

export const LcMetricValue = ({
  value,
  unit,
  tone,
}: LcMetricValueProps) => {
  const theme = useTheme();
  const toneColor = resolveToneColor(theme.palette, tone);

  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
      <Typography
        component="p"
        variant="h5"
        sx={{
          color: toneColor,
          fontWeight: 600,
        }}
      >
        {value.toLocaleString()}
      </Typography>
      {unit ? (
        <Typography
          component="span"
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {unit}
        </Typography>
      ) : null}
    </Box>
  );
};
