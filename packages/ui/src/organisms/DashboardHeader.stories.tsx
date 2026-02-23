import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { IconResolver, DashboardHeaderView } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { DashboardHeader } from "./DashboardHeader";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    search: "🔍",
    bell: "🔔",
    "chevron-down": "▼",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const sampleHeader: DashboardHeaderView = {
  title: "ダッシュボード",
  subtitle: "プロジェクト管理",
  searchPlaceholder: "プロジェクトを検索...",
  searchQuery: "",
  userName: "ユーザー",
  userAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
};

const meta = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ width: "100%", minWidth: 800 }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: sampleHeader,
    searchQuery: "",
    onSearchChange: fn(),
  },
};

export const WithSearchQuery: Story = {
  args: {
    header: sampleHeader,
    searchQuery: "ECサイト",
    onSearchChange: fn(),
  },
};
