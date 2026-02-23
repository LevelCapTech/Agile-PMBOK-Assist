import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { LcIconButton } from "./LcIconButton";

const meta: Meta<typeof LcIconButton> = {
  title: "Atoms/LcIconButton",
  component: LcIconButton,
  tags: ["autodocs"],
  args: {
    iconKey: "settings",
    label: "設定",
    tone: "primary",
    disabled: false,
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
    const button = canvas.getByRole("button", { name: "設定" });
    await expect(button).toBeDisabled();
  },
};
