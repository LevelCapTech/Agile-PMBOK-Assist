"use client";

import { Button, styled } from "@mui/material";
import type { LcIconButtonProps } from "../../types/dashboard";
import { LcIcon } from "../LcIcon/LcIcon";

const StyledButton = styled(Button)<{ $tone?: string }>(
  ({ theme, $tone }) => {
    const toneColorMap: Record<string, string> = {
      primary: theme.palette.primary.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      error: theme.palette.error.main,
      neutral: theme.palette.text.secondary,
    };

    const bgColor = toneColorMap[$tone || "primary"] || theme.palette.primary.main;

    return {
      display: "inline-flex",
      alignItems: "center",
      gap: theme.spacing(1),
      padding: theme.spacing(1, 2),
      backgroundColor: bgColor,
      color: theme.palette.common.white,
      borderRadius: theme.spacing(2),
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "none",
      "&:hover": {
        backgroundColor: bgColor,
        filter: "brightness(0.9)",
      },
      "&:disabled": {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
      },
    };
  }
);

export const LcIconButton = ({
  iconKey,
  label,
  tone = "primary",
  disabled = false,
  onClick,
}: LcIconButtonProps) => {
  return (
    <StyledButton $tone={tone} disabled={disabled} onClick={onClick}>
      <LcIcon iconKey={iconKey} size="sm" />
      <span>{label}</span>
    </StyledButton>
  );
};
