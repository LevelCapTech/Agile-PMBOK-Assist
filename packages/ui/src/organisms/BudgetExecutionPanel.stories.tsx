import type { Meta, StoryObj } from "@storybook/react";

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

const meta = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", minWidth: 800, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
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
    summary: { totalBudget: 0, totalActual: 0, executionRate: 0 },
    series: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "予算・執行状況",
    summary: { totalBudget: 0, totalActual: 0, executionRate: 0 },
    series: [],
    error: {
      code: "DATA_FETCH_ERROR",
      message: "予算データの取得に失敗しました。",
    },
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByRole("alert")).toBeInTheDocument();
    expect(canvas.getByText("予算データの取得に失敗しました。")).toBeInTheDocument();
  },
};

export const ZeroBudget: Story = {
  args: {
    title: "予算・執行状況",
    summary: { totalBudget: 0, totalActual: 0, executionRate: 0 },
    series: [
      { month: "1月", budget: 0, actual: 0 },
    ],
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByText("0.0%")).toBeInTheDocument();
  },
};
