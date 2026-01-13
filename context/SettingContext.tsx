import { createContext, Dispatch, SetStateAction } from "react";
import type { ProjectType } from "@/type/types";

export type SettingContextValue = {
  settingDetail: ProjectType | null;
  setSettingDetail: Dispatch<SetStateAction<ProjectType | null>>;
};

export const SettingContext = createContext<SettingContextValue>({
  settingDetail: null,
  setSettingDetail: (() => undefined) as Dispatch<
    SetStateAction<ProjectType | null>
  >,
});
