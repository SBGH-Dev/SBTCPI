export function getSavedUser() {
  const saved = localStorage.getItem("user");
  if (!saved) return null;

  return JSON.parse(saved);
}

export function clearUser() {
  localStorage.removeItem("user");
}
