import { describe, expect, it } from "vitest";
import { formatTitle } from "./formatTitle";

describe("formatTitle", () => {
  it("空白のみの場合はデフォルト値を返す", () => {
    expect(formatTitle("  ")).toBe("無題");
  });

  it("前後の空白を除去する", () => {
    expect(formatTitle("  タイトル  ")).toBe("タイトル");
  });
});
