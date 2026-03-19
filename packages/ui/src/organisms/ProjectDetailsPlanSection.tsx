"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsEmptyText } from "../atoms/ProjectDetailsEmptyText";
import { ProjectDetailsSectionTitle } from "../atoms/ProjectDetailsSectionTitle";
import { ProjectDetailsPlanItem } from "../molecules/ProjectDetailsPlanItem";

export const ProjectDetailsPlanSection = ({
  plan,
}: {
  plan: ProjectDetailsPageData["plan"];
}) => {
  const initialExpandedId = useMemo(() => plan[0]?.id ?? null, [plan]);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(
    initialExpandedId,
  );

  useEffect(() => {
    setExpandedSectionId(initialExpandedId);
  }, [initialExpandedId]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <ProjectDetailsSectionTitle title="プロジェクト計画" />
          {plan.length === 0 ? (
            <ProjectDetailsEmptyText text="計画情報がありません" />
          ) : (
            plan.map((section) => (
              <Accordion
                key={section.id}
                expanded={expandedSectionId === section.id}
                onChange={() =>
                  setExpandedSectionId((current) =>
                    current === section.id ? null : section.id,
                  )
                }
                elevation={0}
                disableGutters
                sx={{
                  border: 1,
                  borderColor: "divider",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<Typography component="span">▾</Typography>}>
                  <Typography variant="subtitle1">{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {section.items.map((item) => (
                      <ProjectDetailsPlanItem
                        key={item.label}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
