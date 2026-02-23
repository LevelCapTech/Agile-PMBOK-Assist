"use client";

import MuiAvatar from "@mui/material/Avatar";
import type { LcAvatarProps } from "@contracts/pages/dashboard";

const SIZE_MAP = {
  sm: 24,
  md: 32,
  lg: 48,
} as const;

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const px = SIZE_MAP[size];

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{ width: px, height: px }}
    />
  );
};
