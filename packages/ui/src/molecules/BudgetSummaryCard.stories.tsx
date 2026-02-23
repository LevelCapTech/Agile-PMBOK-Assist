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

export const ToneVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <BudgetSummaryCard label="総予算" value={103000000} tone="primary" />
      <BudgetSummaryCard label="総執行額" value={96000000} tone="success" />
      <BudgetSummaryCard label="執行率" value={93.2} tone="warning" />
    </div>
  ),
};
