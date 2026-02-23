import type { Meta, StoryObj } from "@storybook/react";

import { LcAvatar } from "./LcAvatar";

const meta: Meta<typeof LcAvatar> = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    alt: "ユーザー",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LcAvatar>;

export const Default: Story = {};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LcAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
        alt="Small"
        size="sm"
      />
      <LcAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
        alt="Medium"
        size="md"
      />
      <LcAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
        alt="Large"
        size="lg"
      />
    </div>
  ),
};
