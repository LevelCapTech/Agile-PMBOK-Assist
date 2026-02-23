import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";

const meta = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardLayoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: (
      <div
        style={{
          padding: 16,
          borderBottom: "1px solid #ccc",
          background: "#fff",
        }}
      >
        Header Area
      </div>
    ),
    sidebar: (
      <div
        style={{
          padding: 16,
          background: "#f5f5f5",
          height: "100%",
        }}
      >
        Sidebar Area
      </div>
    ),
    main: (
      <div style={{ padding: 16 }}>Main Content Area</div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Header Area")).toBeInTheDocument();
    expect(canvas.getByText("Sidebar Area")).toBeInTheDocument();
    expect(canvas.getByText("Main Content Area")).toBeInTheDocument();
  },
};
