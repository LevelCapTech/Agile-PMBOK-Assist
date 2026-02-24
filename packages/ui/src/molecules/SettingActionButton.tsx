"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { SettingActionButtonProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";
import { LcIconButton } from "../atoms/LcIconButton";

export const SettingActionButton = ({
  action,
  disabled,
  onClick,
}: SettingActionButtonProps) => {
  const theme = useTheme();
  const isDisabled = disabled ?? action.disabled ?? false;

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        borderRadius: 2,
        height: "100%",
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      <Box className="flex h-full flex-col gap-2 p-4">
        <Box className="flex items-center justify-between gap-3">
          <LcIconButton
            disabled={isDisabled}
            iconKey={action.iconKey}
            label={action.label}
            onClick={isDisabled ? undefined : () => onClick?.(action.id)}
            tone="primary"
          />
          <LcIcon iconKey="chevron-right" size="sm" />
        </Box>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {action.description}
        </Typography>
      </Box>
    </Card>
  );
};
