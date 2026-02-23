import { Box, Stack, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { DashboardHeader } from "../organisms/DashboardHeader";
import { MemberListPanel } from "../organisms/MemberListPanel";
import { ProjectListPanel } from "../organisms/ProjectListPanel";
import { SidebarNavigation } from "../organisms/SidebarNavigation";
import { mockHeader, mockMembers, mockProjects, mockSidebar } from "../stories/dashboardMocks";
import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";

const meta: Meta<typeof DashboardLayoutTemplate> = {
  title: "Dashboard/Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
  args: {
    header: (
      <Box data-testid="layout-header">
        <DashboardHeader header={mockHeader} onSearchChange={() => undefined} searchQuery="" />
      </Box>
    ),
    sidebar: (
      <Box data-testid="layout-sidebar">
        <SidebarNavigation sidebar={mockSidebar} />
      </Box>
    ),
    main: (
      <Stack data-testid="layout-main" spacing={4}>
        <Typography variant="h4">ダッシュボード</Typography>
        <ProjectListPanel projects={mockProjects} title="プロジェクト選択" />
        <MemberListPanel members={mockMembers} title="メンバー一覧" />
      </Stack>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof DashboardLayoutTemplate>;

export const Default: Story = {
  name: "default",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("layout-header")).toBeTruthy();
    await expect(canvas.getByTestId("layout-sidebar")).toBeTruthy();
    await expect(canvas.getByTestId("layout-main")).toBeTruthy();
  },
};
