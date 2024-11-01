"use client";

import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/signup");
    }
  }, [token]);

  return <>{token ? children : null}</>;
};

export default Layout;
