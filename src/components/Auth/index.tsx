import { useUserStore } from "@/store/user";
import { getToken } from "@/utils/auth";
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
interface Props {
  children: React.ReactNode;
}
const whiteList = ["/login", "/register"];
export const Auth: React.FC<Props> = ({ children }) => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const token = getToken();
  const pathname = useLocation().pathname;
  useEffect(() => {
    const userInfo = userStore.userInfo;
    if (token && !userInfo) {
      userStore.getUserInfo();
    }
  }, [token, pathname, userStore, navigate]);

  if (!token && !whiteList.includes(pathname)) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
};
