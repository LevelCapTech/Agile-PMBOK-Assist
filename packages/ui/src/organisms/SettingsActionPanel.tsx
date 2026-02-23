"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";

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
  return (
    <Stack spacing={2.5}>
      <LcSectionTitle description="システムとプロジェクトの設定を管理" title={title} />
      {isLoading ? <Typography>読み込み中...</Typography> : null}
      {error ? (
        <Typography color="error.main">{error.message}</Typography>
      ) : null}
      {!isLoading && !error && settings.length === 0 ? (
        <Box>
          <Typography color="text.secondary">表示できる設定がありません</Typography>
        </Box>
      ) : null}
      {!isLoading && !error && settings.length > 0 ? (
        <Grid container spacing={2}>
          {settings.map((action) => (
            <Grid key={action.id} size={{ xs: 12, md: 3 }}>
              <SettingActionButton action={action} onClick={onClickSetting} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
};
