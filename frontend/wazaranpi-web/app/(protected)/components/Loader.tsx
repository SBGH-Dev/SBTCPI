// components/Loader.tsx

"use client";

import Image from "next/image";

type LoaderProps = {
  text?: string;
  fullScreen?: boolean;
};

export default function Loader({
  text = "Loading...",
  fullScreen = true,
}: LoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
          : "flex items-center justify-center py-10"
      }
    >
      <div className="flex flex-col items-center gap-5">
        {/* Flipping Logo */}
        <div className="perspective-[1000px]">
          <div className="animate-flip">
            <Image
              src="/wazaranPILogo.png"
              alt="Loading"
              width={90}
              height={90}
              priority
              className="rounded-full shadow-2xl"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-teal-700">{text}</p>

          <div className="mt-2 flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
