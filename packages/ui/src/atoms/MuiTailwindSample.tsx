"use client";

import Button from "@mui/material/Button";

export const MuiTailwindSample = () => {
  return (
    <section className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 text-left text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          MUI + Tailwind
        </p>
        <h2 className="text-xl font-semibold">スタイル基盤の確認</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Tailwindでレイアウトし、MUIでボタンの見た目を管理します。
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button className="normal-case" variant="contained">
          MUI Button
        </Button>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          Tailwind Layout
        </span>
      </div>
    </section>
  );
};
