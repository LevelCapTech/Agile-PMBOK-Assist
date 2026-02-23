"use client";

import MuiAvatar from "@mui/material/Avatar";

import type { LcAvatarProps } from "@contracts/dashboard/types";

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const px = sizeMap[size];

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{ width: px, height: px, fontSize: px * 0.5 }}
    />
  );
};
