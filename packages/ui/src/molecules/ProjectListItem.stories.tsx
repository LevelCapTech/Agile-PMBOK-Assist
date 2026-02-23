import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import type { DashboardProjectItem } from "@contracts/pages/dashboard";

import { ProjectListItem } from "./ProjectListItem";

const sampleProject: DashboardProjectItem = {
  id: "1",
  name: "ECサイトリニューアルプロジェクト",
  code: "PRJ-2024-001",
  status: "オープン",
  startDate: "2024年1月15日",
  members: [
    { name: "田中太郎", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { name: "佐藤花子" },
    { name: "鈴木一郎" },
  ],
};

const meta: Meta<typeof ProjectListItem> = {
  title: "Molecules/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  args: {
    item: sampleProject,
  },
};

export default meta;

type Story = StoryObj<typeof ProjectListItem>;

export const Default: Story = {};

export const EmptyMembers: Story = {
  args: {
    item: {
      ...sampleProject,
      members: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("0名")).toBeInTheDocument();
  },
};
