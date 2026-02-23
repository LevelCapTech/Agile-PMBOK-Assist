"use client";

import { Box, Typography } from "@mui/material";

import type { MemberListPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { MemberListItem } from "../molecules/MemberListItem";

export const MemberListPanel = ({
  title,
  members,
  isLoading,
  error,
}: MemberListPanelProps) => {
  const showEmpty = !isLoading && !error && members.length === 0;

  return (
    <Box className="flex flex-col gap-6">
      <LcSectionTitle title={title} />

      {isLoading ? (
        <Typography variant="body2" color="text.secondary">
          読み込み中...
        </Typography>
      ) : null}

      {!isLoading && error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : null}

      {showEmpty ? (
        <Typography variant="body2" color="text.secondary">
          メンバーが登録されていません
        </Typography>
      ) : null}

      {!isLoading && !error && members.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {members.map((member) => (
            <MemberListItem key={member.id} item={member} />
          ))}
        </div>
      ) : null}
    </Box>
  );
};
