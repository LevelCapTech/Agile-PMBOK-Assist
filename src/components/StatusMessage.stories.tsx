import type { Meta, StoryObj } from "@storybook/react";
import { StatusMessage } from "./StatusMessage";

const meta: Meta<typeof StatusMessage> = {
  title: "Components/StatusMessage",
  component: StatusMessage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatusMessage>;

export const Default: Story = {
  args: {
    title: "準備完了",
    description: "Storybook の静的ビルドが利用できます。",
  },
};
