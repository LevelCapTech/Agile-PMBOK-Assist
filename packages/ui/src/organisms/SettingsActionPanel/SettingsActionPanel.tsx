"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { SettingsActionPanelProps } from "@contracts/pages/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle/LcSectionTitle";
import { SettingActionButton } from "../../molecules/SettingActionButton/SettingActionButton";

export const SettingsActionPanel = ({
  title,
  settings,
  isLoading = false,
  error,
  onClickSetting,
}: SettingsActionPanelProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <LcSectionTitle title={title} />
      </Box>

      {isLoading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", py: 8 }}
          role="status"
          aria-label="読み込み中"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            border: `1px solid ${theme.palette.error.main}`,
            borderRadius: 2,
            bgcolor: `${theme.palette.error.main}0a`,
          }}
          role="alert"
        >
          <Typography variant="body2" sx={{ color: theme.palette.error.main }}>
            {error.message}
          </Typography>
        </Box>
      )}

      {!isLoading && !error && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          }}
        >
          {settings.map((action) => (
            <SettingActionButton
              key={action.id}
              action={action}
              onClick={onClickSetting}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
