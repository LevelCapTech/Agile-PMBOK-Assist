import type { Meta, StoryObj } from "@storybook/react";
import { BudgetExecutionPanel } from "./BudgetExecutionPanel";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";
import { expect, within } from "@storybook/test";

const mockIconResolver = (iconKey: string) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#246BFF",
        color: "white",
        fontSize: "10px",
        fontWeight: "bold",
      }}
    >
      {iconKey.substring(0, 2).toUpperCase()}
    </div>
  );
};

const meta = {
  title: "Organisms/BudgetExecutionPanel",
  component: BudgetExecutionPanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    title: {
      description: "パネルタイトル",
    },
    summary: {
      description: "予算サマリー情報",
    },
    series: {
      description: "予算推移データ",
    },
    isLoading: {
      description: "ローディング状態",
    },
    error: {
      description: "エラー情報",
    },
  },
} satisfies Meta<typeof BudgetExecutionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "予算執行状況",
    summary: {
      totalBudget: 50000000,
      totalActual: 38500000,
      executionRate: 77.0,
    },
    series: [
      { month: "2024-01", budget: 10000000, actual: 8500000 },
      { month: "2024-02", budget: 10000000, actual: 9200000 },
      { month: "2024-03", budget: 10000000, actual: 10800000 },
      { month: "2024-04", budget: 10000000, actual: 10000000 },
      { month: "2024-05", budget: 10000000, actual: 0 },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("予算執行状況");
    expect(title).toBeInTheDocument();

    const budgetLabel = canvas.getByText("予算");
    expect(budgetLabel).toBeInTheDocument();

    const actualLabel = canvas.getByText("実績");
    expect(actualLabel).toBeInTheDocument();

    const rateLabel = canvas.getByText("執行率");
    expect(rateLabel).toBeInTheDocument();

    const chartPlaceholder = canvas.getByText("グラフ領域");
    expect(chartPlaceholder).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: {
    title: "予算執行状況",
    summary: {
      totalBudget: 0,
      totalActual: 0,
      executionRate: 0,
    },
    series: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('[role="progressbar"]');
    expect(spinner).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "予算執行状況",
    summary: {
      totalBudget: 0,
      totalActual: 0,
      executionRate: 0,
    },
    series: [],
    error: {
      code: "FETCH_ERROR",
      message: "予算データの取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByText(/エラーが発生しました/);
    expect(errorMessage).toBeInTheDocument();
  },
};

export const ZeroBudget: Story = {
  args: {
    title: "予算執行状況",
    summary: {
      totalBudget: 0,
      totalActual: 0,
      executionRate: 0,
    },
    series: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("予算執行状況");
    expect(title).toBeInTheDocument();

    const chartPlaceholder = canvas.getByText("グラフ領域");
    expect(chartPlaceholder).toBeInTheDocument();
  },
};
