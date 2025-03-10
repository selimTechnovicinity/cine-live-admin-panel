"use server";

import { TResetPasswordData } from "@/app/(auth)/reset-password/[token]/page";
import { TUpdatePasswordData } from "@/app/(withCommonLayout)/update-password/page";
import { TUpdateData } from "@/app/(withCommonLayout)/users/edit/page";

export const getAllRestaurants = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations/`,
    {
      cache: "no-store",
    }
  );
  const restaurants = await res.json();
  return restaurants;
};

export const getAllUsers = async (accessToken: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      revalidate: 1,
    },
    cache: "no-store",
  });
  const users = await res.json();
  return users;
};

export const restoreUser = async (accessToken: string, id: { id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/restore`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(id),
      cache: "no-store",
    }
  );

  const userInfo = await res.json();

  return userInfo;
};

export const disableUser = async (accessToken: string, id: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(id),
    cache: "no-store",
  });
  console.log(id);

  const userInfo = await res.json();

  return userInfo;
};

export const updateUser = async (
  accessToken: string,
  formData: TUpdateData
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });

  const userInfo = await res.json();

  return userInfo;
};

export const forgetPassword = async (email: { email: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forget-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
      cache: "no-store",
    }
  );

  const result = await res.json();

  return result;
};

export const resetPassword = async (
  formData: TResetPasswordData,
  token: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    }
  );

  const result = await res.json();

  return result;
};

export const updatePassword = async (
  formData: TUpdatePasswordData,
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    }
  );

  const result = await res.json();

  return result;
};
