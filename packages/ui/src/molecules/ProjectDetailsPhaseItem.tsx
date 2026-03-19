"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AlertCircle, CheckCircle2, Circle, GripVertical } from "lucide-react";

import type { PhaseStatus, ProjectDetailsPageData } from "@contracts/pages/project-details";

const phaseStatusLabel: Record<PhaseStatus, string> = {
  DONE: "完了",
  IN_PROGRESS: "進行中",
  NOT_STARTED: "未着手",
};

const phaseStatusTone: Record<
  PhaseStatus,
  { color: string; backgroundColor: string; icon: typeof CheckCircle2 }
> = {
  DONE: {
    color: "#16A34A",
    backgroundColor: "rgba(22, 163, 74, 0.12)",
    icon: CheckCircle2,
  },
  IN_PROGRESS: {
    color: "#2563EB",
    backgroundColor: "rgba(37, 99, 235, 0.12)",
    icon: AlertCircle,
  },
  NOT_STARTED: {
    color: "#94A3B8",
    backgroundColor: "rgba(148, 163, 184, 0.16)",
    icon: Circle,
  },
};

export const ProjectDetailsPhaseItem = ({
  phase,
}: {
  phase: ProjectDetailsPageData["phases"][number];
}) => {
  const statusTone = phaseStatusTone[phase.status];
  const StatusIcon = statusTone.icon;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        px: 2.5,
        py: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <GripVertical size={16} color="#94A3B8" />
          <StatusIcon size={18} color={statusTone.color} />
          <Stack spacing={0.5} flex={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {phase.name}
            </Typography>
            <Box
              sx={{
                alignSelf: "flex-start",
                borderRadius: 999,
                px: 1.5,
                py: 0.25,
                fontSize: 12,
                fontWeight: 600,
                color: statusTone.color,
                backgroundColor: statusTone.backgroundColor,
              }}
            >
              {phaseStatusLabel[phase.status]}
            </Box>
          </Stack>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {phase.progress}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={phase.progress}
          sx={{
            height: 6,
            borderRadius: 999,
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
              backgroundColor: "#2563EB",
            },
          }}
        />
      </Stack>
    </Box>
  );
};
