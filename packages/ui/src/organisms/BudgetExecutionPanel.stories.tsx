import type { Meta, StoryObj } from "@storybook/react";

import {
  sampleBudgetSeries,
  sampleBudgetSummary,
} from "../fixtures/dashboardSamples";
import { BudgetExecutionPanel } from "./BudgetExecutionPanel";

const meta: Meta<typeof BudgetExecutionPanel> = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
  args: {
    title: "予算・執行状況",
    summary: sampleBudgetSummary,
    series: sampleBudgetSeries,
  },
};

export default meta;

type Story = StoryObj<typeof BudgetExecutionPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    summary: sampleBudgetSummary,
    series: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.textContent?.includes("読み込み中")) {
      throw new globalThis.Error("ローディング表示が見つかりません");
    }
  },
};

export const Error: Story = {
  args: {
    summary: sampleBudgetSummary,
    series: [],
    error: {
      code: "error",
      message: "予算情報の取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.textContent?.includes("取得に失敗")) {
      throw new globalThis.Error("エラー表示が見つかりません");
    }
  },
};

export const ZeroBudget: Story = {
  args: {
    summary: {
      totalBudget: 0,
      totalActual: 0,
      executionRate: 0,
    },
    series: [
      { month: "1月", budget: 0, actual: 0 },
      { month: "2月", budget: 0, actual: 0 },
    ],
  },
  play: async ({ canvasElement }) => {
    const text = canvasElement.textContent ?? "";
    if (!text.includes("0円") || !text.includes("0%")) {
      throw new globalThis.Error("0値の表示が必要です");
    }
  },
};
