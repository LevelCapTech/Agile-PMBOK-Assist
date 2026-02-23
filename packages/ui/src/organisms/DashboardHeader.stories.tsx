import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "storybook/test";
import type { DashboardHeaderView } from "@contracts/pages/dashboard";

import { DashboardHeader } from "./DashboardHeader";

const sampleHeader: DashboardHeaderView = {
  title: "ダッシュボード",
  subtitle: "プロジェクト管理",
  searchPlaceholder: "プロジェクトを検索...",
  searchQuery: "",
  userName: "ユーザー",
  userAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
};

const meta: Meta<typeof DashboardHeader> = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    header: sampleHeader,
    searchQuery: "",
    onSearchChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {};

export const WithSearchQuery: Story = {
  args: {
    searchQuery: "ECサイト",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveValue("ECサイト");
  },
};
