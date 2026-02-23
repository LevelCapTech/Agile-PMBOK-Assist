import type { Meta, StoryObj } from "@storybook/react";

import { LcMetricValue } from "./LcMetricValue";

const meta = {
  title: "Atoms/LcMetricValue",
  component: LcMetricValue,
  tags: ["autodocs"],
} satisfies Meta<typeof LcMetricValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 103000000,
    unit: "円",
    tone: "primary",
  },
};

export const ToneVariants: Story = {
  args: {
    value: 100,
    unit: "%",
    tone: "primary",
  },
  render: () => (
    <div className="flex gap-4">
      <LcMetricValue value={100} unit="%" tone="primary" />
      <LcMetricValue value={200} unit="件" tone="success" />
      <LcMetricValue value={93.2} unit="%" tone="warning" />
    </div>
  ),
};
