"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { ProjectListPanelProps } from "@contracts/pages/dashboard";

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

    if (projects.length === 0) {
      return (
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          プロジェクトがありません
        </Typography>
      );
    }

    return (
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            item={project}
            onSelect={onSelectProject}
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
