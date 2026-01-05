"use client";
import axios from "axios";
import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { Loader2Icon, AlertCircle, RefreshCw } from "lucide-react";

type ProjectResponse = {
  projectDetail: ProjectType;
  screenConfig: ScreenConfigType[];
};

const ProjectCanvasPlayground = () => {
  const { projectId } = useParams();
  const projectIdValue = Array.isArray(projectId) ? projectId[0] : projectId;
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading");
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadingStartRef = useRef<number | null>(null);
  const loadingStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const loadProject = useCallback(async (targetProjectId: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (loadingStopTimerRef.current) {
      clearTimeout(loadingStopTimerRef.current);
      loadingStopTimerRef.current = null;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    loadingStartRef.current = Date.now();
    setLoading(true);
    setError(null);
    setLoadingMsg("Loading project...");

    try {
      const projectRes = await axios.get<ProjectResponse>(
        `/api/project?projectId=${targetProjectId}`,
        {
          signal: controller.signal,
          timeout: 30000,
        }
      );

      const detail = projectRes.data?.projectDetail;
      const existingConfig = projectRes.data?.screenConfig ?? [];
      setProjectDetail(detail);

      if (!detail || existingConfig.length > 0) return;
      if (!detail.deviceType || !detail.userInput) return;

      setLoadingMsg("Generating screen config...");
      const generatedRes = await axios.post<ProjectResponse>(
        "/api/generate-config",
        {
          projectId: targetProjectId,
          deviceType: detail.deviceType,
          userInput: detail.userInput,
        },
        {
          signal: controller.signal,
          timeout: 60000,
        }
      );

      setProjectDetail(generatedRes.data.projectDetail);
    } catch (err) {
      if (axios.isAxiosError(err) && err.code === "ERR_CANCELED") return;

      const errorMessage = axios.isAxiosError(err)
        ? (err.response?.data as { error?: string } | undefined)?.error ??
          err.message
        : "Failed to load project";
      setError(errorMessage);
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      const minVisibleMs = 600;
      const startedAt = loadingStartRef.current ?? Date.now();
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, minVisibleMs - elapsed);

      if (remaining === 0) {
        setLoading(false);
        return;
      }

      loadingStopTimerRef.current = setTimeout(() => {
        loadingStopTimerRef.current = null;
        setLoading(false);
      }, remaining);
    }
  }, []);

  // Manual retry function
  const handleRetry = useCallback(() => {
    if (projectIdValue) {
      setError(null);
      void loadProject(projectIdValue);
    }
  }, [projectIdValue, loadProject]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (loadingStopTimerRef.current) {
        clearTimeout(loadingStopTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!projectIdValue) return;
    void loadProject(projectIdValue);
  }, [projectIdValue, loadProject]);

  return (
    <div>
      <ProjectHeader />
      <div>
        {loading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
            <div className="bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 min-w-[200px] flex items-center gap-3">
              <Loader2Icon className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-md font-medium text-gray-700 dark:text-gray-300">
                {loadingMsg}
              </span>
            </div>
          </div>
        )}
        {/* Error Display */}
        {error && !loading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white/95 dark:bg-gray-800/95 border border-red-200 dark:border-red-800 rounded-xl shadow-lg p-6 max-w-md mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Error
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
              <div className="flex gap-3">
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
                <button
                  onClick={() => setError(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <SettingsSection projectDetail={projectDetail} />
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;
