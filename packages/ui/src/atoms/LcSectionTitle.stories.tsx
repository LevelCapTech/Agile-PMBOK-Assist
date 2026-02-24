import type { Meta, StoryObj } from "@storybook/react";

import { LcSectionTitle } from "./LcSectionTitle";

const meta: Meta<typeof LcSectionTitle> = {
  title: "Atoms/LcSectionTitle",
  component: LcSectionTitle,
  tags: ["autodocs"],
  args: {
    title: "セクションタイトル",
    description: "セクションの概要を表示します。",
  },
};

export default meta;

type Story = StoryObj<typeof LcSectionTitle>;

export const Default: Story = {};
