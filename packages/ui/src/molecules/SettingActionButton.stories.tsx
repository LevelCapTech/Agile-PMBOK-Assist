import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "storybook/test";
import type { SettingAction } from "@contracts/pages/dashboard";

import { SettingActionButton } from "./SettingActionButton";

const sampleAction: SettingAction = {
  id: "project-settings",
  label: "プロジェクト設定",
  description: "プロジェクトの基本情報や期限を設定",
  iconKey: "settings",
};

const meta: Meta<typeof SettingActionButton> = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  args: {
    action: sampleAction,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SettingActionButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toHaveAttribute("disabled");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
