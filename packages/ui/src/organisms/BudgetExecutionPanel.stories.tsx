import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { sampleBudgetSeries, sampleBudgetSummary } from "../fixtures/dashboard";

import { BudgetExecutionPanel } from "./BudgetExecutionPanel";

const meta: Meta<typeof BudgetExecutionPanel> = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
  args: {
    title: "予算執行状況",
    summary: sampleBudgetSummary,
    series: sampleBudgetSeries,
  },
};

export default meta;

type Story = StoryObj<typeof BudgetExecutionPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("読み込み中...")).toBeTruthy();
  },
};

export const Error: Story = {
  args: {
    error: {
      code: "budget_error",
      message: "予算情報の取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("予算情報の取得に失敗しました")).toBeTruthy();
  },
};

export const ZeroBudget: Story = {
  args: {
    summary: {
      totalBudget: 0,
      totalActual: 0,
      executionRate: 0,
    },
    series: [{ month: "1月", budget: 0, actual: 0 }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const zeroValues = canvas.getAllByText("0");
    expect(zeroValues.length).toBeGreaterThanOrEqual(3);
  },
};
