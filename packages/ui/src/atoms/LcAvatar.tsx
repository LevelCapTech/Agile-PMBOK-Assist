"use client";

import { Avatar } from "@mui/material";

import type { LcAvatarProps } from "../types/dashboard";

const SIZE_MAP: Record<NonNullable<LcAvatarProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const avatarSize = SIZE_MAP[size];

  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{
        width: avatarSize,
        height: avatarSize,
        fontSize: avatarSize * 0.45,
      }}
    />
  );
};
