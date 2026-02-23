import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

import { LcMetricValue } from "./LcMetricValue";

const meta: Meta<typeof LcMetricValue> = {
  title: "Atoms/LcMetricValue",
  component: LcMetricValue,
  tags: ["autodocs"],
  args: {
    value: 103.0,
    unit: "M",
    tone: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof LcMetricValue>;

export const Default: Story = {};

export const ToneVariants: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <LcMetricValue value={103.0} unit="M" tone="primary" />
      <LcMetricValue value={96.0} unit="M" tone="success" />
      <LcMetricValue value={93.2} unit="%" tone="warning" />
      <LcMetricValue value={0} unit="件" tone="neutral" />
    </Box>
  ),
};
