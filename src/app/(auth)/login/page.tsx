"use client";
import { userLogin } from "@/services/actions/UserLogin";
import { storeUserInfo } from "@/services/auth.service";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type TLoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginData: TLoginData = {
      email,
      password,
    };

    try {
      const res = await userLogin(loginData);
      setLoading(false);

      if (res?.status === "success") {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast.success("Login successful");
        router.push("/users");
      } else if (res?.success === false) {
        setError(res?.message || "Login failed. Please try again.");
        toast.error(res?.message);
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mt-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
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
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="mt-2 text-center">
          <Link href="/forgot-password" className="text-sm text-blue-950">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
