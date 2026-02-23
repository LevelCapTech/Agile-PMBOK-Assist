"use client";

import { Box, CircularProgress, Typography, styled } from "@mui/material";
import type { ProjectListPanelProps } from "../../types/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle";
import { ProjectListItem } from "../../molecules/ProjectListItem";

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

const EmptyContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProjectGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: theme.spacing(3),
}));

export const ProjectListPanel = ({
  title,
  projects,
  isLoading,
  error,
  onSelectProject,
}: ProjectListPanelProps) => {
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
      ) : projects.length === 0 ? (
        <EmptyContainer>
          <Typography variant="body1">
            プロジェクトが見つかりませんでした
          </Typography>
        </EmptyContainer>
      ) : (
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectListItem
              key={project.id}
              item={project}
              onSelect={onSelectProject}
            />
          ))}
        </ProjectGrid>
      )}
    </PanelContainer>
  );
};
