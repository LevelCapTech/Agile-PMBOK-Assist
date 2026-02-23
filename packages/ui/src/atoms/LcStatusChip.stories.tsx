import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { LcStatusChip } from "./LcStatusChip";

const meta: Meta<typeof LcStatusChip> = {
  title: "Atoms/LcStatusChip",
  component: LcStatusChip,
  tags: ["autodocs"],
  args: {
    status: "オープン",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcStatusChip>;

export const Default: Story = {};

export const ToneVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <LcStatusChip status="オープン" tone="primary" />
      <LcStatusChip status="稼働中" tone="success" />
      <LcStatusChip status="商談" tone="warning" />
      <LcStatusChip status="エラー" tone="error" />
      <LcStatusChip status="見積" tone="neutral" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("オープン")).toBeInTheDocument();
    await expect(canvas.getByText("稼働中")).toBeInTheDocument();
    await expect(canvas.getByText("商談")).toBeInTheDocument();
    await expect(canvas.getByText("エラー")).toBeInTheDocument();
    await expect(canvas.getByText("見積")).toBeInTheDocument();
  },
};
