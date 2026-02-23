import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";

const meta: Meta<typeof DashboardLayoutTemplate> = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DashboardLayoutTemplate>;

export const Default: Story = {
  args: {
    header: <div>Header Area</div>,
    sidebar: <div>Sidebar Area</div>,
    main: <div>Main Content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Header Area")).toBeTruthy();
    expect(canvas.getByText("Sidebar Area")).toBeTruthy();
    expect(canvas.getByText("Main Content")).toBeTruthy();
  },
};
