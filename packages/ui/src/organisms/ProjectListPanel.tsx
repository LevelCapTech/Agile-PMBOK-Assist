"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { ProjectListPanelProps } from "../types/dashboard";
import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { ProjectListItem } from "../molecules/ProjectListItem";

export const ProjectListPanel = ({
  title,
  projects,
  isLoading,
  error,
  onSelectProject,
}: ProjectListPanelProps) => {
  const theme = useTheme();

  return (
    <Box className="flex flex-col gap-4">
      <LcSectionTitle title={title} />
      {isLoading ? (
        <Box
          className="flex items-center gap-2"
          sx={{ color: theme.palette.text.secondary }}
        >
          <CircularProgress size={20} />
          <Typography variant="body2">読み込み中...</Typography>
        </Box>
      ) : error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : projects.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          プロジェクトがありません
        </Typography>
      ) : (
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
