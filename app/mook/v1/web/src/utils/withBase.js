export function withBase(path = "/") {
  const base = import.meta.env.BASE_URL || "/";
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  if (base === "/") return path.startsWith("/") ? path : `/${path}`;
  const baseClean = base.endsWith("/") ? base.slice(0, -1) : base;
  const pathClean = path.startsWith("/") ? path : `/${path}`;
  return `${baseClean}${pathClean}`;
}
