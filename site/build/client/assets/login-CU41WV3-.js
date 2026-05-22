import { UNSAFE_withComponentProps, useNavigate, useRevalidator, Form, Link, redirect, data } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { invariantResponse } from "@epic-web/invariant";
import { WebAuthnAbortService, browserSupportsWebAuthnAutofill, startAuthentication } from "@simplewebauthn/browser";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { z } from "zod";
import { B as Button, L as LinkButton } from "./button-C3vj8DF4.js";
import { b as InputError, L as Label, I as Input } from "./form-elements-DKDR40lU.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { y as PasskeyIcon } from "./icons-DQAXl5Y1.js";
import { H as HeroSection } from "./hero-section-BNEKo3U8.js";
import { P as Paragraph } from "./typography-DBSbiCOF.js";
import { h as images, g as getGenericSocialImage } from "./images-Dyd95Mrb.js";
import { getClientSession } from "./client.server-CTs0DPxN.js";
import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { g as getLoginInfoSession } from "./login.server-Bn92r_Ja.js";
import { w as reuseUsefulLoaderHeaders, m as getOrigin, e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { D as DUMMY_PASSWORD_HASH, v as verifyPassword } from "./password.server-Vw6JZ4hB.js";
import { prisma, migrateHomeworkCompletionsToUser } from "./prisma.server-Cj9LRFmw.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { getSession, getUser } from "./session.server-DZ6f3pgH.js";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "./arrow-button-DsHCk3Gf.js";
import "cloudinary-build-url";
import "emoji-regex";
import "uuid";
import "./env.server-DPCBxZtL.js";
import "date-fns";
import "node:crypto";
import "bcrypt";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
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
async function loader({
  request
}) {
  const user = await getUser(request);
  if (user) return redirect("/me");
  const loginSession = await getLoginInfoSession(request);
  const headers2 = new Headers({
    "Cache-Control": "private, max-age=3600",
    Vary: "Cookie"
  });
  await loginSession.getHeaders(headers2);
  return data({
    email: loginSession.getEmail(),
    error: loginSession.getError(),
    message: loginSession.getMessage()
  }, {
    headers: headers2
  });
}
const headers = reuseUsefulLoaderHeaders;
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  const domain = new URL(getOrigin(requestInfo)).host;
  return getSocialMetas({
    title: `Login to ${domain}`,
    description: `Sign up or login to ${domain} to join a team and learn together.`,
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: images.skis.id,
      words: `Login to your account on ${domain}`
    })
  });
};
async function action({
  request
}) {
  const formData = await request.formData();
  const loginSession = await getLoginInfoSession(request);
  const emailAddress = formData.get("email");
  invariantResponse(typeof emailAddress === "string", "Form submitted incorrectly");
  const email = emailAddress.trim().toLowerCase();
  const password = formData.get("password");
  invariantResponse(typeof password === "string", "Form submitted incorrectly");
  const failedHoneypot = Boolean(formData.get("website"));
  if (failedHoneypot) {
    console.info(`FAILED HONEYPOT ON LOGIN`, {
      website: formData.get("website")
    });
    return redirect(`/login`, {
      headers: await loginSession.getHeaders()
    });
  }
  if (email) loginSession.setEmail(email);
  if (!email.match(/.+@.+/)) {
    loginSession.flashError("A valid email is required");
    return redirect(`/login`, {
      headers: await loginSession.getHeaders()
    });
  }
  if (!password) {
    loginSession.flashError("Password is required");
    return redirect(`/login`, {
      headers: await loginSession.getHeaders()
    });
  }
  const userWithPassword = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true,
      password: {
        select: {
          hash: true
        }
      }
    }
  });
  const passwordHash = userWithPassword?.password?.hash ?? DUMMY_PASSWORD_HASH;
  const isValid = await verifyPassword({
    password,
    hash: passwordHash
  });
  if (!userWithPassword?.password || !isValid) {
    loginSession.flashError('Invalid email or password. If you do not have a password yet, use "Reset password" to set one.');
    return redirect(`/login`, {
      headers: await loginSession.getHeaders()
    });
  }
  const session = await getSession(request);
  await session.signIn({
    id: userWithPassword.id
  });
  const headers2 = new Headers();
  loginSession.clean();
  await loginSession.getHeaders(headers2);
  await session.getHeaders(headers2);
  try {
    const clientSession = await getClientSession(request, null);
    try {
      const clientId = clientSession.getClientId();
      if (clientId) {
        await ensurePrimary();
        await prisma.postRead.updateMany({
          data: {
            userId: userWithPassword.id,
            clientId: null
          },
          where: {
            clientId
          }
        });
        await migrateHomeworkCompletionsToUser({
          userId: userWithPassword.id,
          clientId
        });
      }
    } catch (error) {
      console.error("Failed to migrate client data on login", error);
    }
    clientSession.setUser({});
    await clientSession.getHeaders(headers2);
  } catch (error) {
    console.error("Failed to read client session on login", error);
  }
  return redirect("/me", {
    headers: headers2
  });
}
const AuthenticationOptionsSchema = z.object({
  // Preserve all server-sent fields (rpId, userVerification, timeout, etc.).
  options: z.object({
    challenge: z.string()
  }).passthrough()
});
async function verifyPasskeyWithServer(authResponse, {
  shouldAbort
} = {}) {
  const verificationResponse = await fetch("/resources/webauthn/verify-authentication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authResponse)
  });
  if (shouldAbort?.()) return {
    type: "aborted"
  };
  const verificationJson = await verificationResponse.json().catch(() => {
    return null;
  });
  if (!verificationJson) {
    throw new Error("Failed to verify passkey");
  }
  if (verificationJson.status === "error") {
    throw new Error(verificationJson.error);
  }
  if (!verificationResponse.ok) {
    throw new Error("Failed to verify passkey");
  }
  return {
    type: "success"
  };
}
function Login({
  loaderData: data2
}) {
  const inputRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const navigate = useNavigate();
  const {
    revalidate
  } = useRevalidator();
  const [error, setError] = React.useState();
  const [passkeyMessage, setPasskeyMessage] = React.useState(null);
  const [passkeyAutofillSupported, setPasskeyAutofillSupported] = React.useState(false);
  const [passkeyAutofillResetKey, setPasskeyAutofillResetKey] = React.useState(0);
  const autofillCancelledRef = React.useRef(false);
  const [formValues, setFormValues] = React.useState({
    email: data2.email ?? ""
  });
  const formIsValid = formValues.email.match(/.+@.+/);
  React.useEffect(() => {
    let isMounted = true;
    autofillCancelledRef.current = false;
    async function setupPasskeyAutofill() {
      try {
        const supports = await browserSupportsWebAuthnAutofill();
        if (!supports) return;
        if (!isMounted || autofillCancelledRef.current) return;
        setPasskeyAutofillSupported(true);
        const optionsResponse = await fetch("/resources/webauthn/generate-authentication-options", {
          method: "POST"
        });
        if (!isMounted || autofillCancelledRef.current) return;
        if (!optionsResponse.ok) {
          throw new Error("Failed to generate authentication options");
        }
        const json2 = await optionsResponse.json();
        const {
          options
        } = AuthenticationOptionsSchema.parse(json2);
        if (!isMounted || autofillCancelledRef.current) return;
        const authResponse = await startAuthentication({
          optionsJSON: options,
          useBrowserAutofill: true
        });
        if (!isMounted || autofillCancelledRef.current) return;
        setPasskeyMessage("Verifying your passkey");
        const verificationResult = await verifyPasskeyWithServer(authResponse, {
          shouldAbort: () => !isMounted || autofillCancelledRef.current
        });
        if (verificationResult.type === "aborted") return;
        setPasskeyMessage("Welcome back! Navigating to your account page.");
        void revalidate();
        void navigate("/me");
      } catch (e) {
        if (!isMounted) return;
        if (e instanceof Error && (e.name === "NotAllowedError" || e.name === "AbortError")) {
          return;
        }
        setPasskeyMessage(null);
        console.error(e);
        setError(e instanceof Error ? e.message : "Failed to authenticate with passkey");
      }
    }
    void setupPasskeyAutofill();
    return () => {
      isMounted = false;
      autofillCancelledRef.current = true;
      WebAuthnAbortService.cancelCeremony();
    };
  }, [navigate, passkeyAutofillResetKey, revalidate]);
  async function handlePasskeyLogin() {
    let didSucceed = false;
    try {
      autofillCancelledRef.current = true;
      WebAuthnAbortService.cancelCeremony();
      setError(void 0);
      setPasskeyMessage("Generating Authentication Options");
      const optionsResponse = await fetch("/resources/webauthn/generate-authentication-options", {
        method: "POST"
      });
      if (!optionsResponse.ok) {
        throw new Error("Failed to generate authentication options");
      }
      const json2 = await optionsResponse.json();
      const {
        options
      } = AuthenticationOptionsSchema.parse(json2);
      setPasskeyMessage("Requesting your authorization");
      const authResponse = await startAuthentication({
        optionsJSON: options
      });
      setPasskeyMessage("Verifying your passkey");
      await verifyPasskeyWithServer(authResponse);
      setPasskeyMessage("Welcome back! Navigating to your account page.");
      didSucceed = true;
      void revalidate();
      void navigate("/me");
    } catch (e) {
      setPasskeyMessage(null);
      if (e instanceof Error && (e.name === "NotAllowedError" || e.name === "AbortError")) {
        return;
      }
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to authenticate with passkey");
    } finally {
      if (!didSucceed) {
        setPasskeyAutofillResetKey((key) => key + 1);
      }
    }
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      imageBuilder: images.skis,
      imageSize: "medium",
      title: "Log in to your account.",
      subtitle: "Or sign up for an account.",
      action: /* @__PURE__ */ jsxs("main", {
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mb-8",
          children: [/* @__PURE__ */ jsxs(Button, {
            onClick: handlePasskeyLogin,
            id: "passkey-login-button",
            type: "submit",
            className: "w-full justify-center",
            children: ["Login with Passkey ", /* @__PURE__ */ jsx(PasskeyIcon, {})]
          }), passkeyAutofillSupported ? /* @__PURE__ */ jsx("p", {
            className: "text-secondary mt-2 text-sm",
            children: "Tip: You can also sign in with a passkey from the email field autofill prompt."
          }) : null, error ? /* @__PURE__ */ jsx("div", {
            className: "mt-2",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "passkey-login-error",
              children: error
            })
          }) : null]
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative",
          children: [/* @__PURE__ */ jsxs("div", {
            className: clsx("transition-opacity duration-200", passkeyMessage ? "opacity-0" : "opacity-100"),
            ...passkeyMessage ? {
              inert: true
            } : {},
            children: [/* @__PURE__ */ jsxs("div", {
              className: "relative mb-8",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 flex items-center",
                children: /* @__PURE__ */ jsx("div", {
                  className: "w-full border-t border-gray-300"
                })
              }), /* @__PURE__ */ jsx("div", {
                className: "relative flex justify-center text-sm",
                children: /* @__PURE__ */ jsx("span", {
                  className: "bg-white px-2 text-gray-500",
                  children: "Or continue with email"
                })
              })]
            }), /* @__PURE__ */ jsxs(Form, {
              onChange: (event) => {
                const form = event.currentTarget;
                setFormValues({
                  email: form.email.value
                });
              },
              action: "/login",
              method: "POST",
              className: "mb-10 lg:mb-12",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "mb-6",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "mb-4 flex flex-wrap items-baseline justify-between",
                  children: /* @__PURE__ */ jsx(Label, {
                    htmlFor: "email-address",
                    children: "Email address"
                  })
                }), /* @__PURE__ */ jsx(Input, {
                  ref: inputRef,
                  autoFocus: true,
                  "aria-describedby": data2.error ? "error-message" : "success-message",
                  id: "email-address",
                  name: "email",
                  type: "email",
                  autoComplete: "username webauthn",
                  defaultValue: formValues.email,
                  required: true,
                  placeholder: "Email address"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "mb-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "mb-4 flex flex-wrap items-baseline justify-between",
                  children: [/* @__PURE__ */ jsx(Label, {
                    htmlFor: "password",
                    children: "Password"
                  }), /* @__PURE__ */ jsx(Link, {
                    to: "/forgot-password",
                    prefetch: "intent",
                    className: "underlined text-secondary text-sm focus:outline-none",
                    children: "Reset password"
                  })]
                }), /* @__PURE__ */ jsx(Input, {
                  ref: passwordRef,
                  id: "password",
                  name: "password",
                  type: "password",
                  autoComplete: "current-password",
                  required: true,
                  placeholder: "Password"
                })]
              }), /* @__PURE__ */ jsxs("div", {
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
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-wrap gap-4",
                children: [/* @__PURE__ */ jsx(Button, {
                  type: "submit",
                  children: "Log in"
                }), /* @__PURE__ */ jsx(LinkButton, {
                  type: "reset",
                  onClick: () => {
                    setFormValues({
                      email: ""
                    });
                    inputRef.current?.focus();
                  },
                  children: "Reset"
                })]
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-secondary mt-4 text-sm",
                children: ["Need an account?", " ", /* @__PURE__ */ jsx(Link, {
                  to: "/signup",
                  prefetch: "intent",
                  className: "underlined focus:outline-none",
                  children: "Create one"
                }), "."]
              }), /* @__PURE__ */ jsx("div", {
                className: "sr-only",
                "aria-live": "polite",
                children: formIsValid ? "Sign in form is now valid and ready to submit" : "Sign in form is now invalid."
              }), /* @__PURE__ */ jsx("div", {
                className: "mt-2",
                children: data2.error ? /* @__PURE__ */ jsx(InputError, {
                  id: "error-message",
                  children: data2.error
                }) : data2.message ? /* @__PURE__ */ jsx("p", {
                  id: "success-message",
                  className: "text-lg text-gray-500 dark:text-slate-500",
                  children: data2.message
                }) : null
              })]
            })]
          }), /* @__PURE__ */ jsx(AnimatePresence, {
            children: passkeyMessage ? /* @__PURE__ */ jsx(motion.div, {
              className: "absolute inset-0 flex items-center justify-center",
              initial: {
                opacity: 0,
                y: 10
              },
              animate: {
                opacity: 1,
                y: 0
              },
              exit: {
                opacity: 0,
                y: -10
              },
              transition: {
                duration: 0.2
              },
              children: /* @__PURE__ */ jsx(AnimatePresence, {
                mode: "wait",
                initial: false,
                children: /* @__PURE__ */ jsx(motion.div, {
                  className: "text-center text-lg",
                  initial: {
                    opacity: 0
                  },
                  animate: {
                    opacity: 1
                  },
                  exit: {
                    opacity: 0
                  },
                  transition: {
                    duration: 0.15
                  },
                  "aria-live": "polite",
                  children: passkeyMessage
                }, passkeyMessage)
              })
            }) : null
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(Grid, {
      children: [/* @__PURE__ */ jsxs(Paragraph, {
        className: "col-span-full mb-10 md:col-span-4",
        children: ["To sign in to your account, use your email and password above (or use a passkey if you have set one up). If you do not have a password yet, use", " ", /* @__PURE__ */ jsx(Link, {
          to: "/forgot-password",
          prefetch: "intent",
          className: "underlined focus:outline-none",
          children: "Reset password"
        }), " ", "to set one."]
      }), /* @__PURE__ */ jsxs(Paragraph, {
        className: "col-span-full mb-10 text-sm md:col-span-4 lg:col-start-7",
        prose: false,
        children: [`Tip: this account is a completely different account from your `, /* @__PURE__ */ jsx("a", {
          href: "https://abhidev.com",
          className: "underlined text-yellow-500",
          target: "_blank",
          rel: "noreferrer noopener",
          children: "TestingJavaScript.com"
        }), `, `, /* @__PURE__ */ jsx("a", {
          href: "https://abhidev.com",
          className: "underlined text-blue-500",
          target: "_blank",
          rel: "noreferrer noopener",
          children: "EpicReact.dev"
        }), `, and `, /* @__PURE__ */ jsx("a", {
          href: "https://epicweb.dev",
          className: "underlined text-red-500",
          target: "_blank",
          rel: "noreferrer noopener",
          children: "EpicWeb.dev"
        }), `
            accounts, but I recommend you use the same email address for all of
            them because they all feed into my mailing list.
          `]
      })]
    })]
  });
}
const login = UNSAFE_withComponentProps(Login);
export {
  action,
  login as default,
  handle,
  headers,
  loader,
  meta
};
