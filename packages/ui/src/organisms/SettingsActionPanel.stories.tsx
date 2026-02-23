import type { Meta, StoryObj } from "@storybook/react";

import { sampleSettings } from "../fixtures/dashboardSamples";
import { SettingsActionPanel } from "./SettingsActionPanel";

const meta: Meta<typeof SettingsActionPanel> = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
  args: {
    title: "設定",
    settings: sampleSettings,
  },
};

export default meta;

type Story = StoryObj<typeof SettingsActionPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    settings: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    settings: [],
    error: {
      code: "error",
      message: "設定の取得に失敗しました",
    },
  },
};

export const Empty: Story = {
  args: {
    settings: [],
  },
};
