import type { Meta, StoryObj } from "@storybook/react";

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
