import type { Meta, StoryObj } from "@storybook/react";

import type { IconResolver } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { LcIconButton } from "./LcIconButton";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    search: "🔍",
    bell: "🔔",
    settings: "⚙️",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const meta = {
  title: "Atoms/LcIconButton",
  component: LcIconButton,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <Story />
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
  },
} satisfies Meta<typeof LcIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconKey: "bell",
    label: "通知",
    tone: "neutral",
  },
};

export const Disabled: Story = {
  args: {
    iconKey: "settings",
    label: "設定",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "設定" });
    expect(button).toBeDisabled();
  },
};
