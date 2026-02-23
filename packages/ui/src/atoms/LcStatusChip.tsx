"use client";

import { Chip, Typography } from "@mui/material";

import type { LcStatusChipProps } from "@contracts/pages/dashboard";

import { resolveToneBackground, resolveToneColor } from "../utils/tone";

export const LcStatusChip = ({
  status,
  tone = "neutral",
}: LcStatusChipProps) => {
  return (
    <Chip
      label={
        <Typography
          variant="caption"
          component="span"
          sx={{ fontWeight: 600 }}
        >
          {status}
        </Typography>
      }
      sx={(theme) => ({
        color: resolveToneColor(theme, tone),
        backgroundColor: resolveToneBackground(theme, tone),
        borderRadius: theme.spacing(2),
        height: theme.spacing(3),
      })}
    />
  );
};
