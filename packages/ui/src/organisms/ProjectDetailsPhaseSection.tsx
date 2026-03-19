"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { Plus } from "lucide-react";

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
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <ProjectDetailsSectionTitle title="プロジェクトフェーズ" component="h2" />
            <Button
              variant="contained"
              size="small"
              startIcon={<Plus size={14} />}
              sx={{ borderRadius: 999 }}
            >
              フェーズ追加
            </Button>
          </Box>
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
