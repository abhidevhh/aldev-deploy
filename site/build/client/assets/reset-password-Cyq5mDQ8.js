import { UNSAFE_withComponentProps, Form, redirect, data } from "react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { invariantResponse } from "@epic-web/invariant";
import { a as Button, B as ButtonLink } from "./button-B-8RrXF2.js";
import { I as InputError, F as Field } from "./form-elements-D3OfaKUp.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeaderSection } from "./header-section-BSZTMYmt.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { getClientSession } from "./client.server-CTs0DPxN.js";
import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { g as getLoginInfoSession } from "./login.server-Bn92r_Ja.js";
import { c as createAndSendPasswordResetVerificationEmail } from "./password-reset.server-BFMIxS5R.js";
import { g as getPasswordStrengthError, a as getPasswordHash } from "./password.server-trgexp8K.js";
import { prisma, migrateHomeworkCompletionsToUser } from "./prisma.server-MnXt9BdG.js";
import { getSession, getUser } from "./session.server-BVOCbXUc.js";
import { a as consumeVerificationForTarget, b as consumeVerification } from "./verification.server-ghiM7c58.js";
import "clsx";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./misc-DM3BUXHg.js";
import "date-fns";
import "./arrow-button-DBVn13Kl.js";
import "framer-motion";
import "./icons-Xl-Om4A1.js";
import "./typography-DDpAXXrz.js";
import "uuid";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./send-email.server-BOafejnl.js";
import "./markdown.server-C6vYtRmU.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "node:crypto";
import "bcrypt";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
const handle = {
  getSitemapEntries: () => null
};
const meta = () => {
  return [{
    title: "Reset password"
  }];
};
const actionIds = {
  verify: "verify",
  reset: "reset",
  resend: "resend",
  cancel: "cancel"
};
async function loader({
  request
}) {
  const user = await getUser(request);
  if (user) return redirect("/me");
  const loginSession = await getLoginInfoSession(request);
  const url = new URL(request.url);
  const verificationId = url.searchParams.get("verification");
  const code = url.searchParams.get("code");
  if (verificationId && code) {
    const result = await consumeVerification({
      id: verificationId,
      code,
      type: "PASSWORD_RESET"
    });
    if (result) {
      loginSession.setResetPasswordEmail(result.target);
      loginSession.setEmail(result.target);
      loginSession.flashMessage("Verification successful. Choose a password.");
      return redirect("/reset-password", {
        headers: await loginSession.getHeaders()
      });
    }
    loginSession.flashError("Verification link invalid or expired. Please request a new one.");
    return redirect("/reset-password", {
      headers: await loginSession.getHeaders()
    });
  }
  const resetEmail = loginSession.getResetPasswordEmail();
  let hasPassword = null;
  if (resetEmail) {
    const userRecord = await prisma.user.findUnique({
      where: {
        email: resetEmail
      },
      select: {
        password: {
          select: {
            userId: true
          }
        }
      }
    });
    hasPassword = Boolean(userRecord?.password);
  }
  return data({
    step: resetEmail ? "set-password" : "verify",
    email: resetEmail ?? loginSession.getEmail() ?? "",
    error: loginSession.getError(),
    message: loginSession.getMessage(),
    hasPassword
  }, {
    headers: await loginSession.getHeaders()
  });
}
async function action({
  request
}) {
  const loginSession = await getLoginInfoSession(request);
  const formData = await request.formData();
  const actionId = formData.get("actionId");
  if (actionId === actionIds.cancel) {
    loginSession.clean();
    return redirect("/login", {
      headers: await loginSession.getHeaders()
    });
  }
  if (actionId === actionIds.resend) {
    const emailAddress = formData.get("email");
    invariantResponse(typeof emailAddress === "string", "Form submitted incorrectly");
    const email = emailAddress.trim().toLowerCase();
    if (email) loginSession.setEmail(email);
    if (!email.match(/.+@.+/)) {
      loginSession.flashError("A valid email is required");
      return redirect("/reset-password", {
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
  if (actionId === actionIds.verify) {
    const emailAddress = formData.get("email");
    const code = formData.get("code");
    invariantResponse(typeof emailAddress === "string", "Form submitted incorrectly");
    invariantResponse(typeof code === "string", "Form submitted incorrectly");
    const email = emailAddress.trim().toLowerCase();
    if (email) loginSession.setEmail(email);
    if (!email.match(/.+@.+/)) {
      return data({
        status: "error",
        errors: {
          email: "A valid email is required"
        }
      }, 400);
    }
    if (!code) {
      return data({
        status: "error",
        errors: {
          code: "Verification code is required"
        }
      }, 400);
    }
    const result = await consumeVerificationForTarget({
      target: email,
      code,
      type: "PASSWORD_RESET"
    });
    if (!result) {
      return data({
        status: "error",
        errors: {
          generalError: "Verification code invalid or expired. Please request a new one."
        }
      }, 400);
    }
    loginSession.setResetPasswordEmail(result.target);
    loginSession.setEmail(result.target);
    loginSession.flashMessage("Verification successful. Choose a password.");
    return redirect("/reset-password", {
      headers: await loginSession.getHeaders()
    });
  }
  const resetEmail = loginSession.getResetPasswordEmail();
  if (!resetEmail) {
    loginSession.flashError("Verify your email before resetting your password.");
    return redirect("/reset-password", {
      headers: await loginSession.getHeaders()
    });
  }
  if (actionId !== actionIds.reset) {
    loginSession.flashError("Something went wrong. Please try again.");
    return redirect("/reset-password", {
      headers: await loginSession.getHeaders()
    });
  }
  const passwordEntry = formData.get("password");
  const password = typeof passwordEntry === "string" ? passwordEntry : "";
  const confirmPassword = typeof formData.get("confirmPassword") === "string" ? String(formData.get("confirmPassword")) : "";
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
  const userRecord = await prisma.user.findUnique({
    where: {
      email: resetEmail
    },
    select: {
      id: true
    }
  });
  if (!userRecord) {
    loginSession.clean();
    loginSession.flashError("No account found for that email. Create one instead.");
    return redirect("/signup", {
      headers: await loginSession.getHeaders()
    });
  }
  const passwordHash = await getPasswordHash(password);
  await ensurePrimary();
  await prisma.$transaction([
    prisma.password.upsert({
      where: {
        userId: userRecord.id
      },
      update: {
        hash: passwordHash
      },
      create: {
        userId: userRecord.id,
        hash: passwordHash
      }
    }),
    // Sign out everywhere on password reset.
    prisma.session.deleteMany({
      where: {
        userId: userRecord.id
      }
    })
  ]);
  const session = await getSession(request);
  await session.signIn({
    id: userRecord.id
  });
  const headers = new Headers();
  loginSession.clean();
  await loginSession.getHeaders(headers);
  await session.getHeaders(headers);
  try {
    const clientSession = await getClientSession(request, null);
    try {
      const clientId = clientSession.getClientId();
      if (clientId) {
        await ensurePrimary();
        await prisma.postRead.updateMany({
          data: {
            userId: userRecord.id,
            clientId: null
          },
          where: {
            clientId
          }
        });
        await migrateHomeworkCompletionsToUser({
          userId: userRecord.id,
          clientId
        });
      }
    } catch (error) {
      console.error("Failed to migrate client data on password reset", error);
    }
    clientSession.setUser({});
    await clientSession.getHeaders(headers);
  } catch (error) {
    console.error("Failed to read client session on password reset", error);
  }
  return redirect("/me", {
    headers
  });
}
const resetPassword = UNSAFE_withComponentProps(function ResetPassword({
  loaderData: data2,
  actionData
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "mt-24 pt-6",
    children: [/* @__PURE__ */ jsx(HeaderSection, {
      as: "header",
      title: data2.step === "verify" ? "Set or reset your password." : data2.hasPassword ? "Choose a new password." : "Choose a password.",
      subTitle: data2.step === "verify" ? "Use the code from your email." : data2.hasPassword ? "Choose a new password." : "Choose a password.",
      className: "mb-16"
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Grid, {
        children: /* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-6",
          children: [data2.error ? /* @__PURE__ */ jsx("div", {
            className: "mb-8",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "reset-password-error",
              children: data2.error
            })
          }) : null, actionData?.status === "error" && actionData.errors.generalError ? /* @__PURE__ */ jsx("div", {
            className: "mb-8",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "reset-password-general-error",
              children: actionData.errors.generalError
            })
          }) : null, data2.message ? /* @__PURE__ */ jsx("p", {
            className: "text-secondary mb-8 text-lg",
            children: data2.message
          }) : null, data2.step === "verify" ? /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsxs(Form, {
              method: "POST",
              noValidate: true,
              className: "mb-8",
              children: [/* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "actionId",
                value: actionIds.verify
              }), /* @__PURE__ */ jsx(Field, {
                name: "email",
                label: "Email",
                type: "email",
                autoComplete: "email",
                defaultValue: data2.email,
                error: actionData?.status === "error" ? actionData.errors.email : null
              }), /* @__PURE__ */ jsx(Field, {
                name: "code",
                label: "Verification code",
                type: "text",
                autoComplete: "one-time-code",
                placeholder: "123456",
                error: actionData?.status === "error" ? actionData.errors.code : null
              }), /* @__PURE__ */ jsx(Button, {
                type: "submit",
                children: "Verify code"
              })]
            }), /* @__PURE__ */ jsxs(Form, {
              method: "POST",
              noValidate: true,
              className: "mb-8",
              children: [/* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "actionId",
                value: actionIds.resend
              }), /* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "email",
                value: data2.email
              }), /* @__PURE__ */ jsx(Button, {
                type: "submit",
                variant: "secondary",
                children: "Resend email"
              })]
            }), /* @__PURE__ */ jsx(ButtonLink, {
              to: "/forgot-password",
              variant: "secondary",
              children: "Back"
            })]
          }) : /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsxs(Form, {
              method: "POST",
              noValidate: true,
              className: "mb-8",
              children: [/* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "actionId",
                value: actionIds.reset
              }), /* @__PURE__ */ jsx(Field, {
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
                children: "Set new password"
              })]
            }), /* @__PURE__ */ jsxs(Form, {
              method: "POST",
              children: [/* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "actionId",
                value: actionIds.cancel
              }), /* @__PURE__ */ jsx(Button, {
                type: "submit",
                variant: "secondary",
                children: "Cancel"
              })]
            })]
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
  resetPassword as default,
  handle,
  loader,
  meta
};
//# sourceMappingURL=reset-password-Cyq5mDQ8.js.map
