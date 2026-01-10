import { createContext, Dispatch, SetStateAction } from "react";

export const SettingContext = createContext<{
  settingDetail: any;
  setSettingDetail: Dispatch<SetStateAction<any>>;
}>({
  settingDetail: null,
  setSettingDetail: () => {},
});

