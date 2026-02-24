"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { ProjectListItemProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";
import { LcStatusChip } from "../atoms/LcStatusChip";

const statusToneMap: Record<string, "primary" | "success" | "warning" | "neutral"> = {
  見積: "warning",
  商談: "warning",
  オープン: "primary",
  保守: "success",
  クローズ: "neutral",
};

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  const theme = useTheme();
  const memberCount = item.members.length;
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
      <CardActionArea
        onClick={onSelect ? () => onSelect(item.id) : undefined}
        sx={{
          height: "100%",
          padding: 2,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <Box className="flex h-full flex-col gap-3">
          <Box className="flex flex-col gap-2">
            <Typography component="h3" variant="subtitle1" fontWeight={600}>
              {item.name}
            </Typography>
            <Box className="flex flex-wrap items-center gap-2">
              <Typography
                component="span"
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                {item.code}
              </Typography>
              <LcStatusChip status={item.status} tone={statusTone} />
            </Box>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-2">
            <Box className="flex items-center gap-2">
              <LcIcon iconKey="users" size="sm" />
              <Box className="flex items-center gap-2">
                {memberCount > 0 ? (
                  <Box className="flex -space-x-2">
                    {item.members.slice(0, 4).map((member) => (
                      <Box
                        key={member.name}
                        sx={{
                          borderColor: theme.palette.background.paper,
                          borderRadius: "50%",
                          borderStyle: "solid",
                          borderWidth: 2,
                        }}
                      >
                        <LcAvatar
                          alt={member.name}
                          size="sm"
                          src={member.avatarUrl}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : null}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {memberCount === 0 ? "メンバー0名" : `メンバー${memberCount}名`}
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-center gap-2">
              <LcIcon iconKey="calendar" size="sm" />
              <Typography
                component="span"
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                開始日: {item.startDate}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
