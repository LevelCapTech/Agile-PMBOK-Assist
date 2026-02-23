"use client";

import MuiChip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import type { LcStatusChipProps } from "@contracts/pages/dashboard";

export const LcStatusChip = ({
  status,
  tone = "neutral",
}: LcStatusChipProps) => {
  const theme = useTheme();

  const colorMap: Record<NonNullable<LcStatusChipProps["tone"]>, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    neutral: theme.palette.text.secondary,
  };

  const color = colorMap[tone];

  return (
    <MuiChip
      label={status}
      size="small"
      sx={{
        color,
        borderColor: color,
        backgroundColor: "transparent",
        fontWeight: 500,
      }}
      variant="outlined"
    />
  );
};
