import type { Meta, StoryObj } from "@storybook/react";

import { LcSectionTitle } from "./LcSectionTitle";

const meta: Meta<typeof LcSectionTitle> = {
  title: "Atoms/LcSectionTitle",
  component: LcSectionTitle,
  tags: ["autodocs"],
  args: {
    title: "セクションタイトル",
    description: "補助説明が入ります。",
  },
};

export default meta;

type Story = StoryObj<typeof LcSectionTitle>;

export const Default: Story = {};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};
