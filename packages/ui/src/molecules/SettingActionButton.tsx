"use client";

import { Card, CardContent, Stack, Typography } from "@mui/material";

import type { SettingActionButtonProps } from "@contracts/pages/dashboard";

import { LcIconButton } from "../atoms/LcIconButton";

export const SettingActionButton = ({
  action,
  disabled,
  onClick,
}: SettingActionButtonProps) => {
  const isDisabled = disabled ?? action.disabled;

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.25}>
          <LcIconButton
            disabled={isDisabled}
            iconKey={action.iconKey}
            label={action.label}
            onClick={() => onClick?.(action.id)}
            tone="neutral"
          />
          <Typography color="text.secondary" variant="caption">
            {action.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
