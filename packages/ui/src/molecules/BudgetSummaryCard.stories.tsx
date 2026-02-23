import type { Meta, StoryObj } from "@storybook/react";

import { BudgetSummaryCard } from "./BudgetSummaryCard";

const meta = {
  title: "Molecules/BudgetSummaryCard",
  component: BudgetSummaryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "success", "warning"],
    },
  },
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

export const ToneVariants: Story = {
  args: {
    label: "総予算（6ヶ月）",
    value: 103000000,
    tone: "primary",
  },
  render: () => (
    <div className="flex gap-4">
      <BudgetSummaryCard label="総予算（6ヶ月）" value={103000000} tone="primary" />
      <BudgetSummaryCard label="総執行額（6ヶ月）" value={96000000} tone="success" />
      <BudgetSummaryCard label="残額" value={7000000} tone="warning" />
    </div>
  ),
};
