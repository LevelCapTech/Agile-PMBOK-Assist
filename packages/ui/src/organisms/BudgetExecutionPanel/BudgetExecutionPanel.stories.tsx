import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { BudgetExecutionPanel } from "./BudgetExecutionPanel";

const SAMPLE_SERIES = [
  { month: "1月", budget: 12_000_000, actual: 10_500_000 },
  { month: "2月", budget: 15_000_000, actual: 14_200_000 },
  { month: "3月", budget: 18_000_000, actual: 17_800_000 },
  { month: "4月", budget: 16_000_000, actual: 15_200_000 },
  { month: "5月", budget: 20_000_000, actual: 18_500_000 },
  { month: "6月", budget: 22_000_000, actual: 19_800_000 },
];

const meta: Meta<typeof BudgetExecutionPanel> = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "予算・執行状況",
    summary: {
      totalBudget: 103_000_000,
      totalActual: 96_000_000,
      executionRate: 93.2,
    },
    series: SAMPLE_SERIES,
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
    const status = canvas.getByRole("status");
    expect(status).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    error: { code: "data_source_unavailable", message: "予算データの取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("予算データの取得に失敗しました");
  },
};

export const ZeroBudget: Story = {
  args: {
    summary: {
      totalBudget: 0,
      totalActual: 0,
      executionRate: 0,
    },
    series: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const noData = canvas.getByText("データがありません");
    expect(noData).toBeInTheDocument();
  },
};
