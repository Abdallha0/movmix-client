"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getToken } from "../utils/cookieUtils";

export function useSessionStatus() {
  const { status, data } = useSession() as any;
  const [token, setToken] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const t = getToken() || data?.user?.backendToken;
    setToken(t);
  }, []);

  useEffect(() => {
    if (status === "loading") {
      setSessionStatus("loading");
    } else if (status === "unauthenticated" && !token) {
      setSessionStatus("unauthenticated");
    } else if (status === "authenticated" || token) {
      setSessionStatus("authenticated");
    }
  }, [status, token]);

  return {sessionStatus, token};
}
