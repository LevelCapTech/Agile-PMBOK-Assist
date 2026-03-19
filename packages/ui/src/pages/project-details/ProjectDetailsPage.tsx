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
import { ProjectDetailsOverallProgressCard } from "../../organisms/ProjectDetailsOverallProgressCard";
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

const ProjectDetailsContent = ({
  data,
  onBack,
}: {
  data: ProjectDetailsPageData;
  onBack?: () => void;
}) => {
  return (
    <ProjectDetailsLayoutTemplate
      header={
        <ProjectDetailsHeaderCard
          header={data.header}
          overallProgress={data.overallProgress}
          memberCount={data.members.length}
          onBack={onBack}
        />
      }
      primary={
        <>
          <ProjectDetailsPhaseSection phases={data.phases} />
        </>
      }
      secondary={
        <>
          <ProjectDetailsMembersSection members={data.members} />
          <ProjectDetailsMeetingsSection meetings={data.meetings} />
          <ProjectDetailsOverallProgressCard overallProgress={data.overallProgress} />
        </>
      }
      footer={<ProjectDetailsPlanSection plan={data.plan} resetKey={data.header.id} />}
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

  return <ProjectDetailsContent key={data.header.id} data={data} onBack={onBack} />;
};
