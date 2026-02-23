import type { Meta, StoryObj } from "@storybook/react";

import { LcMetricValue } from "./LcMetricValue";

const meta: Meta<typeof LcMetricValue> = {
  title: "Atoms/LcMetricValue",
  component: LcMetricValue,
  tags: ["autodocs"],
  args: {
    value: 103000000,
    unit: "円",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcMetricValue>;

export const Default: Story = {};

export const ToneVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <LcMetricValue value={103} unit="M" tone="primary" />
      <LcMetricValue value={96} unit="M" tone="success" />
      <LcMetricValue value={93.2} unit="%" tone="warning" />
    </div>
  ),
};
