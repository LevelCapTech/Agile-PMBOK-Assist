"use client";

import { Stack, Typography } from "@mui/material";

import type { LcMetricValueProps } from "@contracts/pages/dashboard";

import { resolveToneColor } from "./dashboardTokens";

export const LcMetricValue = ({ value, unit, tone = "neutral" }: LcMetricValueProps) => {
  return (
    <Stack className="py-0.5" direction="row" spacing={0.5}>
      <Typography
        component="p"
        sx={(theme) => ({ color: resolveToneColor(theme, tone) })}
        variant="h5"
      >
        {value.toLocaleString("ja-JP")}
      </Typography>
      {unit ? (
        <Typography color="text.secondary" component="span" variant="caption">
          {unit}
        </Typography>
      ) : null}
    </Stack>
  );
};
