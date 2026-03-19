"use client";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

export const ProjectDetailsMemberItem = ({
  member,
}: {
  member: ProjectDetailsPageData["members"][number];
}) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar src={member.avatarUrl ?? undefined}>{member.name.slice(0, 1)}</Avatar>
      <Stack spacing={0.5}>
        <Typography variant="subtitle2">{member.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {member.role}
        </Typography>
      </Stack>
    </Stack>
  );
};
