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
  onAddPhase?: () => void;
  onAddMember?: () => void;
  onAddMeeting?: () => void;
  onEditPlan?: () => void;
  onPrintPlan?: () => void;
};

const ProjectDetailsContent = ({
  data,
  onBack,
  onAddPhase,
  onAddMember,
  onAddMeeting,
  onEditPlan,
  onPrintPlan,
}: {
  data: ProjectDetailsPageData;
  onBack?: () => void;
  onAddPhase?: () => void;
  onAddMember?: () => void;
  onAddMeeting?: () => void;
  onEditPlan?: () => void;
  onPrintPlan?: () => void;
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
          <ProjectDetailsPhaseSection phases={data.phases} onAddPhase={onAddPhase} />
        </>
      }
      secondary={
        <>
          <ProjectDetailsMembersSection
            members={data.members}
            onAddMember={onAddMember}
          />
          <ProjectDetailsMeetingsSection
            meetings={data.meetings}
            onAddMeeting={onAddMeeting}
          />
          <ProjectDetailsOverallProgressCard overallProgress={data.overallProgress} />
        </>
      }
      footer={
        <ProjectDetailsPlanSection
          plan={data.plan}
          resetKey={data.header.id}
          onEdit={onEditPlan}
          onPrint={onPrintPlan}
        />
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
  onAddPhase,
  onAddMember,
  onAddMeeting,
  onEditPlan,
  onPrintPlan,
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

  return (
    <ProjectDetailsContent
      key={data.header.id}
      data={data}
      onBack={onBack}
      onAddPhase={onAddPhase}
      onAddMember={onAddMember}
      onAddMeeting={onAddMeeting}
      onEditPlan={onEditPlan}
      onPrintPlan={onPrintPlan}
    />
  );
};
