import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { SidebarVariant } from "@contracts/layout/sidebar";

import { AppProvider } from "./AppProvider";
import { useAppContext } from "./AppContext";

const sidebarStorageKey = "lc.sidebar.variant";

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

const ProjectDetailsDepsTester = () => {
  const { projectDetailsDataSource } = useAppContext();

  return (
    <span data-testid="project-details-datasource">
      {typeof projectDetailsDataSource.getProjectDetails}
    </span>
  );
};

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

  it("provides project details data source", () => {
    render(
      <AppProvider enableAppRouterCache={false}>
        <ProjectDetailsDepsTester />
      </AppProvider>,
    );

    expect(
      screen.getByTestId("project-details-datasource"),
    ).toHaveTextContent("function");
  });
});
