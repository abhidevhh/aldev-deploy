import { parseWithZod } from "@conform-to/zod/v4";
import { data, redirect } from "react-router";
import { s as setTheme } from "./theme.server-D5mszc13.js";
import { a as ThemeFormSchema } from "./theme-D6IyWRbl.js";
import "cookie";
import "react/jsx-runtime";
import "react";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
async function loader() {
  return redirect("/");
}
async function action({
  request
}) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema
  });
  if (submission.status !== "success") {
    return data({
      result: submission.reply()
    }, {
      status: submission.status === "error" ? 400 : 200
    });
  }
  const {
    theme
  } = submission.value;
  const responseInit = {
    headers: {
      "set-cookie": setTheme(theme)
    }
  };
  return data({
    success: true,
    submission
  }, responseInit);
}
export {
  action,
  loader
};
//# sourceMappingURL=set-theme-BH21cwtA.js.map
