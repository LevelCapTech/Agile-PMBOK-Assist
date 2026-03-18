"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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

const isValidProjectId = (value: string) => /^\d+$/.test(value);

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

  const projectId = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }
    const segments = window.location.pathname.split("/");
    return segments.at(-1) ?? "";
  }, []);
  const isValidId = isValidProjectId(projectId);

  const loadProjectDetails = useCallback(
    async (targetId: string) => {
      setIsLoading(true);
      setState({});
      try {
        const result = await projectDetailsDataSource.getProjectDetails(targetId);
        setState(toProjectDetailsProps(result));
      } catch {
        setState({ error: unknownError });
      } finally {
        setIsLoading(false);
      }
    },
    [projectDetailsDataSource],
  );

  useEffect(() => {
    if (!isValidId) {
      setState({ error: notFoundError });
      setIsLoading(false);
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
