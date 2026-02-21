module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Disable subject-case rule to allow Japanese commit subjects starting with
    // proper nouns (e.g. "GitHub", "SSH") without false-positive violations.
    "subject-case": [0],
  },
};
