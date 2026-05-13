"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getSalesSubMenus } from "@/app/(protected)/services/salesSubMenuService";

export default function SalesSubMenuProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      try {
        const userText = sessionStorage.getItem("user");

        if (!userText) {
          router.replace("/login");
          return;
        }

        const user = JSON.parse(userText);

        const subMenus = await getSalesSubMenus(user.empCd);

        const hasAccess = subMenus.some((menu) =>
          pathname.startsWith(menu.href),
        );

        if (!hasAccess) {
          router.replace("/unauthorized");
          return;
        }

        setAllowed(true);
      } catch (err) {
        console.error(err);
        router.replace("/unauthorized");
      }
    }

    checkAccess();
  }, [pathname, router]);

  if (!allowed) return null;

  return <>{children}</>;
}
