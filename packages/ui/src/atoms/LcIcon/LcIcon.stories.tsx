import type { Meta, StoryObj } from "@storybook/react";
import { LcIcon } from "./LcIcon";
import { IconResolverProvider } from "./IconResolverContext";

// Mock icon resolver for stories
const mockIconResolver = (iconKey: string) => {
  // Return a simple colored square with the icon key
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#246BFF",
        color: "white",
        fontSize: "10px",
        fontWeight: "bold",
      }}
    >
      {iconKey.substring(0, 2).toUpperCase()}
    </div>
  );
};

const meta = {
  title: "Atoms/LcIcon",
  component: LcIcon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <Story />
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    iconKey: {
      control: "text",
      description: "アイコンキー（Context経由で解決される）",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "アイコンサイズ",
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
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <LcIcon iconKey="home" size="sm" />
      <LcIcon iconKey="home" size="md" />
      <LcIcon iconKey="home" size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Size variants are rendered
    const icons = canvasElement.querySelectorAll("span");
    if (icons.length !== 3) {
      throw new Error("Expected 3 icons with different sizes");
    }
  },
};
