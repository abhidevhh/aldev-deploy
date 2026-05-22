import { UNSAFE_withComponentProps, useRevalidator, Form, useSubmit, useNavigate, useLocation, redirect, data } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { B as Button } from "./button-C3vj8DF4.js";
import { u as useInterval, r as recordingFormActionPath, C as CallRecorder, g as getNavigationPathFromResponse } from "./recording-form-0QLEwWGz.js";
import { M as MailIcon } from "./icons-DQAXl5Y1.js";
import { S as Spinner } from "./promotification-YMEmucWd.js";
import { e as H6, P as Paragraph, c as H4 } from "./typography-DBSbiCOF.js";
import { c as useDoubleCheck } from "./misc-react-BeZfIuw-.js";
import { prisma } from "./prisma.server-Cj9LRFmw.js";
import { requireAdminUser } from "./session.server-DZ6f3pgH.js";
import { z as useUser, x as useRootData } from "./root-XTBE-Fp5.js";
import { b as formatDate } from "./misc-CQO4K9rH.js";
import "clsx";
import "@xstate/react";
import "gsap";
import "xstate";
import "./tag-Bs3TtQGk.js";
import "react-error-boundary";
import "./abhi-call-3LF8Y-Fm.js";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "emoji-regex";
import "./character-countdown-D-g85829.js";
import "./form-elements-DKDR40lU.js";
import "@epic-web/invariant";
import "cookie";
import "spin-delay";
import "framer-motion";
import "@sentry/react-router";
import "md5-hash";
import "@epic-web/remember";
import "@prisma/adapter-better-sqlite3";
import "chalk";
import "p-props";
import "./env.server-DPCBxZtL.js";
import "zod";
import "./favorites-Bsg0upig.js";
import "litefs-js";
import "litefs-js/remix";
import "node:path";
import "node:url";
import "@prisma/client/runtime/client";
import "./timing.server-Ckj1L-xw.js";
import "@tanstack/react-hotkeys";
import "@reach/dialog";
import "./arrow-button-DsHCk3Gf.js";
import "error-stack-parser";
import "./grid-Bsvu4qfo.js";
import "./cloudinary-video-DeT-8neH.js";
import "lru-cache";
import "mdx-bundler/client/index.js";
import "./theme-Ct2STwdZ.js";
import "@conform-to/zod/v4";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "./external-links-BEDnFUME.js";
import "downshift";
import "./spacer-CSktuGpg.js";
import "./client.server-CTs0DPxN.js";
import "uuid";
import "./login.server-Bn92r_Ja.js";
import "./abort-utils.server-Bx3f6jnJ.js";
import "./cache.server-BtbXQaCP.js";
import "node:fs";
import "node:sqlite";
import "@epic-web/cachified";
import "./seo-nV2HC6Me.js";
import "./theme.server-D5mszc13.js";
import "./user-info.server-D6axXZ8Q.js";
import "./fetch-with-timeout.server-BL1zZ7UJ.js";
import "./header-section-B2Ylwupf.js";
import "./hero-section-BNEKo3U8.js";
import "date-fns";
const handle = {
  getSitemapEntries: () => null
};
async function loader({
  request,
  params
}) {
  if (!params.callId) {
    throw new Error("params.callId is not defined");
  }
  await requireAdminUser(request);
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  const call = await prisma.call.findFirst({
    where: {
      id: params.callId
    },
    select: {
      createdAt: true,
      notes: true,
      title: true,
      id: true,
      isAnonymous: true,
      callerTranscript: true,
      callerTranscriptStatus: true,
      callerTranscriptErrorMessage: true,
      episodeDraft: {
        select: {
          id: true,
          status: true,
          step: true,
          errorMessage: true,
          episodeAudioKey: true,
          responseAudioKey: true,
          transcript: true,
          title: true,
          description: true,
          keywords: true
        }
      },
      user: {
        select: {
          firstName: true,
          email: true,
          team: true,
          discordId: true
        }
      }
    }
  });
  if (!call) {
    console.error(`No call found at ${params.callId}`);
    const searchParams = new URLSearchParams();
    searchParams.set("message", "Call not found");
    return redirect(`/calls/admin?${searchParams.toString()}`);
  }
  const episodeDraft = call.episodeDraft;
  const hasEpisodeAudio = Boolean(episodeDraft?.episodeAudioKey);
  const hasResponseAudio = Boolean(episodeDraft?.responseAudioKey);
  const episodeAudioUrl = hasEpisodeAudio ? `/resources/calls/draft-episode-audio?callId=${call.id}` : null;
  return data({
    call: {
      ...call,
      formattedCreatedAt: formatDate(call.createdAt),
      episodeDraft: episodeDraft ? {
        ...episodeDraft,
        // Don’t send the storage key to the client.
        episodeAudioKey: null,
        responseAudioKey: null,
        hasEpisodeAudio,
        hasResponseAudio,
        episodeAudioUrl
      } : null
    },
    error
  });
}
function CallListing({
  call
}) {
  const submit = useSubmit();
  const [audioEl, setAudioEl] = React.useState(null);
  const [playbackRate, setPlaybackRate] = React.useState(2);
  const dc = useDoubleCheck();
  const callerTranscriptStatus = call.callerTranscriptStatus;
  const callerTranscript = call.callerTranscript?.trim() ?? "";
  const [callerTranscriptValue, setCallerTranscriptValue] = React.useState(callerTranscript);
  const callerTranscriptLocked = Boolean(call.episodeDraft);
  const callerTranscriptError = call.callerTranscriptErrorMessage;
  const mailtoHref = `mailto:${call.user.email}?${new URLSearchParams({
    subject: `Re: call AbhiDev - ${call.title}`,
    body: `I just wanted to talk about your call on the call AbhiDev podcast`
  }).toString()}`;
  React.useEffect(() => {
    if (!audioEl) return;
    audioEl.playbackRate = playbackRate;
  }, [audioEl, playbackRate]);
  React.useEffect(() => {
    setCallerTranscriptValue(callerTranscript);
  }, [callerTranscript]);
  function handleSameRouteFormSubmit(event) {
    event.preventDefault();
    const submitter = event.nativeEvent instanceof SubmitEvent ? event.nativeEvent.submitter : null;
    const formData = new FormData(event.currentTarget);
    if ((submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement) && submitter.name) {
      formData.set(submitter.name, submitter.value);
    }
    submit(formData, {
      method: "post",
      action: recordingFormActionPath,
      preventScrollReset: true
    });
  }
  return /* @__PURE__ */ jsxs("section", {
    className: `set-color-team-current-${call.user.team.toLowerCase()} rounded-lg bg-gray-100 p-6 lg:p-8 dark:bg-gray-800`,
    children: [/* @__PURE__ */ jsx("div", {
      className: "mb-6 border-b border-gray-200 pb-6 dark:border-gray-700",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-wrap items-start justify-between gap-4",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx(H4, {
            as: "h2",
            className: "mb-2",
            children: call.title
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-slate-400",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-team-current font-medium",
              children: call.user.firstName
            }), call.isAnonymous ? /* @__PURE__ */ jsx("span", {
              className: "rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-slate-200",
              children: "anonymous"
            }) : null, /* @__PURE__ */ jsx("span", {
              children: "•"
            }), /* @__PURE__ */ jsxs("a", {
              href: mailtoHref,
              className: "inline-flex items-center gap-1 hover:underline",
              children: [/* @__PURE__ */ jsx(MailIcon, {
                size: 14
              }), call.user.email]
            }), /* @__PURE__ */ jsx("span", {
              children: "•"
            }), /* @__PURE__ */ jsx("span", {
              children: call.formattedCreatedAt
            })]
          })]
        }), /* @__PURE__ */ jsxs(Form, {
          method: "post",
          action: recordingFormActionPath,
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "intent",
            value: "delete-call"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "callId",
            value: call.id
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            variant: "danger",
            size: "small",
            ...dc.getButtonProps(),
            children: dc.doubleCheck ? "You sure?" : "Delete"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "mb-6",
      children: [/* @__PURE__ */ jsx(H6, {
        as: "h3",
        className: "mb-2",
        children: "Notes"
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "[overflow-wrap:anywhere] break-words whitespace-pre-wrap text-gray-600 dark:text-slate-300",
        children: call.notes ?? "No notes provided."
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "mb-6 rounded-lg bg-gray-200 p-4 dark:bg-gray-700",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-3 flex flex-wrap items-center justify-between gap-3",
        children: [/* @__PURE__ */ jsx(H6, {
          as: "h3",
          id: "caller-transcript",
          children: "Caller transcript"
        }), /* @__PURE__ */ jsxs(Form, {
          method: "post",
          action: recordingFormActionPath,
          preventScrollReset: true,
          onSubmit: handleSameRouteFormSubmit,
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "intent",
            value: "generate-caller-transcript"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "callId",
            value: call.id
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            variant: "secondary",
            size: "small",
            disabled: callerTranscriptStatus === "PROCESSING" || callerTranscriptLocked,
            children: callerTranscriptStatus === "READY" ? "Regenerate transcript" : callerTranscriptStatus === "PROCESSING" ? "Generating..." : "Generate transcript"
          })]
        })]
      }), callerTranscriptStatus === "PROCESSING" ? /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300",
        children: [/* @__PURE__ */ jsx(Spinner, {
          showSpinner: true,
          size: 16
        }), /* @__PURE__ */ jsx("span", {
          children: "Generating caller transcript…"
        })]
      }) : null, callerTranscriptStatus === "ERROR" ? /* @__PURE__ */ jsx(Paragraph, {
        className: "whitespace-pre-wrap text-red-700 dark:text-red-300",
        children: callerTranscriptError || "Unable to generate caller transcript."
      }) : null, callerTranscriptLocked ? /* @__PURE__ */ jsxs("div", {
        className: "mt-3 flex flex-col gap-3",
        children: [/* @__PURE__ */ jsxs(Paragraph, {
          className: "text-xs text-gray-500 dark:text-slate-400",
          children: ["Caller transcript edits are disabled after an episode draft exists. Update the", " ", /* @__PURE__ */ jsx("a", {
            href: "#draft-transcript",
            className: "underline",
            children: "episode draft transcript"
          }), " ", "below instead."]
        }), /* @__PURE__ */ jsx("div", {
          className: "rounded-lg bg-white px-4 py-3 text-sm whitespace-pre-wrap text-gray-800 dark:bg-gray-800 dark:text-white",
          children: callerTranscriptValue || "No caller transcript available."
        })]
      }) : /* @__PURE__ */ jsxs(Form, {
        method: "post",
        action: recordingFormActionPath,
        className: "mt-3 flex flex-col gap-3",
        preventScrollReset: true,
        onSubmit: handleSameRouteFormSubmit,
        children: [/* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: "intent",
          value: "update-caller-transcript"
        }), /* @__PURE__ */ jsx("input", {
          type: "hidden",
          name: "callId",
          value: call.id
        }), /* @__PURE__ */ jsx("textarea", {
          name: "callerTranscript",
          value: callerTranscriptValue,
          onChange: (event) => {
            setCallerTranscriptValue(event.currentTarget.value);
          },
          placeholder: "Caller transcript",
          rows: 6,
          "aria-labelledby": "caller-transcript",
          className: "focus-ring w-full rounded-lg bg-white px-4 py-3 text-sm text-gray-800 dark:bg-gray-800 dark:text-white",
          disabled: callerTranscriptStatus === "PROCESSING"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between gap-3",
          children: [/* @__PURE__ */ jsx(Paragraph, {
            className: "text-xs text-gray-500 dark:text-slate-400",
            children: "Edit this transcript before recording; this version is used for the full episode transcript."
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            variant: "secondary",
            size: "small",
            disabled: callerTranscriptStatus === "PROCESSING",
            children: "Save caller transcript"
          })]
        })]
      }), callerTranscriptStatus === "NOT_STARTED" && !callerTranscriptLocked ? /* @__PURE__ */ jsx(Paragraph, {
        className: "text-gray-500 dark:text-slate-400",
        children: "Generate this now to review the caller's transcript before recording your response."
      }) : null]
    }), /* @__PURE__ */ jsxs("div", {
      className: "rounded-lg bg-gray-200 p-4 dark:bg-gray-700",
      children: [/* @__PURE__ */ jsx(H6, {
        as: "h3",
        className: "mb-3",
        children: "Listen to Call"
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-4 lg:flex-row lg:items-center",
        children: [/* @__PURE__ */ jsx("audio", {
          className: "w-full flex-1",
          ref: (el) => setAudioEl(el),
          src: `/resources/calls/call-audio?callId=${call.id}`,
          controls: true,
          preload: "metadata"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-2 lg:w-auto",
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "playbackRate",
            className: "text-sm whitespace-nowrap text-gray-500 dark:text-slate-400",
            children: "Speed:"
          }), /* @__PURE__ */ jsx("input", {
            id: "playbackRate",
            type: "range",
            min: "0.5",
            max: "3",
            step: "0.1",
            value: playbackRate,
            onChange: (e) => setPlaybackRate(Number(e.target.value)),
            className: "w-20"
          }), /* @__PURE__ */ jsxs("span", {
            className: "w-10 text-sm font-medium text-gray-700 dark:text-slate-300",
            children: [playbackRate, "x"]
          })]
        })]
      })]
    })]
  });
}
function ResponseAudioDraftForm({
  audio,
  callId,
  callNotes,
  callTitle
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const revalidator = useRevalidator();
  const {
    requestInfo
  } = useRootData();
  const flyPrimaryInstance = requestInfo.flyPrimaryInstance;
  const audioURL = React.useMemo(() => URL.createObjectURL(audio), [audio]);
  const abortControllerRef = React.useRef(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(audioURL);
      abortControllerRef.current?.abort();
    };
  }, [audioURL]);
  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError(null);
    const formData = new FormData(event.currentTarget);
    const callTitleValue = String(formData.get("callTitle") ?? "");
    const notesValue = String(formData.get("notes") ?? "");
    const reader = new FileReader();
    const handleLoadEnd = async () => {
      try {
        if (typeof reader.result !== "string") {
          setError("Unable to read recording. Please try again.");
          return;
        }
        const body = new URLSearchParams();
        body.set("intent", "create-episode-draft");
        body.set("callId", callId);
        body.set("audio", reader.result);
        body.set("callTitle", callTitleValue);
        body.set("notes", notesValue);
        const headers = new Headers({
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        });
        if (flyPrimaryInstance) {
          headers.set("fly-force-instance-id", flyPrimaryInstance);
        }
        abortControllerRef.current?.abort();
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        const response = await fetch(recordingFormActionPath, {
          method: "POST",
          body,
          headers,
          signal: abortController.signal
        });
        const redirectPath = getNavigationPathFromResponse(response);
        if (redirectPath) {
          if (redirectPath !== `${location.pathname}${location.search}`) {
            await navigate(redirectPath, {
              preventScrollReset: true
            });
          } else {
            await revalidator.revalidate();
          }
          return;
        }
        if (response.ok) {
          await revalidator.revalidate();
          return;
        }
        const text = await response.text().catch(() => "");
        setError(text.trim() || "Unable to submit response. Please try again.");
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Unable to submit response.");
      } finally {
        setIsSubmitting(false);
      }
    };
    reader.addEventListener("loadend", handleLoadEnd, {
      once: true
    });
    setIsSubmitting(true);
    try {
      reader.readAsDataURL(audio);
    } catch (e) {
      reader.removeEventListener("loadend", handleLoadEnd);
      setIsSubmitting(false);
      setError(e instanceof Error ? e.message : "Unable to read recording.");
    }
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-4",
    children: [error ? /* @__PURE__ */ jsx("p", {
      role: "alert",
      className: "text-red-500",
      children: error
    }) : null, /* @__PURE__ */ jsx("audio", {
      src: audioURL,
      controls: true,
      preload: "metadata",
      className: "w-full"
    }), /* @__PURE__ */ jsxs("form", {
      method: "post",
      onSubmit: handleSubmit,
      noValidate: true,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-4",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "call-title",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Call title"
        }), /* @__PURE__ */ jsx("input", {
          id: "call-title",
          name: "callTitle",
          defaultValue: callTitle,
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          required: true
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-4",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "call-notes",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Caller notes"
        }), /* @__PURE__ */ jsx("textarea", {
          id: "call-notes",
          name: "notes",
          defaultValue: callNotes ?? "",
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          rows: 4
        })]
      }), /* @__PURE__ */ jsx(Button, {
        type: "submit",
        disabled: isSubmitting,
        children: isSubmitting ? "Starting..." : "Generate episode draft"
      })]
    })]
  });
}
function DraftPending({
  callId,
  step
}) {
  const stepLabel = {
    STARTED: "Starting…",
    GENERATING_AUDIO: "Generating episode audio…",
    TRANSCRIBING: "Transcribing audio…",
    GENERATING_METADATA: "Writing title/description/keywords…",
    DONE: "Finalizing…"
  }[step] ?? "Processing…";
  return /* @__PURE__ */ jsxs("div", {
    className: "rounded-lg bg-gray-100 p-6 dark:bg-gray-800",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex items-center gap-3",
      children: [/* @__PURE__ */ jsx(Spinner, {
        showSpinner: true,
        size: 18,
        className: "text-gray-500"
      }), /* @__PURE__ */ jsx(H6, {
        as: "h3",
        children: stepLabel
      })]
    }), /* @__PURE__ */ jsx(Paragraph, {
      className: "mt-2 text-gray-500 dark:text-slate-400",
      children: `This may take a bit. You can undo if you want to re-record right away.`
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      action: recordingFormActionPath,
      className: "mt-6",
      preventScrollReset: true,
      children: [/* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "intent",
        value: "undo-episode-draft"
      }), /* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "callId",
        value: callId
      }), /* @__PURE__ */ jsx(Button, {
        type: "submit",
        variant: "secondary",
        children: "Undo and re-record"
      })]
    })]
  });
}
function DraftEditor({
  callId,
  draft,
  callNotes,
  callTitle
}) {
  const dc = useDoubleCheck();
  const submit = useSubmit();
  const disabled = draft.status !== "READY";
  function handleDraftFormSubmit(event) {
    const submitter = event.nativeEvent instanceof SubmitEvent ? event.nativeEvent.submitter : null;
    if (submitter instanceof HTMLButtonElement && submitter.name === "intent" && submitter.value === "publish-episode-draft") {
      return;
    }
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (submitter instanceof HTMLButtonElement && submitter.name) {
      formData.set(submitter.name, submitter.value);
    } else {
      formData.set("intent", "update-episode-draft");
    }
    submit(formData, {
      method: "post",
      action: recordingFormActionPath,
      preventScrollReset: true
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-6",
    children: [draft.hasEpisodeAudio && draft.episodeAudioUrl ? /* @__PURE__ */ jsxs("div", {
      className: "rounded-lg bg-gray-100 p-4 dark:bg-gray-800",
      children: [/* @__PURE__ */ jsx(H6, {
        as: "h3",
        className: "mb-3",
        children: "Episode audio preview"
      }), /* @__PURE__ */ jsx("audio", {
        src: draft.episodeAudioUrl,
        controls: true,
        preload: "metadata",
        className: "w-full"
      })]
    }) : null, /* @__PURE__ */ jsxs(Form, {
      method: "post",
      action: recordingFormActionPath,
      onSubmit: handleDraftFormSubmit,
      children: [/* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "callId",
        value: callId
      }), /* @__PURE__ */ jsx("button", {
        hidden: true,
        type: "submit",
        name: "intent",
        value: "update-episode-draft"
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "draft-call-title",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Call title"
        }), /* @__PURE__ */ jsx("input", {
          id: "draft-call-title",
          name: "callTitle",
          defaultValue: callTitle,
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          required: true,
          disabled
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "draft-title",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Episode title"
        }), /* @__PURE__ */ jsx("input", {
          id: "draft-title",
          name: "title",
          defaultValue: draft.title ?? "",
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          required: true,
          disabled
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "draft-description",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Description"
        }), /* @__PURE__ */ jsx("textarea", {
          id: "draft-description",
          name: "description",
          defaultValue: draft.description ?? "",
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          rows: 6,
          required: true,
          disabled
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "draft-notes",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Caller notes"
        }), /* @__PURE__ */ jsx("textarea", {
          id: "draft-notes",
          name: "notes",
          defaultValue: callNotes ?? "",
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          rows: 4,
          disabled
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "draft-keywords",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Keywords (comma separated)"
        }), /* @__PURE__ */ jsx("input", {
          id: "draft-keywords",
          name: "keywords",
          defaultValue: draft.keywords ?? "",
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          required: true,
          disabled
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("label", {
          htmlFor: "draft-transcript",
          className: "mb-2 inline-block text-lg text-gray-500 dark:text-slate-500",
          children: "Transcript"
        }), /* @__PURE__ */ jsx("textarea", {
          id: "draft-transcript",
          name: "transcript",
          defaultValue: draft.transcript ?? "",
          className: "focus-ring w-full rounded-lg bg-gray-100 px-6 py-4 text-lg font-medium text-black dark:bg-gray-800 dark:text-white",
          rows: 10,
          required: true,
          disabled
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-wrap gap-3",
        children: [/* @__PURE__ */ jsx(Button, {
          type: "submit",
          name: "intent",
          value: "update-episode-draft",
          disabled,
          children: "Save changes"
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          name: "intent",
          value: "publish-episode-draft",
          disabled,
          ...dc.getButtonProps(),
          children: dc.doubleCheck ? "Publish (sure?)" : "Publish episode"
        })]
      })]
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      action: recordingFormActionPath,
      preventScrollReset: true,
      children: [/* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "intent",
        value: "undo-episode-draft"
      }), /* @__PURE__ */ jsx("input", {
        type: "hidden",
        name: "callId",
        value: callId
      }), /* @__PURE__ */ jsx(Button, {
        type: "submit",
        variant: "secondary",
        children: "Record new response"
      })]
    })]
  });
}
const draftStatusResourcePath = "/resources/calls/draft-status";
const draftResponseAudioResourcePath = "/resources/calls/draft-response-audio";
function RecordingDetailScreen({
  data: data2
}) {
  const [responseAudio, setResponseAudio] = React.useState(null);
  const [restoredResponseAudio, setRestoredResponseAudio] = React.useState(null);
  const [isRestoringResponseAudio, setIsRestoringResponseAudio] = React.useState(false);
  const [restoreResponseAudioError, setRestoreResponseAudioError] = React.useState(null);
  const [polledStatus, setPolledStatus] = React.useState(null);
  const user = useUser();
  const draft = data2.call.episodeDraft;
  const revalidator = useRevalidator();
  React.useEffect(() => {
    setPolledStatus(null);
    setRestoredResponseAudio(null);
    setRestoreResponseAudioError(null);
    setIsRestoringResponseAudio(false);
  }, [draft?.id]);
  async function restoreSavedResponseAudio() {
    if (isRestoringResponseAudio) return;
    setRestoreResponseAudioError(null);
    setIsRestoringResponseAudio(true);
    try {
      const res = await fetch(`${draftResponseAudioResourcePath}?callId=${data2.call.id}`);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text.trim() || "Unable to restore the saved recording.");
      }
      const mime = res.headers.get("Content-Type") ?? "audio/webm";
      const bytes = await res.arrayBuffer();
      setRestoredResponseAudio(new Blob([bytes], {
        type: mime
      }));
    } catch (error) {
      setRestoreResponseAudioError(error instanceof Error ? error.message : "Unable to restore the saved recording.");
    } finally {
      setIsRestoringResponseAudio(false);
    }
  }
  useInterval(async () => {
    if (revalidator.state !== "idle") return;
    await revalidator.revalidate();
  }, data2.call.callerTranscriptStatus === "PROCESSING" ? 1500 : 0);
  useInterval(async () => {
    if (revalidator.state !== "idle") return;
    try {
      const res = await fetch(`${draftStatusResourcePath}?callId=${data2.call.id}`);
      if (!res.ok) return;
      const json2 = await res.json();
      setPolledStatus(json2);
      if (json2.status !== "PROCESSING") {
        void revalidator.revalidate();
      }
    } catch {
    }
  }, draft?.status === "PROCESSING" ? 1500 : 0);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-6",
    children: [data2.error ? /* @__PURE__ */ jsx("p", {
      role: "alert",
      className: "rounded-lg bg-red-100 p-4 text-red-700",
      children: data2.error
    }) : null, /* @__PURE__ */ jsx(CallListing, {
      call: data2.call
    }), /* @__PURE__ */ jsxs("div", {
      className: "rounded-lg border-2 border-dashed border-gray-300 p-6 lg:p-8 dark:border-gray-600",
      children: [/* @__PURE__ */ jsx(H6, {
        as: "h3",
        className: "mb-4",
        children: "Episode draft"
      }), /* @__PURE__ */ jsx(Paragraph, {
        className: "mb-6 text-gray-500 dark:text-slate-400",
        children: `You can review the caller transcript first, then record your response. The app will generate full episode audio and metadata before publish.`
      }), draft ? restoredResponseAudio ? /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-4",
        children: [/* @__PURE__ */ jsx(Paragraph, {
          className: "text-gray-500 dark:text-slate-400",
          children: `Saved recording restored. Review it and try generating the draft again, or record a new response instead.`
        }), /* @__PURE__ */ jsx(ResponseAudioDraftForm, {
          audio: restoredResponseAudio,
          callId: data2.call.id,
          callNotes: data2.call.notes,
          callTitle: data2.call.title
        }), /* @__PURE__ */ jsxs(Form, {
          method: "post",
          action: recordingFormActionPath,
          preventScrollReset: true,
          children: [/* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "intent",
            value: "undo-episode-draft"
          }), /* @__PURE__ */ jsx("input", {
            type: "hidden",
            name: "callId",
            value: data2.call.id
          }), /* @__PURE__ */ jsx(Button, {
            type: "submit",
            variant: "secondary",
            children: "Record new response"
          })]
        })]
      }) : draft.status === "PROCESSING" && polledStatus?.status !== "ERROR" || polledStatus?.status === "READY" && draft.status !== "READY" ? /* @__PURE__ */ jsx(DraftPending, {
        callId: data2.call.id,
        step: polledStatus?.status === "READY" ? "DONE" : polledStatus?.step ?? draft.step
      }) : draft.status === "ERROR" || polledStatus?.status === "ERROR" ? /* @__PURE__ */ jsxs("div", {
        className: "rounded-lg bg-red-50 p-6 dark:bg-red-950/30",
        children: [/* @__PURE__ */ jsx(H6, {
          as: "h3",
          className: "mb-2",
          children: `Draft generation failed`
        }), /* @__PURE__ */ jsx(Paragraph, {
          className: "whitespace-pre-wrap text-red-700 dark:text-red-300",
          children: polledStatus?.errorMessage ?? draft.errorMessage ?? "Unknown error"
        }), restoreResponseAudioError ? /* @__PURE__ */ jsx(Paragraph, {
          className: "mt-4 whitespace-pre-wrap text-red-700 dark:text-red-300",
          children: restoreResponseAudioError
        }) : null, /* @__PURE__ */ jsxs("div", {
          className: "mt-6 flex flex-wrap gap-3",
          children: [draft.hasResponseAudio ? /* @__PURE__ */ jsx(Button, {
            type: "button",
            onClick: () => {
              void restoreSavedResponseAudio();
            },
            disabled: isRestoringResponseAudio,
            children: isRestoringResponseAudio ? "Restoring saved recording..." : "Try again with saved recording"
          }) : null, /* @__PURE__ */ jsxs(Form, {
            method: "post",
            action: recordingFormActionPath,
            preventScrollReset: true,
            children: [/* @__PURE__ */ jsx("input", {
              type: "hidden",
              name: "intent",
              value: "undo-episode-draft"
            }), /* @__PURE__ */ jsx("input", {
              type: "hidden",
              name: "callId",
              value: data2.call.id
            }), /* @__PURE__ */ jsx(Button, {
              type: "submit",
              variant: "secondary",
              children: "Undo and re-record"
            })]
          })]
        })]
      }) : /* @__PURE__ */ jsx(DraftEditor, {
        callId: data2.call.id,
        draft,
        callNotes: data2.call.notes,
        callTitle: data2.call.title
      }) : responseAudio ? /* @__PURE__ */ jsx(ResponseAudioDraftForm, {
        audio: responseAudio,
        callId: data2.call.id,
        callNotes: data2.call.notes,
        callTitle: data2.call.title
      }) : /* @__PURE__ */ jsx("div", {
        className: "flex flex-col gap-6",
        children: /* @__PURE__ */ jsx(CallRecorder, {
          onRecordingComplete: (recording) => setResponseAudio(recording),
          team: user.team
        })
      })]
    })]
  }, data2.call.id);
}
const $callId = UNSAFE_withComponentProps(function RecordDetailScreenContainer({
  loaderData: data2
}) {
  return /* @__PURE__ */ jsx(RecordingDetailScreen, {
    data: data2
  }, data2.call.id);
});
export {
  $callId as default,
  handle,
  loader
};
