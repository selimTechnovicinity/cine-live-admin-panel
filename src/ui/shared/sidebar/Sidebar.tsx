"use client";

import Link from "next/link";
import { useState } from "react";
import { FiHome, FiUser, FiX } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col w-64 bg-blue-950 text-white h-screen fixed z-30">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold ml-5">Admin Panel</h1>
        <button onClick={toggleSidebar} className="lg:hidden">
          <FiX size={24} />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-grow">
        <ul className="space-y-4 p-4">
          <li>
            <Link
              href="/restaurants"
              className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
            >
              <FiHome size={20} />
              <span>Restaurants</span>
            </Link>
          </li>
          <li>
            <Link
              href="/operators"
              className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
            >
              <FiUser size={20} />
              <span>Operators</span>
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
            >
              <FiUser size={20} />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/bookings"
              className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
            >
              <TbBrandBooking size={20} />
              <span>Bookings</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer or Any Extra Sidebar Content */}
      <div className="p-4">{/* You can add footer content here */}</div>
    </div>
  );
};

export default Sidebar;
