import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HelloCard } from "./HelloCard";

describe("HelloCard", () => {
  it("renders title and message", () => {
    render(<HelloCard title="テスト" message="Vitest の確認" />);

    expect(screen.getByRole("heading", { name: "テスト" })).toBeTruthy();
    expect(screen.getByText("Vitest の確認")).toBeTruthy();
  });
});
