"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";
import { alpha, useTheme } from "@mui/material/styles";

import type { LcStatusChipProps } from "@contracts/pages/dashboard";

const resolveToneColor = (
  palette: Theme["palette"],
  tone: LcStatusChipProps["tone"],
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
      return palette.text.secondary;
  }
};

export const LcStatusChip = ({ status, tone }: LcStatusChipProps) => {
  const theme = useTheme();
  const toneColor = resolveToneColor(theme.palette, tone);

  return (
    <Box
      component="span"
      data-testid="lc-status-chip"
      data-tone={tone ?? "default"}
      sx={{
        alignItems: "center",
        backgroundColor: alpha(toneColor, 0.12),
        borderColor: toneColor,
        borderRadius: 999,
        borderStyle: "solid",
        borderWidth: 1,
        display: "inline-flex",
        justifyContent: "center",
        paddingX: 1,
        paddingY: 0.25,
      }}
    >
      <Typography
        component="span"
        variant="caption"
        sx={{
          color: toneColor,
          fontWeight: 600,
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};
