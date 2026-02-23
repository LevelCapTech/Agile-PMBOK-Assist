import type { Meta, StoryObj } from "@storybook/react";

import { LcSectionTitle } from "./LcSectionTitle";

const meta: Meta<typeof LcSectionTitle> = {
  title: "Atoms/LcSectionTitle",
  component: LcSectionTitle,
  tags: ["autodocs"],
  args: {
    title: "プロジェクト一覧",
    description: "プロジェクトを選択して作業を開始",
  },
};

export default meta;
type Story = StoryObj<typeof LcSectionTitle>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: {
    description: undefined,
  },
};
