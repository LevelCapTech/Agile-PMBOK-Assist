"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { ProjectListPanelProps } from "@contracts/pages/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle/LcSectionTitle";
import { LcIcon } from "../../atoms/LcIcon/LcIcon";
import { ProjectListItem } from "../../molecules/ProjectListItem/ProjectListItem";

export const ProjectListPanel = ({
  title,
  projects,
  isLoading = false,
  error,
  onSelectProject,
}: ProjectListPanelProps) => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <LcSectionTitle title={title} />
      </Box>

      {isLoading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", py: 8 }}
          role="status"
          aria-label="読み込み中"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            border: `1px solid ${theme.palette.error.main}`,
            borderRadius: 2,
            bgcolor: `${theme.palette.error.main}0a`,
          }}
          role="alert"
        >
          <Typography variant="body2" sx={{ color: theme.palette.error.main }}>
            {error.message}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            エラーコード: {error.code}
          </Typography>
        </Box>
      )}

      {!isLoading && !error && projects.length === 0 && (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: `${theme.palette.primary.main}0f`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <LcIcon iconKey="search" size="lg" />
          </Box>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            プロジェクトが見つかりません
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            検索条件を変更してください
          </Typography>
        </Box>
      )}

      {!isLoading && !error && projects.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
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
      )}
    </Box>
  );
};
