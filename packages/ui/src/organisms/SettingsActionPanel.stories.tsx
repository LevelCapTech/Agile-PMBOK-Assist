import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

import { SettingsActionPanel } from "./SettingsActionPanel";
import { settingsActions } from "../stories/dashboardStoryData";

const meta: Meta<typeof SettingsActionPanel> = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
  args: {
    title: "設定",
    settings: settingsActions,
    onClickSetting: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof SettingsActionPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.queryByText("読み込み中...");
    if (!message) {
      throw new globalThis.Error("読み込み中の表示が見つかりません。");
    }
  },
};

export const Error: Story = {
  args: {
    error: { code: "error", message: "設定情報を取得できません" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.queryByText("設定情報を取得できません");
    if (!message) {
      throw new globalThis.Error("エラー表示が見つかりません。");
    }
  },
};

export const Empty: Story = {
  args: {
    settings: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.queryByText("設定項目がありません");
    if (!message) {
      throw new globalThis.Error("空状態の表示が見つかりません。");
    }
  },
};
