"use client";

import { authKey } from "@/constants/authKey";
import { getAllUsers } from "@/services/actions/Users";
import UserTable from "@/ui/Users/UserTable";
import { getLocalStorage } from "@/utils/local-storage";
import Link from "next/link";
import { useEffect, useState } from "react";

export type TUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "operator" | "restaurant" | "super-admin";
  isActive: boolean;
  __v: number;
};

const Users = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const accessToken = getLocalStorage(authKey);
      if (!accessToken) {
        setError("Please login.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getAllUsers(accessToken, "operator", pageNo, limit);
        const usersData = res?.data?.users?.users;
        const totalUsers = res?.data?.users?.totalUsers;

        setUsers(usersData || []);
        setTotalPages(Math.ceil(totalUsers / limit));
      } catch {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageNo]);

  // Pagination Handlers
  const handleNext = () => {
    if (pageNo < totalPages) setPageNo((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (pageNo > 1) setPageNo((prev) => prev - 1);
  };

  const handlePageClick = (page: number) => {
    setPageNo(page);
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error)
    return (
      <p className="ml-140 text-center font-bold mt-40 bg-red-600 w-200 p-5 text-white">
        {error}
      </p>
    );

  return (
    <main className="my-10 mx-auto w-full max-w-6xl px-4">
      <div className="flex justify-end mr-5">
        <Link href="/operators/create">
          <button className="bg-blue-950 cursor-pointer text-white px-4 py-2 rounded-lg transition">
            + Add new
          </button>
        </Link>
      </div>
      <UserTable users={users} />

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-3 flex justify-center gap-2">
        <button
          onClick={handlePrev}
          disabled={pageNo === 1}
          className={`px-4 py-2 rounded-full ${
            pageNo === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-950 text-white cursor-pointer hover:bg-blue-800 transition"
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 rounded-full ${
              pageNo === index + 1
                ? "bg-blue-950 text-white "
                : "bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-300 transition"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={pageNo === totalPages}
          className={`px-4 py-2 rounded-full ${
            pageNo === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-950 text-white cursor-pointer hover:bg-blue-800 transition"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Users;
