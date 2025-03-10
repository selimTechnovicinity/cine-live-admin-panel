"use client";
import { getUserInfo, removeUser } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const userData = getUserInfo();

  const handleLogout = () => {
    removeUser();
    router.push("/login");
    router.refresh();
  };
  return (
    <>
      {userData ? (
        <button className="cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link href="/login">
          <button className="cursor-pointer">Login</button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
