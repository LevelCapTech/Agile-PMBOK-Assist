import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { DashboardHeader } from "./DashboardHeader";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const meta: Meta<typeof DashboardHeader> = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    header: {
      title: "ダッシュボード",
      subtitle: "プロジェクトを選択して作業を開始",
      searchPlaceholder: "プロジェクトを検索...",
      searchQuery: "",
      userName: "ユーザー",
    },
    searchQuery: "",
    onSearchChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {};

export const WithSearch: Story = {
  args: {
    searchQuery: "ECサイト",
  },
};
