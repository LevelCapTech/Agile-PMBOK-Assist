"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { ArrowLeft, Calendar, Users } from "lucide-react";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

export const ProjectDetailsHeaderCard = ({
  header,
  overallProgress,
  memberCount,
  onBack,
}: {
  header: ProjectDetailsPageData["header"];
  overallProgress: ProjectDetailsPageData["overallProgress"];
  memberCount: number;
  onBack?: () => void;
}) => {
  const theme = useTheme();

  return (
    <Stack spacing={2.5}>
      <Button
        variant="text"
        color="inherit"
        startIcon={<ArrowLeft size={16} />}
        onClick={onBack}
        disabled={!onBack}
        sx={{ alignSelf: "flex-start", color: "text.secondary" }}
      >
        プロジェクト一覧に戻る
      </Button>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              {header.name}
            </Typography>
            <Chip
              label={header.code}
              color="primary"
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                borderColor: alpha(theme.palette.primary.main, 0.4),
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }}
            />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Calendar size={16} />
              <Typography variant="body2" color="text.secondary">
                開始日: {header.startDate}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Users size={16} />
              <Typography variant="body2" color="text.secondary">
                {memberCount}名のメンバー
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            全体進捗
          </Typography>
          <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
            {overallProgress.percentage}%
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
