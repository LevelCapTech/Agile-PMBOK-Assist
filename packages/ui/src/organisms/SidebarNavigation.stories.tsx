import type { Meta, StoryObj } from "@storybook/react";
import type { DashboardSidebarView } from "@contracts/pages/dashboard";

import { SidebarNavigation } from "./SidebarNavigation";

const sampleSidebar: DashboardSidebarView = {
  title: "メニュー",
  items: [
    { id: "projects", label: "プロジェクト", iconKey: "folder", active: true },
    { id: "members", label: "メンバー", iconKey: "users", active: false },
    { id: "stats", label: "統計", iconKey: "chart", active: false },
    { id: "settings", label: "設定", iconKey: "settings", active: false },
  ],
};

const meta: Meta<typeof SidebarNavigation> = {
  title: "Organisms/SidebarNavigation",
  component: SidebarNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    sidebar: sampleSidebar,
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {};
