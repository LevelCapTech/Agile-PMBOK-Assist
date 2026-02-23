import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LcIconButton } from "./LcIconButton";
import { IconResolverProvider } from "../LcIcon/IconResolverContext";

const mockIconResolver = (iconKey: string) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      color: "currentColor",
      fontSize: "10px",
      fontWeight: "bold",
    }}
  >
    {iconKey.substring(0, 2).toUpperCase()}
  </div>
);

const meta = {
  title: "Atoms/LcIconButton",
  component: LcIconButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <Story />
      </IconResolverProvider>
    ),
  ],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof LcIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconKey: "plus",
    label: "新規作成",
    tone: "primary",
  },
};

export const Disabled: Story = {
  args: {
    iconKey: "plus",
    label: "新規作成",
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const button = canvasElement.querySelector("button");
    if (!button) throw new Error("Button not found");
    if (!button.disabled) throw new Error("Button should be disabled");
    
    // Click should not trigger onClick
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (args.onClick && (args.onClick as unknown as { mock: { calls: unknown[] } }).mock.calls.length > 0) {
      throw new Error("onClick should not be called when disabled");
    }
  },
};
