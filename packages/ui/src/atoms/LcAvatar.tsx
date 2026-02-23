"use client";

import { Avatar } from "@mui/material";

import type { LcAvatarProps } from "@contracts/pages/dashboard";

import { resolveSizeToPx } from "./dashboardTokens";

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const avatarSize = resolveSizeToPx(size);

  return (
    <Avatar
      alt={alt}
      src={src}
      sx={{
        p: 0,
        m: 0,
        fontSize: avatarSize / 2,
        color: "text.primary",
        border: 0,
        background: "background.default",
        width: avatarSize,
        height: avatarSize,
      }}
    >
      {alt.slice(0, 1)}
    </Avatar>
  );
};
