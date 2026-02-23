import type { Meta, StoryObj } from "@storybook/react";
import { expect, jest } from "@storybook/jest";
import { fireEvent, within } from "@storybook/testing-library";

import { sampleSettings } from "../fixtures/dashboard";

import { SettingActionButton } from "./SettingActionButton";

const meta: Meta<typeof SettingActionButton> = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  args: {
    action: sampleSettings[0],
    onClick: jest.fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SettingActionButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: jest.fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "プロジェクト設定" });

    fireEvent.click(button);

    expect(args.onClick).not.toHaveBeenCalled();
    expect((button as HTMLButtonElement).disabled).toBe(true);
  },
};
