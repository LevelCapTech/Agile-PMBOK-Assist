import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { ReactNode } from "react";

import { SidebarNavigation } from "./SidebarNavigation";
import { dashboardSidebarView } from "../stories/dashboardStoryData";

const testTheme = createTheme({});
type TestProviderProps = {
  children: ReactNode;
};

const TestProvider = ({ children }: TestProviderProps) => {
  return (
    <ThemeProvider theme={testTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

describe("SidebarNavigation", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders expanded navigation with labels and active state", () => {
    render(
      <TestProvider>
        <SidebarNavigation sidebar={dashboardSidebarView} variant="expanded" />
      </TestProvider>,
    );

    expect(screen.getByText("プロジェクト")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "プロジェクト" }),
    ).toHaveAttribute("aria-current", "page");

    const nav = screen.getByRole("navigation", {
      name: "サイドナビゲーション",
    });
    const icons = nav.querySelectorAll(
      '[data-testid="lc-icon"][data-size="md"]',
    );
    expect(icons).toHaveLength(dashboardSidebarView.items.length);
  });

  it("renders rail navigation with tooltips and larger icons", () => {
    render(
      <TestProvider>
        <SidebarNavigation sidebar={dashboardSidebarView} variant="rail" />
      </TestProvider>,
    );

    const projectLink = screen.getByRole("link", { name: "プロジェクト" });
    expect(projectLink).not.toHaveTextContent("プロジェクト");

    const nav = screen.getByRole("navigation", {
      name: "サイドナビゲーション",
    });
    const icons = nav.querySelectorAll(
      '[data-testid="lc-icon"][data-size="lg"]',
    );
    expect(icons).toHaveLength(dashboardSidebarView.items.length);
  });

  it("calls toggle handler with next variant", () => {
    const handleToggle = vi.fn();
    render(
      <TestProvider>
        <SidebarNavigation
          onToggleSidebarVariant={handleToggle}
          sidebar={dashboardSidebarView}
          variant="expanded"
        />
      </TestProvider>,
    );

    const [toggleButton] = screen.getAllByRole("button", {
      name: "サイドバーを折りたたむ",
    });

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(toggleButton);

    expect(handleToggle).toHaveBeenCalledWith("rail");
  });
});
