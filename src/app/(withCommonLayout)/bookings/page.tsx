"use client";

import { authKey } from "@/constants/authKey";
import { getAllBookings } from "@/services/actions/Bookings"; // New API to get bookings
import { getLocalStorage } from "@/utils/local-storage";
import { useEffect, useState } from "react";

export type TBooking = {
  id: string;
  restaurant: {
    name: string;
    id: string;
  };
  operator: {
    name: string;
    email: string;
    role: string;
    id: string;
  };
  reservationTime: string;
  guests: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const Bookings = () => {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      const accessToken = getLocalStorage(authKey);
      if (!accessToken) {
        setError("Please login.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getAllBookings(accessToken, sortBy, pageNo, limit);
        console.log(res?.data?.reservations?.reservations);
        const bookingData = res?.data?.reservations?.reservations;
        const totalBookings = res?.data?.reservations?.totalReservations;

        setBookings(bookingData || []);
        setTotalPages(Math.ceil(totalBookings / limit));
      } catch {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [pageNo, sortBy]);

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

  // Toggle sorting
  const toggleSort = () => {
    setSortBy((prev) => (prev === "latest" ? "oldest" : "latest"));
    setPageNo(1); // Reset to the first page when sorting changes
  };

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;
  if (error)
    return (
      <p className="ml-140 text-center font-bold mt-40 bg-red-600 w-200 p-5 text-white">
        {error}
      </p>
    );

  return (
    <main className="flex">
      <div className="my-10 mx-auto w-full max-w-6xl px-4">
        <div className="my-5 mx-auto w-full max-w-6xl px-4">
          <div className="flex justify-end mb-4 relative">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="bg-blue-950 text-white px-4  py-2 rounded-lg transition flex items-center gap-2 cursor-pointer"
              >
                Sort By: {sortBy === "latest" ? "Latest" : "Oldest"}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                  <ul className="py-2">
                    <li
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        sortBy === "latest" ? "bg-gray-100 font-semibold" : ""
                      }`}
                      onClick={() => {
                        setSortBy("latest");
                        setDropdownOpen(false);
                      }}
                    >
                      Latest
                    </li>
                    <li
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        sortBy === "oldest" ? "bg-gray-100 font-semibold" : ""
                      }`}
                      onClick={() => {
                        setSortBy("oldest");
                        setDropdownOpen(false);
                      }}
                    >
                      Oldest
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-left">RESTAURANT</th>
                <th className="p-3 text-left">OPERATOR</th>
                <th className="p-3 text-left">EMAIL</th>
                <th className="p-3 text-left">RESERVATION TIME</th>
                <th className="p-3 text-left">GUESTS</th>
                <th className="p-3 text-left">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="even:bg-blue-100">
                  <td className="p-3">{booking.restaurant.name}</td>
                  <td className="p-3">{booking.operator.name}</td>
                  <td className="p-3">{booking.operator.email}</td>
                  <td className="p-3">
                    {new Date(booking.reservationTime).toLocaleString()}
                  </td>
                  <td className="p-3">{booking.guests}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-lg ${
                        booking.status === "auto-rejected"
                          ? "bg-red-500 text-white"
                          : booking.status === "confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default Bookings;
