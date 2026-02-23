import type { Meta, StoryObj } from "@storybook/react";

import { LcIconButton } from "./LcIconButton";

const meta: Meta<typeof LcIconButton> = {
  title: "Atoms/LcIconButton",
  component: LcIconButton,
  tags: ["autodocs"],
  args: {
    iconKey: "plus",
    label: "新規プロジェクト",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcIconButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector<HTMLButtonElement>("button");
    if (!button?.disabled) {
      throw new Error("disabled状態のボタンが期待されます");
    }
  },
};
