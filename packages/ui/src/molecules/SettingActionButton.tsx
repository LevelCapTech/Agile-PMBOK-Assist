"use client";

import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { SettingActionButtonProps } from "../types/dashboard";
import { LcIconButton } from "../atoms/LcIconButton";

export const SettingActionButton = ({
  action,
  disabled,
  onClick,
}: SettingActionButtonProps) => {
  const theme = useTheme();
  const isDisabled = disabled ?? action.disabled ?? false;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    onClick?.(action.id);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
      }}
    >
      <Box className="flex flex-col gap-2">
        <LcIconButton
          iconKey={action.iconKey}
          label={action.label}
          onClick={handleClick}
          disabled={isDisabled}
          tone={isDisabled ? "neutral" : "primary"}
        />
        <Typography variant="body2" color="text.secondary">
          {action.description}
        </Typography>
      </Box>
    </Card>
  );
};
