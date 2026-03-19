"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { DayOfWeek, ProjectDetailsPageData } from "@contracts/pages/project-details";

const dayOfWeekLabel: Record<DayOfWeek, string> = {
  MON: "月",
  TUE: "火",
  WED: "水",
  THU: "木",
  FRI: "金",
};

export const ProjectDetailsMeetingItem = ({
  meeting,
}: {
  meeting: ProjectDetailsPageData["meetings"][number];
}) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="subtitle2">{meeting.name}</Typography>
      <Typography variant="caption" color="text.secondary">
        {dayOfWeekLabel[meeting.dayOfWeek]} {meeting.timeRange}
      </Typography>
    </Stack>
  );
};
