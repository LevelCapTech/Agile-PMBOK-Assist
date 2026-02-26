"use client";

import Box from "@mui/material/Box";
import type { ReactNode } from "react";

import type { SidebarVariant } from "@contracts/layout/sidebar";
import type {
  BudgetSeriesPoint,
  BudgetSummary,
  DashboardContractError,
  DashboardHeaderView,
  DashboardMemberItem,
  DashboardProjectItem,
  DashboardSidebarView,
  IconResolver,
  SettingAction,
  SettingActionId,
} from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../../contexts/IconResolverContext";
import { BudgetExecutionPanel } from "../../organisms/BudgetExecutionPanel";
import { DashboardHeader } from "../../organisms/DashboardHeader";
import { MemberListPanel } from "../../organisms/MemberListPanel";
import { ProjectListPanel } from "../../organisms/ProjectListPanel";
import { SettingsActionPanel } from "../../organisms/SettingsActionPanel";
import { SidebarNavigation } from "../../organisms/SidebarNavigation";
import { DashboardLayoutTemplate } from "../../templates/DashboardLayoutTemplate";

export type DashboardPageProps = {
  header: DashboardHeaderView;
  sidebar: DashboardSidebarView;
  projects: DashboardProjectItem[];
  members: DashboardMemberItem[];
  budgetSummary: BudgetSummary;
  budgetSeries: BudgetSeriesPoint[];
  settings: SettingAction[];
  searchQuery: string;
  isLoading?: boolean;
  errorState?: DashboardContractError;
  sidebarVariant?: SidebarVariant;
  onSearchChange: (query: string) => void;
  onSelectProject?: (projectId: string) => void;
  onNavigate?: (targetId: string) => void;
  onToggleSidebarVariant?: (variant: SidebarVariant) => void;
  onClickSetting?: (actionId: SettingActionId) => void;
};

const iconMap: Record<string, ReactNode> = {
  folder: "📁",
  users: "👥",
  chart: "📊",
  settings: "⚙️",
  search: "🔍",
  bell: "🔔",
  "chevron-down": "▾",
  "chevron-right": "›",
  plus: "＋",
  calendar: "📅",
  briefcase: "💼",
  shield: "🛡️",
  lock: "🔒",
  display: "🖥️",
  download: "⬇️",
  sliders: "🎛️",
};

const iconResolver: IconResolver = (iconKey) => iconMap[iconKey] ?? null;

export const DashboardPage = ({
  header,
  sidebar,
  projects,
  members,
  budgetSummary,
  budgetSeries,
  settings,
  searchQuery,
  isLoading,
  errorState,
  sidebarVariant,
  onSearchChange,
  onSelectProject,
  onNavigate,
  onToggleSidebarVariant,
  onClickSetting,
}: DashboardPageProps) => {
  return (
    <IconResolverProvider resolver={iconResolver}>
      <DashboardLayoutTemplate
        header={
          <DashboardHeader
            header={header}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        }
        sidebar={
          <SidebarNavigation
            onNavigate={onNavigate}
            onToggleSidebarVariant={onToggleSidebarVariant}
            sidebar={sidebar}
            variant={sidebarVariant}
          />
        }
        main={
          <Box className="flex flex-col gap-10">
            <ProjectListPanel
              error={errorState}
              isLoading={isLoading}
              projects={projects}
              title="プロジェクト一覧"
              onSelectProject={onSelectProject}
            />
            <MemberListPanel
              error={errorState}
              isLoading={isLoading}
              members={members}
              title="メンバー一覧"
            />
            <BudgetExecutionPanel
              error={errorState}
              isLoading={isLoading}
              series={budgetSeries}
              summary={budgetSummary}
              title="予算・執行状況"
            />
            <SettingsActionPanel
              error={errorState}
              isLoading={isLoading}
              settings={settings}
              title="設定"
              onClickSetting={onClickSetting}
            />
          </Box>
        }
      />
    </IconResolverProvider>
  );
};
