import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { sampleProjects } from "../fixtures/dashboard";

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
    const canvas = within(canvasElement);

    expect(canvas.getByText("0名")).toBeTruthy();
  },
};
