import type { Meta, StoryObj } from "@storybook/react";

import type { DashboardSidebarView } from "@contracts/dashboard/types";

import { SidebarNavigation } from "./SidebarNavigation";

const sampleSidebar: DashboardSidebarView = {
  title: "メニュー",
  items: [
    { id: "project", label: "プロジェクト", iconKey: "folder", active: true },
    { id: "member", label: "メンバー", iconKey: "users", active: false },
    { id: "stats", label: "統計", iconKey: "chart", active: false },
    { id: "settings", label: "設定", iconKey: "settings", active: false },
  ],
};

const meta = {
  title: "Organisms/SidebarNavigation",
  component: SidebarNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SidebarNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebar: sampleSidebar,
  },
};
