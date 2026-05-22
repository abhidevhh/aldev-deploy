import { UNSAFE_withComponentProps, Form, data, redirect } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button } from "./button-C3vj8DF4.js";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
import { requireUser } from "./session.server-DZ6f3pgH.js";
import "clsx";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-CQO4K9rH.js";
import "date-fns";
import "zod";
import "litefs-js";
import "litefs-js/remix";
import "./prisma.server-Cj9LRFmw.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
async function loader({
  request
}) {
  const user = await requireUser(request);
  const url = new URL(request.url);
  const clientId = url.searchParams.get("client_id");
  const redirectUri = url.searchParams.get("redirect_uri");
  if (!clientId || !redirectUri) {
    throw new Response("Missing client_id or redirect_uri", {
      status: 400
    });
  }
  return data({
    clientId,
    user
  });
}
async function action({
  request
}) {
  const user = await requireUser(request);
  const url = new URL(request.url);
  const requestParams = Object.fromEntries(url.searchParams);
  const formData = await request.formData();
  const decision = formData.get("decision");
  if (!requestParams.client_id || !requestParams.redirect_uri) {
    return data({
      status: "error",
      message: "Missing client_id or redirect_uri"
    }, {
      status: 400
    });
  }
  if (decision === "approve") {
    const params = Object.fromEntries(url.searchParams);
    const response = await fetch("https://kcd-oauth-provider.abhidev.workers.dev/internal/complete-authorization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getEnv().CF_INTERNAL_SECRET}`
      },
      body: JSON.stringify({
        requestParams: {
          state: "",
          ...params,
          scope: params.scope?.split(" ") ?? []
        },
        userId: user.id,
        props: {
          userId: user.id
        },
        metadata: {}
      })
    });
    if (!response.ok) {
      console.error("Authorization failed", await response.text());
      return data({
        status: "error",
        message: "Failed to complete authorization"
      }, {
        status: 500
      });
    }
    let redirectTo = void 0;
    try {
      const data2 = await response.json();
      if (typeof data2.redirectTo === "string") {
        redirectTo = data2.redirectTo;
      }
    } catch (e) {
      console.error("Invalid response from authorization server", e);
    }
    if (!redirectTo) {
      return data({
        status: "error",
        message: "Invalid response from authorization server"
      }, {
        status: 500
      });
    }
    const redirectUrl = new URL(redirectTo);
    if (requestParams.state) {
      redirectUrl.searchParams.set("state", requestParams.state);
    }
    return redirect(redirectUrl.toString());
  } else {
    const params = new URLSearchParams({
      error: "access_denied"
    });
    if (requestParams.state) {
      params.set("state", requestParams.state);
    }
    throw redirect(`${requestParams.redirect_uri}?${params.toString()}`);
  }
}
const oauth_authorize = UNSAFE_withComponentProps(function OAuthAuthorizeRoute({
  loaderData: {
    clientId,
    user
  },
  actionData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "mx-auto max-w-md py-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "mb-4 text-2xl font-bold",
      children: "Authorize Application"
    }), /* @__PURE__ */ jsxs("p", {
      className: "mb-4",
      children: [/* @__PURE__ */ jsx("strong", {
        children: "Application:"
      }), " ", clientId]
    }), /* @__PURE__ */ jsxs("p", {
      className: "mb-4",
      children: [/* @__PURE__ */ jsx("strong", {
        children: "User:"
      }), " ", user.email || user.firstName || user.id]
    }), /* @__PURE__ */ jsxs("p", {
      className: "mb-6",
      children: ["This application is requesting ", /* @__PURE__ */ jsx("strong", {
        children: "full access"
      }), " to your account."]
    }), /* @__PURE__ */ jsx(Form, {
      method: "post",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex gap-4",
        children: [/* @__PURE__ */ jsx(Button, {
          type: "submit",
          name: "decision",
          value: "approve",
          variant: "primary",
          children: "Approve"
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          name: "decision",
          value: "deny",
          variant: "danger",
          children: "Deny"
        })]
      })
    }), actionData?.status === "error" ? /* @__PURE__ */ jsx("div", {
      className: "mt-4 rounded border px-4 py-2 text-sm text-red-500",
      children: actionData.message
    }) : null]
  });
});
export {
  action,
  oauth_authorize as default,
  loader
};
