import type { Meta, StoryObj } from "@storybook/react";

import { HelloCard } from "./HelloCard";

const meta: Meta<typeof HelloCard> = {
  title: "Components/HelloCard",
  component: HelloCard,
  tags: ["autodocs"],
  args: {
    title: "こんにちは、Storybook",
    message: "Storybook と Vitest のセットアップを確認できます。",
  },
};

export default meta;

type Story = StoryObj<typeof HelloCard>;

export const Default: Story = {};
