import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { fireEvent, within } from "@storybook/testing-library";

import { sampleSettings } from "../fixtures/dashboard";

import { SettingActionButton } from "./SettingActionButton";

let clicked = false;

const meta: Meta<typeof SettingActionButton> = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  args: {
    action: sampleSettings[0],
    onClick: () => {
      clicked = true;
    },
  },
};

export default meta;

type Story = StoryObj<typeof SettingActionButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    clicked = false;
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "プロジェクト設定" });

    fireEvent.click(button);

    expect(clicked).toBe(false);
    expect((button as HTMLButtonElement).disabled).toBe(true);
  },
};
