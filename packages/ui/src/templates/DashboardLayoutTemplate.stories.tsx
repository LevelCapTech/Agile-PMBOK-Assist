import type { Meta, StoryObj } from "@storybook/react";

import {
  sampleBudgetSeries,
  sampleBudgetSummary,
  sampleHeader,
  sampleProjects,
  sampleSidebar,
  sampleSettings,
} from "../fixtures/dashboardSamples";
import { DashboardHeader } from "../organisms/DashboardHeader";
import { ProjectListPanel } from "../organisms/ProjectListPanel";
import { SettingsActionPanel } from "../organisms/SettingsActionPanel";
import { SidebarNavigation } from "../organisms/SidebarNavigation";
import { BudgetExecutionPanel } from "../organisms/BudgetExecutionPanel";
import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";

const meta: Meta<typeof DashboardLayoutTemplate> = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DashboardLayoutTemplate>;

export const Default: Story = {
  render: () => (
    <DashboardLayoutTemplate
      header={
        <div data-testid="dashboard-header">
          <DashboardHeader
            header={sampleHeader}
            searchQuery=""
            onSearchChange={() => {}}
          />
        </div>
      }
      sidebar={
        <div data-testid="dashboard-sidebar">
          <SidebarNavigation sidebar={sampleSidebar} />
        </div>
      }
      main={
        <div data-testid="dashboard-main" className="flex flex-col gap-8">
          <ProjectListPanel title="プロジェクト選択" projects={sampleProjects} />
          <BudgetExecutionPanel
            title="予算・執行状況"
            summary={sampleBudgetSummary}
            series={sampleBudgetSeries}
          />
          <SettingsActionPanel title="設定" settings={sampleSettings} />
        </div>
      }
    />
  ),
  play: async ({ canvasElement }) => {
    const header = canvasElement.querySelector("[data-testid='dashboard-header']");
    const sidebar = canvasElement.querySelector("[data-testid='dashboard-sidebar']");
    const main = canvasElement.querySelector("[data-testid='dashboard-main']");
    if (!header || !sidebar || !main) {
      throw new Error("レイアウトの3領域が描画されていません");
    }
  },
};
