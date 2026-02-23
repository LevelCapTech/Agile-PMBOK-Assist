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
    title: "プロジェクト選択",
    description: "プロジェクトを選択して作業を開始",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "プロジェクト選択",
  },
};
