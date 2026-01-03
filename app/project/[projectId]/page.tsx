"use client";
import axios from "axios";
import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { Loader2Icon } from "lucide-react";

type ProjectResponse = {
  projectDetail: ProjectType;
  screenConfig: ScreenConfigType[];
};

const ProjectCanvasPlayground = () => {
  const { projectId } = useParams();
  const projectIdValue = Array.isArray(projectId) ? projectId[0] : projectId;
  const [, setProjectDetail] = useState<ProjectType>();
  const [, setScreenConfig] = useState<ScreenConfigType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading");
  const hasFetched = useRef(false);

  const generateScreenConfig = useCallback(
    async (targetProjectId: string, detail: ProjectType) => {
      if (!detail?.deviceType || !detail?.userInput) return;
      setLoading(true);
      setLoadingMsg("Generating Screen config...");
      try {
        const result = await axios.post<ProjectResponse>(
          "/api/generate-config",
          {
            projectId: targetProjectId,
            deviceType: detail.deviceType,
            userInput: detail.userInput,
          }
        );
        console.log("Generated screen config:", result.data);
        setProjectDetail(result.data.projectDetail);
        setScreenConfig(result.data.screenConfig);
      } catch (error) {
        console.error("Error generating screen config:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getProjectDetail = useCallback(
    async (targetProjectId: string) => {
      setLoading(true);
      setLoadingMsg("Loading...");
      try {
        const result = await axios.get<ProjectResponse>(
          `/api/project?projectId=${targetProjectId}`
        );
        const detail = result?.data?.projectDetail;
        const config = result?.data?.screenConfig ?? [];
        setProjectDetail(detail);
        setScreenConfig(config);
        if (detail && config.length === 0) {
          await generateScreenConfig(targetProjectId, detail);
        }
      } catch (error) {
        console.error("Error fetching project detail:", error);
      } finally {
        setLoading(false);
      }
    },
    [generateScreenConfig]
  );

  useEffect(() => {
    if (!projectIdValue || hasFetched.current) return;
    hasFetched.current = true;
    void getProjectDetail(projectIdValue);
  }, [projectIdValue, getProjectDetail]);

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
        {/* Settings */}
        <SettingsSection />
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;
