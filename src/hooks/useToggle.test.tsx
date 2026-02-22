import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("初期値を保持し、切り替えができる", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.value).toBe(false);
  });
});
