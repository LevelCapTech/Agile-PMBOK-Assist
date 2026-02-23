import type { Meta, StoryObj } from "@storybook/react";
import { LcAvatar } from "./LcAvatar";

const meta = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
} satisfies Meta<typeof LcAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "ユーザー名",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=2",
    alt: "小サイズ",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "中サイズ",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=4",
    alt: "大サイズ",
    size: "lg",
  },
};

export const NoImage: Story = {
  args: {
    alt: "画像なし",
    size: "md",
  },
};
