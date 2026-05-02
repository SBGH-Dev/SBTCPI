"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMyMenus } from "@/app/(protected)/services/menuService";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const userText = localStorage.getItem("user");

      if (!userText) {
        router.replace("/login");
        return;
      }

      const user = JSON.parse(userText);

      const menus = await getMyMenus(user.empCd, user.roleName);

      const hasAccess = menus.some((m) => pathname.startsWith(m.url));

      if (!hasAccess) {
        router.replace("/unauthorized");
        return;
      }

      setAllowed(true);
    }

    checkAccess();
  }, [pathname, router]);

  if (!allowed) return null;

  return <>{children}</>;
}
