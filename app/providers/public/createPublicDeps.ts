import type { GanttDataSource, Task } from "@/contracts/gantt";

const seedTasks: Task[] = [
  {
    id: "task-001",
    name: "プロジェクト開始",
    startDate: "2026-02-03",
    endDate: "2026-02-05",
    progress: 0.2,
  },
  {
    id: "task-002",
    name: "要件整理",
    startDate: "2026-02-06",
    endDate: "2026-02-12",
    progress: 0.4,
  },
  {
    id: "task-003",
    name: "スプリント計画",
    startDate: "2026-02-13",
    endDate: "2026-02-18",
    progress: 0,
  },
];

const normalizeTask = (task: Task): Task => ({
  ...task,
  name: task.name.trim(),
});

let tasks = seedTasks.map((task) => ({ ...task }));

export function createPublicGanttDataSource(): GanttDataSource {
  return {
    fetchTasks: async () => tasks.map((task) => ({ ...task })),
    updateTask: async (task) => {
      const normalizedTask = normalizeTask(task);

      if (!normalizedTask.id || !normalizedTask.name) {
        throw new Error("Task id and name are required.");
      }

      const exists = tasks.some((existing) => existing.id === normalizedTask.id);

      tasks = exists
        ? tasks.map((existing) =>
            existing.id === normalizedTask.id
              ? { ...existing, ...normalizedTask }
              : existing,
          )
        : [...tasks, normalizedTask];
    },
  };
}
