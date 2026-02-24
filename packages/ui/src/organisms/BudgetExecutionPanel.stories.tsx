import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

import { BudgetExecutionPanel } from "./BudgetExecutionPanel";
import { budgetSeries, budgetSummary } from "../stories/dashboardStoryData";

const meta: Meta<typeof BudgetExecutionPanel> = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
  args: {
    title: "予算・執行状況",
    summary: budgetSummary,
    series: budgetSeries,
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
    canvas.getByText("読み込み中...");
  },
};

export const Error: Story = {
  args: {
    error: { code: "error", message: "予算情報を取得できません" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByText("予算情報を取得できません");
  },
};

export const ZeroBudget: Story = {
  args: {
    summary: { totalBudget: 0, totalActual: 0, executionRate: 0 },
    series: budgetSeries.map((point) => ({
      ...point,
      budget: 0,
      actual: 0,
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    if (canvas.getAllByText("0").length === 0) {
      throw new globalThis.Error("ゼロ予算の表示が確認できません。");
    }
  },
};
