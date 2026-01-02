import { createContext, type Dispatch, type SetStateAction } from "react";

export const UserDetailContext = createContext<{
  userDetails: unknown;
  setUserDetail: Dispatch<SetStateAction<unknown>>;
}>({
  userDetails: null,
  setUserDetail: () => {},
});
