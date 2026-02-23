import type { Meta, StoryObj } from "@storybook/react";

import { sampleProjects } from "../fixtures/dashboardSamples";
import { ProjectListItem } from "./ProjectListItem";

const meta: Meta<typeof ProjectListItem> = {
  title: "Molecules/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  args: {
    item: sampleProjects[0],
  },
};

export default meta;

type Story = StoryObj<typeof ProjectListItem>;

export const Default: Story = {};

export const EmptyMembers: Story = {
  args: {
    item: {
      ...sampleProjects[0],
      members: [],
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.textContent?.includes("メンバーなし")) {
      throw new Error("空状態のメンバー表示が必要です");
    }
  },
};
