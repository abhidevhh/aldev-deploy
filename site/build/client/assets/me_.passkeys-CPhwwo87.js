import { UNSAFE_withComponentProps, useRevalidator, Form, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { startRegistration } from "@simplewebauthn/browser";
import { z } from "zod";
import { B as Button } from "./button-C3vj8DF4.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
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
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "./favorites-Bsg0upig.js";
import "litefs-js";
import "litefs-js/remix";
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
  const passkeys = await prisma.passkey.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      createdAt: true,
      deviceType: true,
      transports: true
    }
  });
  return data({
    passkeys
  });
}
async function action({
  request
}) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const passkeyId = formData.get("passkeyId");
  if (intent === "delete" && typeof passkeyId === "string") {
    const passkey = await prisma.passkey.findUnique({
      where: {
        id: passkeyId
      },
      select: {
        userId: true
      }
    });
    if (!passkey || passkey.userId !== user.id) {
      throw new Response("Passkey not found", {
        status: 404
      });
    }
    await prisma.passkey.delete({
      where: {
        id: passkeyId
      }
    });
  }
  return data({
    success: true
  });
}
const RegistrationResultSchema = z.object({
  options: z.object({
    rp: z.object({
      id: z.string(),
      name: z.string()
    }),
    user: z.object({
      id: z.string(),
      name: z.string(),
      displayName: z.string()
    }),
    challenge: z.string(),
    pubKeyCredParams: z.array(z.object({
      type: z.literal("public-key"),
      alg: z.number()
    }))
  })
});
const me__passkeys = UNSAFE_withComponentProps(function PasskeysRoute({
  loaderData: {
    passkeys
  }
}) {
  const revalidator = useRevalidator();
  async function handleAddPasskey() {
    const resp = await fetch("/resources/webauthn/generate-registration-options");
    const jsonResult = await resp.json();
    const parsedResult = RegistrationResultSchema.parse(jsonResult);
    try {
      const regResult = await startRegistration({
        optionsJSON: parsedResult.options
      });
      const verificationResp = await fetch("/resources/webauthn/verify-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(regResult)
      });
      if (!verificationResp.ok) {
        throw new Error("Failed to verify registration");
      }
      void revalidator.revalidate();
    } catch (err) {
      console.error("Failed to create passkey:", err);
      alert("Failed to create passkey. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "mx-auto max-w-2xl py-8",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "mb-6 flex items-center justify-between",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-bold",
        children: "Passkeys"
      }), /* @__PURE__ */ jsx("form", {
        action: handleAddPasskey,
        children: /* @__PURE__ */ jsx(Button, {
          children: "Add Passkey"
        })
      })]
    }), passkeys.length === 0 ? /* @__PURE__ */ jsxs("div", {
      className: "py-8 text-center text-gray-500",
      children: [/* @__PURE__ */ jsx("p", {
        children: "You haven't set up any passkeys yet."
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-2",
        children: "Passkeys provide a secure, passwordless way to sign in to your account."
      })]
    }) : /* @__PURE__ */ jsx("div", {
      className: "space-y-4",
      children: passkeys.map((passkey) => /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between rounded-lg border p-4",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "font-medium",
            children: [passkey.deviceType === "singleDevice" ? "Single-device" : "Multi-device", " ", "Passkey"]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-sm text-gray-500",
            children: ["Added ", new Date(passkey.createdAt).toLocaleDateString()]
          }), passkey.transports && /* @__PURE__ */ jsxs("div", {
            className: "text-sm text-gray-500",
            children: ["Transports: ", passkey.transports.split(",").join(", ")]
          })]
        }), /* @__PURE__ */ jsxs(Form, {
          method: "post",
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "passkeyId",
            value: passkey.id
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            name: "intent",
            value: "delete",
            variant: "danger",
            size: "small",
            children: "Remove"
          })]
        })]
      }, passkey.id))
    })]
  });
});
export {
  action,
  me__passkeys as default,
  handle,
  loader
};
