import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

import { SettingActionButton } from "./SettingActionButton";
import { settingsActions } from "../stories/dashboardStoryData";

const disabledClickGuard = () => {
  throw new globalThis.Error("disabledの設定アクションがクリックされました。");
};

const meta: Meta<typeof SettingActionButton> = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  args: {
    action: settingsActions[0],
    onClick: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof SettingActionButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    action: { ...settingsActions[0], disabled: true },
    onClick: disabledClickGuard,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId("lc-icon-button");
    button.click();
    if (!(button instanceof HTMLButtonElement) || !button.disabled) {
      throw new Error("disabled状態の設定アクションが無効化されていません。");
    }
  },
};
