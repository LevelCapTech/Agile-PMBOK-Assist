"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import type { MemberListItemProps } from "@contracts/dashboard/types";

import { LcAvatar } from "@ui/atoms/LcAvatar";
import { LcIcon } from "@ui/atoms/LcIcon";
import { LcStatusChip } from "@ui/atoms/LcStatusChip";

const statusToneMap = {
  稼働中: "success",
  待機中: "warning",
  休暇中: "neutral",
} as const;

export const MemberListItem = ({ item }: MemberListItemProps) => {
  return (
    <Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Box className="flex flex-col items-center gap-2">
          <LcAvatar src={item.avatarUrl} alt={item.displayName} size="lg" />
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            {item.displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {item.role}
          </Typography>
          <LcStatusChip
            status={item.status}
            tone={statusToneMap[item.status]}
          />
          <Box className="flex items-center gap-1">
            <LcIcon iconKey="briefcase" size="sm" />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              担当プロジェクト: {item.projectCount}件
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
