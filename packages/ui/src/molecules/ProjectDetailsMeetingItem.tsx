"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Clock } from "lucide-react";

import type { DayOfWeek, ProjectDetailsPageData } from "@contracts/pages/project-details";

const dayOfWeekLabel: Record<DayOfWeek, string> = {
  MON: "月曜日",
  TUE: "火曜日",
  WED: "水曜日",
  THU: "木曜日",
  FRI: "金曜日",
};

export const ProjectDetailsMeetingItem = ({
  meeting,
}: {
  meeting: ProjectDetailsPageData["meetings"][number];
}) => {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Clock size={16} color={theme.palette.primary.main} />
      <Stack spacing={0.5}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {meeting.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          毎週{dayOfWeekLabel[meeting.dayOfWeek]} {meeting.timeRange}
        </Typography>
      </Stack>
    </Stack>
  );
};
