import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

import { BudgetSummaryCard } from "./BudgetSummaryCard";

const meta: Meta<typeof BudgetSummaryCard> = {
  title: "Molecules/BudgetSummaryCard",
  component: BudgetSummaryCard,
  tags: ["autodocs"],
  args: {
    label: "総予算（6ヶ月）",
    value: 103.0,
    tone: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof BudgetSummaryCard>;

export const Default: Story = {};

export const AllTones: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <BudgetSummaryCard label="総予算（6ヶ月）" value={103.0} tone="primary" />
      <BudgetSummaryCard label="総執行額（6ヶ月）" value={96.0} tone="success" />
      <BudgetSummaryCard label="執行率" value={93.2} tone="warning" />
    </Box>
  ),
};
