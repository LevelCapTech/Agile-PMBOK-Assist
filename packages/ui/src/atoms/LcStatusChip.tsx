"use client";

import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

import type { LcStatusChipProps } from "@contracts/pages/dashboard";

const toneMap = {
  primary: "primary",
  success: "success",
  warning: "warning",
  error: "error",
  neutral: "default",
} as const;

export const LcStatusChip = ({
  status,
  tone = "neutral",
}: LcStatusChipProps) => {
  const theme = useTheme();
  const chipColor = toneMap[tone];

  return (
    <Chip
      label={status}
      size="small"
      color={chipColor}
      sx={{
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
      }}
    />
  );
};
