"use client";

import { Button } from "@mui/material";

import type { LcIconButtonProps } from "@contracts/pages/dashboard";

import { resolveToneColor } from "../utils/tone";
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
      variant="text"
      disabled={disabled}
      onClick={onClick}
      startIcon={<LcIcon iconKey={iconKey} size="sm" />}
      sx={(theme) => ({
        color: resolveToneColor(theme, tone),
        padding: theme.spacing(1, 2),
        minWidth: "auto",
        borderRadius: theme.spacing(2),
        textTransform: "none",
        justifyContent: "flex-start",
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 600,
        gap: theme.spacing(1),
        "& .MuiButton-startIcon": {
          margin: 0,
        },
        "&.Mui-disabled": {
          color: theme.palette.action.disabled,
        },
      })}
    >
      {label}
    </Button>
  );
};
