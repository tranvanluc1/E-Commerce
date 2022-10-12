import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { refreshToken } from "../redux/asyncThunk/auth";
import { useAppDispatch } from "../redux/hooks";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    const token = localStorage.getItem("refreshToken");
    if (firstLogin) {
      dispatch(refreshToken({ token }));
    }
  }, []);

  return (
    <div className="container">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
