import type { Meta, StoryObj } from "@storybook/react";

import type { IconResolver } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";
import { DashboardHeader } from "../organisms/DashboardHeader";
import { SidebarNavigation } from "../organisms/SidebarNavigation";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    search: "🔍",
    bell: "🔔",
    menu: "☰",
    x: "✕",
    project: "📁",
    members: "👥",
    stats: "📊",
    settings: "⚙️",
    "chevron-down": "▼",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const meta = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
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
} satisfies Meta<typeof DashboardLayoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: (
      <DashboardHeader
        header={{
          title: "ダッシュボード",
          subtitle: "プロジェクト管理",
          searchPlaceholder: "プロジェクトを検索...",
          searchQuery: "",
          userName: "ユーザー",
        }}
        searchQuery=""
        onSearchChange={() => {}}
      />
    ),
    sidebar: (
      <SidebarNavigation
        sidebar={{
          title: "メニュー",
          items: [
            { id: "project", label: "プロジェクト", iconKey: "project", active: true },
            { id: "members", label: "メンバー", iconKey: "members", active: false },
            { id: "stats", label: "統計", iconKey: "stats", active: false },
            { id: "settings", label: "設定", iconKey: "settings", active: false },
          ],
        }}
      />
    ),
    main: (
      <div className="p-4">
        <h1>メインコンテンツ領域</h1>
        <p>ここにプロジェクト一覧やメンバー一覧などのコンテンツが表示されます。</p>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByText("メニュー")).toBeInTheDocument();
    expect(canvas.getByText("メインコンテンツ領域")).toBeInTheDocument();
    expect(canvas.getByText("ユーザー")).toBeInTheDocument();
  },
};
