import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusMessage } from "./StatusMessage";

describe("StatusMessage", () => {
  it("タイトルと説明文を表示する", () => {
    render(
      <StatusMessage
        title="テストタイトル"
        description="テスト用の説明文"
      />
    );

    expect(
      screen.getByRole("heading", { name: "テストタイトル" })
    ).toBeInTheDocument();
    expect(screen.getByText("テスト用の説明文")).toBeInTheDocument();
  });
});
