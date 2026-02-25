"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return (
        <Typography component="p" variant="body2">
          読み込み中...
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.error.main }}
        >
          {error.message}
        </Typography>
      );
    }

    if (settings.length === 0) {
      return (
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          設定項目がありません
        </Typography>
      );
    }

    return (
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {settings.map((setting) => (
          <SettingActionButton
            key={setting.id}
            action={setting}
            disabled={setting.disabled}
            onClick={onClickSetting}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <LcSectionTitle title={title} />
      {renderContent()}
    </Box>
  );
};
