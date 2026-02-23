"use client";

import { styled } from "@mui/material/styles";
import type { LcIconProps } from "../../types/dashboard";
import { useIconResolver } from "./IconResolverContext";

const StyledIconWrapper = styled("span")<{ $size: "sm" | "md" | "lg" }>(
  ({ theme, $size }) => {
    const sizeMap = {
      sm: 16,
      md: 24,
      lg: 32,
    };

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: sizeMap[$size],
      height: sizeMap[$size],
      fontSize: sizeMap[$size],
      color: theme.palette.text.primary,
    };
  }
);

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const resolveIcon = useIconResolver();
  const iconElement = resolveIcon(iconKey);

  return <StyledIconWrapper $size={size}>{iconElement}</StyledIconWrapper>;
};
