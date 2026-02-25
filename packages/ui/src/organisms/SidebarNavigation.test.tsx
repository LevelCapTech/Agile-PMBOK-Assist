import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { ReactNode } from "react";

import type { SidebarVariant } from "@contracts/layout/sidebar";
import { AppProvider } from "@app/providers/AppProvider";
import { useAppContext } from "@app/providers/AppContext";

import { SidebarNavigation } from "./SidebarNavigation";
import { dashboardSidebarView } from "../stories/dashboardStoryData";

const testTheme = createTheme({});
const sidebarStorageKey = "lc.sidebar.variant";

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

const SidebarStateTester = ({ variant }: { variant: SidebarVariant }) => {
  const { sidebarState, toggleSidebarVariant } = useAppContext();

  return (
    <div>
      <span data-testid="sidebar-variant">{sidebarState.variant}</span>
      <button type="button" onClick={() => toggleSidebarVariant(variant)}>
        切替
      </button>
    </div>
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

describe("AppProvider sidebar state", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("falls back to expanded when stored value is invalid", () => {
    localStorage.setItem(sidebarStorageKey, "invalid");
    render(
      <AppProvider enableAppRouterCache={false}>
        <SidebarStateTester variant="rail" />
      </AppProvider>,
    );

    const [variant] = screen.getAllByTestId("sidebar-variant");
    expect(variant).toHaveTextContent("expanded");
  });

  it("persists the sidebar variant in localStorage", () => {
    render(
      <AppProvider enableAppRouterCache={false}>
        <SidebarStateTester variant="rail" />
      </AppProvider>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "切替" })[0]);

    expect(screen.getAllByTestId("sidebar-variant")[0]).toHaveTextContent(
      "rail",
    );
    expect(localStorage.getItem(sidebarStorageKey)).toBe("rail");
  });

  it("falls back when storage is unavailable", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("storage error");
      });

    render(
      <AppProvider enableAppRouterCache={false}>
        <SidebarStateTester variant="rail" />
      </AppProvider>,
    );

    expect(screen.getAllByTestId("sidebar-variant")[0]).toHaveTextContent(
      "expanded",
    );
    expect(warnSpy).toHaveBeenCalled();

    getItemSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it("keeps current variant when storage save fails", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("storage error");
      });
    render(
      <AppProvider enableAppRouterCache={false}>
        <SidebarStateTester variant="rail" />
      </AppProvider>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "切替" })[0]);

    expect(screen.getAllByTestId("sidebar-variant")[0]).toHaveTextContent(
      "expanded",
    );
    expect(warnSpy).toHaveBeenCalled();

    setItemSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
