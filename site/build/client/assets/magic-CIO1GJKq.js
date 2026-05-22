import { UNSAFE_withComponentProps, redirect } from "react-router";
import { jsx } from "react/jsx-runtime";
import { g as getLoginInfoSession } from "./login.server-Bn92r_Ja.js";
import "./env.server-DPCBxZtL.js";
import "zod";
const handle = {
  getSitemapEntries: () => null
};
async function loader({
  request
}) {
  const loginInfoSession = await getLoginInfoSession(request);
  loginInfoSession.clean();
  loginInfoSession.flashMessage("Magic links are no longer supported. Please log in with your password (or reset it).");
  return redirect("/login", {
    headers: await loginInfoSession.getHeaders()
  });
}
const magic = UNSAFE_withComponentProps(function Magic() {
  return /* @__PURE__ */ jsx("div", {
    children: `Congrats! You're seeing something you shouldn't ever be able to see because you should have been redirected. Good job!`
  });
});
export {
  magic as default,
  handle,
  loader
};
//# sourceMappingURL=magic-CIO1GJKq.js.map
