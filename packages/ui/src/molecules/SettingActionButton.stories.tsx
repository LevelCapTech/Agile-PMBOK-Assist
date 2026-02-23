import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "storybook/test";

import type { SettingAction } from "@contracts/dashboard/types";

import { SettingActionButton } from "./SettingActionButton";

const sampleAction: SettingAction = {
  id: "project-settings",
  label: "プロジェクト設定",
  description: "プロジェクトの基本情報や期限を設定",
  iconKey: "settings",
};

const meta = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SettingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: sampleAction,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    action: sampleAction,
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    expect(button).toHaveAttribute("disabled");
    expect(args.onClick).not.toHaveBeenCalled();
  },
};
