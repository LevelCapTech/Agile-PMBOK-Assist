import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

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
    <div className="flex items-center gap-3">
      <LcStatusChip status="オープン" tone="primary" />
      <LcStatusChip status="進行中" tone="success" />
      <LcStatusChip status="注意" tone="warning" />
      <LcStatusChip status="停止" tone="error" />
      <LcStatusChip status="保留" tone="neutral" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chips = canvas.getAllByTestId("lc-status-chip");
    const backgrounds = chips.map(
      (chip) => window.getComputedStyle(chip).backgroundColor,
    );
    if (new Set(backgrounds).size !== chips.length) {
      throw new Error("toneごとの背景色が反映されていません。");
    }
  },
};
