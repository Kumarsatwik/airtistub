import { createContext } from "react";

export const UserDetailContext = createContext<{
  userDetails: any;
  setUserDetail: (user: any) => void;
}>({
  userDetails: {},
  setUserDetail: () => {},
});
