"use client";

import MuiIconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import type { LcIconButtonProps } from "@contracts/dashboard/types";

import { LcIcon } from "@ui/atoms/LcIcon";

const toneColorMap = {
  primary: "primary.main",
  success: "success.main",
  warning: "warning.main",
  error: "error.main",
  neutral: "text.secondary",
} as const;

export const LcIconButton = ({
  iconKey,
  label,
  tone = "neutral",
  disabled = false,
  onClick,
}: LcIconButtonProps) => {
  return (
    <Tooltip title={label}>
      <span>
        <MuiIconButton
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
          sx={{ color: toneColorMap[tone] }}
        >
          <LcIcon iconKey={iconKey} size="md" />
        </MuiIconButton>
      </span>
    </Tooltip>
  );
};
