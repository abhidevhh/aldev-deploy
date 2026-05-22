import { UNSAFE_withComponentProps, useFetcher, Link, data } from "react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as Button } from "./button-C3vj8DF4.js";
import { F as Field, B as ButtonGroup, E as ErrorPanel } from "./form-elements-DKDR40lU.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { H as HeroSection, g as getHeroImageProps } from "./hero-section-BNEKo3U8.js";
import { a as H2, P as Paragraph } from "./typography-DBSbiCOF.js";
import { h as images, g as getGenericSocialImage } from "./images-Dyd95Mrb.js";
import { h as handleFormSubmission } from "./actions.server-B989TuGL.js";
import { e as getDisplayUrl, p as getUrl } from "./misc-CQO4K9rH.js";
import { s as sendEmail } from "./send-email.server-ClI4Nqgs.js";
import { g as getSocialMetas } from "./seo-nV2HC6Me.js";
import { requireUser } from "./session.server-DZ6f3pgH.js";
import { x as useRootData } from "./root-XTBE-Fp5.js";
import "clsx";
import "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "framer-motion";
import "./arrow-button-DsHCk3Gf.js";
import "./icons-DQAXl5Y1.js";
import "cloudinary-build-url";
import "emoji-regex";
import "date-fns";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./markdown.server-rwSwVnMd.js";
import "hast-util-to-string";
import "rehype-document";
import "rehype-format";
import "rehype-parse";
import "rehype-stringify";
import "remark-parse";
import "remark-rehype";
import "unified";
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
import "@tanstack/react-hotkeys";
import "spin-delay";
import "@reach/dialog";
import "error-stack-parser";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
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
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:sqlite";
import "@epic-web/cachified";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
function getErrorForSubject(subject) {
  if (!subject) return `Subject is required`;
  if (subject.length <= 5) return `Subject is too short`;
  if (subject.length > 120) return `Subject is too long`;
  return null;
}
function getErrorForBody(body) {
  if (!body) return `Body is required`;
  if (body.length <= 40) return `Body is too short`;
  if (body.length > 1001) return `Body is too long`;
  return null;
}
async function action({
  request
}) {
  const user = await requireUser(request);
  return handleFormSubmission({
    request,
    validators: {
      subject: getErrorForSubject,
      body: getErrorForBody
    },
    handleFormValues: async (fields) => {
      const {
        subject,
        body
      } = fields;
      const sender = `"${user.firstName}" <${user.email}>`;
      const noSpamMessage = "- Sent via the KCD Contact Form";
      await sendEmail({
        from: sender,
        to: `"AbhiDev" <me@abhidev.com>`,
        subject,
        text: `${body}

${noSpamMessage}`
      });
      const actionData = {
        fields,
        status: "success",
        errors: {}
      };
      return data(actionData);
    }
  });
}
const headers = () => ({
  "Cache-Control": "private, max-age=3600",
  Vary: "Cookie"
});
const meta = ({
  matches
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo;
  return getSocialMetas({
    title: "Contact Abhishek Sharma",
    description: "Contact Abhishek Sharma for AI, ML, and Full Stack collaborations.",
    url: getUrl(requestInfo),
    image: getGenericSocialImage({
      url: getDisplayUrl(requestInfo),
      featuredImage: "unsplash/photo-1563225409-127c18758bd5",
      words: `Let’s collaborate on AI systems`
    })
  });
};
const contact = UNSAFE_withComponentProps(function ContactRoute() {
  const contactFetcher = useFetcher();
  const {
    user
  } = useRootData();
  const actionData = contactFetcher.data;
  const isDone = contactFetcher.state === "idle" && actionData != null;
  const emailSuccessfullySent = isDone && actionData.status === "success";
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(HeroSection, {
      title: "Let’s build something powerful together.",
      subtitle: "AI systems, full stack products, and intelligent automation.",
      image: /* @__PURE__ */ jsx("img", {
        ...getHeroImageProps(images.abhiProfile, {
          className: "max-h-[50vh] rounded-bl-3xl rounded-br-[25%] rounded-tl-[25%] rounded-tr-3xl"
        })
      })
    }), /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(contactFetcher.Form, {
        method: "POST",
        noValidate: true,
        "aria-describedby": "contact-form-error",
        children: /* @__PURE__ */ jsxs(Grid, {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "col-span-full mb-12 lg:col-span-8 lg:col-start-3",
            children: [/* @__PURE__ */ jsx(H2, {
              children: "Email me"
            }), /* @__PURE__ */ jsxs(Paragraph, {
              children: [`
                  I do my best to respond, but unfortunately I can't always
                  respond to every email I receive. If you have a support
                  request about my open source work, please open an issue
                  on the GitHub repo instead. If you have a support need on one of
                  my courses, please email the team (`, /* @__PURE__ */ jsx("a", {
                href: "mailto:me@AbhiDev.com",
                children: "me@AbhiDev.com"
              }), `, `, /* @__PURE__ */ jsx("a", {
                href: "mailto:me@AbhiDev.com",
                children: "me@AbhiDev.com"
              }), `, or `, /* @__PURE__ */ jsx("a", {
                href: "mailto:me@AbhiDev.com",
                children: "me@AbhiDev.com"
              }), `) instead. I'll just forward your message to them anyway.`]
            }), /* @__PURE__ */ jsx("div", {
              className: "bg-secondary mt-6 rounded-lg p-4",
              children: /* @__PURE__ */ jsxs(Paragraph, {
                children: ["Have a general question? The best place is the", " ", /* @__PURE__ */ jsx(Link, {
                  to: "/calls",
                  className: "underline",
                  children: "Portfolio collaboration page"
                }), ". You can share your project idea, hiring request, or collaboration message if you don't want to record yourself."]
              })
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "col-span-full lg:col-span-8 lg:col-start-3",
            children: user ? /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx(Field, {
                name: "name",
                label: "Name",
                placeholder: "Your name",
                disabled: true,
                defaultValue: user.firstName
              }), /* @__PURE__ */ jsx(Field, {
                type: "email",
                label: "Email",
                placeholder: "person.doe@example.com",
                disabled: true,
                defaultValue: user.email,
                name: "email"
              }), /* @__PURE__ */ jsx(Field, {
                name: "subject",
                label: "Subject",
                placeholder: "AI collaboration, internship, startup idea...",
                defaultValue: actionData?.fields.subject ?? "",
                error: actionData?.errors.subject
              }), /* @__PURE__ */ jsx(Field, {
                name: "body",
                label: "Body",
                type: "textarea",
                placeholder: "Tell me what you're building and how I can help.",
                rows: 8,
                defaultValue: actionData?.fields.body ?? "",
                error: actionData?.errors.body
              }), emailSuccessfullySent ? `Message sent successfully. Looking forward to connecting 🚀` : (
                // IDEA: show a loading state here
                /* @__PURE__ */ jsxs(ButtonGroup, {
                  children: [/* @__PURE__ */ jsx(Button, {
                    type: "submit",
                    disabled: contactFetcher.state !== "idle",
                    children: "Send message"
                  }), /* @__PURE__ */ jsx(Button, {
                    variant: "secondary",
                    type: "reset",
                    children: "Reset form"
                  })]
                })
              ), actionData?.errors.generalError ? /* @__PURE__ */ jsx(ErrorPanel, {
                id: "contact-form-error",
                children: actionData.errors.generalError
              }) : null]
            }) : /* @__PURE__ */ jsx("div", {
              className: "col-span-full mb-12 lg:col-span-8 lg:col-start-3",
              children: /* @__PURE__ */ jsxs(Paragraph, {
                children: ["Note: due to spam issues, you have to confirm your email by", " ", /* @__PURE__ */ jsx(Link, {
                  to: "/login",
                  className: "underline",
                  children: "sending your message directly here"
                }), " ", "on my website first."]
              })
            })
          })]
        })
      })
    })]
  });
});
export {
  action,
  contact as default,
  headers,
  meta
};
