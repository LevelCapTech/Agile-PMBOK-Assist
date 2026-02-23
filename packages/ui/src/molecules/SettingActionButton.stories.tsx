import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { IconResolver, SettingAction } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { SettingActionButton } from "./SettingActionButton";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    settings: "⚙️",
    users: "👥",
    bell: "🔔",
    shield: "🛡️",
    lock: "🔒",
    eye: "👁️",
    download: "📥",
    sliders: "🎚️",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const sampleAction: SettingAction = {
  id: "project-settings",
  label: "プロジェクト設定",
  description: "プロジェクトの基本情報や期限を設定",
  iconKey: "settings",
};

const meta = {
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ width: 280 }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: sampleAction,
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    action: sampleAction,
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    expect(button).toBeDisabled();
  },
};
