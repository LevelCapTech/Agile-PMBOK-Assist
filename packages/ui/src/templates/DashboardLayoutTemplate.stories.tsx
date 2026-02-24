import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";

const meta: Meta<typeof DashboardLayoutTemplate> = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
  args: {
    header: <div>ヘッダ領域</div>,
    sidebar: <div>サイドバー領域</div>,
    main: <div>メイン領域</div>,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DashboardLayoutTemplate>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByText("ヘッダ領域");
    canvas.getByText("サイドバー領域");
    canvas.getByText("メイン領域");
  },
};
