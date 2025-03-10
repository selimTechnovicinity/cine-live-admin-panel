"use server";

import { TRegisterData } from "@/app/(auth)/register/page";

export const userRegister = async (
  formData: TRegisterData,
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    }
  );

  const userInfo = await res.json();

  return userInfo;
};
