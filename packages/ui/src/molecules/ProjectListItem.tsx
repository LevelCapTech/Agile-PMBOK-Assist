"use client";

import { Box, Card, CardActionArea, CardContent, Divider, Stack, Typography } from "@mui/material";

import type { ProjectListItemProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";
import { LcStatusChip } from "../atoms/LcStatusChip";

const resolveProjectTone = (status: ProjectListItemProps["item"]["status"]) => {
  if (status === "オープン") {
    return "primary" as const;
  }

  if (status === "保守") {
    return "success" as const;
  }

  if (status === "見積") {
    return "warning" as const;
  }

  return "neutral" as const;
};

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  return (
    <Card
      sx={(theme) => ({
        border: 1,
        borderColor: theme.palette.divider,
        background: theme.palette.background.paper,
        width: "100%",
        height: "100%",
      })}
      variant="outlined"
    >
      <CardActionArea onClick={() => onSelect?.(item.id)}>
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Box>
                <Typography color="text.primary" variant="subtitle1">
                  {item.name}
                </Typography>
                <Typography color="primary.main" variant="caption">
                  {item.code}
                </Typography>
              </Box>
              <LcStatusChip status={item.status} tone={resolveProjectTone(item.status)} />
            </Stack>

            <Stack alignItems="center" direction="row" spacing={0.5}>
              <LcIcon iconKey="members" size="sm" />
              <Typography color="text.secondary" variant="caption">
                プロジェクトメンバー
              </Typography>
            </Stack>

            <Stack direction="row" spacing={-0.5}>
              {item.members.map((member) => (
                <LcAvatar
                  alt={member.name}
                  key={`${item.id}-${member.name}`}
                  size="sm"
                  src={member.avatarUrl}
                />
              ))}
              <Typography color="text.secondary" sx={{ ml: 1 }} variant="caption">
                {item.members.length}名
              </Typography>
            </Stack>

            <Divider />

            <Stack alignItems="center" direction="row" spacing={0.5}>
              <LcIcon iconKey="calendar" size="sm" />
              <Typography color="text.secondary" variant="caption">
                開始日: {item.startDate}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
