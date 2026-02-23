"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import type { SettingsActionPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { SettingActionButton } from "../molecules/SettingActionButton";

export const SettingsActionPanel = ({
  title,
  settings,
  isLoading = false,
  error,
  onClickSetting,
}: SettingsActionPanelProps) => {
  if (isLoading) {
    return (
      <Box component="section" className="mb-8">
        <LcSectionTitle
          title={title}
          description="システムとプロジェクトの設定を管理"
        />
        <Box className="flex justify-center py-16">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="section" className="mb-8">
        <LcSectionTitle
          title={title}
          description="システムとプロジェクトの設定を管理"
        />
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box component="section" className="mb-8">
      <Box className="mb-6">
        <LcSectionTitle
          title={title}
          description="システムとプロジェクトの設定を管理"
        />
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {settings.map((action) => (
          <SettingActionButton
            key={action.id}
            action={action}
            onClick={onClickSetting}
          />
        ))}
      </Box>
    </Box>
  );
};
