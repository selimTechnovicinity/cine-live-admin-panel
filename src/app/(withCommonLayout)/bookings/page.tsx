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

  useEffect(() => {
    const fetchBookings = async () => {
      const accessToken = getLocalStorage(authKey);
      if (!accessToken) {
        setError("Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await getAllBookings(accessToken);
        const bookingData = res?.data?.reservations;
        console.log(bookingData);
        setBookings(bookingData || []);
      } catch {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

//   if (loading) return <p>Loading bookings...</p>;
  if (error)
    return (
      <p className=" ml-140 text-center font-bold  mt-40 bg-red-600 w-200 p-5 text-white">
        {error}
      </p>
    );

  return (
    <main className="flex">
      <div className="my-25 mx-auto w-full max-w-6xl px-4">
        {/* <div className="mb-4 flex justify-end">
          <Link href="/add-booking">
            <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              + Add new booking
            </button>
          </Link>
        </div> */}

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
    </main>
  );
};

export default Bookings;
