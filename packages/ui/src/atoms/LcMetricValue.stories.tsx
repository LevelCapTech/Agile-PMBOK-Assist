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

export const NeutralTone: Story = {
  args: {
    value: 932,
    unit: "%",
    tone: "neutral",
  },
};
