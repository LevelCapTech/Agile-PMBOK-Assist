"use client";

import { Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import type { LcIconButtonProps } from "../types/dashboard";
import { resolveToneColor } from "../utils/tone";
import { LcIcon } from "./LcIcon";

export const LcIconButton = ({
  iconKey,
  label,
  tone = "neutral",
  disabled,
  onClick,
}: LcIconButtonProps) => {
  const theme = useTheme();
  const toneColor = resolveToneColor(theme, tone);

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      startIcon={<LcIcon iconKey={iconKey} size="sm" />}
      sx={{
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        color: toneColor,
        backgroundColor: theme.palette.background.paper,
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(1),
        textTransform: "none",
        fontWeight: 600,
        justifyContent: "flex-start",
        gap: theme.spacing(1),
        "&:hover": {
          borderColor: toneColor,
          backgroundColor: alpha(toneColor, 0.08),
        },
        "&.Mui-disabled": {
          color: theme.palette.text.disabled,
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.action.disabledBackground,
        },
      }}
    >
      {label}
    </Button>
  );
};
