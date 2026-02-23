"use client";

import { Button } from "@mui/material";

import type { LcIconButtonProps } from "@contracts/pages/dashboard";

import { resolveToneColor } from "./dashboardTokens";
import { LcIcon } from "./LcIcon";

export const LcIconButton = ({
  iconKey,
  label,
  tone = "primary",
  disabled,
  onClick,
}: LcIconButtonProps) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      startIcon={<LcIcon iconKey={iconKey} size="sm" />}
      sx={(theme) => ({
        p: "8px 12px",
        m: 0,
        fontSize: theme.typography.body2.fontSize,
        color: tone === "neutral" ? theme.palette.text.primary : theme.palette.common.white,
        border: 0,
        background:
          tone === "neutral" ? theme.palette.background.paper : resolveToneColor(theme, tone),
        width: "fit-content",
        height: 36,
        textTransform: "none",
        boxShadow: "none",
        "&:hover": {
          background:
            tone === "neutral"
              ? theme.palette.background.default
              : resolveToneColor(theme, tone),
          opacity: 0.9,
          boxShadow: "none",
        },
      })}
      variant="contained"
    >
      {label}
    </Button>
  );
};
