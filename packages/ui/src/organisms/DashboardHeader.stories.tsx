import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { DashboardHeaderView } from "@contracts/dashboard/types";

import { DashboardHeader } from "./DashboardHeader";

const sampleHeader: DashboardHeaderView = {
  title: "メニュー",
  subtitle: "ダッシュボード",
  searchPlaceholder: "プロジェクトを検索...",
  searchQuery: "",
  userName: "ユーザー",
  userAvatarUrl: "https://i.pravatar.cc/150?img=1",
};

const meta = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
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
