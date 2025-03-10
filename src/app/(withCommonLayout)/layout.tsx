import Navbar from "@/ui/shared/navbar/Navbar";
import Sidebar from "@/ui/shared/sidebar/Sidebar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className=" mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default CommonLayout;
