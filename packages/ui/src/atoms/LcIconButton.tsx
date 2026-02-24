"use client";

import Button from "@mui/material/Button";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

import type { LcIconButtonProps } from "@contracts/pages/dashboard";

import { LcIcon } from "./LcIcon";

const resolveToneColor = (
  palette: Theme["palette"],
  tone: LcIconButtonProps["tone"],
) => {
  switch (tone) {
    case "primary":
      return palette.primary.main;
    case "success":
      return palette.success.main;
    case "warning":
      return palette.warning.main;
    case "error":
      return palette.error.main;
    case "neutral":
      return palette.text.secondary;
    default:
      return palette.text.primary;
  }
};

export const LcIconButton = ({
  iconKey,
  label,
  tone,
  disabled,
  onClick,
}: LcIconButtonProps) => {
  const theme = useTheme();
  const toneColor = resolveToneColor(theme.palette, tone);

  return (
    <Button
      data-testid="lc-icon-button"
      disabled={disabled}
      onClick={onClick}
      size="small"
      startIcon={<LcIcon iconKey={iconKey} size="sm" />}
      sx={{
        color: toneColor,
        justifyContent: "flex-start",
        textTransform: "none",
      }}
      variant="text"
    >
      {label}
    </Button>
  );
};
