import type { Meta, StoryObj } from "@storybook/react";

import { LcAvatar } from "./LcAvatar";

const meta: Meta<typeof LcAvatar> = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
  args: {
    alt: "ユーザー",
    src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=48&h=48&fit=crop&crop=face",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LcAvatar>;

export const Default: Story = {};
