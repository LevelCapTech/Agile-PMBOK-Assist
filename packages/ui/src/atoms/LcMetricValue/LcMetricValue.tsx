"use client";

import { Typography, styled } from "@mui/material";
import type { LcMetricValueProps } from "../../types/dashboard";

const StyledContainer = styled("div")<{ $tone?: string }>(
  ({ theme, $tone }) => {
    const toneColorMap: Record<string, string> = {
      primary: theme.palette.primary.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      error: theme.palette.error.main,
      neutral: theme.palette.text.primary,
    };

    const color = toneColorMap[$tone || "primary"] || theme.palette.primary.main;

    return {
      display: "inline-flex",
      alignItems: "baseline",
      gap: theme.spacing(0.5),
      color,
    };
  }
);

export const LcMetricValue = ({
  value,
  unit,
  tone = "primary",
}: LcMetricValueProps) => {
  return (
    <StyledContainer $tone={tone}>
      <Typography variant="h5" component="p" style={{ color: "inherit" }}>
        {value.toLocaleString()}
      </Typography>
      {unit && (
        <Typography variant="caption" component="span" style={{ color: "inherit" }}>
          {unit}
        </Typography>
      )}
    </StyledContainer>
  );
};
