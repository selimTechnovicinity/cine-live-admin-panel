"use client";

import { authKey } from "@/constants/authKey";
import { updatePassword } from "@/services/actions/Users";
import { getLocalStorage } from "@/utils/local-storage";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type TUpdatePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const UpdatePassword = () => {
  const [formData, setFormData] = useState<TUpdatePasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const accessToken = getLocalStorage(authKey);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      toast.error("Please login first.");
      router.push("/login");
    }
  }, [accessToken, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password does not match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await updatePassword(formData, accessToken as string);
      setLoading(false);

      if (res?.status === "success") {
        toast.success("Password updated successfully!");
        router.push("/users");
      } else if (res?.success === false) {
        setError(res?.message || "Incorrect current password");
        toast.error(res?.message || "Incorrect current password");
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again later.");
      toast.error("An unexpected error occurred.");
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Update Password</h2>
        <form className="mt-4" onSubmit={handleReset}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.newPassword}
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
          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
          <button
            type="submit"
            className={`w-full p-2 mt-4 bg-blue-950 text-white rounded-md flex items-center justify-center cursor-pointer ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
