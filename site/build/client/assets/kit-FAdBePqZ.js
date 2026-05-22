import { data, UNSAFE_withComponentProps, Link } from "react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { C as CloudinaryVideo } from "./cloudinary-video-DeT-8neH.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeroSection } from "./hero-section-CoHGsAuJ.js";
import { S as Spacer } from "./spacer-CSktuGpg.js";
import { P as Paragraph } from "./typography-DDpAXXrz.js";
import { e as getErrorMessage } from "./misc-DM3BUXHg.js";
import { f as addSubscriberToForm, h as addTagToSubscriber, a as deleteKitCache } from "./user-info.server-DQEJabU4.js";
import "clsx";
import "framer-motion";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./arrow-button-DBVn13Kl.js";
import "react";
import "./icons-Xl-Om4A1.js";
import "date-fns";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./cache.server-BWnHcoUK.js";
import "node:fs";
import "node:path";
import "node:sqlite";
import "@epic-web/cachified";
import "@epic-web/remember";
import "lru-cache";
import "litefs-js";
import "litefs-js/remix";
import "./session.server-BVOCbXUc.js";
import "./prisma.server-MnXt9BdG.js";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./favorites-BOCNblj8.js";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./misc-react-D8yAGzlT.js";
import "@sentry/react-router";
import "md5-hash";
function getErrorForFirstName(name) {
  if (!name) return `Name is required`;
  if (name.length > 60) return `Name is too long`;
  return null;
}
function getErrorForEmail(email) {
  if (!email) return `Email is required`;
  if (!/^.+@.+\..+$/.test(email)) return `That's not an email`;
  return null;
}
function getErrorForkitTagId(tagId, form) {
  if (!form.get("kitFormId") && !tagId) {
    return `kitTagId is required if kitFormId is not specified`;
  }
  if (!tagId) return null;
  if (tagId.length < 2) return `Convert Kit Tag ID is incorrect`;
  return null;
}
function getErrorForkitFormId(formId, form) {
  if (!form.get("kitTagId") && !formId) {
    return `kitFormId is required if kitTagId is not specified`;
  }
  if (!formId) return null;
  if (formId.length < 2) return `Convert Kit Form ID is incorrect`;
  return null;
}
function getErrorForFormId(value) {
  if (!value) return `Form ID is required`;
  return null;
}
async function handleKitFormSubmission(request) {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const fields = {
    formId: form.get("formId") ?? "",
    firstName: form.get("firstName") ?? "",
    email: form.get("email") ?? "",
    kitTagId: form.get("kitTagId") ?? "",
    kitFormId: form.get("kitFormId") ?? "",
    url: form.get("url")
  };
  const errors = {
    generalError: null,
    formId: getErrorForFormId(fields.formId),
    firstName: getErrorForFirstName(fields.firstName),
    email: getErrorForEmail(fields.email),
    kitTagId: getErrorForkitTagId(fields.kitTagId, form),
    kitFormId: getErrorForkitFormId(fields.kitFormId, form),
    url: null
  };
  const failedHoneypot = Boolean(fields.url);
  if (failedHoneypot) {
    console.info(`FAILED HONEYPOT`, fields);
    return data({ status: "success" });
  }
  let data$1;
  if (Object.values(errors).some((err) => err !== null)) {
    data$1 = { status: "error", errors };
    return data(data$1, 400);
  }
  try {
    let subscriberId = null;
    if (fields.kitFormId) {
      const subscriber = await addSubscriberToForm(fields);
      subscriberId = subscriber.id;
    }
    if (fields.kitTagId) {
      const subscriber = await addTagToSubscriber(fields);
      subscriberId = subscriber.id;
    }
    if (subscriberId) {
      await deleteKitCache(subscriberId).catch(() => {
      });
    }
  } catch (error) {
    errors.generalError = getErrorMessage(error);
    data$1 = { status: "error", errors };
    return data(data$1, 500);
  }
  data$1 = { status: "success" };
  return data(data$1);
}
async function action({
  request
}) {
  return handleKitFormSubmission(request);
}
const kit = UNSAFE_withComponentProps(function Kit() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Huzzah!",
      subtitle: "You've signed up",
      image: /* @__PURE__ */ jsx(CloudinaryVideo, {
        cloudinaryId: "abhidev.com/misc/approve",
        className: "rounded-lg",
        aspectRatio: "3:4"
      })
    }), /* @__PURE__ */ jsx(Grid, {
      as: "main",
      className: "mb-48",
      children: /* @__PURE__ */ jsxs("div", {
        className: "col-span-full",
        children: [/* @__PURE__ */ jsx(Paragraph, {
          children: `... Ummm... Also, please enable JavaScript 😅`
        }), /* @__PURE__ */ jsx(Spacer, {
          size: "3xs"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "underlined",
          children: "Go to the home page"
        })]
      })
    })]
  });
});
export {
  action,
  kit as default
};
//# sourceMappingURL=kit-FAdBePqZ.js.map
