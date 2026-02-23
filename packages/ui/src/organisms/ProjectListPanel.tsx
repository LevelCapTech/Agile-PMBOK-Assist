"use client";

import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import type { ProjectListPanelProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";
import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { ProjectListItem } from "../molecules/ProjectListItem";

export const ProjectListPanel = ({
  title,
  projects,
  isLoading,
  error,
  onSelectProject,
}: ProjectListPanelProps) => {
  const showEmpty = !isLoading && !error && projects.length === 0;

  return (
    <Box className="flex flex-col gap-6">
      <LcSectionTitle title={title} />

      {isLoading ? (
        <Typography variant="body2" color="text.secondary">
          読み込み中...
        </Typography>
      ) : null}

      {!isLoading && error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : null}

      {showEmpty ? (
        <Box className="flex flex-col items-center gap-3 py-8">
          <Box
            sx={(theme) => ({
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <LcIcon iconKey="search" size="md" />
          </Box>
          <Typography variant="subtitle2" color="text.primary">
            プロジェクトが見つかりません
          </Typography>
          <Typography variant="body2" color="text.secondary">
            検索条件を変更してください
          </Typography>
        </Box>
      ) : null}

      {!isLoading && !error && projects.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectListItem
              key={project.id}
              item={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      ) : null}
    </Box>
  );
};
