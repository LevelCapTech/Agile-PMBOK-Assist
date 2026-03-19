"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { PhaseStatus, ProjectDetailsPageData } from "@contracts/pages/project-details";

const phaseStatusLabel: Record<PhaseStatus, string> = {
  DONE: "完了",
  IN_PROGRESS: "進行中",
  NOT_STARTED: "未着手",
};

const phaseStatusColor: Record<PhaseStatus, "success" | "info" | "default"> = {
  DONE: "success",
  IN_PROGRESS: "info",
  NOT_STARTED: "default",
};

export const ProjectDetailsPhaseItem = ({
  phase,
}: {
  phase: ProjectDetailsPageData["phases"][number];
}) => {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={0.5}>
          <Typography variant="subtitle1">{phase.name}</Typography>
          <Chip
            label={phaseStatusLabel[phase.status]}
            size="small"
            color={phaseStatusColor[phase.status]}
            variant="outlined"
          />
        </Stack>
        <Typography variant="subtitle1">{phase.progress}%</Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={phase.progress}
        sx={{ mt: 1, height: 6, borderRadius: 999 }}
      />
    </Box>
  );
};
