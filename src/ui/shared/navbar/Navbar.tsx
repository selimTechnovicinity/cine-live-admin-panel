"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {
  const AuthButton = dynamic(() => import("@/ui/authButton/AuthButton"), {
    ssr: false,
  });

  return (
    <nav className="bg-blue-950 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold"> </h1>
        <ul className="flex space-x-4">
          <li>
            <Link
              href={`/users/edit`}
              className="p-2 rounded-sm hover:bg-blue-700"
            >
              Update profile
            </Link>
          </li>
          <li>
            <Link
              href={`/update-password`}
              className=" p-2 rounded-sm hover:bg-blue-700"
            >
              Update password
            </Link>
          </li>
          <li>
            <AuthButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
