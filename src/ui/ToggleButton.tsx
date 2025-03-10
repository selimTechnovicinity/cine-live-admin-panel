"use client";
import { authKey } from "@/constants/authKey";
import { disableUser, restoreUser } from "@/services/actions/Users";
import { getLocalStorage } from "@/utils/local-storage";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ToggleButton = ({
  status,
  id,
}: {
  status: boolean;
  id: { id: string };
}) => {
  const [isOn, setIsOn] = useState(status);
  const accessToken = getLocalStorage(authKey);

  const toggleSwitch = async () => {
    setIsOn(!isOn);
    if (isOn !== true) {
      
      const res = await restoreUser(accessToken as string, id);
      if (res?.status === "success") {
        toast.success("Enabled");
      }
    } else {
      
      const res = await disableUser(accessToken as string, id);
      if (res?.status === "success") {
        toast.success("Disabled");
      }
    }
  };

  return (
    <button
      onClick={toggleSwitch}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ${
          isOn ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ToggleButton;
