"use client";

import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import type { LcStatusChipProps } from "@contracts/dashboard/types";

const toneColorMap = {
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
  return (
    <Chip
      label={
        <Typography variant="caption" component="span">
          {status}
        </Typography>
      }
      color={toneColorMap[tone]}
      size="small"
    />
  );
};
