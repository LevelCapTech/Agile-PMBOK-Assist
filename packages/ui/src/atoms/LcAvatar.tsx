"use client";

import { Avatar } from "@mui/material";

import type { LcAvatarProps } from "../types/dashboard";
import { SIZE_VARIANTS } from "../utils/sizes";

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const avatarSize = SIZE_VARIANTS[size];

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
