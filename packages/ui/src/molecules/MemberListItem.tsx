"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";

import type { DashboardMemberItem, MemberListItemProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";
import { LcStatusChip } from "../atoms/LcStatusChip";

const statusToneMap: Record<
  DashboardMemberItem["status"],
  "primary" | "warning" | "neutral"
> = {
  稼働中: "primary",
  待機中: "warning",
  休暇中: "neutral",
};

export const MemberListItem = ({ item }: MemberListItemProps) => {
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover": {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[2],
          transform: "translateY(-2px)",
        },
      })}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <LcAvatar
            src={item.avatarUrl}
            alt={item.displayName}
            size="lg"
          />
          <div className="space-y-1">
            <Typography variant="subtitle2" component="h3" color="text.primary">
              {item.displayName}
            </Typography>
            <Typography variant="caption" component="p" color="text.secondary">
              {item.role}
            </Typography>
          </div>
          <LcStatusChip status={item.status} tone={statusToneMap[item.status]} />
        </div>

        <Box
          sx={(theme) => ({
            borderTop: `1px solid ${theme.palette.divider}`,
            paddingTop: theme.spacing(2),
          })}
        >
          <div className="flex items-center justify-center gap-2">
            <Box sx={{ color: "text.secondary" }}>
              <LcIcon iconKey="users" size="sm" />
            </Box>
            <Typography variant="caption" component="span" color="text.secondary">
              担当プロジェクト:
            </Typography>
            <Typography variant="body2" component="span" color="text.primary">
              {item.projectCount}件
            </Typography>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};
