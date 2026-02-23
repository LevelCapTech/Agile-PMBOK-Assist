"use client";

import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type {
  SettingActionButtonProps,
  SettingActionId,
} from "@contracts/pages/dashboard";
import { LcIcon } from "../../atoms/LcIcon/LcIcon";

export const SettingActionButton = ({
  action,
  disabled = false,
  onClick,
}: SettingActionButtonProps) => {
  const theme = useTheme();

  const handleClick = () => {
    onClick?.(action.id as SettingActionId);
  };

  return (
    <MuiButton
      variant="outlined"
      disabled={disabled ?? action.disabled}
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        textTransform: "none",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        padding: "24px",
        width: "100%",
        height: "100%",
        color: theme.palette.text.primary,
        background: theme.palette.background.paper,
        "&:hover": {
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.primary.main,
          background: theme.palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          bgcolor: `${theme.palette.primary.main}1a`,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          color: theme.palette.primary.main,
        }}
      >
        <LcIcon iconKey={action.iconKey} size="md" />
      </Box>
      <Typography
        variant="subtitle2"
        component="h3"
        sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 0.5 }}
      >
        {action.label}
      </Typography>
      <Typography
        variant="caption"
        component="p"
        sx={{ color: theme.palette.text.secondary }}
      >
        {action.description}
      </Typography>
    </MuiButton>
  );
};
