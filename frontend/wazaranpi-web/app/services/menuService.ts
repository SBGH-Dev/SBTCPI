import { RawMenu, Menu } from "@/app/types/menu";

export async function getMyMenus(
  empCd: string,
  roleName: string,
): Promise<Menu[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Menus/my-menus?empCd=${empCd}&roleName=${roleName}`,
  );

  if (!res.ok) return [];

  const raw: RawMenu[] = await res.json();

  return raw
    .map((m, i) => ({
      id: m.menuId ?? m.MenuId ?? i,
      name: m.menuName ?? m.MenuName ?? "Menu",
      url: m.menuUrl ?? m.MenuUrl ?? "#",
      icon: (m.icon ?? m.Icon ?? "").trim() || "FileText",
    }))
    .filter((m) => m.url !== "/" && m.name.toLowerCase() !== "home");
}
