"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { MemberListItemProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";
import { LcStatusChip } from "../atoms/LcStatusChip";

const statusToneMap: Record<string, "success" | "warning" | "neutral"> = {
  稼働中: "success",
  待機中: "warning",
  休暇中: "neutral",
};

export const MemberListItem = ({ item }: MemberListItemProps) => {
  const theme = useTheme();
  const statusTone = statusToneMap[item.status] ?? "neutral";

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          height: "100%",
          padding: 2,
          textAlign: "center",
        }}
      >
        <LcAvatar alt={item.displayName} size="lg" src={item.avatarUrl} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography component="h3" variant="subtitle1" fontWeight={600}>
            {item.displayName}
          </Typography>
          <Typography
            component="p"
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            {item.role}
          </Typography>
        </Box>
        <LcStatusChip status={item.status} tone={statusTone} />
        <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
          <LcIcon iconKey="briefcase" size="sm" />
          <Typography
            component="span"
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            担当プロジェクト: {item.projectCount}件
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
