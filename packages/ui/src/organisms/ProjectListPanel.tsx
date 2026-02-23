"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { ProjectListPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { LcIcon } from "../atoms/LcIcon";
import { ProjectListItem } from "../molecules/ProjectListItem";

export const ProjectListPanel = ({
  title,
  projects,
  isLoading = false,
  error,
  onSelectProject,
}: ProjectListPanelProps) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box component="section" className="mb-8">
        <LcSectionTitle
          title={title}
          description="プロジェクトを選択して作業を開始"
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
          description="プロジェクトを選択して作業を開始"
        />
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  const isEmpty = projects.length === 0;

  return (
    <Box component="section" className="mb-8">
      <Box className="flex items-center justify-between mb-6">
        <LcSectionTitle
          title={title}
          description="プロジェクトを選択して作業を開始"
        />
        <Button
          variant="contained"
          startIcon={<LcIcon iconKey="plus" size="sm" />}
          sx={{ borderRadius: 4 }}
        >
          新規プロジェクト
        </Button>
      </Box>

      {isEmpty ? (
        <Box className="text-center py-16">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: `${theme.palette.primary.main}0F`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <LcIcon iconKey="search" size="lg" />
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" className="mb-2">
            プロジェクトが見つかりません
          </Typography>
          <Typography variant="caption" color="text.secondary">
            検索条件を変更してください
          </Typography>
        </Box>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectListItem
              key={project.id}
              item={project}
              onSelect={onSelectProject}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
