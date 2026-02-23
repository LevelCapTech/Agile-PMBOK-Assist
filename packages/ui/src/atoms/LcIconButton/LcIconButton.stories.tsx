import type { Meta, StoryObj } from "@storybook/react";
import { expect, within, userEvent, fn } from "storybook/test";

import { LcIconButton } from "./LcIconButton";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const meta: Meta<typeof LcIconButton> = {
  title: "Atoms/LcIconButton",
  component: LcIconButton,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    iconKey: "bell",
    label: "通知",
    tone: "primary",
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof LcIconButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "通知" });
    expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    expect(args.onClick).not.toHaveBeenCalled();
  },
};
