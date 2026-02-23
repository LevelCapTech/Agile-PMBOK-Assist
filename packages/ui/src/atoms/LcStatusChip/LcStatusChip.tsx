"use client";

import { Chip, styled } from "@mui/material";
import type { LcStatusChipProps } from "../../types/dashboard";

const StyledChip = styled(Chip)<{ $tone?: string }>(({ theme, $tone }) => {
  const toneColorMap: Record<string, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    neutral: theme.palette.text.secondary,
  };

  const bgColor =
    toneColorMap[$tone || "primary"] || theme.palette.primary.main;

  return {
    backgroundColor: bgColor,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: "12px",
    height: "24px",
    "& .MuiChip-label": {
      padding: theme.spacing(0, 1),
    },
  };
});

export const LcStatusChip = ({
  status,
  tone = "primary",
}: LcStatusChipProps) => {
  return <StyledChip label={status} $tone={tone} size="small" />;
};
