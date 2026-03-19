"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { Plus } from "lucide-react";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsEmptyText } from "../atoms/ProjectDetailsEmptyText";
import { ProjectDetailsSectionTitle } from "../atoms/ProjectDetailsSectionTitle";
import { ProjectDetailsMeetingItem } from "../molecules/ProjectDetailsMeetingItem";

export const ProjectDetailsMeetingsSection = ({
  meetings,
  onAddMeeting = () => {},
}: {
  meetings: ProjectDetailsPageData["meetings"];
  onAddMeeting?: () => void;
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <ProjectDetailsSectionTitle title="会議体" component="h2" />
            <Button
              variant="contained"
              size="small"
              startIcon={<Plus size={14} />}
              onClick={onAddMeeting}
              sx={{ borderRadius: 999 }}
            >
              会議体追加
            </Button>
          </Box>
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
