import type { Meta, StoryObj } from "@storybook/react";

import { sampleSettings } from "../fixtures/dashboard";

import { SettingsActionPanel } from "./SettingsActionPanel";

const meta: Meta<typeof SettingsActionPanel> = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
  args: {
    title: "設定",
    settings: sampleSettings,
    onClickSetting: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof SettingsActionPanel>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    settings: [],
  },
};
