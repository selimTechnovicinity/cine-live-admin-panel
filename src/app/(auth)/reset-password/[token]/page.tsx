"use client";
import { resetPassword } from "@/services/actions/Users";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type TResetPasswordData = {
  password: string;
  confirmPassword: string;
};

const ForgotPassword = () => {
  const { token } = useParams();

  const [formData, setFormData] = useState<TResetPasswordData>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    const res = await resetPassword(formData, token as string);

    if (res?.success === false) {
      toast.error(res?.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form className="mt-4" onSubmit={handleReset}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <button className="w-full p-2 mt-4 bg-blue-950 cursor-pointer text-white rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
