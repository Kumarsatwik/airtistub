import { Button } from "@/components/ui/button";
import { Loader2Icon, Save } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { SettingContext } from "@/context/SettingContext";
import axios from "axios";
import { toast } from "sonner";

const ProjectHeader = () => {
  const {settingDetail,setSettingDetail}=useContext(SettingContext)
  const [loading,setLoading]=useState(false)
  const onSave = async () => {
    setLoading(true);
    try {
      await axios.put('/api/project', {
        theme: settingDetail.theme,
        projectId: settingDetail.projectId,
        projectName: settingDetail.projectName
      });
      toast.success("Project saved successfully");
    } catch (error) {
      toast.error("An error occurred while saving the project");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-2 items-center justify-between p-3 shadow-md">
      <div className="flex gap-2 items-center">
        <Image
          src="https://img.icons8.com/arcade/128/design.png"
          alt="logo"
          width={40}
          height={40}
        />
        <h2 className="text-xl font-semibold">Airtistub</h2>
      </div>
      <Button onClick={onSave} disabled={loading}>
        {" "}
        {loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : <Save /> } Save
      </Button>
    </div>
  );
};

export default ProjectHeader;
