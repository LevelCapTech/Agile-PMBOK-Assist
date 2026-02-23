import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { LcStatusChip } from "./LcStatusChip";

const meta: Meta<typeof LcStatusChip> = {
  title: "Dashboard/Atoms/LcStatusChip",
  component: LcStatusChip,
  tags: ["autodocs"],
  args: {
    status: "稼働中",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcStatusChip>;

export const Default: Story = {
  name: "default",
};

export const ToneVariants: Story = {
  name: "toneVariants",
  render: () => (
    <Stack direction="row" spacing={1}>
      <LcStatusChip status="primary" tone="primary" />
      <LcStatusChip status="success" tone="success" />
      <LcStatusChip status="warning" tone="warning" />
      <LcStatusChip status="error" tone="error" />
      <LcStatusChip status="neutral" tone="neutral" />
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("primary")).toBeTruthy();
    await expect(canvas.getByText("success")).toBeTruthy();
  },
};
