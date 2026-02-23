"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { LcMetricValueProps } from "@contracts/pages/dashboard";

const toneMap = {
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
  const theme = useTheme();
  const toneValue = toneMap[tone];
  const [palette, shade] = toneValue.split(".") as [string, string];
  const color =
    theme.palette[palette as keyof typeof theme.palette]?.[
      shade as keyof (typeof theme.palette)[keyof typeof theme.palette]
    ] ?? theme.palette.text.secondary;

  const formattedValue = new Intl.NumberFormat("ja-JP").format(value);

  return (
    <Box className="flex items-baseline gap-1">
      <Typography variant="h5" component="p" sx={{ color }}>
        {formattedValue}
      </Typography>
      {unit && (
        <Typography variant="caption" component="span" color="text.secondary">
          {unit}
        </Typography>
      )}
    </Box>
  );
};
