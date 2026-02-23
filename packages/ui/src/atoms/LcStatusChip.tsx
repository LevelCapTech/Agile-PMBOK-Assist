"use client";

import { Chip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import type { LcStatusChipProps } from "../types/dashboard";
import { resolveToneColor } from "../utils/tone";

export const LcStatusChip = ({
  status,
  tone = "neutral",
}: LcStatusChipProps) => {
  const theme = useTheme();
  const toneColor = resolveToneColor(theme, tone);

  return (
    <Chip
      data-tone={tone}
      label={
        <Typography component="span" variant="caption">
          {status}
        </Typography>
      }
      sx={{
        color: toneColor,
        backgroundColor: alpha(toneColor, 0.16),
        borderRadius: 16,
        fontWeight: 600,
      }}
      size="small"
    />
  );
};
