import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "storybook/test";

import { LcIconButton } from "./LcIconButton";

const meta: Meta<typeof LcIconButton> = {
  title: "Dashboard/Atoms/LcIconButton",
  component: LcIconButton,
  tags: ["autodocs"],
  args: {
    iconKey: "project",
    label: "新規プロジェクト",
    tone: "primary",
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof LcIconButton>;

export const Default: Story = {
  name: "default",
};

export const Disabled: Story = {
  name: "disabled",
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "新規プロジェクト" });
    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
