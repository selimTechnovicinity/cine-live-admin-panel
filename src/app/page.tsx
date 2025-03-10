"use client";

import { authKey } from "@/constants/authKey";
import { getLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = getLocalStorage(authKey);

    if (!accessToken) {
      router.push("/login");
    } else {
      router.push("/operators");
    }
  }, [router]);

  return <div>Loading...</div>;
}
