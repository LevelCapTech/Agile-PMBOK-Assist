import type { Meta, StoryObj } from "@storybook/react";

import { LcMetricValue } from "./LcMetricValue";

const meta: Meta<typeof LcMetricValue> = {
  title: "Atoms/LcMetricValue",
  component: LcMetricValue,
  tags: ["autodocs"],
  args: {
    value: 93000000,
    unit: "円",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcMetricValue>;

export const Default: Story = {};

export const ToneVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LcMetricValue value={93000000} unit="円" tone="primary" />
      <LcMetricValue value={86000000} unit="円" tone="success" />
      <LcMetricValue value={92.5} unit="%" tone="warning" />
    </div>
  ),
};
