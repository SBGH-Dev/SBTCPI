import AuthButton from "../(protected)/components/AuthButton";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
            🚫
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          You don’t have permission to access this page.
        </p>

        <div className="my-6 h-px w-full bg-slate-200" />

        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Go to Dashboard
          </a>

          <a
            href="/login"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Switch Account
          </a>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
