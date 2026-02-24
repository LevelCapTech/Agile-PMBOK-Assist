"use client";

import Avatar from "@mui/material/Avatar";

import type { LcAvatarProps } from "@contracts/pages/dashboard";

const avatarSizeMap: Record<NonNullable<LcAvatarProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const avatarSize = avatarSizeMap[size];

  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{
        height: avatarSize,
        width: avatarSize,
      }}
    />
  );
};
