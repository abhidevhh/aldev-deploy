import { UNSAFE_withComponentProps, Form, redirect, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { a as Button } from "./button-B-8RrXF2.js";
import { P as Paragraph } from "./typography-DDpAXXrz.js";
import { c as useDoubleCheck } from "./misc-react-D8yAGzlT.js";
import { prisma } from "./prisma.server-MnXt9BdG.js";
import { requireUser } from "./session.server-BVOCbXUc.js";
import { r as reuseUsefulLoaderHeaders } from "./misc-DM3BUXHg.js";
import "clsx";
import "react";
import "@sentry/react-router";
import "md5-hash";
import "./images-D8NqauwH.js";
import "cloudinary-build-url";
import "emoji-regex";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-BOCNblj8.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "date-fns";
const handle = {
  getSitemapEntries: () => null
};
const actionTypes = {
  DELETE_RECORDING: "delete recording"
};
async function action({
  params,
  request
}) {
  if (!params.callId) {
    throw new Error("params.callId is not defined");
  }
  const user = await requireUser(request);
  const call = await prisma.call.findFirst({
    // NOTE: this is how we ensure the user is the owner of the call
    // and is therefore authorized to delete it.
    where: {
      userId: user.id,
      id: params.callId
    },
    select: {
      id: true,
      audioKey: true,
      episodeDraft: {
        select: {
          episodeAudioKey: true
        }
      }
    }
  });
  if (!call) {
    console.warn(`Failed to get a call to delete by userId: ${user.id} and callId: ${params.callId}`);
    return redirect("/calls/record");
  }
  await prisma.call.delete({
    where: {
      id: params.callId
    }
  });
  const keysToDelete = [call.audioKey, call.episodeDraft?.episodeAudioKey].filter((k) => typeof k === "string" && k.length > 0);
  if (keysToDelete.length) {
    const {
      deleteAudioObject
    } = await import("./abhi-call-audio-storage.server-BBLgNzCx.js");
    await Promise.all(keysToDelete.map(async (key) => deleteAudioObject({
      key
    }).catch(() => {
    })));
  }
  return redirect("/calls/record");
}
async function loader({
  params,
  request
}) {
  if (!params.callId) {
    throw new Error("params.callId is not defined");
  }
  const user = await requireUser(request);
  const call = await prisma.call.findFirst({
    // NOTE: this is how we ensure the user is the owner of the call
    // and is therefore authorized to delete it.
    where: {
      userId: user.id,
      id: params.callId
    },
    select: {
      id: true,
      notes: true
    }
  });
  if (!call) {
    return redirect("/calls/record");
  }
  return data({
    call
  }, {
    headers: {
      "Cache-Control": "public, max-age=10"
    }
  });
}
const headers = reuseUsefulLoaderHeaders;
const $callId = UNSAFE_withComponentProps(function Screen({
  loaderData: data2
}) {
  const dc = useDoubleCheck();
  return /* @__PURE__ */ jsxs("section", {
    children: [data2.call.notes ? /* @__PURE__ */ jsx(Paragraph, {
      className: "mb-8 whitespace-pre-wrap",
      children: data2.call.notes
    }) : /* @__PURE__ */ jsx(Paragraph, {
      className: "mb-8",
      children: `Thanks for your call!`
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-wrap gap-4",
      children: [/* @__PURE__ */ jsx("div", {
        className: "w-full flex-1",
        style: {
          minWidth: "16rem"
        },
        children: /* @__PURE__ */ jsx("audio", {
          src: `/resources/calls/call-audio?callId=${data2.call.id}`,
          controls: true,
          preload: "metadata",
          className: "w-full"
        })
      }), /* @__PURE__ */ jsxs(Form, {
        method: "delete",
        children: [/* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: "actionType",
          value: actionTypes.DELETE_RECORDING
        }), /* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: "callId",
          value: data2.call.id
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          variant: "danger",
          size: "medium",
          autoFocus: true,
          ...dc.getButtonProps(),
          children: dc.doubleCheck ? "You sure?" : "Delete"
        })]
      })]
    })]
  });
});
export {
  action,
  $callId as default,
  handle,
  headers,
  loader
};
//# sourceMappingURL=_callId-Bke-YMBH.js.map
