import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import type { DashboardProjectItem } from "@contracts/dashboard/types";

import { ProjectListItem } from "./ProjectListItem";

const sampleProject: DashboardProjectItem = {
  id: "1",
  name: "ECサイトリニューアルプロジェクト",
  code: "PRJ-2024-001",
  status: "オープン",
  startDate: "2024年1月15日",
  members: [
    { name: "田中太郎", avatarUrl: "https://i.pravatar.cc/150?img=1" },
    { name: "佐藤花子", avatarUrl: "https://i.pravatar.cc/150?img=2" },
    { name: "鈴木一郎" },
  ],
};

const meta = {
  title: "Molecules/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: sampleProject,
  },
};

export const EmptyMembers: Story = {
  args: {
    item: {
      ...sampleProject,
      members: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("0名")).toBeInTheDocument();
  },
};
