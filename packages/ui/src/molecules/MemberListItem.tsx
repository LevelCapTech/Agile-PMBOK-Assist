"use client";

import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import type { MemberListItemProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";
import { LcStatusChip } from "../atoms/LcStatusChip";

const resolveMemberTone = (status: MemberListItemProps["item"]["status"]) => {
  if (status === "稼働中") {
    return "primary" as const;
  }

  if (status === "休暇中") {
    return "warning" as const;
  }

  return "neutral" as const;
};

export const MemberListItem = ({ item }: MemberListItemProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack alignItems="center" spacing={1.25}>
          <LcAvatar alt={item.displayName} size="lg" src={item.avatarUrl} />
          <Typography color="text.primary" variant="subtitle1">
            {item.displayName}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {item.role}
          </Typography>
          <LcStatusChip status={item.status} tone={resolveMemberTone(item.status)} />
          <Divider flexItem />
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <LcIcon iconKey="members" size="sm" />
            <Typography color="text.secondary" variant="caption">
              担当プロジェクト: {item.projectCount}件
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
