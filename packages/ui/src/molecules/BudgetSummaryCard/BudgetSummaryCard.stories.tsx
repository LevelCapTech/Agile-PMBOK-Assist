import type { Meta, StoryObj } from "@storybook/react";
import { BudgetSummaryCard } from "./BudgetSummaryCard";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";
import { expect } from "@storybook/test";

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
  title: "Molecules/BudgetSummaryCard",
  component: BudgetSummaryCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ maxWidth: "300px" }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    label: {
      control: "text",
      description: "メトリックのラベル",
    },
    value: {
      control: "number",
      description: "メトリックの値",
    },
    tone: {
      control: "select",
      options: ["primary", "success", "warning"],
      description: "カードのトーン",
    },
  },
} satisfies Meta<typeof BudgetSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "総予算（6ヶ月）",
    value: 103000000,
    tone: "primary",
  },
  play: async ({ canvasElement }) => {
    const hasLabel = canvasElement.textContent?.includes("総予算（6ヶ月）");
    expect(hasLabel).toBeTruthy();
  },
};

export const TonePrimary: Story = {
  args: {
    label: "総予算（6ヶ月）",
    value: 103000000,
    tone: "primary",
  },
};

export const ToneSuccess: Story = {
  args: {
    label: "総執行額（6ヶ月）",
    value: 96000000,
    tone: "success",
  },
};

export const ToneWarning: Story = {
  args: {
    label: "執行率",
    value: 93.2,
    tone: "warning",
  },
};
