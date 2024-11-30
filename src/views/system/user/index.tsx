import React, { useEffect } from "react";
import { getUserInfo } from "@/api/system";
const User: React.FC = () => {
  const getUerApi = async () => {
    const res = await getUserInfo();
    console.log(res);
  };
  useEffect(() => {
    getUerApi();
  }, []);
  return <div>index</div>;
};

export default User;
