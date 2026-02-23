import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { mockSettings } from "../stories/dashboardMocks";
import { SettingsActionPanel } from "./SettingsActionPanel";

const meta: Meta<typeof SettingsActionPanel> = {
  title: "Dashboard/Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
  args: {
    title: "設定",
    settings: mockSettings,
    onClickSetting: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SettingsActionPanel>;

export const Default: Story = {
  name: "default",
};
