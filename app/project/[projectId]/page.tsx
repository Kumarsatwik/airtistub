"use client";
import axios from "axios";
import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { Loader2Icon, AlertCircle, RefreshCw } from "lucide-react";
import Canvas from "./_shared/Canvas";

type ProjectResponse = {
  projectDetail: ProjectType;
  screenConfig: ScreenConfigType[];
};

const ProjectCanvasPlayground = () => {
  const { projectId } = useParams();
  const projectIdValue = Array.isArray(projectId) ? projectId[0] : projectId;
  const [projectDetail, setProjectDetail] = useState<ProjectType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMsg, setLoadingMsg] = useState("Loading project...");
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadingStartRef = useRef<number | null>(null);
  const loadingStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [screenConfig, setScreenConfig] = useState<ScreenConfigType[]>([]);

  const generateScreenUIUX = useCallback(
    async ({
      screens,
      projectId,
      signal,
      projectVisualDescription,
    }: {
      screens: ScreenConfigType[];
      projectId: string;
      signal: AbortSignal;
      projectVisualDescription?: string;
    }) => {
      for (const screen of screens) {
        if (screen.code) continue;

        setLoadingMsg(`Generating UI code for ${screen.screenName}...`);
        const result = await axios.post<string>(
          "/api/generate-screen-ui",
          {
            projectId,
            screenId: screen.screenId,
            screenName: screen.screenName,
            purpose: screen.purpose,
            screenDescription: screen.screenDescription,
            projectVisualDescription,
          },
          {
            signal,
            timeout: 120000,
          }
        );

        const generatedCode = result.data;
        setScreenConfig((prev) =>
          prev.map((s) =>
            s.screenId === screen.screenId ? { ...s, code: generatedCode } : s
          )
        );
      }
    },
    []
  );

  const loadProject = useCallback(
    async (targetProjectId: string) => {
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
        setScreenConfig(existingConfig);

        if (!detail) return;

        if (existingConfig.length === 0) {
          if (!detail.deviceType || !detail.userInput) return;

          setLoadingMsg("Generating screen configuration...");
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

          const updatedDetail = generatedRes.data.projectDetail;
          const updatedScreens = generatedRes.data.screenConfig ?? [];
          setProjectDetail(updatedDetail);
          setScreenConfig(updatedScreens);

          if (updatedScreens.some((s) => !s.code)) {
            await generateScreenUIUX({
              screens: updatedScreens,
              projectId: targetProjectId,
              signal: controller.signal,
              projectVisualDescription: updatedDetail.projectVisualDescription,
            });
          }

          return;
        }

        const missingCodeScreens = existingConfig.filter((s) => !s.code);
        if (missingCodeScreens.length === 0) return;

        await generateScreenUIUX({
          screens: missingCodeScreens,
          projectId: targetProjectId,
          signal: controller.signal,
          projectVisualDescription: detail.projectVisualDescription,
        });
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
        } else {
          loadingStopTimerRef.current = setTimeout(() => {
            loadingStopTimerRef.current = null;
            setLoading(false);
          }, remaining);
        }
      }
    },
    [generateScreenUIUX]
  );

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
    if (!projectIdValue) {
      setLoading(false);
      return;
    }
    void loadProject(projectIdValue);
  }, [projectIdValue, loadProject]);

  return (
    <div>
      <ProjectHeader />
      <div className="flex">
        {loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-6 min-w-[300px] flex flex-col items-center gap-4">
              <Loader2Icon className="h-8 w-8 animate-spin text-blue-600" />
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 block">
                  {loadingMsg}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 block mt-1">
                  This may take a few moments...
                </span>
              </div>
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

        {/* Canvas */}
        <Canvas projectDetail={projectDetail} screenConfig={screenConfig} />
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;
