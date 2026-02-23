"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import type { ProjectListPanelProps } from "@contracts/dashboard/types";

import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { ProjectListItem } from "@ui/molecules/ProjectListItem";

export const ProjectListPanel = ({
  title,
  projects,
  isLoading = false,
  error,
  onSelectProject,
}: ProjectListPanelProps) => {
  return (
    <Box component="section">
      <LcSectionTitle
        title={title}
        description="プロジェクトを選択して作業を開始"
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

      {!isLoading && !error && projects.length === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }} className="py-8 text-center">
          プロジェクトがありません
        </Typography>
      )}

      {!isLoading && !error && projects.length > 0 && (
        <Box className="grid grid-cols-3 gap-4">
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
