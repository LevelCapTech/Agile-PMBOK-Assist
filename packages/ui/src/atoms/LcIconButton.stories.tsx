import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { LcIconButton } from "./LcIconButton";

const meta = {
  title: "Atoms/LcIconButton",
  component: LcIconButton,
  tags: ["autodocs"],
} satisfies Meta<typeof LcIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconKey: "settings",
    label: "設定",
  },
};

export const Disabled: Story = {
  args: {
    iconKey: "settings",
    label: "設定",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "設定" });
    expect(button).toBeDisabled();
  },
};
