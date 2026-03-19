"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ProjectDetailsError } from "@contracts/pages/project-details";

const renderErrorAction = (
  error: ProjectDetailsError,
  onRetry?: () => void,
  onBack?: () => void,
  loginHref?: string,
) => {
  if (error.code === "NETWORK" || error.code === "UNKNOWN") {
    return (
      <Button variant="contained" color="primary" onClick={onRetry} disabled={!onRetry}>
        再読み込み
      </Button>
    );
  }

  if (error.code === "UNAUTHORIZED") {
    return (
      <Button variant="contained" color="primary" href={loginHref ?? "/login"}>
        ログインへ
      </Button>
    );
  }

  return (
    <Button variant="outlined" color="primary" onClick={onBack} disabled={!onBack}>
      プロジェクト一覧に戻る
    </Button>
  );
};

export const ProjectDetailsErrorState = ({
  error,
  onRetry,
  onBack,
  loginHref,
}: {
  error: ProjectDetailsError;
  onRetry?: () => void;
  onBack?: () => void;
  loginHref?: string;
}) => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography variant="h5">{error.message}</Typography>
        {renderErrorAction(error, onRetry, onBack, loginHref)}
      </Stack>
    </Box>
  );
};
