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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const summaryLabels = ["総予算 (円)", "執行額 (円)", "執行率 (%)"];
    for (const label of summaryLabels) {
      const labelNode = canvas.getByText(label);
      const cardRoot = labelNode.closest("[data-testid=\"budget-summary-card\"]");
      if (!cardRoot) {
        throw new globalThis.Error(
          `サマリーカードの取得に失敗しました: ${label}`,
        );
      }
      try {
        within(cardRoot).getByText("0");
      } catch {
        throw new globalThis.Error(
          `サマリーカードの0表示が見つかりません: ${label}`,
        );
      }
    }
    const budgetTexts = canvas.getAllByText("予算: 0");
    const actualTexts = canvas.getAllByText("実績: 0");
    const seriesLength = args.series?.length ?? 0;
    if (budgetTexts.length !== seriesLength || actualTexts.length !== seriesLength) {
      throw new globalThis.Error(
        `予算推移のゼロ表示が不足しています。期待:${seriesLength} 件、実際:予算 ${budgetTexts.length} 件 / 実績 ${actualTexts.length} 件`,
      );
    }
  },
};
