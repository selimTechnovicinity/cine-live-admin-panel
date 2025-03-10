"use client"; 

import { authKey } from "@/constants/authKey";
import { getAllUsers } from "@/services/actions/Users";
import UserTable from "@/ui/Users/UserTable";
import { getLocalStorage } from "@/utils/local-storage";
import { useEffect, useState } from "react";

export type TUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "operator" | "restaurant" | "super-admin"; // Restricting values
  isActive: boolean;
  __v: number;
};

const Users = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = getLocalStorage(authKey);
      if (!accessToken) {
        setError("Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await getAllUsers(accessToken);

        const usersData = res?.data?.users;

        setUsers(usersData || []);
      } catch {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // if (loading) return <p>Loading users...</p>;
  if (error)
    return (
      <p className=" ml-140 text-center font-bold  mt-40 bg-red-600 w-200 p-5 text-white">
        {error}
      </p>
    );

  return (
    <main className="flex">
      <UserTable users={users} />
    </main>
  );
};

export default Users;
