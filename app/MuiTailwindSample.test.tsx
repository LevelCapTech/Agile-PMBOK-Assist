import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MuiTailwindSample } from "./MuiTailwindSample";
import { appTheme } from "./theme";

describe("MuiTailwindSample", () => {
  it("renders the MUI button label", () => {
    render(
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <MuiTailwindSample />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("button", {
        name: "MUI Button",
      })
    ).toBeInTheDocument();
  });
});
