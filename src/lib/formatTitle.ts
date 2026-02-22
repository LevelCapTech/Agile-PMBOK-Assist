export const formatTitle = (title: string) => {
  const trimmed = title.trim();
  return trimmed.length > 0 ? trimmed : "無題";
};
