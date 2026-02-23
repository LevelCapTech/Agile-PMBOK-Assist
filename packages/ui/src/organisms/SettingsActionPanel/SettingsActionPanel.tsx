"use client";

import { Box, CircularProgress, Typography, styled } from "@mui/material";
import type { SettingsActionPanelProps } from "../../types/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle";
import { SettingActionButton } from "../../molecules/SettingActionButton";

const PanelContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
});

const ErrorContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.error.main,
}));

const SettingsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(2),
}));

export const SettingsActionPanel = ({
  title,
  settings,
  isLoading,
  error,
  onClickSetting,
}: SettingsActionPanelProps) => {
  return (
    <PanelContainer>
      <LcSectionTitle title={title} />

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <Typography variant="h6" className="mb-2">
            エラーが発生しました
          </Typography>
          <Typography variant="body2">
            {error.code}: {error.message}
          </Typography>
        </ErrorContainer>
      ) : (
        <SettingsGrid>
          {settings.map((setting) => (
            <SettingActionButton
              key={setting.id}
              action={setting}
              disabled={setting.disabled}
              onClick={onClickSetting}
            />
          ))}
        </SettingsGrid>
      )}
    </PanelContainer>
  );
};
