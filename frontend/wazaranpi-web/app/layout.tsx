import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import LeftBar from "./components/LeftBar";
import AuthButton from "./components/AuthButton";
import ProfileButton from "./components/ProfileButton";
import ChatBotButton from "./components/ChatBotButton";

export const metadata: Metadata = {
  title: "WazaranPI",
  description: "Our WazaranPI Logo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F3FFFC] text-slate-800">
        <div className="flex min-h-screen">
          <LeftBar />

          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-50 h-16 border-b border-cyan-100 bg-[#DDFBF3]/80 backdrop-blur-xl">
              <div className="flex h-full items-center justify-between px-8">
                <nav className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="group relative rounded-xl border border-teal-200 bg-white/60 px-5 py-2 text-sm font-semibold text-teal-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white hover:text-teal-800 hover:shadow-[0_10px_25px_rgba(20,184,166,0.18)] active:scale-95"
                  >
                    Home
                  </Link>
                  {/* 
                  <Link
                    href="/admin"
                    className="group relative rounded-xl border border-cyan-200 bg-white/60 px-5 py-2 text-sm font-semibold text-cyan-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white hover:text-cyan-800 hover:shadow-[0_10px_25px_rgba(6,182,212,0.18)] active:scale-95"
                  >
                    Admin
                  </Link> */}
                </nav>

                <div className="flex items-center gap-3">
                  {/* <button className="cursor-pointer grid h-10 w-10 place-items-center rounded-full bg-white text-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:rotate-12 hover:shadow-[0_10px_30px_rgba(20,184,166,0.25)]">
                    ☀️
                  </button> */}

                  <ProfileButton />

                  <AuthButton />
                </div>
              </div>
            </header>
            <main className="flex-1 bg-gradient-to-br from-[#F7FFFD] via-[#ECFFFA] to-[#F1FBFF] p-8">
              {children}
            </main>

            <footer className="border-t border-cyan-100 bg-[#DDFBF3]/80 py-4 text-center text-sm text-slate-500 backdrop-blur-xl">
              <p>© {new Date().getFullYear()} WazaranPI</p>
            </footer>
          </div>
        </div>
        <ChatBotButton />
      </body>
    </html>
  );
}
