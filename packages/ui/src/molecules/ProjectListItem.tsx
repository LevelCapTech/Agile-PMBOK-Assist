"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import type { DashboardProjectItem, ProjectListItemProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";
import { LcStatusChip } from "../atoms/LcStatusChip";

const statusToneMap: Record<
  DashboardProjectItem["status"],
  "primary" | "success" | "warning" | "neutral"
> = {
  見積: "neutral",
  商談: "warning",
  オープン: "primary",
  保守: "success",
  クローズ: "neutral",
};

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  const members = item.members ?? [];
  const hasAction = Boolean(onSelect);

  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.short,
        }),
        ...(hasAction
          ? {
              "&:hover": {
                borderColor: theme.palette.primary.main,
                boxShadow: theme.shadows[2],
                transform: "translateY(-2px)",
              },
            }
          : {}),
      })}
    >
      <CardActionArea
        onClick={hasAction ? () => onSelect?.(item.id) : undefined}
        disabled={!hasAction}
        sx={{ height: "100%" }}
      >
        <CardContent className="flex h-full flex-col gap-4">
          <div className="space-y-2">
            <Typography variant="subtitle1" component="h3" color="text.primary">
              {item.name}
            </Typography>
            <div className="flex flex-wrap items-center gap-2">
              <Box
                sx={(theme) => ({
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  borderRadius: theme.spacing(2),
                  padding: theme.spacing(0.5, 1.5),
                })}
              >
                <Typography
                  variant="caption"
                  component="span"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  })}
                >
                  {item.code}
                </Typography>
              </Box>
              <LcStatusChip
                status={item.status}
                tone={statusToneMap[item.status]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Box sx={{ color: "text.secondary" }}>
                <LcIcon iconKey="users" size="sm" />
              </Box>
              <Typography variant="caption" component="span" color="text.secondary">
                プロジェクトメンバー
              </Typography>
            </div>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {members.slice(0, 4).map((member) => (
                  <LcAvatar
                    key={member.name}
                    src={member.avatarUrl}
                    alt={member.name}
                    size="md"
                  />
                ))}
              </div>
              {members.length > 4 ? (
                <Box
                  sx={(theme) => ({
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    border: `2px solid ${theme.palette.background.paper}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: theme.spacing(-0.5),
                  })}
                >
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ color: "white", fontWeight: 600 }}
                  >
                    +{members.length - 4}
                  </Typography>
                </Box>
              ) : null}
              <Typography
                variant="body2"
                component="span"
                sx={{ marginLeft: 1.5, fontWeight: 500 }}
                color="text.primary"
              >
                {members.length}名
              </Typography>
            </div>
          </div>

          <Box
            sx={(theme) => ({
              borderTop: `1px solid ${theme.palette.divider}`,
              paddingTop: theme.spacing(2),
            })}
          >
            <div className="flex items-center gap-2">
              <Box sx={{ color: "text.secondary" }}>
                <LcIcon iconKey="calendar" size="sm" />
              </Box>
              <Typography variant="caption" component="span" color="text.secondary">
                開始日:
              </Typography>
              <Typography variant="body2" component="span" color="text.primary">
                {item.startDate}
              </Typography>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
