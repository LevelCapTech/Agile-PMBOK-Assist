"use client";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

import type { LcIconButtonProps } from "@contracts/pages/dashboard";

import { LcIcon } from "./LcIcon";

const toneMap = {
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
  const theme = useTheme();
  const toneValue = toneMap[tone];
  const [palette, shade] = toneValue.split(".") as [string, string];
  const color =
    theme.palette[palette as keyof typeof theme.palette]?.[
      shade as keyof (typeof theme.palette)[keyof typeof theme.palette]
    ] ?? theme.palette.text.secondary;

  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
          sx={{
            color: disabled ? theme.palette.action.disabled : color,
          }}
        >
          <LcIcon iconKey={iconKey} size="md" />
        </IconButton>
      </span>
    </Tooltip>
  );
};
