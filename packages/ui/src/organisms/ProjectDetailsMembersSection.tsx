"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsEmptyText } from "../atoms/ProjectDetailsEmptyText";
import { ProjectDetailsSectionTitle } from "../atoms/ProjectDetailsSectionTitle";
import { ProjectDetailsMemberItem } from "../molecules/ProjectDetailsMemberItem";

export const ProjectDetailsMembersSection = ({
  members,
}: {
  members: ProjectDetailsPageData["members"];
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <ProjectDetailsSectionTitle title="プロジェクトメンバー" />
          {members.length === 0 ? (
            <ProjectDetailsEmptyText text="メンバーがいません" />
          ) : (
            <Stack spacing={1.5} divider={<Divider flexItem />}>
              {members.map((member) => (
                <ProjectDetailsMemberItem key={member.id} member={member} />
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
