import type { Meta, StoryObj } from "@storybook/react";

import { BudgetSummaryCard } from "./BudgetSummaryCard";

const meta = {
  title: "Molecules/BudgetSummaryCard",
  component: BudgetSummaryCard,
  tags: ["autodocs"],
} satisfies Meta<typeof BudgetSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "総予算（6ヶ月）",
    value: 103000000,
    tone: "primary",
  },
};

export const SuccessTone: Story = {
  args: {
    label: "総執行額（6ヶ月）",
    value: 96000000,
    tone: "success",
  },
};

export const WarningTone: Story = {
  args: {
    label: "執行率",
    value: 93.2,
    tone: "warning",
  },
};
