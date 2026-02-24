import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

import type { DashboardProjectItem } from "@contracts/pages/dashboard";

import { ProjectListItem } from "./ProjectListItem";
import { dashboardProjects } from "../stories/dashboardStoryData";

const meta: Meta<typeof ProjectListItem> = {
  title: "Molecules/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  args: {
    item: dashboardProjects[0],
  },
};

export default meta;

type Story = StoryObj<typeof ProjectListItem>;

export const Default: Story = {};

const emptyMembersItem: DashboardProjectItem = {
  ...dashboardProjects[0],
  members: [],
};

export const EmptyMembers: Story = {
  args: {
    item: emptyMembersItem,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByText("メンバー0名");
  },
};
