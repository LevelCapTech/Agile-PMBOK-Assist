"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import type { ProjectListPanelProps } from "@contracts/pages/dashboard";
import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { ProjectListItem } from "@ui/molecules/ProjectListItem";

export const ProjectListPanel = ({
  title,
  projects,
  isLoading = false,
  error,
  onSelectProject,
}: ProjectListPanelProps) => {
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

  if (projects.length === 0) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", py: 4, textAlign: "center" }}
        >
          プロジェクトがありません
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <LcSectionTitle title={title} />
      <Box className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            item={project}
            onSelect={onSelectProject}
          />
        ))}
      </Box>
    </Box>
  );
};
