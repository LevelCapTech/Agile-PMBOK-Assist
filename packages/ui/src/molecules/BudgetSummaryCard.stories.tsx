import type { Meta, StoryObj } from "@storybook/react";

import { BudgetSummaryCard } from "./BudgetSummaryCard";

const meta: Meta<typeof BudgetSummaryCard> = {
  title: "Molecules/BudgetSummaryCard",
  component: BudgetSummaryCard,
  tags: ["autodocs"],
  args: {
    label: "総予算 (円)",
    value: 103000000,
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof BudgetSummaryCard>;

export const Default: Story = {};
