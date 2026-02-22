import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: [
      "app/**/?(*.)+(test).[tj]s?(x)",
      "src/**/?(*.)+(test).[tj]s?(x)",
      "packages/**/?(*.)+(test).[tj]s?(x)",
    ],
    coverage: {
      provider: "v8",
    },
  },
});
