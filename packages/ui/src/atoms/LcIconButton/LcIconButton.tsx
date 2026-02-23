"use client";

import MuiIconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { LcIconButtonProps } from "@contracts/pages/dashboard";
import { LcIcon } from "../LcIcon/LcIcon";

export const LcIconButton = ({
  iconKey,
  label,
  tone = "neutral",
  disabled = false,
  onClick,
}: LcIconButtonProps) => {
  const theme = useTheme();
  const colorMap: Record<NonNullable<LcIconButtonProps["tone"]>, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    neutral: theme.palette.text.secondary,
  };
  const color = colorMap[tone];

  return (
    <MuiIconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
        borderRadius: 1,
        padding: "8px",
        color,
        "&:disabled": {
          color: theme.palette.action.disabled,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LcIcon iconKey={iconKey} size="md" />
      </Box>
      <Typography
        variant="caption"
        component="span"
        sx={{ color: "inherit", fontSize: "10px" }}
      >
        {label}
      </Typography>
    </MuiIconButton>
  );
};
