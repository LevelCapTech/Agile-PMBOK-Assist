"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

export const ProjectDetailsOverallProgressCard = ({
  overallProgress,
}: {
  overallProgress: ProjectDetailsPageData["overallProgress"];
}) => {
  const theme = useTheme();
  const total =
    overallProgress.completedCount +
    overallProgress.inProgressCount +
    overallProgress.notStartedCount;

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: alpha(theme.palette.primary.main, 0.4),
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            全体進捗状況
          </Typography>
          <Stack spacing={1.25} divider={<Divider flexItem />}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                完了したフェーズ
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {overallProgress.completedCount}/{total}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                進行中のフェーズ
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {overallProgress.inProgressCount}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                未着手のフェーズ
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {overallProgress.notStartedCount}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
