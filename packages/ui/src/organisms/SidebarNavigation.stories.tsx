import type { Meta, StoryObj } from "@storybook/react";

import type { IconResolver, DashboardSidebarView } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { SidebarNavigation } from "./SidebarNavigation";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    menu: "☰",
    x: "✕",
    project: "📁",
    members: "👥",
    stats: "📊",
    settings: "⚙️",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const sampleSidebar: DashboardSidebarView = {
  title: "メニュー",
  items: [
    { id: "project", label: "プロジェクト", iconKey: "project", active: true },
    { id: "members", label: "メンバー", iconKey: "members", active: false },
    { id: "stats", label: "統計", iconKey: "stats", active: false },
    { id: "settings", label: "設定", iconKey: "settings", active: false },
  ],
};

const meta = {
  title: "Organisms/SidebarNavigation",
  component: SidebarNavigation,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <Story />
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebar: sampleSidebar,
  },
};
