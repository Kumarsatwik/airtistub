export const DeviceType = {
  mobile: "mobile",
  tablet: "tablet",
  desktop: "desktop",
  web: "web",
};

export type ProjectType = {
  id: number;
  projectId: string;
  device: string;
  userInput: string;
  createdOn: string;
  projectName?: string;
  theme?: string;
};
