"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsEmptyText } from "../atoms/ProjectDetailsEmptyText";
import { ProjectDetailsSectionTitle } from "../atoms/ProjectDetailsSectionTitle";
import { ProjectDetailsPhaseItem } from "../molecules/ProjectDetailsPhaseItem";

export const ProjectDetailsPhaseSection = ({
  phases,
}: {
  phases: ProjectDetailsPageData["phases"];
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <ProjectDetailsSectionTitle title="フェーズ毎の進捗" component="h2" />
          {phases.length === 0 ? (
            <ProjectDetailsEmptyText text="フェーズがありません" />
          ) : (
            <Stack spacing={2}>
              {phases.map((phase) => (
                <ProjectDetailsPhaseItem key={phase.id} phase={phase} />
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
