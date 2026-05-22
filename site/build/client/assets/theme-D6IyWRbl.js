import { jsx, Fragment } from "react/jsx-runtime";
import { parseWithZod } from "@conform-to/zod/v4";
import * as cookie from "cookie";
import * as React from "react";
import { useRouteLoaderData, useRevalidator, useFetcher } from "react-router";
import { z } from "zod";
import { getHintUtils } from "@epic-web/client-hints";
import { clientHint as clientHint$1, subscribeToSchemeChange } from "@epic-web/client-hints/color-scheme";
import { clientHint } from "@epic-web/client-hints/time-zone";
import { invariant } from "@epic-web/invariant";
function useRequestInfo() {
  const data = useRouteLoaderData("root");
  invariant(data?.requestInfo, "No requestInfo found in root loader");
  return data.requestInfo;
}
const hintsUtils = getHintUtils({
  theme: clientHint$1,
  timeZone: clientHint
  // add other hints here
});
const { getHints } = hintsUtils;
function useHints() {
  const requestInfo = useRequestInfo();
  return requestInfo.hints;
}
function ClientHintCheck({ nonce }) {
  const { revalidate } = useRevalidator();
  React.useEffect(
    () => subscribeToSchemeChange(() => revalidate()),
    [revalidate]
  );
  return /* @__PURE__ */ jsx(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: hintsUtils.getClientHintCheckScript()
      }
    }
  );
}
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2["DARK"] = "dark";
  Theme2["LIGHT"] = "light";
  Theme2["DAY"] = "day";
  Theme2["BRAND"] = "brand";
  Theme2["RED"] = "red";
  Theme2["BLUE"] = "blue";
  Theme2["REDBLUE"] = "redblue";
  return Theme2;
})(Theme || {});
const themes = Object.values(Theme);
const THEME_FETCHER_KEY = "THEME_FETCHER";
const ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "day", "dark", "brand", "red", "blue", "redblue"])
});
const themeCookieName = "en_theme";
function getThemeFromCookie() {
  if (typeof document === "undefined") return null;
  const parsed = cookie.parse(document.cookie)[themeCookieName];
  if (isTheme(parsed)) return parsed;
  return null;
}
function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const optimisticMode = useOptimisticThemeMode();
  const [theme, setTheme] = React.useState(
    () => requestInfo.userPrefs.theme ?? hints.theme
  );
  React.useEffect(() => {
    const cookieTheme = getThemeFromCookie();
    if (cookieTheme && cookieTheme !== theme) {
      setTheme(cookieTheme);
    }
  });
  if (optimisticMode) {
    return optimisticMode === "system" ? hints.theme : optimisticMode;
  }
  return theme;
}
function useOptimisticThemeMode() {
  const themeFetcher = useFetcher({ key: THEME_FETCHER_KEY });
  if (themeFetcher.formData) {
    const submission = parseWithZod(themeFetcher.formData, {
      schema: ThemeFormSchema
    });
    if (submission.status === "success") return submission.value.theme;
    return null;
  }
}
function Themed({
  dark,
  light,
  initialOnly = false
}) {
  const theme = useTheme();
  const [initialTheme] = React.useState(theme);
  const themeToReference = initialOnly ? initialTheme : theme;
  return /* @__PURE__ */ jsx(Fragment, { children: themeToReference === "light" || themeToReference === "day" ? light : dark });
}
function isTheme(value) {
  return typeof value === "string" && themes.includes(value);
}
export {
  ClientHintCheck as C,
  Themed as T,
  ThemeFormSchema as a,
  THEME_FETCHER_KEY as b,
  useOptimisticThemeMode as c,
  getHints as g,
  useTheme as u
};
//# sourceMappingURL=theme-D6IyWRbl.js.map
