import { describe, expect, it, vi } from "vitest";

import { calculateOverallProgress, getProjectDetails } from "./projectDetailsDataSourceMock";

describe("calculateOverallProgress", () => {
  it("aggregates phase status counts", () => {
    const result = calculateOverallProgress([
      { id: "1", name: "phase-1", status: "DONE", progress: 100 },
      { id: "2", name: "phase-2", status: "IN_PROGRESS", progress: 50 },
      { id: "3", name: "phase-3", status: "NOT_STARTED", progress: 0 },
    ]);

    expect(result.completedCount).toBe(1);
    expect(result.inProgressCount).toBe(1);
    expect(result.notStartedCount).toBe(1);
    expect(result.percentage).toBe(50);
  });

  it("returns zero progress for empty phases", () => {
    const result = calculateOverallProgress([]);

    expect(result).toEqual({
      percentage: 0,
      completedCount: 0,
      inProgressCount: 0,
      notStartedCount: 0,
    });
  });
});

describe("getProjectDetails", () => {
  it("returns project details for known id", async () => {
    const result = await getProjectDetails("1");

    expect(result.type).toBe("ok");
    if (result.type === "ok") {
      expect(result.data.header.code).toBe("PRJ-2024-001");
      const totalCount =
        result.data.overallProgress.completedCount +
        result.data.overallProgress.inProgressCount +
        result.data.overallProgress.notStartedCount;
      expect(result.data.phases.length).toBe(totalCount);
    }
  });

  it("returns empty meetings when configured", async () => {
    const result = await getProjectDetails("2");

    expect(result.type).toBe("ok");
    if (result.type === "ok") {
      expect(result.data.meetings).toHaveLength(0);
    }
  });

  it("returns not found error for missing id", async () => {
    const result = await getProjectDetails("9999");

    expect(result.type).toBe("error");
    if (result.type === "error") {
      expect(result.error.code).toBe("NOT_FOUND");
    }
  });

  it("returns network error for network id", async () => {
    const result = await getProjectDetails("network");

    expect(result.type).toBe("error");
    if (result.type === "error") {
      expect(result.error.code).toBe("NETWORK");
    }
  });

  it("supports delayed response", async () => {
    vi.useFakeTimers();
    const promise = getProjectDetails("delay");
    await vi.advanceTimersByTimeAsync(400);
    const result = await promise;

    expect(result.type).toBe("ok");
    vi.useRealTimers();
  });
});
