"use client";

import Box from "@mui/material/Box";
import MuiAvatar from "@mui/material/Avatar";

import type { LcAvatarProps } from "@contracts/pages/dashboard";

const SIZE_MAP: Record<NonNullable<LcAvatarProps["size"]>, number> = {
  sm: 24,
  md: 32,
  lg: 64,
};

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  const sizePx = SIZE_MAP[size];

  return (
    <Box sx={{ display: "inline-flex", flexShrink: 0 }}>
      <MuiAvatar
        src={src}
        alt={alt}
        sx={{
          width: sizePx,
          height: sizePx,
        }}
      />
    </Box>
  );
};
