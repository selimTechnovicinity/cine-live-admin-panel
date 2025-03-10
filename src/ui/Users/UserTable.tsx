import { TUser } from "@/app/(withCommonLayout)/users/page";
import Link from "next/link";
import ToggleButton from "../ToggleButton";

export default function UserTable({ users }: { users: TUser[] }) {
  return (
    <div className="my-10 mx-auto w-full max-w-6xl px-4">
      <div className="mb-4 flex justify-end">
        <Link href="/users/create">
          <button className="bg-blue-950 cursor-pointer text-white px-4 py-2 rounded-lg transition">
            + Add new user
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-left">USER</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">USER ROLE</th>
              <th className="p-3 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="even:bg-blue-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-lg ${
                      user.role === "super-admin"
                        ? "bg-blue-500 text-white"
                        : user.role === "operator"
                        ? "bg-purple-500 text-white"
                        : "bg-orange-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <ToggleButton status={user?.isActive} id={{ id: user?.id }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
