"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { SettingsActionPanelProps } from "../types/dashboard";
import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { SettingActionButton } from "../molecules/SettingActionButton";

export const SettingsActionPanel = ({
  title,
  settings,
  isLoading,
  error,
  onClickSetting,
}: SettingsActionPanelProps) => {
  const theme = useTheme();

  return (
    <Box className="flex flex-col gap-4">
      <LcSectionTitle title={title} />
      {isLoading ? (
        <Box
          className="flex items-center gap-2"
          sx={{ color: theme.palette.text.secondary }}
        >
          <CircularProgress size={20} />
          <Typography variant="body2">読み込み中...</Typography>
        </Box>
      ) : error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : settings.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          設定項目がありません
        </Typography>
      ) : (
        <Box className="grid grid-cols-4 gap-4">
          {settings.map((setting) => (
            <SettingActionButton
              key={setting.id}
              action={setting}
              disabled={setting.disabled}
              onClick={onClickSetting}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
