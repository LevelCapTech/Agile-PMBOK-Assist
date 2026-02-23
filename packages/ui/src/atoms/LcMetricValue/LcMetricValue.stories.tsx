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
    value: 12500000,
    unit: "円",
    tone: "primary",
  },
};

export const WithoutUnit: Story = {
  args: {
    value: 85,
    tone: "primary",
  },
};

export const Primary: Story = {
  args: {
    value: 12500000,
    unit: "円",
    tone: "primary",
  },
};

export const Success: Story = {
  args: {
    value: 98,
    unit: "%",
    tone: "success",
  },
};

export const Warning: Story = {
  args: {
    value: 75,
    unit: "%",
    tone: "warning",
  },
};

export const Error: Story = {
  args: {
    value: 42,
    unit: "%",
    tone: "error",
  },
};

export const Neutral: Story = {
  args: {
    value: 1234,
    unit: "件",
    tone: "neutral",
  },
};
