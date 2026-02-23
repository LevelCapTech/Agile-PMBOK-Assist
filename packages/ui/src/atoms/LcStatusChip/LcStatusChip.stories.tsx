import type { Meta, StoryObj } from "@storybook/react";
import { LcStatusChip } from "./LcStatusChip";

const meta = {
  title: "Atoms/LcStatusChip",
  component: LcStatusChip,
  tags: ["autodocs"],
} satisfies Meta<typeof LcStatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: "オープン",
    tone: "primary",
  },
};

export const Primary: Story = {
  args: {
    status: "オープン",
    tone: "primary",
  },
};

export const Success: Story = {
  args: {
    status: "完了",
    tone: "success",
  },
};

export const Warning: Story = {
  args: {
    status: "保留",
    tone: "warning",
  },
};

export const Error: Story = {
  args: {
    status: "エラー",
    tone: "error",
  },
};

export const Neutral: Story = {
  args: {
    status: "待機中",
    tone: "neutral",
  },
};
