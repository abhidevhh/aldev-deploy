import * as cookie from "cookie";
const cookieName = "en_theme";
const isTheme = (value) => typeof value === "string" && ["light", "dark", "day", "brand", "red", "blue", "redblue"].includes(value);
function getTheme(request) {
  const cookieHeader = request.headers.get("cookie");
  const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : "light";
  if (isTheme(parsed)) return parsed;
  return null;
}
function setTheme(theme) {
  if (theme === "system") {
    return cookie.serialize(cookieName, "", { path: "/", maxAge: -1 });
  } else {
    return cookie.serialize(cookieName, theme, { path: "/" });
  }
}
export {
  getTheme as g,
  setTheme as s
};
