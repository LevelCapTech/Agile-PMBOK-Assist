"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsEmptyText } from "../atoms/ProjectDetailsEmptyText";
import { ProjectDetailsSectionTitle } from "../atoms/ProjectDetailsSectionTitle";
import { ProjectDetailsMeetingItem } from "../molecules/ProjectDetailsMeetingItem";

export const ProjectDetailsMeetingsSection = ({
  meetings,
}: {
  meetings: ProjectDetailsPageData["meetings"];
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <ProjectDetailsSectionTitle title="会議体一覧" />
          {meetings.length === 0 ? (
            <ProjectDetailsEmptyText text="会議体がありません" />
          ) : (
            <Stack spacing={1.5} divider={<Divider flexItem />}>
              {meetings.map((meeting) => (
                <ProjectDetailsMeetingItem key={meeting.id} meeting={meeting} />
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
