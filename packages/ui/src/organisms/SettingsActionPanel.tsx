"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import type { SettingsActionPanelProps } from "@contracts/dashboard/types";

import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { SettingActionButton } from "@ui/molecules/SettingActionButton";

export const SettingsActionPanel = ({
  title,
  settings,
  isLoading = false,
  error,
  onClickSetting,
}: SettingsActionPanelProps) => {
  return (
    <Box component="section">
      <LcSectionTitle
        title={title}
        description="システムとプロジェクトの設定を管理"
      />

      {isLoading && (
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Alert severity="error">
          {error.message}
        </Alert>
      )}

      {!isLoading && !error && (
        <Box className="grid grid-cols-4 gap-4">
          {settings.map((action) => (
            <SettingActionButton
              key={action.id}
              action={action}
              disabled={action.disabled}
              onClick={onClickSetting}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
