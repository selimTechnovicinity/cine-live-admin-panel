"use server";

export const getAllBookings = async (accessToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 1,
      },
      cache: "no-store",
    }
  );
  const bookings = await res.json();
  console.log(bookings);
  return bookings;
};
