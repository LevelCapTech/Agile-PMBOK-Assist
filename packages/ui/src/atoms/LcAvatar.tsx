"use client";

import { Avatar } from "@mui/material";

import type { LcAvatarProps } from "@contracts/pages/dashboard";

const avatarSizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const dimension = avatarSizeMap[size];

  return (
    <Avatar
      src={src}
      alt={alt}
      sx={(theme) => ({
        width: dimension,
        height: dimension,
        fontSize: theme.typography.caption.fontSize,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      })}
    />
  );
};
