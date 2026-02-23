import type { Meta, StoryObj } from "@storybook/react";
import { LcSectionTitle } from "./LcSectionTitle";

const meta = {
  title: "Atoms/LcSectionTitle",
  component: LcSectionTitle,
  tags: ["autodocs"],
} satisfies Meta<typeof LcSectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "プロジェクト一覧",
    description: "現在進行中のプロジェクトを表示しています",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "メンバー一覧",
  },
};

export const LongDescription: Story = {
  args: {
    title: "予算執行状況",
    description:
      "今月の予算執行率と実績を表示しています。グラフは過去6ヶ月の推移を示します。",
  },
};
