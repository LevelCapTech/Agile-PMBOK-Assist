import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import type { BudgetSummary, BudgetSeriesPoint } from "@contracts/pages/dashboard";

import { BudgetExecutionPanel } from "./BudgetExecutionPanel";

const sampleSummary: BudgetSummary = {
  totalBudget: 103000000,
  totalActual: 96000000,
  executionRate: 93.2,
};

const sampleSeries: BudgetSeriesPoint[] = [
  { month: "1月", budget: 12000000, actual: 10500000 },
  { month: "2月", budget: 15000000, actual: 14200000 },
  { month: "3月", budget: 18000000, actual: 17800000 },
  { month: "4月", budget: 16000000, actual: 15200000 },
  { month: "5月", budget: 20000000, actual: 18500000 },
  { month: "6月", budget: 22000000, actual: 19800000 },
];

const meta: Meta<typeof BudgetExecutionPanel> = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    title: "予算・執行状況",
    summary: sampleSummary,
    series: sampleSeries,
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
    await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    error: { code: "LOAD_FAILED", message: "予算データの読み込みに失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("予算データの読み込みに失敗しました")).toBeInTheDocument();
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
    await expect(canvas.getByText("0.0%")).toBeInTheDocument();
  },
};
