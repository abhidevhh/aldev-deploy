import { createCookieSessionStorage } from "react-router";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
const authFlowExpirationTime = 1e3 * 60 * 30;
const loginInfoStorage = createCookieSessionStorage({
  cookie: {
    name: "KCD_login",
    secure: true,
    secrets: [getEnv().SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: authFlowExpirationTime / 1e3,
    httpOnly: true
  }
});
async function getLoginInfoSession(request) {
  const session = await loginInfoStorage.getSession(
    request.headers.get("Cookie")
  );
  const initialValue = await loginInfoStorage.commitSession(session);
  const commit = async () => {
    const currentValue = await loginInfoStorage.commitSession(session);
    return currentValue === initialValue ? null : currentValue;
  };
  return {
    getEmail: () => session.get("email"),
    setEmail: (email) => session.set("email", email),
    getSignupEmail: () => session.get("signupEmail"),
    setSignupEmail: (email) => session.set("signupEmail", email),
    unsetSignupEmail: () => session.unset("signupEmail"),
    getResetPasswordEmail: () => session.get("resetPasswordEmail"),
    setResetPasswordEmail: (email) => session.set("resetPasswordEmail", email),
    unsetResetPasswordEmail: () => session.unset("resetPasswordEmail"),
    getError: () => session.get("error"),
    flashError: (error) => session.flash("error", error),
    getMessage: () => session.get("message"),
    flashMessage: (message) => session.flash("message", message),
    clean: () => {
      session.unset("email");
      session.unset("error");
      session.unset("message");
      session.unset("signupEmail");
      session.unset("resetPasswordEmail");
    },
    destroy: () => loginInfoStorage.destroySession(session),
    commit,
    /**
     * This will initialize a Headers object if one is not provided.
     * It will set the 'Set-Cookie' header value on that headers object.
     * It will then return that Headers object.
     */
    getHeaders: async (headers = new Headers()) => {
      const value = await commit();
      if (!value) return headers;
      if (headers instanceof Headers) {
        headers.append("Set-Cookie", value);
      } else if (Array.isArray(headers)) {
        headers.push(["Set-Cookie", value]);
      } else {
        headers["Set-Cookie"] = value;
      }
      return headers;
    }
  };
}
export {
  getLoginInfoSession as g
};
//# sourceMappingURL=login.server-Bn92r_Ja.js.map
