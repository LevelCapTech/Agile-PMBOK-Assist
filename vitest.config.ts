import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: [
      "app/**/?(*.)+(test).[tj]s?(x)",
      "src/**/?(*.)+(test).[tj]s?(x)",
      // Reserved for future `packages/**` monorepo structure (see .github/copilot/40-testing-strategy.md)
      "packages/**/?(*.)+(test).[tj]s?(x)",
    ],
    coverage: {
      provider: "v8",
    },
  },
});
