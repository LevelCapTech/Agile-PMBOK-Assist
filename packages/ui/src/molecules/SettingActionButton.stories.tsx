import type { Meta, StoryObj } from "@storybook/react";

import { sampleSettings } from "../fixtures/dashboardSamples";
import { SettingActionButton } from "./SettingActionButton";

const meta: Meta<typeof SettingActionButton> = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  args: {
    action: sampleSettings[0],
  },
};

export default meta;

type Story = StoryObj<typeof SettingActionButton>;

export const Default: Story = {};

const clickState = { called: false };

export const Disabled: Story = {
  args: {
    action: {
      ...sampleSettings[0],
      disabled: true,
    },
    disabled: true,
    onClick: () => {
      clickState.called = true;
    },
  },
  play: async ({ canvasElement }) => {
    clickState.called = false;
    const button = canvasElement.querySelector<HTMLButtonElement>("button");
    if (!button?.disabled) {
      throw new Error("disabled状態のボタンが期待されます");
    }
    button.click();
    if (clickState.called) {
      throw new Error("disabled状態でonClickが呼び出されました");
    }
  },
};
