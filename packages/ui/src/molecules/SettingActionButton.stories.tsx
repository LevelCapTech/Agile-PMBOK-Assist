import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "storybook/test";

import { mockSettings } from "../stories/dashboardMocks";
import { SettingActionButton } from "./SettingActionButton";

const meta: Meta<typeof SettingActionButton> = {
  title: "Dashboard/Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  args: {
    action: mockSettings[0],
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SettingActionButton>;

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
    const button = canvas.getByRole("button", { name: mockSettings[0].label });
    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
