import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent, fn } from "storybook/test";

import { SettingActionButton } from "./SettingActionButton";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const meta: Meta<typeof SettingActionButton> = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    action: {
      id: "project-settings",
      label: "プロジェクト設定",
      description: "プロジェクトの基本情報や期限を設定",
      iconKey: "settings",
    },
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
    expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    expect(args.onClick).not.toHaveBeenCalled();
  },
};
