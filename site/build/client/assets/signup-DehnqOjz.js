import { UNSAFE_withComponentProps, Form, redirect, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import * as React from "react";
import { B as Button, a as ButtonLink } from "./button-C3vj8DF4.js";
import { b as InputError, F as Field } from "./form-elements-DKDR40lU.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { C as CheckCircledIcon } from "./icons-DQAXl5Y1.js";
import { H as HeaderSection } from "./header-section-B2Ylwupf.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { a as H2, e as H6, P as Paragraph } from "./typography-DBSbiCOF.js";
import { d as getImgProps, h as images } from "./images-Dyd95Mrb.js";
import { t as tagKCDSiteSubscriber } from "./user-info.server-D6axXZ8Q.js";
import "lodash/groupBy.js";
import "lodash/isEqual.js";
import "lodash/omit.js";
import "lodash/orderBy.js";
import "lodash/pick.js";
import shuffle from "lodash/shuffle.js";
import "lodash/sortBy.js";
import { getClientSession } from "./client.server-CTs0DPxN.js";
import "litefs-js";
import { ensurePrimary } from "litefs-js/remix";
import { g as getLoginInfoSession } from "./login.server-Bn92r_Ja.js";
import { z as teams, r as isTeam, h as getDomainUrl, q as isResponse, j as getErrorStack } from "./misc-CQO4K9rH.js";
import { T as TEAM_ONEWHEELING_MAP, b as TEAM_SNOWBOARD_MAP, a as TEAM_SKIING_MAP } from "./onboarding-C_WpLW5E.js";
import { g as getPasswordHash, a as getPasswordStrengthError } from "./password.server-Vw6JZ4hB.js";
import { prisma, migrateHomeworkCompletionsToUser } from "./prisma.server-Cj9LRFmw.js";
import { b as sendSignupVerificationEmail } from "./send-email.server-ClI4Nqgs.js";
import { getSession, getUser } from "./session.server-DZ6f3pgH.js";
import { y as useTeam } from "./root-XTBE-Fp5.js";
import { b as createVerification, c as consumeVerification, a as consumeVerificationForTarget } from "./verification.server-37ZpL8eZ.js";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "./arrow-button-DsHCk3Gf.js";
import "framer-motion";
import "cloudinary-build-url";
import "emoji-regex";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "./timing.server-Ckj1L-xw.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "uuid";
import "date-fns";
import "node:crypto";
import "bcrypt";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-Bsg0upig.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
import "@tanstack/react-hotkeys";
import "spin-delay";
import "@reach/dialog";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "mdx-bundler/client/index.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "cookie";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./promotification-YMEmucWd.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./hero-section-BNEKo3U8.js";
const handle = {
  getSitemapEntries: () => null
};
function getErrorForFirstName(name) {
  if (!name) return `Name is required`;
  if (name.length > 60) return `Name is too long`;
  return null;
}
function getErrorForTeam(team) {
  if (!team) return `Team is required`;
  if (!isTeam(team)) return `Please choose a valid team`;
  return null;
}
async function getErrorForPassword(password) {
  return getPasswordStrengthError(password ?? "");
}
const actionIds = {
  cancel: "cancel",
  requestCode: "request code",
  verifyCode: "verify code",
  signUp: "sign up"
};
async function action({
  request
}) {
  const loginInfoSession = await getLoginInfoSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const actionId = form.get("actionId");
  if (actionId === actionIds.cancel) {
    loginInfoSession.clean();
    return redirect("/", {
      headers: await loginInfoSession.getHeaders()
    });
  }
  if (actionId === actionIds.requestCode) {
    const emailAddress = form.get("email");
    const email = typeof emailAddress === "string" ? emailAddress.trim().toLowerCase() : "";
    if (email) loginInfoSession.setEmail(email);
    if (!email.match(/.+@.+/)) {
      loginInfoSession.flashError("A valid email is required");
      return redirect("/signup", {
        headers: await loginInfoSession.getHeaders()
      });
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        id: true
      }
    });
    if (userExists) {
      loginInfoSession.flashMessage("An account already exists for that email. Log in instead (or reset your password).");
      return redirect("/login", {
        headers: await loginInfoSession.getHeaders()
      });
    }
    const {
      verification,
      code
    } = await createVerification({
      type: "SIGNUP",
      target: email
    });
    const domainUrl = getDomainUrl(request);
    const verificationUrl = new URL("/signup", domainUrl);
    verificationUrl.searchParams.set("verification", verification.id);
    verificationUrl.searchParams.set("code", code);
    try {
      await sendSignupVerificationEmail({
        emailAddress: email,
        verificationCode: code,
        verificationUrl: verificationUrl.toString(),
        domainUrl
      });
    } catch (error) {
      if (isResponse(error)) throw error;
      try {
        await ensurePrimary();
        await prisma.verification.delete({
          where: {
            id: verification.id
          }
        });
      } catch (cleanupError) {
        console.error("Failed to cleanup verification after email send failure", cleanupError);
      }
      console.error("Failed to send signup verification email", error);
      loginInfoSession.flashError("Unable to send verification email right now. Please try again.");
      return redirect("/signup", {
        headers: await loginInfoSession.getHeaders()
      });
    }
    loginInfoSession.flashMessage(`Verification code sent to ${email}.`);
    return redirect(`/signup?verification=${verification.id}`, {
      headers: await loginInfoSession.getHeaders()
    });
  }
  if (actionId === actionIds.verifyCode) {
    const verificationId = form.get("verificationId");
    const code = form.get("code");
    if (typeof code !== "string" || !code) {
      loginInfoSession.flashError("Verification code required");
      return redirect("/signup", {
        headers: await loginInfoSession.getHeaders()
      });
    }
    const result = typeof verificationId === "string" && verificationId ? await consumeVerification({
      id: verificationId,
      code,
      type: "SIGNUP"
    }) : await consumeVerificationForTarget({
      target: (form.get("email") ?? loginInfoSession.getEmail() ?? "").toString().trim().toLowerCase(),
      code,
      type: "SIGNUP"
    });
    if (!result) {
      loginInfoSession.flashError("Verification code invalid or expired. Please request a new one.");
      return redirect(typeof verificationId === "string" && verificationId ? `/signup?verification=${verificationId}` : "/signup", {
        headers: await loginInfoSession.getHeaders()
      });
    }
    loginInfoSession.setSignupEmail(result.target);
    loginInfoSession.setEmail(result.target);
    loginInfoSession.flashMessage("Email verified. Finish creating your account.");
    return redirect("/signup", {
      headers: await loginInfoSession.getHeaders()
    });
  }
  const signupEmail = loginInfoSession.getSignupEmail();
  if (!signupEmail) {
    loginInfoSession.flashError("Verify your email first to create an account.");
    return redirect("/signup", {
      headers: await loginInfoSession.getHeaders()
    });
  }
  const firstName = form.get("firstName");
  const team = form.get("team");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");
  const errors = {
    firstName: getErrorForFirstName(typeof firstName === "string" ? firstName : null),
    team: getErrorForTeam(typeof team === "string" ? team : null),
    password: await getErrorForPassword(typeof password === "string" ? password : null),
    confirmPassword: (() => {
      if (typeof confirmPassword !== "string" || !confirmPassword) {
        return "Confirm your password";
      }
      if (confirmPassword !== password) return "Passwords must match";
      return null;
    })()
  };
  if (Object.values(errors).some((e) => e !== null)) {
    return data({
      status: "error",
      fields: {
        firstName: typeof firstName === "string" ? firstName : null,
        team: typeof team === "string" && isTeam(team) ? team : null
      },
      errors: {
        ...errors
      }
    }, 400);
  }
  try {
    const safeFirstName = String(firstName).trim();
    const safeTeam = team;
    const safePassword = String(password);
    const passwordHash = await getPasswordHash(safePassword);
    await ensurePrimary();
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email: signupEmail,
          firstName: safeFirstName,
          team: safeTeam,
          password: {
            create: {
              hash: passwordHash
            }
          }
        },
        select: {
          id: true
        }
      });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
        loginInfoSession.clean();
        loginInfoSession.flashMessage("An account already exists for that email. Log in instead (or reset your password).");
        return redirect("/login", {
          headers: await loginInfoSession.getHeaders()
        });
      }
      throw error;
    }
    void tagKCDSiteSubscriber({
      email: signupEmail,
      firstName: safeFirstName,
      fields: {
        kcd_team: safeTeam,
        kcd_site_id: user.id
      }
    }).then(async (sub) => {
      await ensurePrimary();
      await prisma.user.update({
        data: {
          kitId: String(sub.id)
        },
        where: {
          id: user.id
        }
      });
    }).catch((error) => {
      console.error("Failed to tag subscriber on signup", error);
    });
    let session;
    try {
      session = await getSession(request);
      await session.signIn(user);
    } catch (error) {
      if (isResponse(error)) throw error;
      console.error("Signup succeeded but auto-login failed", error);
      loginInfoSession.unsetSignupEmail();
      loginInfoSession.flashMessage("Your account was created. Please log in to continue.");
      return redirect("/login", {
        headers: await loginInfoSession.getHeaders()
      });
    }
    let clientSession = null;
    try {
      clientSession = await getClientSession(request, null);
      const clientId = clientSession.getClientId();
      if (clientId) {
        await ensurePrimary();
        await prisma.postRead.updateMany({
          data: {
            userId: user.id,
            clientId: null
          },
          where: {
            clientId
          }
        });
        await migrateHomeworkCompletionsToUser({
          userId: user.id,
          clientId
        });
      }
      clientSession.setUser({});
    } catch (error) {
      console.error("Failed to migrate client data on signup", error);
    }
    const headers = new Headers();
    await session.getHeaders(headers);
    if (clientSession) await clientSession.getHeaders(headers);
    loginInfoSession.clean();
    await loginInfoSession.getHeaders(headers);
    return redirect("/me", {
      headers
    });
  } catch (error) {
    if (isResponse(error)) throw error;
    console.error(getErrorStack(error));
    return data({
      status: "error",
      fields: {
        firstName: typeof firstName === "string" ? firstName : null,
        team: typeof team === "string" && isTeam(team) ? team : null
      },
      errors: {
        firstName: null,
        team: null,
        password: null,
        confirmPassword: null,
        generalError: "There was a problem creating your account. Please try again."
      }
    }, 500);
  }
}
async function loader({
  request
}) {
  const user = await getUser(request);
  if (user) return redirect("/me");
  const loginInfoSession = await getLoginInfoSession(request);
  const url = new URL(request.url);
  const verificationId = url.searchParams.get("verification");
  const code = url.searchParams.get("code");
  if (verificationId && code) {
    const result = await consumeVerification({
      id: verificationId,
      code,
      type: "SIGNUP"
    });
    if (result) {
      loginInfoSession.setSignupEmail(result.target);
      loginInfoSession.setEmail(result.target);
      loginInfoSession.flashMessage("Email verified. Finish creating your account.");
      return redirect("/signup", {
        headers: await loginInfoSession.getHeaders()
      });
    }
    loginInfoSession.flashError("Verification link invalid or expired. Please request a new one.");
    return redirect("/signup", {
      headers: await loginInfoSession.getHeaders()
    });
  }
  const signupEmail = loginInfoSession.getSignupEmail();
  const email = loginInfoSession.getEmail();
  const error = loginInfoSession.getError();
  const message = loginInfoSession.getMessage();
  if (!signupEmail) {
    return data({
      step: "verify",
      email: email ?? "",
      error,
      message,
      verificationId
    }, {
      headers: await loginInfoSession.getHeaders()
    });
  }
  const userExists = await prisma.user.findUnique({
    where: {
      email: signupEmail
    },
    select: {
      id: true
    }
  });
  if (userExists) {
    loginInfoSession.unsetSignupEmail();
    loginInfoSession.flashMessage("An account already exists for that email. Log in instead (or reset your password).");
    return redirect("/login", {
      headers: await loginInfoSession.getHeaders()
    });
  }
  const activities = ["skiing", "snowboarding", "onewheeling"];
  const activity = activities[Math.floor(Math.random() * activities.length)] ?? "skiing";
  return data({
    step: "onboarding",
    email: signupEmail,
    error,
    message,
    // have to put this shuffle in the loader to ensure server render is the same as the client one.
    teamsInOrder: shuffle(teams),
    teamMap: activity
  }, {
    headers: await loginInfoSession.getHeaders()
  });
}
function TeamOption({
  teamMap,
  team: value,
  error,
  selected
}) {
  const team = {
    skiing: TEAM_SKIING_MAP,
    snowboarding: TEAM_SNOWBOARD_MAP,
    onewheeling: TEAM_ONEWHEELING_MAP
  }[teamMap][value];
  const {
    className: teamImageClassName,
    ...teamImageProps
  } = getImgProps(team.image, {
    className: "mx-auto mb-2 block h-16 w-16 object-contain sm:h-20 sm:w-20 lg:mb-16 lg:h-auto lg:w-auto",
    widths: [64, 80, 96, 128, 160, 256, 320, 350, 512, 685, 1370],
    sizes: ["(max-width: 479px) 64px", "(min-width: 480px) and (max-width: 1023px) 80px", "(min-width:1024px) and (max-width:1620px) 20vw", "320px"]
  });
  return /* @__PURE__ */ jsxs("div", {
    className: clsx("focus-ring relative rounded-lg bg-gray-100 lg:col-span-4 dark:bg-gray-800", team.focusClassName, {
      "ring-2": selected
    }),
    children: [selected ? /* @__PURE__ */ jsx("span", {
      className: "text-team-current absolute top-2 left-2 lg:top-9 lg:left-9",
      children: /* @__PURE__ */ jsx(CheckCircledIcon, {
        size: 28
      })
    }) : null, /* @__PURE__ */ jsxs("label", {
      className: "flex cursor-pointer flex-col items-center justify-center px-1 py-3 text-center sm:px-2 lg:block lg:px-12 lg:pt-20 lg:pb-12",
      children: [/* @__PURE__ */ jsx("input", {
        className: "sr-only",
        type: "radio",
        name: "team",
        value,
        "aria-describedby": error ? "team-error" : void 0
      }), /* @__PURE__ */ jsx("img", {
        ...teamImageProps,
        alt: "",
        "aria-hidden": "true",
        className: teamImageClassName
      }), /* @__PURE__ */ jsxs("span", {
        className: "text-sm leading-none font-medium text-black lg:text-lg dark:text-white",
        children: [/* @__PURE__ */ jsx("span", {
          className: "lg:hidden",
          "aria-hidden": "true",
          children: team.label.replace(" Team", "")
        }), /* @__PURE__ */ jsx("span", {
          className: "sr-only lg:hidden",
          children: team.label
        }), /* @__PURE__ */ jsx("span", {
          className: "hidden lg:inline",
          children: team.label
        })]
      })]
    })]
  });
}
const signup = UNSAFE_withComponentProps(function NewAccount({
  loaderData: data2,
  actionData
}) {
  const [, setTeam] = useTeam();
  const [formValues, setFormValues] = React.useState({
    firstName: "",
    team: void 0,
    password: "",
    confirmPassword: ""
  });
  const team = formValues.team;
  React.useEffect(() => {
    if (team && teams.includes(team)) setTeam(team);
  }, [team, setTeam]);
  const passwordIsValid = formValues.password.length >= 8 && formValues.password === formValues.confirmPassword;
  const formIsValid = formValues.firstName.trim().length > 0 && formValues.team !== void 0 && passwordIsValid;
  if (data2.step === "verify") {
    return /* @__PURE__ */ jsxs("div", {
      className: "mt-24 pt-6",
      children: [/* @__PURE__ */ jsx(HeaderSection, {
        as: "header",
        title: "Create your account.",
        subTitle: "We'll email you a verification code.",
        className: "mb-16"
      }), /* @__PURE__ */ jsx("main", {
        children: /* @__PURE__ */ jsx(Grid, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "col-span-full lg:col-span-6",
            children: [data2.error ? /* @__PURE__ */ jsx("div", {
              className: "mb-8",
              children: /* @__PURE__ */ jsx(InputError, {
                id: "signup-error",
                children: data2.error
              })
            }) : null, data2.message ? /* @__PURE__ */ jsx("p", {
              className: "text-secondary mb-8 text-lg",
              children: data2.message
            }) : null, /* @__PURE__ */ jsxs(Form, {
              method: "POST",
              noValidate: true,
              className: "mb-12",
              children: [/* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "actionId",
                value: actionIds.requestCode
              }), /* @__PURE__ */ jsx(Field, {
                name: "email",
                label: "Email",
                type: "email",
                autoComplete: "email",
                defaultValue: data2.email
              }), /* @__PURE__ */ jsx(Button, {
                type: "submit",
                children: "Email me a code"
              })]
            }), data2.email.match(/.+@.+/) ? /* @__PURE__ */ jsxs(Form, {
              method: "POST",
              noValidate: true,
              className: "mb-12",
              children: [/* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "actionId",
                value: actionIds.verifyCode
              }), /* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "email",
                value: data2.email
              }), data2.verificationId ? /* @__PURE__ */ jsx("input", {
                type: "hidden",
                name: "verificationId",
                value: data2.verificationId
              }) : null, /* @__PURE__ */ jsx(Field, {
                name: "code",
                label: "Verification code",
                type: "text",
                autoComplete: "one-time-code",
                placeholder: "123456"
              }), /* @__PURE__ */ jsx(Button, {
                type: "submit",
                children: "Verify code"
              })]
            }) : null, /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap gap-4",
              children: [/* @__PURE__ */ jsx(ButtonLink, {
                to: "/login",
                variant: "secondary",
                children: "Back to login"
              }), /* @__PURE__ */ jsxs(Form, {
                method: "POST",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "hidden",
                  name: "actionId",
                  value: actionIds.cancel
                }), /* @__PURE__ */ jsx(Button, {
                  type: "submit",
                  variant: "danger",
                  children: "Cancel"
                })]
              })]
            })]
          })
        })
      })]
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "mt-24 pt-6",
    children: [/* @__PURE__ */ jsx(HeaderSection, {
      as: "header",
      title: "Let's start with choosing a team.",
      subTitle: "You can't change this later.",
      className: "mb-16"
    }), /* @__PURE__ */ jsxs("main", {
      children: [/* @__PURE__ */ jsxs(Form, {
        method: "POST",
        onChange: (event) => {
          const formData = new FormData(event.currentTarget);
          const firstName = formData.get("firstName");
          const team2 = formData.get("team");
          const password = formData.get("password");
          const confirmPassword = formData.get("confirmPassword");
          const selectedTeam = typeof team2 === "string" && isTeam(team2) ? team2 : void 0;
          setFormValues({
            firstName: typeof firstName === "string" ? firstName : "",
            team: selectedTeam,
            password: typeof password === "string" ? password : "",
            confirmPassword: typeof confirmPassword === "string" ? confirmPassword : ""
          });
        },
        children: [/* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: "actionId",
          value: actionIds.signUp
        }), /* @__PURE__ */ jsxs(Grid, {
          children: [data2.error ? /* @__PURE__ */ jsx("div", {
            className: "col-span-full mb-8",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "signup-error",
              children: data2.error
            })
          }) : null, data2.message ? /* @__PURE__ */ jsx("p", {
            className: "text-secondary col-span-full mb-8 text-lg",
            children: data2.message
          }) : null, actionData?.errors.generalError ? /* @__PURE__ */ jsx("div", {
            className: "col-span-full mb-4",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "general-error",
              children: actionData.errors.generalError
            })
          }) : null, actionData?.errors.team ? /* @__PURE__ */ jsx("div", {
            className: "col-span-full mb-4 text-right",
            children: /* @__PURE__ */ jsx(InputError, {
              id: "team-error",
              children: actionData.errors.team
            })
          }) : null, /* @__PURE__ */ jsxs("fieldset", {
            className: "col-span-full border-0 p-0",
            children: [/* @__PURE__ */ jsx("legend", {
              className: "sr-only",
              children: "Team"
            }), /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-3 gap-3 md:gap-4 lg:grid-cols-12 lg:gap-6",
              children: data2.teamsInOrder.map((teamOption) => /* @__PURE__ */ jsx(TeamOption, {
                teamMap: data2.teamMap,
                team: teamOption,
                error: actionData?.errors.team,
                selected: formValues.team === teamOption
              }, teamOption))
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full h-20 lg:h-24"
          }), /* @__PURE__ */ jsxs("div", {
            className: "col-span-full mb-12",
            children: [/* @__PURE__ */ jsx(H2, {
              children: `Some basic info to remember you.`
            }), /* @__PURE__ */ jsx(H2, {
              variant: "secondary",
              as: "p",
              children: `You can change this later.`
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full mb-12 lg:col-span-5 lg:mb-20",
            children: /* @__PURE__ */ jsx(Field, {
              name: "firstName",
              label: "First name",
              error: actionData?.errors.firstName,
              autoComplete: "given-name",
              defaultValue: actionData?.fields.firstName ?? "",
              required: true
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full mb-12 lg:col-span-5 lg:col-start-7 lg:mb-20",
            children: /* @__PURE__ */ jsx(Field, {
              name: "email",
              label: "Email",
              description: /* @__PURE__ */ jsxs("span", {
                children: [`This controls your avatar via `, /* @__PURE__ */ jsx("a", {
                  className: "underlined font-bold",
                  href: "https://gravatar.com",
                  target: "_blank",
                  rel: "noreferrer noopener",
                  children: "Gravatar"
                }), "."]
              }),
              defaultValue: data2.email,
              readOnly: true,
              disabled: true
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full mb-12 lg:col-span-5 lg:mb-20",
            children: /* @__PURE__ */ jsx(Field, {
              name: "password",
              label: "Password",
              type: "password",
              autoComplete: "new-password",
              error: actionData?.errors.password
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full mb-12 lg:col-span-5 lg:col-start-7 lg:mb-20",
            children: /* @__PURE__ */ jsx(Field, {
              name: "confirmPassword",
              label: "Confirm password",
              type: "password",
              autoComplete: "new-password",
              error: actionData?.errors.confirmPassword
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full",
            children: /* @__PURE__ */ jsx(Button, {
              type: "submit",
              disabled: !formIsValid,
              children: `Create account`
            })
          }), /* @__PURE__ */ jsx("p", {
            className: "text-primary col-span-4 mt-10 text-xs font-medium tracking-wider",
            children: `
              NOTICE: By signing up for an account, your email address will be
              added to Kent's mailing list (if it's not already) and
              you'll occasionally receive promotional emails from Kent. You
              can unsubscribe at any time.
            `
          })]
        })]
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "2xs"
      }), /* @__PURE__ */ jsx(Grid, {
        children: /* @__PURE__ */ jsxs(Form, {
          method: "POST",
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "actionId",
            value: actionIds.cancel
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            variant: "danger",
            children: `Cancel`
          })]
        })
      }), /* @__PURE__ */ jsx(Spacer, {
        size: "lg"
      }), /* @__PURE__ */ jsxs(Grid, {
        children: [/* @__PURE__ */ jsxs("div", {
          className: "col-span-full lg:col-span-5 lg:col-start-8",
          children: [/* @__PURE__ */ jsx(H2, {
            className: "mb-32",
            children: `You might be thinking, why pick a team?`
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Own a post`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-12",
            children: `
              Your team associates your blog post reads with a group and it's
              fun to know that your contributing to a group while learning
              and reading. When your team has the highest ranking on a post,
              you "own" that post. Kinda like an NFT, but not really.
            `
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `Exclusive team discord channels`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-12",
            children: `
              After signing up you can connect your discord account. When you do
              this, your account will be given a team role. This will give you
              access to your team channels where you can plan team blog post
              raids and fun stuff like that.
            `
          }), /* @__PURE__ */ jsx(H6, {
            as: "h3",
            className: "mb-4",
            children: `UI Theme`
          }), /* @__PURE__ */ jsx(Paragraph, {
            className: "mb-12",
            children: `
              The theme of this website is controlled by your team color
              selection. So choose your favorite color and have that preference
              shown throughout the site.
            `
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "col-span-full lg:col-span-6 lg:col-start-1 lg:row-start-1",
          children: /* @__PURE__ */ jsx("div", {
            className: "aspect-[4/6]",
            children: /* @__PURE__ */ jsx("img", {
              ...getImgProps(images.abhiPalmingSoccerBall, {
                className: "rounded-lg object-cover",
                widths: [512, 650, 840, 1024, 1300, 1680, 2e3, 2520],
                sizes: ["(max-width: 1023px) 80vw", "(min-width: 1024px) and (max-width: 1620px) 40vw", "650px"],
                transformations: {
                  resize: {
                    type: "fill",
                    aspectRatio: "3:4"
                  }
                }
              })
            })
          })
        })]
      })]
    })]
  });
});
export {
  action,
  signup as default,
  handle,
  loader
};
