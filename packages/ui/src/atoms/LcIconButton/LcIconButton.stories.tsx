import type { Meta, StoryObj } from "@storybook/react";
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
    onClick: () => {},
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
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    if (!button) console.error("Button not found");
    else if (!button.disabled) console.error("Button should be disabled");
  },
};
