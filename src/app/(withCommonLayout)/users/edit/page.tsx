"use client";
import { authKey } from "@/constants/authKey";
import { updateUser } from "@/services/actions/Users";
import { getLocalStorage } from "@/utils/local-storage";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type TUpdateData = {
  name?: string;
  email?: string;
  phone?: string;
};

const EditUser = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<TUpdateData>({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const accessToken = getLocalStorage(authKey);

    if (!accessToken) {
      toast.error("Please login first.");
      router.push("/login");
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Remove empty fields from formData
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    const accessToken = getLocalStorage(authKey);

    try {
      const res = await updateUser(accessToken as string, filteredData);
      setLoading(false);

      if (res?.data?.user) {
        toast.success("Update completed");
        router.push("/users");
      } else if (res?.success === false) {
        setError(res?.message || "Update failed. Please try again.");
        toast.error(res?.message);
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again later.");
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Update Profile</h2>
        <form className="" onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.phone}
            onChange={handleChange}
          />

          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

          <button
            type="submit"
            className={`w-full p-2 mt-4 bg-blue-950 text-white rounded-md cursor-pointer flex items-center justify-center ${
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

export default EditUser;
