import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppProvider } from "@app/providers/AppProvider";

import { MuiTailwindSample } from "./MuiTailwindSample";

describe("MuiTailwindSample", () => {
  it("renders the MUI button label", () => {
    render(
      <AppProvider enableAppRouterCache={false}>
        <MuiTailwindSample />
      </AppProvider>
    );

    expect(
      screen.getByRole("button", {
        name: "MUI Button",
      })
    ).toBeInTheDocument();
  });
});
