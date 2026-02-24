import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/react";

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
    await canvas.findByText("読み込み中...");
    const firstSettingLabel = settingsActions[0]?.label;
    if (firstSettingLabel && canvas.queryByText(firstSettingLabel)) {
      throw new globalThis.Error("読み込み中に設定項目が表示されています。");
    }
  },
};

export const Error: Story = {
  args: {
    error: { code: "error", message: "設定情報を取得できません" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("設定情報を取得できません");
  },
};

export const Empty: Story = {
  args: {
    settings: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("設定項目がありません");
  },
};
