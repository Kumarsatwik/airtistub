"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SettingContext } from "@/context/SettingContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetail] = useState<unknown>(null);
  const [settingDetail,setSettingDetail]=useState<any>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    let cancelled = false;

    axios
      .post("/api/user", {})
      .then((result) => {
        if (cancelled) return;
        if (result?.data) {
          setUserDetail(result.data);
        } else {
          setUserDetail({});
        }
      })
      .catch((error) => {
        if (cancelled) return;

        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            router.push("/sign-in");
            return;
          }

          console.error(error.response?.data ?? error.message);
          return;
        }

        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, router]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetail }}>
      <SettingContext.Provider value={{settingDetail,setSettingDetail}}>
      <div>{children}</div>
      </SettingContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;
