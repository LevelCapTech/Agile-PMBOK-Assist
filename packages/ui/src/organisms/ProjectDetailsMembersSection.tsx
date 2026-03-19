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
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <ProjectDetailsSectionTitle title="プロジェクトメンバー" component="h2" />
            <Button
              variant="contained"
              size="small"
              startIcon={<Plus size={14} />}
              sx={{ borderRadius: 999 }}
            >
              メンバー追加
            </Button>
          </Box>
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
