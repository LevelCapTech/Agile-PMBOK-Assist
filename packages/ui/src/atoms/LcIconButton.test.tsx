import { cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "../testUtils/renderWithProviders";
import { LcIconButton } from "./LcIconButton";

describe("LcIconButton", () => {
  afterEach(() => {
    cleanup();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <LcIconButton iconKey="plus" label="追加" onClick={handleClick} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "追加" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables interaction when disabled", () => {
    const handleClick = vi.fn();
    renderWithProviders(
      <LcIconButton
        iconKey="plus"
        label="追加"
        onClick={handleClick}
        disabled
      />,
    );

    const button = screen.getByRole("button", { name: "追加" });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
