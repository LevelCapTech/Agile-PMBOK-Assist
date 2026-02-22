import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MuiTailwindSample } from "./MuiTailwindSample";
import { Providers } from "./providers";

describe("MuiTailwindSample", () => {
  it("renders the MUI button label", () => {
    render(
      <Providers>
        <MuiTailwindSample />
      </Providers>
    );

    expect(
      screen.getByRole("button", {
        name: "MUI Button",
      })
    ).toBeInTheDocument();
  });
});
