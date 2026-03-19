"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

export const ProjectDetailsHeaderCard = ({
  header,
  overallProgress,
}: {
  header: ProjectDetailsPageData["header"];
  overallProgress: ProjectDetailsPageData["overallProgress"];
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5" component="h1">
                {header.name}
              </Typography>
              <Chip label={header.code} color="primary" variant="outlined" />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              開始日: {header.startDate}
            </Typography>
          </Stack>
          <Stack alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={1}>
            <Typography variant="body2" color="text.secondary">
              全体進捗
            </Typography>
            <Typography variant="h4" color="primary">
              {overallProgress.percentage}%
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={`完了 ${overallProgress.completedCount}`}
                size="small"
                color="success"
                variant="outlined"
              />
              <Chip
                label={`進行中 ${overallProgress.inProgressCount}`}
                size="small"
                color="info"
                variant="outlined"
              />
              <Chip
                label={`未着手 ${overallProgress.notStartedCount}`}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
