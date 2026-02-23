"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import type { SettingsActionPanelProps } from "@contracts/pages/dashboard";
import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { SettingActionButton } from "@ui/molecules/SettingActionButton";

export const SettingsActionPanel = ({
  title,
  settings,
  isLoading = false,
  error,
  onClickSetting,
}: SettingsActionPanelProps) => {
  if (error) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <LcSectionTitle title={title} />
      <Box className="grid grid-cols-4 gap-4">
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
