"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";

import type { MemberListPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { MemberListItem } from "../molecules/MemberListItem";

export const MemberListPanel = ({ title, members, isLoading, error }: MemberListPanelProps) => {
  return (
    <Stack spacing={2.5}>
      <LcSectionTitle description="チームメンバーの稼働状況を確認" title={title} />
      {isLoading ? <Typography>読み込み中...</Typography> : null}
      {error ? (
        <Typography color="error.main">{error.message}</Typography>
      ) : null}
      {!isLoading && !error && members.length === 0 ? (
        <Box>
          <Typography color="text.secondary">表示できるメンバーがいません</Typography>
        </Box>
      ) : null}
      {!isLoading && !error && members.length > 0 ? (
        <Grid container spacing={2}>
          {members.map((member) => (
            <Grid key={member.id} size={{ xs: 12, md: 3 }}>
              <MemberListItem item={member} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
};
