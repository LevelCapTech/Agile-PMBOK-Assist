import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { mockBudgetSeries, mockBudgetSummary } from "../stories/dashboardMocks";
import { BudgetExecutionPanel } from "./BudgetExecutionPanel";

const meta: Meta<typeof BudgetExecutionPanel> = {
  title: "Dashboard/Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
  args: {
    title: "予算・執行状況",
    summary: mockBudgetSummary,
    series: mockBudgetSeries,
  },
};

export default meta;

type Story = StoryObj<typeof BudgetExecutionPanel>;

export const Default: Story = {
  name: "default",
};

export const Loading: Story = {
  name: "loading",
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  name: "error",
  args: {
    error: { code: "budget", message: "予算データの取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("予算データの取得に失敗しました")).toBeTruthy();
  },
};

export const ZeroBudget: Story = {
  name: "zeroBudget",
  args: {
    summary: {
      totalBudget: 0,
      totalActual: 0,
      executionRate: 0,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText("0").length).toBeGreaterThan(0);
  },
};
