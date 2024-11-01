"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserType } from "@/lib/type";

interface IJwtPayload extends JwtPayload {
  user: UserType;
  _id: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<UserType | null>();

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/cookies").then((res) => {
      if (!res.data.token) {
        router.push("/login");
        return;
      }

      const token: IJwtPayload = jwtDecode(res.data.token);
      setUser(token.user);
    });
  }, []);

  return { currentUser: user };
};
