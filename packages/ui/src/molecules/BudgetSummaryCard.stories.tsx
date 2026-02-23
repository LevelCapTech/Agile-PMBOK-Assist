import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { BudgetSummaryCard } from "./BudgetSummaryCard";

const meta: Meta<typeof BudgetSummaryCard> = {
  title: "Dashboard/Molecules/BudgetSummaryCard",
  component: BudgetSummaryCard,
  tags: ["autodocs"],
  args: {
    label: "総予算（6ヶ月）",
    value: 103,
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof BudgetSummaryCard>;

export const Default: Story = {
  name: "default",
};

export const ToneVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <BudgetSummaryCard label="総予算（6ヶ月）" tone="primary" value={103} />
      <BudgetSummaryCard label="総執行額（6ヶ月）" tone="success" value={96} />
      <BudgetSummaryCard label="執行率" tone="warning" value={93.2} />
    </Stack>
  ),
};
