import type { Meta, StoryObj } from "@storybook/react";

import { BudgetSummaryCard } from "./BudgetSummaryCard";

const meta: Meta<typeof BudgetSummaryCard> = {
  title: "Molecules/BudgetSummaryCard",
  component: BudgetSummaryCard,
  tags: ["autodocs"],
  args: {
    label: "総予算",
    value: 103000000,
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof BudgetSummaryCard>;

export const Default: Story = {};

export const Rate: Story = {
  args: {
    label: "執行率",
    value: 93.2,
    tone: "warning",
  },
};
