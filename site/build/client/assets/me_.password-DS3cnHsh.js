import { UNSAFE_withComponentProps, Form, data, redirect } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { B as Button, a as ButtonLink } from "./button-C3vj8DF4.js";
import { b as InputError, F as Field } from "./form-elements-DKDR40lU.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeaderSection } from "./header-section-B2Ylwupf.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { v as verifyPassword, a as getPasswordStrengthError, g as getPasswordHash } from "./password.server-Vw6JZ4hB.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { requireUser, getSession } from "./session.server-DZ6f3pgH.js";
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
import "node:crypto";
import "bcrypt";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-Bsg0upig.js";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
const handle = {
  getSitemapEntries: () => null
};
async function loader({
  request
}) {
  const user = await requireUser(request);
  const password = await prisma.password.findUnique({
    where: {
      userId: user.id
    },
    select: {
      userId: true
    }
  });
  return data({
    hasPassword: Boolean(password)
  });
}
async function action({
  request
}) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const currentPassword = formData.get("currentPassword");
  const password = typeof formData.get("password") === "string" ? String(formData.get("password")) : "";
  const confirmPassword = typeof formData.get("confirmPassword") === "string" ? String(formData.get("confirmPassword")) : "";
  const existingPassword = await prisma.password.findUnique({
    where: {
      userId: user.id
    },
    select: {
      hash: true
    }
  });
  if (existingPassword) {
    if (typeof currentPassword !== "string" || !currentPassword) {
      return data({
        status: "error",
        errors: {
          currentPassword: "Current password is required"
        }
      }, 400);
    }
    const ok = await verifyPassword({
      password: currentPassword,
      hash: existingPassword.hash
    });
    if (!ok) {
      return data({
        status: "error",
        errors: {
          currentPassword: "Current password is incorrect"
        }
      }, 400);
    }
  }
  const passwordError = await getPasswordStrengthError(password);
  const confirmPasswordError = (() => {
    if (!confirmPassword) return "Confirm your password";
    if (confirmPassword !== password) return "Passwords must match";
    return null;
  })();
  if (passwordError || confirmPasswordError) {
    return data({
      status: "error",
      errors: {
        password: passwordError,
        confirmPassword: confirmPasswordError
      }
    }, 400);
  }
  const passwordHash = await getPasswordHash(password);
  await ensurePrimary();
  await prisma.$transaction([
    prisma.password.upsert({
      where: {
        userId: user.id
      },
      update: {
        hash: passwordHash
      },
      create: {
        userId: user.id,
        hash: passwordHash
      }
    }),
    // Invalidate all sessions (including this one) after a password change.
    prisma.session.deleteMany({
      where: {
        userId: user.id
      }
    })
  ]);
  const session = await getSession(request);
  await session.signIn({
    id: user.id
  });
  const headers = new Headers();
  await session.getHeaders(headers);
  return redirect(`/me?message=${encodeURIComponent("✅ Password updated")}`, {
    headers
  });
}
const me__password = UNSAFE_withComponentProps(function PasswordRoute({
  loaderData: data2,
  actionData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "mt-24 pt-6",
    children: [/* @__PURE__ */ jsx(HeaderSection, {
      as: "header",
      title: data2.hasPassword ? "Change your password." : "Set a password.",
      subTitle: "Passwords are used to log in on new devices.",
      className: "mb-16"
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Grid, {
        children: /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-6",
          children: [actionData?.status === "error" && actionData.errors.generalError ? /* @__PURE__ */ jsx("div", {
            className: "mb-8",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "password-general-error",
              children: actionData.errors.generalError
            })
          }) : null, /* @__PURE__ */ jsxs(Form, {
            method: "POST",
            noValidate: true,
            className: "mb-8",
            children: [data2.hasPassword ? /* @__PURE__ */ jsx(Field, {
              name: "currentPassword",
              label: "Current password",
              type: "password",
              autoComplete: "current-password",
              error: actionData?.status === "error" ? actionData.errors.currentPassword : null
            }) : null, /* @__PURE__ */ jsx(Field, {
              name: "password",
              label: "New password",
              type: "password",
              autoComplete: "new-password",
              error: actionData?.status === "error" ? actionData.errors.password : null
            }), /* @__PURE__ */ jsx(Field, {
              name: "confirmPassword",
              label: "Confirm password",
              type: "password",
              autoComplete: "new-password",
              error: actionData?.status === "error" ? actionData.errors.confirmPassword : null
            }), /* @__PURE__ */ jsx(Button, {
              type: "submit",
              children: data2.hasPassword ? "Update password" : "Set password"
            })]
          }), /* @__PURE__ */ jsx(ButtonLink, {
            to: "/me",
            variant: "secondary",
            children: "Back to account"
          }), /* @__PURE__ */ jsx(Spacer, {
            size: "2xs"
          })]
        })
      })
    })]
  });
});
export {
  action,
  me__password as default,
  handle,
  loader
};
