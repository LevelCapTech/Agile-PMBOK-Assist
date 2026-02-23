"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useTheme } from "@mui/material/styles";

import type { SettingActionButtonProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";

export const SettingActionButton = ({
  action,
  disabled = false,
  onClick,
}: SettingActionButtonProps) => {
  const theme = useTheme();
  const isDisabled = disabled || action.disabled;

  const handleClick = () => {
    if (!isDisabled) {
      onClick?.(action.id);
    }
  };

  return (
    <ButtonBase
      onClick={handleClick}
      disabled={isDisabled}
      sx={{
        display: "block",
        width: "100%",
        textAlign: "left",
        p: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        "&:hover:not(:disabled)": {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[4],
        },
        "&:disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: `${theme.palette.primary.main}0F`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <LcIcon iconKey={action.iconKey} size="md" />
      </Box>
      <Typography variant="subtitle2" component="h3" className="mb-1">
        {action.label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {action.description}
      </Typography>
    </ButtonBase>
  );
};
