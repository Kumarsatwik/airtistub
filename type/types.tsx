export const DeviceType = {
  mobile: "mobile",
  web: "website",
};

export type ProjectType = {
  id: number;
  projectId: string;
  deviceType: string;
  userInput: string;
  createdOn: string;
  projectName?: string;
  theme?: string;
};

export type ScreenConfigType = {
  id: number;
  screenId: string;
  screenName: string;
  purpose: string;
  screenDescription: string;
  code?: string;
};
