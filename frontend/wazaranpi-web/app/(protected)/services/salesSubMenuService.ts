import { SalesSubMenu } from "../types/salessubmenu";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getSalesSubMenus(empCd: string): Promise<SalesSubMenu[]> {
  const res = await fetch(`${apiBaseUrl}/SalesSubMenu/${empCd}`);

  if (!res.ok) {
    throw new Error("Failed to fetch sales submenu");
  }

  return res.json();
}
