"use client";

import { Card, CardContent, Typography } from "@mui/material";

import type { SettingActionButtonProps } from "@contracts/pages/dashboard";

import { LcIconButton } from "../atoms/LcIconButton";

export const SettingActionButton = ({
  action,
  disabled,
  onClick,
}: SettingActionButtonProps) => {
  const isDisabled = disabled ?? action.disabled ?? false;

  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        opacity: isDisabled ? 0.7 : 1,
      })}
    >
      <CardContent className="flex flex-col gap-2">
        <LcIconButton
          iconKey={action.iconKey}
          label={action.label}
          tone="primary"
          disabled={isDisabled}
          onClick={() => onClick?.(action.id)}
        />
        <Typography variant="body2" component="p" color="text.secondary">
          {action.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
