"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";

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
  return (
    <Stack spacing={2.5}>
      <LcSectionTitle description="プロジェクトを選択して作業を開始" title={title} />
      {isLoading ? <Typography>読み込み中...</Typography> : null}
      {error ? (
        <Typography color="error.main">{error.message}</Typography>
      ) : null}
      {!isLoading && !error && projects.length === 0 ? (
        <Box>
          <Typography color="text.secondary">表示できるプロジェクトがありません</Typography>
        </Box>
      ) : null}
      {!isLoading && !error && projects.length > 0 ? (
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, md: 4 }}>
              <ProjectListItem item={project} onSelect={onSelectProject} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
};
