module.exports = {
  extends: ["@commitlint/config-conventional"],
  // ここで特定メッセージだけ除外（=許可）
  ignores: [(commitMessage) => commitMessage.trim() === "Initial plan"],

  rules: {
    // 日本語の固有名詞での誤検知対策
    "subject-case": [0],
  },
};
