"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { browserName, osName, fullBrowserVersion } from "react-device-detect";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleConsultBrowserAndUserId = async () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/linked-device/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "insomnia/8.4.0",
          },
          body: JSON.stringify({
            userId,
            browserName,
            deviceName: osName,
            fullBrowserVersion,
          }),
          cache: "no-cache",
        }
      );

      const data = await response.json();

      if (data.error) {
        localStorage.removeItem("userId");
        router.push("/");
        return;
      }
      router.push("/dashboard");
      return;
    }

    router.push("/");
  };

  useEffect(() => {
    handleConsultBrowserAndUserId();
  }, []);

  return <div>{children}</div>;
}
