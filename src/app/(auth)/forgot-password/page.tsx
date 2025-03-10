"use client";
import { forgetPassword } from "@/services/actions/Users";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await forgetPassword({ email });
    toast.success(res?.status);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form className="mt-4" onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mt-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="w-full p-2 mt-4 bg-blue-950 cursor-pointer text-white rounded-md">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
