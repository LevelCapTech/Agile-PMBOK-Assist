import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";

const meta: Meta<typeof DashboardLayoutTemplate> = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    header: (
      <div data-testid="header-area" style={{ height: 64, background: "#f5f5f5", display: "flex", alignItems: "center", padding: "0 16px" }}>
        ヘッダー領域
      </div>
    ),
    sidebar: (
      <div data-testid="sidebar-area" style={{ width: 240, background: "#fafafa", padding: 16 }}>
        サイドバー領域
      </div>
    ),
    main: (
      <div data-testid="main-area" style={{ padding: 16 }}>
        メインコンテンツ領域
      </div>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof DashboardLayoutTemplate>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("header-area")).toBeInTheDocument();
    await expect(canvas.getByTestId("sidebar-area")).toBeInTheDocument();
    await expect(canvas.getByTestId("main-area")).toBeInTheDocument();
  },
};
