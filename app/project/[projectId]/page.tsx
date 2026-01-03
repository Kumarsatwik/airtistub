"use client";
import axios from "axios";
import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProjectType } from "@/type/types";
import { Loader2Icon } from "lucide-react";

const ProjectCanvasPlayground = () => {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMsg, setLoadingMsg] = useState("Loading");
  useEffect(() => {
    projectId && getProjectDetail();
  }, [projectId]);

  const getProjectDetail = async () => {
    setLoading(true);
    setLoadingMsg("Loading...");
    const result = await axios.get<ProjectType>(
      `/api/project?projectId=${projectId}`
    );
    console.log(result?.data);
    setProjectDetail(result?.data);
    setLoading(false);
  };
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
