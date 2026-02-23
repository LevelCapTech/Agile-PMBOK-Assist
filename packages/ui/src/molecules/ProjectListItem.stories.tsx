import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "storybook/test";

import { mockProjects } from "../stories/dashboardMocks";
import { ProjectListItem } from "./ProjectListItem";

const meta: Meta<typeof ProjectListItem> = {
  title: "Dashboard/Molecules/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  args: {
    item: mockProjects[0],
    onSelect: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ProjectListItem>;

export const Default: Story = {
  name: "default",
};

export const EmptyMembers: Story = {
  name: "emptyMembers",
  args: {
    item: {
      ...mockProjects[0],
      members: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("0名")).toBeTruthy();
  },
};
