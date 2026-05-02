import Link from "next/link";
import { UserPlus, UserMinus, ShieldCheck, Fingerprint } from "lucide-react";

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Admin Panel</h1>
        <p className="mt-2 text-slate-500">
          Manage users, permissions, and menu access.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <Link
          href="/admin/add-user"
          className="group rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-teal-100 text-teal-700">
            <UserPlus size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">Add User</h2>
          <p className="mt-2 text-sm text-slate-500">
            Create a new system user with employee code, username, and role.
          </p>
        </Link>

        {/* Card 2 */}
        <Link
          href="/admin/delete-user"
          className="group rounded-3xl border border-red-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-red-100 text-red-600">
            <UserMinus size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">Delete User</h2>
          <p className="mt-2 text-sm text-slate-500">
            Remove or disable users from accessing the system.
          </p>
        </Link>

        {/* Card 3 */}

        <Link
          href="/admin/user-menu-access"
          className="group rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
            <ShieldCheck size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Add Menus To Users
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Assign menu permissions to normal users based on employee code.
          </p>
        </Link>

        {/* Card 4 */}

        <Link
          href="/admin/update-password"
          className="group rounded-3xl border border-cyan-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
            <Fingerprint size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Update User Password
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Securely reset or update user passwords to maintain account their
            accounts.
          </p>
        </Link>
      </div>
    </section>
  );
}
