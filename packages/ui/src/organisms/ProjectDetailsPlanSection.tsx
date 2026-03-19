"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChevronDown, Edit, Printer } from "lucide-react";
import { useState } from "react";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsEmptyText } from "../atoms/ProjectDetailsEmptyText";
import { ProjectDetailsSectionTitle } from "../atoms/ProjectDetailsSectionTitle";
import { ProjectDetailsPlanItem } from "../molecules/ProjectDetailsPlanItem";

const ProjectDetailsPlanSectionBody = ({
  plan,
  onEdit,
  onPrint,
}: {
  plan: ProjectDetailsPageData["plan"];
  onEdit?: () => void;
  onPrint?: () => void;
}) => {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(
    plan[0]?.id ?? null,
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <ProjectDetailsSectionTitle title="プロジェクト計画" component="h2" />
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Printer size={14} />}
                onClick={onPrint}
                sx={{ borderRadius: 999 }}
              >
                印刷
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<Edit size={14} />}
                onClick={onEdit}
                sx={{ borderRadius: 999 }}
              >
                編集
              </Button>
            </Stack>
          </Box>
          {plan.length === 0 ? (
            <ProjectDetailsEmptyText text="計画情報がありません" />
          ) : (
            plan.map((section, index) => (
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
                  borderRadius: 2,
                  "&:before": { display: "none" },
                  "&:not(:last-of-type)": { mb: 1.5 },
                }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown size={16} />}
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.02)",
                    "& .MuiAccordionSummary-content": { alignItems: "center" },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {index + 1}. {section.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pb: 2 }}>
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

export const ProjectDetailsPlanSection = ({
  plan,
  resetKey,
  onEdit,
  onPrint,
}: {
  plan: ProjectDetailsPageData["plan"];
  resetKey: string;
  onEdit?: () => void;
  onPrint?: () => void;
}) => {
  return (
    <ProjectDetailsPlanSectionBody
      key={resetKey}
      plan={plan}
      onEdit={onEdit}
      onPrint={onPrint}
    />
  );
};
