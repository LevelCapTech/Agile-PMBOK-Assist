"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import type { ComponentType, SVGProps } from "react";
import {
  BarChart3,
  Bell,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Folder,
  Lock,
  Plus,
  Search,
  Settings,
  Shield,
  Sliders,
  Users,
} from "lucide-react";

import type { LcIconProps } from "@contracts/pages/dashboard";

import { useIcon } from "../contexts/IconResolverContext";

const iconSizeMap: Record<NonNullable<LcIconProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  bell: Bell,
  briefcase: Briefcase,
  calendar: Calendar,
  chart: BarChart3,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  display: Eye,
  download: Download,
  folder: Folder,
  lock: Lock,
  plus: Plus,
  search: Search,
  settings: Settings,
  shield: Shield,
  sliders: Sliders,
  users: Users,
};

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const theme = useTheme();
  const resolvedIcon = useIcon(iconKey);
  const iconSize = iconSizeMap[size];
  const IconComponent = iconMap[iconKey];
  const iconContent = IconComponent ? (
    <IconComponent height={iconSize} width={iconSize} />
  ) : (
    resolvedIcon
  );

  return (
    <Box
      component="span"
      data-testid="lc-icon"
      data-size={size}
      sx={{
        alignItems: "center",
        color: theme.palette.text.secondary,
        display: "inline-flex",
        fontSize: iconSize,
        height: iconSize,
        justifyContent: "center",
        width: iconSize,
      }}
    >
      {iconContent}
    </Box>
  );
};
