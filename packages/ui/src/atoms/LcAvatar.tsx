"use client";

import MuiAvatar from "@mui/material/Avatar";

import type { LcAvatarProps } from "@contracts/pages/dashboard";

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 64,
} as const;

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const dimension = sizeMap[size];

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{
        width: dimension,
        height: dimension,
      }}
    />
  );
};
