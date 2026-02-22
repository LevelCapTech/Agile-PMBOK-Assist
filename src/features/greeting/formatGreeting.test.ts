import { describe, expect, it } from "vitest";
import { formatGreeting } from "./formatGreeting";

describe("formatGreeting", () => {
  it("名前がある場合は敬称付きで返す", () => {
    expect(formatGreeting("さくら")).toBe("こんにちは、さくらさん");
  });

  it("空文字の場合はデフォルト文言を返す", () => {
    expect(formatGreeting(" ")).toBe("こんにちは");
  });
});
