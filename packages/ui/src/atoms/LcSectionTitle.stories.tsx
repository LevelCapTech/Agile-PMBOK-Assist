import type { Meta, StoryObj } from "@storybook/react";

import { LcSectionTitle } from "./LcSectionTitle";

const meta: Meta<typeof LcSectionTitle> = {
  title: "Dashboard/Atoms/LcSectionTitle",
  component: LcSectionTitle,
  tags: ["autodocs"],
  args: {
    title: "プロジェクト選択",
    description: "プロジェクトを選択して作業を開始",
  },
};

export default meta;

type Story = StoryObj<typeof LcSectionTitle>;

export const Default: Story = {
  name: "default",
};
