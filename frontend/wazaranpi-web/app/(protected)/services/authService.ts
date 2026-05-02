import { clearUser } from "@/app/(protected)/utils/authStorage";

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Invalid username or password");

  const data = await res.json();

  return {
    empCd: data.empCd ?? data.EmpCd,
    username: data.username ?? data.Username,
    fullName: data.fullName ?? data.FullName,
    roleName: data.roleName ?? data.RoleName,
  };
}

export function saveUser(user: any) {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
}

export function logoutUser() {
  clearUser();
  window.dispatchEvent(new Event("auth-change"));
}
