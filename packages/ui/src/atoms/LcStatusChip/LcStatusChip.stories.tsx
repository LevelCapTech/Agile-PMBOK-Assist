import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";
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
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <LcStatusChip status="primary" tone="primary" />
      <LcStatusChip status="success" tone="success" />
      <LcStatusChip status="warning" tone="warning" />
      <LcStatusChip status="error" tone="error" />
      <LcStatusChip status="neutral" tone="neutral" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("primary")).toBeInTheDocument();
    expect(canvas.getByText("success")).toBeInTheDocument();
    expect(canvas.getByText("warning")).toBeInTheDocument();
    expect(canvas.getByText("error")).toBeInTheDocument();
    expect(canvas.getByText("neutral")).toBeInTheDocument();
  },
};
