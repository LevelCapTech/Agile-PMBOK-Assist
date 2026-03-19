"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type {
  ProjectDetailsError,
  ProjectDetailsPageData,
} from "@contracts/pages/project-details";

import { ProjectDetailsErrorState } from "../../organisms/ProjectDetailsErrorState";
import { ProjectDetailsHeaderCard } from "../../organisms/ProjectDetailsHeaderCard";
import { ProjectDetailsLoadingState } from "../../organisms/ProjectDetailsLoadingState";
import { ProjectDetailsMeetingsSection } from "../../organisms/ProjectDetailsMeetingsSection";
import { ProjectDetailsMembersSection } from "../../organisms/ProjectDetailsMembersSection";
import { ProjectDetailsPhaseSection } from "../../organisms/ProjectDetailsPhaseSection";
import { ProjectDetailsPlanSection } from "../../organisms/ProjectDetailsPlanSection";
import { ProjectDetailsLayoutTemplate } from "../../templates/ProjectDetailsLayoutTemplate";

export type ProjectDetailsPageProps = {
  data?: ProjectDetailsPageData;
  error?: ProjectDetailsError;
  isLoading?: boolean;
  onRetry?: () => void;
  onBack?: () => void;
  loginHref?: string;
};

const ProjectDetailsContent = ({ data }: { data: ProjectDetailsPageData }) => {
  const planKey = `${data.header.id}-${
    data.plan.map((section) => section.id).join("-") || "empty"
  }`;

  return (
    <ProjectDetailsLayoutTemplate
      header={
        <ProjectDetailsHeaderCard
          header={data.header}
          overallProgress={data.overallProgress}
        />
      }
      primary={
        <>
          <ProjectDetailsPhaseSection phases={data.phases} />
          <ProjectDetailsPlanSection key={planKey} plan={data.plan} />
        </>
      }
      secondary={
        <>
          <ProjectDetailsMembersSection members={data.members} />
          <ProjectDetailsMeetingsSection meetings={data.meetings} />
        </>
      }
    />
  );
};

export const ProjectDetailsPage = ({
  data,
  error,
  isLoading,
  onRetry,
  onBack,
  loginHref,
}: ProjectDetailsPageProps) => {
  if (isLoading) {
    return <ProjectDetailsLoadingState />;
  }

  if (error) {
    return (
      <ProjectDetailsErrorState
        error={error}
        onBack={onBack}
        onRetry={onRetry}
        loginHref={loginHref}
      />
    );
  }

  if (!data) {
    return (
      <Box sx={{ px: 3, py: 6 }}>
        <Typography variant="body1" color="text.secondary">
          表示するデータがありません。
        </Typography>
      </Box>
    );
  }

  return <ProjectDetailsContent key={data.header.id} data={data} />;
};
