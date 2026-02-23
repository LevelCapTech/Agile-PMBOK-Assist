import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { LcStatusChip } from "./LcStatusChip";

const meta = {
  title: "Atoms/LcStatusChip",
  component: LcStatusChip,
  tags: ["autodocs"],
} satisfies Meta<typeof LcStatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "稼働中",
    tone: "success",
  },
};

export const ToneVariants: Story = {
  args: {
    status: "Primary",
    tone: "primary",
  },
  render: () => (
    <div className="flex gap-2">
      <LcStatusChip status="Primary" tone="primary" />
      <LcStatusChip status="Success" tone="success" />
      <LcStatusChip status="Warning" tone="warning" />
      <LcStatusChip status="Error" tone="error" />
      <LcStatusChip status="Neutral" tone="neutral" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Primary")).toBeInTheDocument();
    expect(canvas.getByText("Success")).toBeInTheDocument();
    expect(canvas.getByText("Warning")).toBeInTheDocument();
    expect(canvas.getByText("Error")).toBeInTheDocument();
    expect(canvas.getByText("Neutral")).toBeInTheDocument();
  },
};
