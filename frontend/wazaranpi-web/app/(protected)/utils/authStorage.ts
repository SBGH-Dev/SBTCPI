export function getSavedUser() {
  const saved = sessionStorage.getItem("user");
  if (!saved) return null;

  return JSON.parse(saved);
}

export function clearUser() {
  sessionStorage.removeItem("user");
}
