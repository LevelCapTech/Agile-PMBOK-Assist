import type { Meta, StoryObj } from "@storybook/react";

import type { IconResolver } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { LcIcon } from "./LcIcon";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    search: "🔍",
    bell: "🔔",
    menu: "☰",
    x: "✕",
    plus: "➕",
    calendar: "📅",
    users: "👥",
    folder: "📁",
    settings: "⚙️",
    shield: "🛡️",
    lock: "🔒",
    eye: "👁️",
    download: "📥",
    sliders: "🎚️",
    "chevron-down": "▼",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const meta = {
  title: "Atoms/LcIcon",
  component: LcIcon,
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
    iconKey: {
      control: "select",
      options: [
        "search",
        "bell",
        "menu",
        "x",
        "plus",
        "calendar",
        "users",
        "folder",
        "settings",
        "shield",
        "lock",
        "eye",
        "download",
        "sliders",
        "chevron-down",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof LcIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconKey: "search",
    size: "md",
  },
};

export const SizeVariants: Story = {
  args: {
    iconKey: "search",
    size: "md",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <LcIcon iconKey="search" size="sm" />
        <span className="text-xs">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LcIcon iconKey="search" size="md" />
        <span className="text-xs">md (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LcIcon iconKey="search" size="lg" />
        <span className="text-xs">lg (32px)</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    const labels = ["sm (16px)", "md (24px)", "lg (32px)"];
    for (const label of labels) {
      expect(canvas.getByText(label)).toBeInTheDocument();
    }
  },
};
