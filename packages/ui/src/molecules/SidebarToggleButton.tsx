"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

import type { SidebarVariant } from "@contracts/layout/sidebar";

import { LcIcon } from "../atoms/LcIcon";

export type SidebarToggleButtonProps = {
  variant: SidebarVariant;
  onToggle?: (variant: SidebarVariant) => void;
};

const resolveToggleLabel = (variant: SidebarVariant) => {
  return variant === "expanded" ? "サイドバーを折りたたむ" : "サイドバーを展開する";
};

export const SidebarToggleButton = ({
  variant,
  onToggle,
}: SidebarToggleButtonProps) => {
  const theme = useTheme();
  const nextVariant = variant === "expanded" ? "rail" : "expanded";
  const label = resolveToggleLabel(variant);

  return (
    <Tooltip placement="right" title={label}>
      <IconButton
        aria-expanded={variant === "expanded"}
        aria-label={label}
        onClick={() => onToggle?.(nextVariant)}
        sx={{
          borderRadius: 2,
          color: theme.palette.text.secondary,
          height: 40,
          width: 40,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            transform: variant === "expanded" ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        >
          <LcIcon iconKey="chevron-right" size="sm" />
        </Box>
      </IconButton>
    </Tooltip>
  );
};
