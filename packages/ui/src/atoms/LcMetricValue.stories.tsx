import type { Meta, StoryObj } from "@storybook/react";

import { LcMetricValue } from "./LcMetricValue";

const meta = {
  title: "Atoms/LcMetricValue",
  component: LcMetricValue,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
  },
} satisfies Meta<typeof LcMetricValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 103000000,
    tone: "primary",
  },
};

export const WithUnit: Story = {
  args: {
    value: 93.2,
    unit: "%",
    tone: "warning",
  },
};

export const ToneVariants: Story = {
  args: {
    value: 103000000,
    tone: "primary",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <LcMetricValue value={103000000} tone="primary" />
      <LcMetricValue value={96000000} tone="success" />
      <LcMetricValue value={93.2} unit="%" tone="warning" />
      <LcMetricValue value={0} tone="error" />
      <LcMetricValue value={12345} tone="neutral" />
    </div>
  ),
};
