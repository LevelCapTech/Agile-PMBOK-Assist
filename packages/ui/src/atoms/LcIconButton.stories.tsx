import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

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
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "新規プロジェクト" });

    expect((button as HTMLButtonElement).disabled).toBe(true);
  },
};
