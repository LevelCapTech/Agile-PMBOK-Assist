module.exports = {
  extends: ["@commitlint/config-conventional"],
  // ここで特定メッセージだけ除外（=許可）
  ignores: [(commitMessage) => commitMessage.trim() === "Initial plan"],

  rules: {
    // 日本語の固有名詞での誤検知対策
    "subject-case": [0],

    // 本文の1行の最大長を 200 に拡張
    "body-max-line-length": [2, "always", 200],

    // フッターも同じにしておく（Co-authored-by などで落ちにくくする）
    "footer-max-line-length": [2, "always", 200],
  },
};