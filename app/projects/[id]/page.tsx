"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  ProjectDetailsError,
  ProjectDetailsPageData,
  Result,
} from "@contracts/pages/project-details";
import { ProjectDetailsPage } from "@ui/pages/project-details/ProjectDetailsPage";
import { useAppContext } from "@app/providers/AppContext";

type ProjectDetailsState = {
  data?: ProjectDetailsPageData;
  error?: ProjectDetailsError;
};

const notFoundError: ProjectDetailsError = {
  code: "NOT_FOUND",
  message: "プロジェクトが見つかりません。",
};

const unknownError: ProjectDetailsError = {
  code: "UNKNOWN",
  message: "予期せぬエラーが発生しました。",
};

const errorTriggerIds = new Set([
  "network",
  "unauthorized",
  "unknown",
  "delay",
]);

const isValidProjectId = (value: string) =>
  /^\d+$/.test(value) || errorTriggerIds.has(value);

const resolveProjectId = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const normalizedPath = window.location.pathname.replace(/\/+$/, "");
  const segments = normalizedPath.split("/").filter(Boolean);
  return segments.at(-1) ?? "";
};

export const toProjectDetailsProps = (
  result: Result<ProjectDetailsPageData, ProjectDetailsError>,
): ProjectDetailsState => {
  if (result.type === "ok") {
    return { data: result.data };
  }
  return { error: result.error };
};

export default function ProjectDetailsPageBridge() {
  const { projectDetailsDataSource } = useAppContext();
  const [state, setState] = useState<ProjectDetailsState>({});
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  const projectId = resolveProjectId();
  const isValidId = isValidProjectId(projectId);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadProjectDetails = useCallback(
    async (targetId: string) => {
      if (isMountedRef.current) {
        setIsLoading(true);
        setState({});
      }
      try {
        const result = await projectDetailsDataSource.getProjectDetails(targetId);
        if (!isMountedRef.current) {
          return;
        }
        setState(toProjectDetailsProps(result));
      } catch {
        if (!isMountedRef.current) {
          return;
        }
        setState({ error: unknownError });
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [projectDetailsDataSource],
  );

  useEffect(() => {
    if (!isValidId) {
      if (isMountedRef.current) {
        setState({ error: notFoundError });
        setIsLoading(false);
      }
      return;
    }
    void loadProjectDetails(projectId);
  }, [isValidId, loadProjectDetails, projectId]);

  const handleRetry = useCallback(() => {
    if (!isValidId) {
      return;
    }
    void loadProjectDetails(projectId);
  }, [isValidId, loadProjectDetails, projectId]);

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.assign("/dashboard");
    }
  }, []);

  const pageProps = useMemo(
    () => ({
      data: state.data,
      error: state.error,
      isLoading,
      onRetry: handleRetry,
      onBack: handleBack,
      loginHref: "/login",
    }),
    [handleBack, handleRetry, isLoading, state.data, state.error],
  );

  return <ProjectDetailsPage {...pageProps} />;
}
