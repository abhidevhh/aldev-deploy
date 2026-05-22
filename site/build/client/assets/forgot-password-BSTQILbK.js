import { UNSAFE_withComponentProps, Form, redirect, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { invariantResponse } from "@epic-web/invariant";
import { B as Button, a as ButtonLink } from "./button-C3vj8DF4.js";
import { b as InputError, F as Field } from "./form-elements-DKDR40lU.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeaderSection } from "./header-section-B2Ylwupf.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { g as getLoginInfoSession } from "./login.server-Bn92r_Ja.js";
import { c as createAndSendPasswordResetVerificationEmail } from "./password-reset.server-DJd8lzeX.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { getUser } from "./session.server-DZ6f3pgH.js";
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
import "./arrow-button-DsHCk3Gf.js";
import "framer-motion";
import "./icons-DQAXl5Y1.js";
import "./typography-DBSbiCOF.js";
import "./env.server-DPCBxZtL.js";
import "zod";
import "litefs-js";
import "litefs-js/remix";
import "./send-email.server-ClI4Nqgs.js";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "./verification.server-37ZpL8eZ.js";
import "node:crypto";
import "bcrypt";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
const handle = {
  getSitemapEntries: () => null
};
const meta = () => {
  return [{
    title: "Forgot password"
  }];
};
async function loader({
  request
}) {
  const user = await getUser(request);
  if (user) return redirect("/me");
  const loginSession = await getLoginInfoSession(request);
  return data({
    email: loginSession.getEmail() ?? "",
    error: loginSession.getError(),
    message: loginSession.getMessage()
  }, {
    headers: await loginSession.getHeaders()
  });
}
async function action({
  request
}) {
  const loginSession = await getLoginInfoSession(request);
  const formData = await request.formData();
  const emailAddress = formData.get("email");
  invariantResponse(typeof emailAddress === "string", "Form submitted incorrectly");
  const email = emailAddress.trim().toLowerCase();
  const failedHoneypot = Boolean(formData.get("website"));
  if (failedHoneypot) {
    console.info(`FAILED HONEYPOT ON FORGOT PASSWORD`, {
      website: formData.get("website")
    });
    return redirect("/forgot-password", {
      headers: await loginSession.getHeaders()
    });
  }
  if (email) loginSession.setEmail(email);
  if (!email.match(/.+@.+/)) {
    loginSession.flashError("A valid email is required");
    return redirect("/forgot-password", {
      headers: await loginSession.getHeaders()
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true,
      team: true
    }
  });
  if (user) {
    await createAndSendPasswordResetVerificationEmail({
      emailAddress: email,
      team: user.team,
      request
    });
  }
  loginSession.flashMessage("If an account exists for that email, you will receive a password reset email shortly.");
  return redirect("/reset-password", {
    headers: await loginSession.getHeaders()
  });
}
const forgotPassword = UNSAFE_withComponentProps(function ForgotPassword({
  loaderData: data2
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "mt-24 pt-6",
    children: [/* @__PURE__ */ jsx(HeaderSection, {
      as: "header",
      title: "Set or reset your password.",
      subTitle: "We'll email you a verification code.",
      className: "mb-16"
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Grid, {
        children: /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-6",
          children: [data2.error ? /* @__PURE__ */ jsx("div", {
            className: "mb-8",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "forgot-password-error",
              children: data2.error
            })
          }) : null, data2.message ? /* @__PURE__ */ jsx("p", {
            className: "text-secondary mb-8 text-lg",
            children: data2.message
          }) : null, /* @__PURE__ */ jsxs(Form, {
            method: "POST",
            noValidate: true,
            children: [/* @__PURE__ */ jsx(Field, {
              name: "email",
              label: "Email",
              type: "email",
              autoComplete: "email",
              defaultValue: data2.email
            }), /* @__PURE__ */ jsxs("div", {
              "aria-hidden": "true",
              style: {
                position: "absolute",
                left: "-9999px"
              },
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "website-field",
                children: "Website"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                id: "website-field",
                name: "website",
                tabIndex: -1,
                autoComplete: "off"
              })]
            }), /* @__PURE__ */ jsx(Button, {
              type: "submit",
              children: "Email me a reset code"
            })]
          }), /* @__PURE__ */ jsx(Spacer, {
            size: "2xs"
          }), /* @__PURE__ */ jsx(ButtonLink, {
            to: "/login",
            variant: "secondary",
            children: "Back to login"
          })]
        })
      })
    })]
  });
});
export {
  action,
  forgotPassword as default,
  handle,
  loader,
  meta
};
