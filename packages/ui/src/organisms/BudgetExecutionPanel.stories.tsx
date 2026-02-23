import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import type {
  BudgetSeriesPoint,
  BudgetSummary,
} from "@contracts/dashboard/types";

import { BudgetExecutionPanel } from "./BudgetExecutionPanel";

const sampleSummary: BudgetSummary = {
  totalBudget: 103000000,
  totalActual: 96000000,
  executionRate: 93.2,
};

const sampleSeries: BudgetSeriesPoint[] = [
  { month: "1月", budget: 20000000, actual: 18000000 },
  { month: "2月", budget: 18000000, actual: 17000000 },
  { month: "3月", budget: 17000000, actual: 16000000 },
  { month: "4月", budget: 16000000, actual: 15000000 },
  { month: "5月", budget: 16000000, actual: 15000000 },
  { month: "6月", budget: 16000000, actual: 15000000 },
];

const meta = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof BudgetExecutionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "予算・執行状況",
    summary: sampleSummary,
    series: sampleSeries,
  },
};

export const Loading: Story = {
  args: {
    title: "予算・執行状況",
    summary: sampleSummary,
    series: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "予算・執行状況",
    summary: sampleSummary,
    series: [],
    error: { code: "FETCH_ERROR", message: "予算データの取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("予算データの取得に失敗しました")).toBeInTheDocument();
  },
};

export const ZeroBudget: Story = {
  args: {
    title: "予算・執行状況",
    summary: { totalBudget: 0, totalActual: 0, executionRate: 0 },
    series: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const zeros = canvas.getAllByText("0");
    expect(zeros.length).toBeGreaterThanOrEqual(2);
  },
};
