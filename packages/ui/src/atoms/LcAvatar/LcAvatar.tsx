"use client";

import { Avatar, styled } from "@mui/material";
import type { LcAvatarProps } from "../../types/dashboard";

const StyledAvatar = styled(Avatar)<{ $size?: string }>(({ $size }) => {
  const sizeMap: Record<string, number> = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const size = sizeMap[$size || "md"] || 40;

  return {
    width: size,
    height: size,
    fontSize: size * 0.5,
  };
});

export const LcAvatar = ({ src, alt, size = "md" }: LcAvatarProps) => {
  return <StyledAvatar src={src} alt={alt} $size={size} />;
};
