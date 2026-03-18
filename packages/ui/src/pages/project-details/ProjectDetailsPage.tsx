"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

import type {
  DayOfWeek,
  PhaseStatus,
  ProjectDetailsError,
  ProjectDetailsPageData,
} from "@contracts/pages/project-details";

export type ProjectDetailsPageProps = {
  data?: ProjectDetailsPageData;
  error?: ProjectDetailsError;
  isLoading?: boolean;
  onRetry?: () => void;
  onBack?: () => void;
  loginHref?: string;
};

const phaseStatusLabel: Record<PhaseStatus, string> = {
  DONE: "完了",
  IN_PROGRESS: "進行中",
  NOT_STARTED: "未着手",
};

const phaseStatusColor: Record<PhaseStatus, "success" | "info" | "default"> = {
  DONE: "success",
  IN_PROGRESS: "info",
  NOT_STARTED: "default",
};

const dayOfWeekLabel: Record<DayOfWeek, string> = {
  MON: "月",
  TUE: "火",
  WED: "水",
  THU: "木",
  FRI: "金",
};

const renderErrorAction = (
  error: ProjectDetailsError,
  onRetry?: () => void,
  onBack?: () => void,
  loginHref?: string,
) => {
  if (error.code === "NETWORK" || error.code === "UNKNOWN") {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={onRetry}
        disabled={!onRetry}
      >
        再読み込み
      </Button>
    );
  }

  if (error.code === "UNAUTHORIZED") {
    return (
      <Button variant="contained" color="primary" href={loginHref ?? "/login"}>
        ログインへ
      </Button>
    );
  }

  return (
    <Button variant="outlined" color="primary" onClick={onBack} disabled={!onBack}>
      プロジェクト一覧に戻る
    </Button>
  );
};

const ProjectErrorState = ({
  error,
  onRetry,
  onBack,
  loginHref,
}: {
  error: ProjectDetailsError;
  onRetry?: () => void;
  onBack?: () => void;
  loginHref?: string;
}) => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography variant="h5">{error.message}</Typography>
        {renderErrorAction(error, onRetry, onBack, loginHref)}
      </Stack>
    </Box>
  );
};

const ProjectLoadingState = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1" color="text.secondary">
        読み込み中...
      </Typography>
    </Box>
  );
};

const ProjectDetailsContent = ({ data }: { data: ProjectDetailsPageData }) => {
  const initialExpandedId = useMemo(() => data.plan[0]?.id ?? null, [data.plan]);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(
    initialExpandedId,
  );

  return (
    <Box sx={{ px: { xs: 3, md: 6 }, py: 4, backgroundColor: "background.default" }}>
      <Stack spacing={3}>
        <Card variant="outlined">
          <CardContent>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5" component="h1">
                    {data.header.name}
                  </Typography>
                  <Chip label={data.header.code} color="primary" variant="outlined" />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  開始日: {data.header.startDate}
                </Typography>
              </Stack>
              <Stack alignItems={{ xs: "flex-start", md: "flex-end" }} spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  全体進捗
                </Typography>
                <Typography variant="h4" color="primary">
                  {data.overallProgress.percentage}%
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`完了 ${data.overallProgress.completedCount}`}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    label={`進行中 ${data.overallProgress.inProgressCount}`}
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                  <Chip
                    label={`未着手 ${data.overallProgress.notStartedCount}`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
          }}
        >
          <Stack spacing={3}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">フェーズ毎の進捗</Typography>
                  {data.phases.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      フェーズがありません
                    </Typography>
                  ) : (
                    <Stack spacing={2}>
                      {data.phases.map((phase) => (
                        <Box key={phase.id}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Stack spacing={0.5}>
                              <Typography variant="subtitle1">{phase.name}</Typography>
                              <Chip
                                label={phaseStatusLabel[phase.status]}
                                size="small"
                                color={phaseStatusColor[phase.status]}
                                variant="outlined"
                              />
                            </Stack>
                            <Typography variant="subtitle1">
                              {phase.progress}%
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={phase.progress}
                            sx={{ mt: 1, height: 6, borderRadius: 999 }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">プロジェクト計画</Typography>
                  {data.plan.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      計画情報がありません
                    </Typography>
                  ) : (
                    data.plan.map((section) => (
                      <Accordion
                        key={section.id}
                        expanded={expandedSectionId === section.id}
                        onChange={() =>
                          setExpandedSectionId((current) =>
                            current === section.id ? null : section.id,
                          )
                        }
                        elevation={0}
                        disableGutters
                        sx={{
                          border: 1,
                          borderColor: "divider",
                          "&:before": { display: "none" },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<Typography component="span">▾</Typography>}
                        >
                          <Typography variant="subtitle1">{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack spacing={2}>
                            {section.items.map((item) => (
                              <Box key={item.label}>
                                <Typography variant="caption" color="text.secondary">
                                  {item.label}
                                </Typography>
                                <Typography variant="body2">{item.value}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          <Stack spacing={3}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">プロジェクトメンバー</Typography>
                  {data.members.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      メンバーがいません
                    </Typography>
                  ) : (
                    <Stack spacing={1.5} divider={<Divider flexItem />}>
                      {data.members.map((member) => (
                        <Stack
                          key={member.id}
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <Avatar src={member.avatarUrl ?? undefined}>
                            {member.name.slice(0, 1)}
                          </Avatar>
                          <Stack spacing={0.5}>
                            <Typography variant="subtitle2">
                              {member.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {member.role}
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">会議体一覧</Typography>
                  {data.meetings.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      会議体がありません
                    </Typography>
                  ) : (
                    <Stack spacing={1.5} divider={<Divider flexItem />}>
                      {data.meetings.map((meeting) => (
                        <Stack key={meeting.id} spacing={0.5}>
                          <Typography variant="subtitle2">{meeting.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {dayOfWeekLabel[meeting.dayOfWeek]} {meeting.timeRange}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export const ProjectDetailsPage = ({
  data,
  error,
  isLoading,
  onRetry,
  onBack,
  loginHref,
}: ProjectDetailsPageProps) => {
  if (isLoading) {
    return <ProjectLoadingState />;
  }

  if (error) {
    return (
      <ProjectErrorState
        error={error}
        onBack={onBack}
        onRetry={onRetry}
        loginHref={loginHref}
      />
    );
  }

  if (!data) {
    return (
      <Box sx={{ px: 3, py: 6 }}>
        <Typography variant="body1" color="text.secondary">
          表示するデータがありません。
        </Typography>
      </Box>
    );
  }

  return <ProjectDetailsContent key={data.header.id} data={data} />;
};
