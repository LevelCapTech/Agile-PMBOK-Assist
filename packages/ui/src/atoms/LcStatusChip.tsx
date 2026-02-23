"use client";

import { Chip, Typography } from "@mui/material";

import type { LcStatusChipProps } from "@contracts/pages/dashboard";

import { resolveToneColor } from "./dashboardTokens";

export const LcStatusChip = ({ status, tone = "neutral" }: LcStatusChipProps) => {
  return (
    <Chip
      label={
        <Typography component="span" variant="caption">
          {status}
        </Typography>
      }
      size="small"
      sx={(theme) => ({
        p: 0,
        m: 0,
        fontSize: theme.typography.caption.fontSize,
        color: resolveToneColor(theme, tone),
        border: 0,
        background: theme.palette.background.default,
        width: "fit-content",
        height: 24,
      })}
    />
  );
};
