export const formatGreeting = (name: string) => {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return "こんにちは";
  }
  return `こんにちは、${trimmed}さん`;
};
