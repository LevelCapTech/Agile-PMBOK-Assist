import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { LcMetricValue } from "./LcMetricValue";

const meta: Meta<typeof LcMetricValue> = {
  title: "Dashboard/Atoms/LcMetricValue",
  component: LcMetricValue,
  tags: ["autodocs"],
  args: {
    value: 103,
    unit: "M",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcMetricValue>;

export const Default: Story = {
  name: "default",
};

export const ToneVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <LcMetricValue tone="primary" unit="M" value={103} />
      <LcMetricValue tone="success" unit="M" value={96} />
      <LcMetricValue tone="warning" unit="%" value={93.2} />
    </Stack>
  ),
};
