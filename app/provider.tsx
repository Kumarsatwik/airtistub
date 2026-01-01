"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetail] = useState();

  useEffect(() => {
    createNewUser();
  }, []);

  const createNewUser = async () => {
    const result = await axios.post("/api/users", {});
    console.log(result.data);
    setUserDetail(result?.data);
  };

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;
