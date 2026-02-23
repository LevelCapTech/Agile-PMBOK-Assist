"use client";

import MuiIconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import type { LcIconButtonProps } from "@contracts/pages/dashboard";
import { LcIcon } from "./LcIcon";

const useToneColor = (
  tone: LcIconButtonProps["tone"] = "primary",
): string => {
  const theme = useTheme();
  const map: Record<NonNullable<LcIconButtonProps["tone"]>, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    neutral: theme.palette.text.secondary,
  };
  return map[tone];
};

export const LcIconButton = ({
  iconKey,
  label,
  tone = "primary",
  disabled = false,
  onClick,
}: LcIconButtonProps) => {
  const color = useToneColor(tone);

  return (
    <Tooltip title={label}>
      <span>
        <MuiIconButton
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
          sx={{ color }}
        >
          <LcIcon iconKey={iconKey} size="md" />
        </MuiIconButton>
      </span>
    </Tooltip>
  );
};
