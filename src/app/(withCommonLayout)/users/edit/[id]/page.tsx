"use client";
import { authKey } from "@/constants/authKey";
import { updateUser } from "@/services/actions/Users";
import { getLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    const accessToken = getLocalStorage(authKey);
    console.log(formData);

    const res = await updateUser(accessToken as string, formData);

    if (res?.data?.user) {
      toast.success("Update completed");
      router.push("/users");
    }

    // Call API to register user
    // router.push("/dashboard"); // Redirect after successful registration
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="" onSubmit={handleRegister}>
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

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-600 text-white rounded-md cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
