import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";

const mockIconResolver = (iconKey: string) => (
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

const meta = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ height: "600px" }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardLayoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const MockHeader = () => (
  <div
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      backgroundColor: "#f5f5f5",
    }}
  >
    <strong>Header Area</strong>
  </div>
);

const MockSidebar = () => (
  <div
    style={{
      height: "100%",
      padding: "24px 16px",
      backgroundColor: "#fafafa",
    }}
  >
    <strong>Sidebar Area</strong>
    <ul style={{ marginTop: "16px", listStyle: "none", padding: 0 }}>
      <li style={{ padding: "8px 0" }}>プロジェクト</li>
      <li style={{ padding: "8px 0" }}>メンバー</li>
      <li style={{ padding: "8px 0" }}>統計</li>
      <li style={{ padding: "8px 0" }}>設定</li>
    </ul>
  </div>
);

const MockMain = () => (
  <div style={{ padding: "24px" }}>
    <strong>Main Content Area</strong>
    <p style={{ marginTop: "16px", color: "#666" }}>
      ここにダッシュボードの主要コンテンツが表示されます。
    </p>
  </div>
);

export const Default: Story = {
  args: {
    header: <MockHeader />,
    sidebar: <MockSidebar />,
    main: <MockMain />,
  },
  play: async ({ canvasElement }) => {
    // Verify 3 areas are rendered
    const headerText = canvasElement.textContent?.includes("Header Area");
    const sidebarText = canvasElement.textContent?.includes("Sidebar Area");
    const mainText = canvasElement.textContent?.includes("Main Content Area");

    if (!headerText || !sidebarText || !mainText) {
      throw new Error(
        "Expected header, sidebar, and main areas to be rendered",
      );
    }
  },
};
