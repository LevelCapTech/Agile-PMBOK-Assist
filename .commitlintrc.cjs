module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // subject-case ルールを無効化。日本語の subject が「GitHub」「SSH」などの
    // 固有名詞（大文字）で始まる場合の誤検知（false-positive）を防ぐため。
    "subject-case": [0],
  },
};
