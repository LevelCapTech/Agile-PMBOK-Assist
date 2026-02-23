import type { Meta, StoryObj } from "@storybook/react";

import { LcStatusChip } from "./LcStatusChip";

const meta = {
  title: "Atoms/LcStatusChip",
  component: LcStatusChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
  },
} satisfies Meta<typeof LcStatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "オープン",
    tone: "primary",
  },
};

export const ToneVariants: Story = {
  args: {
    status: "オープン",
    tone: "primary",
  },
  render: () => (
    <div className="flex items-center gap-2">
      <LcStatusChip status="オープン" tone="primary" />
      <LcStatusChip status="保守" tone="success" />
      <LcStatusChip status="待機中" tone="warning" />
      <LcStatusChip status="エラー" tone="error" />
      <LcStatusChip status="見積" tone="neutral" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByText("オープン")).toBeInTheDocument();
    expect(canvas.getByText("保守")).toBeInTheDocument();
    expect(canvas.getByText("待機中")).toBeInTheDocument();
    expect(canvas.getByText("エラー")).toBeInTheDocument();
    expect(canvas.getByText("見積")).toBeInTheDocument();
  },
};
