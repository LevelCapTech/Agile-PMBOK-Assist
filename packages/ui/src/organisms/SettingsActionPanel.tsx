"use client";

import { Box, Typography } from "@mui/material";

import type { SettingsActionPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { SettingActionButton } from "../molecules/SettingActionButton";

export const SettingsActionPanel = ({
  title,
  settings,
  isLoading,
  error,
  onClickSetting,
}: SettingsActionPanelProps) => {
  const showEmpty = !isLoading && !error && settings.length === 0;

  return (
    <Box className="flex flex-col gap-6">
      <LcSectionTitle title={title} />

      {isLoading ? (
        <Typography variant="body2" color="text.secondary">
          読み込み中...
        </Typography>
      ) : null}

      {!isLoading && error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : null}

      {showEmpty ? (
        <Typography variant="body2" color="text.secondary">
          設定項目がありません
        </Typography>
      ) : null}

      {!isLoading && !error && settings.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {settings.map((action) => (
            <SettingActionButton
              key={action.id}
              action={action}
              disabled={action.disabled}
              onClick={onClickSetting}
            />
          ))}
        </div>
      ) : null}
    </Box>
  );
};
