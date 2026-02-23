"use client";

import { Typography } from "@mui/material";

import type { LcMetricValueProps } from "@contracts/pages/dashboard";

import { resolveToneColor } from "../utils/tone";

export const LcMetricValue = ({
  value,
  unit,
  tone = "primary",
}: LcMetricValueProps) => {
  return (
    <div className="flex items-baseline gap-1">
      <Typography
        variant="h5"
        component="p"
        sx={(theme) => ({ color: resolveToneColor(theme, tone) })}
      >
        {value.toLocaleString("ja-JP")}
      </Typography>
      {unit ? (
        <Typography variant="caption" component="span" color="text.secondary">
          {unit}
        </Typography>
      ) : null}
    </div>
  );
};
