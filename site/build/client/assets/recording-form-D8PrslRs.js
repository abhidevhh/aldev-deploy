import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useMachine } from "@xstate/react";
import gsap from "gsap";
import * as React from "react";
import { useRef, useEffect } from "react";
import { setup, assign, fromCallback, fromPromise, sendTo } from "xstate";
import { B as assertNonNull, q as getOptionalTeam, z as getStringFormValue } from "./misc-DM3BUXHg.js";
import { a as Button, L as LinkButton } from "./button-B-8RrXF2.js";
import { u as MicrophoneIcon, Z as SquareIcon, F as PauseIcon, T as TriangleIcon } from "./icons-Xl-Om4A1.js";
import { T as Tag } from "./tag-Bs3TtQGk.js";
import { P as Paragraph } from "./typography-DDpAXXrz.js";
import { useNavigate, useRevalidator } from "react-router";
import { clsx } from "clsx";
import { ErrorBoundary } from "react-error-boundary";
import { b as getAbhiCallEpisodeArtworkAvatar, c as getAbhiCallEpisodeArtworkUrl, e as getErrorForNotes, f as getErrorForTitle, h as abhiCallFieldConstraints } from "./abhi-call-HST9AF8V.js";
import { d as getAvatar } from "./misc-react-D8yAGzlT.js";
import { C as CharacterCountdown } from "./character-countdown-D-g85829.js";
import { F as Field } from "./form-elements-D3OfaKUp.js";
import { c as useRootData } from "./root-BtDGpB2R.js";
function useInterval(callback, delay) {
  const savedCallback = useRef(null);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay > 0) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
  function tick() {
    if (savedCallback.current) {
      savedCallback.current();
    }
  }
}
const MIN_BAR_HEIGHT = 2;
const MAX_BAR_HEIGHT = 100;
const SHIFT_PER_SECOND = 130;
const SHIFT_DELAY = 0.05;
const GROW_SPEED = 0.25;
const GROW_DELAY = 0;
const BAR_WIDTH = 4;
const colorsByTeam = {
  RED: ["#FF9393", "#FF4545", "#BA0808"],
  BLUE: ["#8CCAFE", "#36A4FF", "#018AFB"],
  YELLOW: ["#FFE792", "#FFD644", "#BA9308"],
  UNKNOWN: ["#C4C4C4", "#8C8C8C", "#4C4C4C"]
};
const theme = {
  minBarHeight: MIN_BAR_HEIGHT,
  maxBarHeight: MAX_BAR_HEIGHT,
  shiftPerSecond: SHIFT_PER_SECOND,
  shiftDelay: SHIFT_DELAY,
  growSpeed: GROW_SPEED,
  growDelay: GROW_DELAY,
  barWidth: BAR_WIDTH
};
function stopMediaRecorder(mediaRecorder) {
  if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
  for (const track of mediaRecorder.stream.getAudioTracks()) {
    if (track.enabled) track.stop();
  }
  mediaRecorder.ondataavailable = null;
}
const recorderMachine = setup({
  types: {
    context: {},
    events: {}
  },
  actors: {
    getDevices: fromPromise(async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(({ kind }) => kind === "audioinput");
    }),
    mediaRecorder: fromCallback(
      ({
        sendBack,
        receive,
        input
      }) => {
        let cancelled = false;
        let mediaRecorder;
        async function go() {
          const chunks = [];
          const deviceId = input.selectedAudioDevice?.deviceId;
          const audio = deviceId ? { deviceId: { exact: deviceId } } : true;
          const mediaStream = await window.navigator.mediaDevices.getUserMedia({
            audio
          });
          if (cancelled) {
            for (const track of mediaStream.getAudioTracks()) track.stop();
            return;
          }
          mediaRecorder = new MediaRecorder(mediaStream);
          sendBack({ type: "mediaRecorderCreated", mediaRecorder });
          mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
            if (mediaRecorder?.state === "inactive") {
              sendBack({
                type: "chunks",
                blob: new Blob(chunks, {
                  type: "audio/mp3"
                })
              });
            }
          };
          mediaRecorder.start();
          receive((event) => {
            if (!mediaRecorder) return;
            if (event.type === "pause") {
              mediaRecorder.pause();
            } else if (event.type === "resume") {
              mediaRecorder.resume();
            } else if (event.type === "stop") {
              mediaRecorder.stop();
            }
          });
        }
        void go();
        return () => {
          cancelled = true;
          if (mediaRecorder) stopMediaRecorder(mediaRecorder);
        };
      }
    )
  },
  actions: {
    assignAudioDevices: assign({
      audioDevices: ({ context, event }) => "output" in event ? event.output : context.audioDevices
    }),
    assignSelectedAudioDevice: assign({
      selectedAudioDevice: ({ context, event }) => event.type === "selection" ? event.selectedAudioDevice : context.selectedAudioDevice
    }),
    assignMediaRecorder: assign({
      mediaRecorder: ({ context, event }) => event.type === "mediaRecorderCreated" ? event.mediaRecorder : context.mediaRecorder
    }),
    assignAudioBlob: assign({
      audioBlob: ({ context, event }) => event.type === "chunks" ? event.blob : context.audioBlob
    })
  }
}).createMachine({
  id: "recorder",
  context: {
    mediaRecorder: null,
    audioDevices: [],
    selectedAudioDevice: null,
    audioBlob: null
  },
  initial: "gettingDevices",
  states: {
    gettingDevices: {
      invoke: {
        src: "getDevices",
        onDone: { target: "ready", actions: "assignAudioDevices" },
        onError: { target: "error" }
      }
    },
    selecting: {
      on: {
        selection: { target: "ready", actions: "assignSelectedAudioDevice" }
      }
    },
    error: {
      on: {
        retry: "gettingDevices"
      }
    },
    ready: {
      on: {
        changeDevice: "selecting",
        start: "recording"
      }
    },
    recording: {
      invoke: {
        src: "mediaRecorder",
        id: "mediaRecorder",
        input: ({ context }) => ({
          selectedAudioDevice: context.selectedAudioDevice
        })
      },
      initial: "playing",
      states: {
        playing: {
          on: {
            mediaRecorderCreated: {
              actions: ["assignMediaRecorder"]
            },
            pause: {
              target: "paused",
              actions: sendTo("mediaRecorder", { type: "pause" })
            },
            stop: "stopping"
          }
        },
        paused: {
          on: {
            resume: {
              target: "playing",
              actions: sendTo("mediaRecorder", { type: "resume" })
            },
            stop: "stopping"
          }
        },
        stopping: {
          entry: sendTo("mediaRecorder", { type: "stop" }),
          on: {
            chunks: { target: "#recorder.done", actions: "assignAudioBlob" }
          }
        }
      }
    },
    done: {
      on: {
        restart: "ready"
      }
    }
  }
});
function CallRecorder({
  onRecordingComplete,
  team
}) {
  const [state, send] = useMachine(recorderMachine);
  const [timer, setTimer] = React.useState(0);
  const metadataRef = React.useRef([]);
  const playbackRef = React.useRef(null);
  const { audioBlob } = state.context;
  const audioURL = React.useMemo(() => {
    if (audioBlob) {
      return window.URL.createObjectURL(audioBlob);
    } else {
      return null;
    }
  }, [audioBlob]);
  useInterval(
    () => {
      setTimer(timer + 1);
    },
    state.matches({ recording: "playing" }) ? 1e3 : 0
  );
  React.useEffect(() => {
    if (state.matches("done")) {
      setTimer(0);
    }
  }, [state]);
  let deviceSelection = null;
  if (state.matches("gettingDevices")) {
    deviceSelection = /* @__PURE__ */ jsx(Paragraph, { children: "Loading devices" });
  }
  if (state.matches("selecting")) {
    deviceSelection = /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Paragraph, { className: "mb-8", children: "Select your device:" }),
      /* @__PURE__ */ jsx("ul", { children: state.context.audioDevices.length ? state.context.audioDevices.map((device) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        Tag,
        {
          onClick: () => {
            send({
              type: "selection",
              selectedAudioDevice: device
            });
          },
          tag: device.label,
          selected: state.context.selectedAudioDevice === device
        }
      ) }, device.deviceId)) : "No audio devices found" })
    ] });
  }
  if (state.matches("error")) {
    deviceSelection = /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Paragraph, { className: "mb-8", children: "An error occurred while loading recording devices." }),
      /* @__PURE__ */ jsx(Button, { onClick: () => send({ type: "retry" }), children: "Try again" })
    ] });
  }
  let audioPreview = null;
  if (state.matches("done")) {
    assertNonNull(
      audioURL,
      `The state machine is in "stopped" state but there's no audioURL. This should be impossible.`
    );
    assertNonNull(
      audioBlob,
      `The state machine is in "stopped" state but there's no audioBlob. This should be impossible.`
    );
    audioPreview = /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("audio", { src: audioURL, controls: true, ref: playbackRef, preload: "metadata" }) }),
      /* @__PURE__ */ jsx(
        StreamVis,
        {
          metadata: metadataRef,
          replay: true,
          paused: state.matches({ recording: "paused" }),
          playbackRef,
          team
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsx(Button, { size: "medium", onClick: () => onRecordingComplete(audioBlob), children: "Accept" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "medium",
            variant: "secondary",
            onClick: () => send({ type: "restart" }),
            children: "Re-record"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      state.matches("ready") ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-12", children: [
        /* @__PURE__ */ jsxs(Paragraph, { children: [
          /* @__PURE__ */ jsx("span", { id: "device-label", children: `Current recording device: ` }),
          /* @__PURE__ */ jsx(
            LinkButton,
            {
              onClick: () => send({ type: "changeDevice" }),
              className: "truncate",
              style: { maxWidth: "80vw" },
              "aria-labelledby": "device-label",
              children: state.context.selectedAudioDevice?.label ?? "default"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "medium", onClick: () => send({ type: "start" }), children: [
          /* @__PURE__ */ jsx(MicrophoneIcon, {}),
          /* @__PURE__ */ jsx("span", { children: "Start recording" })
        ] })
      ] }) : null,
      deviceSelection
    ] }),
    state.matches("recording") && state.context.mediaRecorder ? /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        StreamVis,
        {
          metadata: metadataRef,
          stream: state.context.mediaRecorder.stream,
          paused: state.matches({ recording: "paused" }),
          playbackRef,
          team
        }
      ),
      /* @__PURE__ */ jsx(RecordingTime, { timer })
    ] }) : null,
    state.matches({ recording: "playing" }) ? /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxs(Button, { size: "medium", onClick: () => send({ type: "stop" }), children: [
        /* @__PURE__ */ jsx(SquareIcon, {}),
        " ",
        /* @__PURE__ */ jsx("span", { children: "Stop" })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "medium",
          variant: "secondary",
          onClick: () => send({ type: "pause" }),
          children: [
            /* @__PURE__ */ jsx(PauseIcon, {}),
            " ",
            /* @__PURE__ */ jsx("span", { children: "Pause" })
          ]
        }
      )
    ] }) : state.matches({ recording: "paused" }) ? /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxs(Button, { size: "medium", onClick: () => send({ type: "stop" }), children: [
        /* @__PURE__ */ jsx(SquareIcon, {}),
        " ",
        /* @__PURE__ */ jsx("span", { children: "Stop" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { size: "medium", onClick: () => send({ type: "resume" }), children: [
        /* @__PURE__ */ jsx(TriangleIcon, {}),
        " ",
        /* @__PURE__ */ jsx("span", { children: "Resume" })
      ] })
    ] }) : state.matches({ recording: "stopping" }) ? /* @__PURE__ */ jsx(Paragraph, { children: "Processing..." }) : null,
    audioPreview
  ] });
}
const generateGradient = ({
  width,
  height,
  context,
  colors
}) => {
  const fillStyle = context.createLinearGradient(
    width / 2,
    0,
    width / 2,
    height
  );
  fillStyle.addColorStop(0, colors[2]);
  fillStyle.addColorStop(1, colors[2]);
  fillStyle.addColorStop(0.35, colors[1]);
  fillStyle.addColorStop(0.65, colors[1]);
  fillStyle.addColorStop(0.5, colors[0]);
  return fillStyle;
};
function redraw({
  canvas,
  nodes
}) {
  const { minBarHeight, barWidth } = theme;
  const canvasCtx = canvas.getContext("2d");
  function draw() {
    if (!canvasCtx) return;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let n = 0; n < nodes.length; n++) {
      const node = nodes[n];
      if (!node) continue;
      canvasCtx.fillRect(
        node.x,
        HEIGHT / 2 - Math.max(minBarHeight, node.size) / 2,
        barWidth,
        Math.max(minBarHeight, node.size)
      );
    }
  }
  return draw;
}
const addToTimeline = ({
  timeline,
  width,
  nodes,
  onStart,
  size,
  insert
}) => {
  const { shiftDelay, barWidth, growDelay, growSpeed, shiftPerSecond } = theme;
  const newNode = {
    growth: size,
    size: 0,
    x: width
  };
  nodes.push(newNode);
  timeline.add(
    gsap.timeline().to(newNode, {
      size: newNode.growth,
      delay: growDelay,
      duration: growSpeed
    }).to(
      newNode,
      {
        delay: shiftDelay,
        x: `-=${width + barWidth}`,
        duration: width / shiftPerSecond,
        ease: "none",
        onStart
      },
      0
    ),
    insert
  );
};
function visualize({
  canvas,
  stream,
  nodes,
  metaTrack,
  timeline,
  start
}) {
  const { minBarHeight, maxBarHeight, shiftDelay, barWidth } = theme;
  const audioCtx = new AudioContext();
  const canvasCtx = canvas.getContext("2d");
  let analyser;
  let bufferLength;
  let source;
  let add;
  let dataArray;
  const padCount = nodes.length;
  timeline.time(start);
  timeline.play();
  function draw() {
    if (!canvasCtx) return;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    if (add) {
      add = false;
      let avg = 0;
      let min = 0;
      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i];
        if (value === void 0) continue;
        if (!min || value < min) min = value;
        avg += value;
      }
      const SIZE = Math.floor(
        gsap.utils.mapRange(
          0,
          maxBarHeight,
          0,
          HEIGHT,
          Math.max(avg / bufferLength - min, minBarHeight)
        )
      );
      addToTimeline({
        size: SIZE,
        width: WIDTH,
        nodes,
        timeline,
        insert: start + (nodes.length - padCount) * shiftDelay,
        onStart: () => add = true
      });
      metaTrack.current = [...metaTrack.current, SIZE];
    }
    for (let n = 0; n < nodes.length; n++) {
      const node = nodes[n];
      if (!node) continue;
      canvasCtx.fillRect(
        node.x,
        HEIGHT / 2 - Math.max(minBarHeight, node.size) / 2,
        barWidth,
        Math.max(minBarHeight, node.size)
      );
    }
  }
  if (stream) {
    add = true;
    source = audioCtx.createMediaStreamSource(stream);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);
    return draw;
  }
}
const padTimeline = ({
  canvas,
  nodes,
  timeline,
  startPoint
}) => {
  const { minBarHeight, shiftPerSecond, shiftDelay, barWidth } = theme;
  const padCount = Math.floor(canvas.width / barWidth);
  for (let p = 0; p < padCount; p++) {
    addToTimeline({
      size: minBarHeight,
      width: canvas.width,
      nodes,
      timeline,
      insert: shiftDelay * p,
      onStart: () => {
      }
    });
  }
  startPoint.current = timeline.totalDuration() - canvas.width / shiftPerSecond;
};
function StreamVis({
  stream,
  paused = false,
  playbackRef,
  replay = false,
  team,
  metadata = { current: [] }
}) {
  const colors = colorsByTeam[getOptionalTeam(team)];
  const canvasRef = React.useRef(null);
  const nodesRef = React.useRef([]);
  const startRef = React.useRef(0);
  const drawRef = React.useRef(null);
  const timelineRef = React.useRef(null);
  React.useEffect(() => {
    let playbackControl;
    const updateTime = () => {
      const timeline = timelineRef.current;
      if (!timeline) return;
      if (!playbackControl) return;
      timeline.time(startRef.current + playbackControl.currentTime);
      if (playbackControl.seeking) {
        timeline.play();
      } else if (playbackControl.paused) {
        timeline.pause();
      } else {
        timeline.play();
      }
    };
    if (playbackRef.current) {
      playbackControl = playbackRef.current;
      playbackControl.addEventListener("play", updateTime);
      playbackControl.addEventListener("pause", updateTime);
      playbackControl.addEventListener("seeking", updateTime);
      playbackControl.addEventListener("seeked", updateTime);
    }
    return () => {
      if (playbackControl) {
        playbackControl.removeEventListener("play", updateTime);
        playbackControl.removeEventListener("pause", updateTime);
        playbackControl.removeEventListener("seeking", updateTime);
        playbackControl.removeEventListener("seeked", updateTime);
      }
    };
  }, [playbackRef]);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    canvasCtx.fillStyle = generateGradient({
      width: canvas.width,
      height: canvas.height,
      context: canvasCtx,
      colors
    });
  }, [colors]);
  React.useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (paused) {
      timeline.pause();
    } else {
      timeline.play();
    }
  }, [paused]);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const nodes = nodesRef.current;
    if (!canvas) return;
    const timeline = gsap.timeline({ paused: replay });
    timelineRef.current = timeline;
    padTimeline({
      canvas,
      nodes,
      timeline,
      startPoint: startRef
    });
  }, [replay]);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const timeline = timelineRef.current;
    if (!canvas || !replay || !timeline) return;
    metadata.current.forEach((growth, index) => {
      addToTimeline({
        size: growth,
        width: canvas.width,
        nodes: nodesRef.current,
        timeline,
        insert: startRef.current + theme.shiftDelay * index,
        onStart: () => {
        }
      });
    });
    timeline.time(startRef.current);
  }, [replay, metadata]);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const timeline = timelineRef.current;
    const nodes = nodesRef.current;
    if (!timeline || !canvas) return;
    if (canvasRef.current && !replay) {
      drawRef.current = visualize({
        canvas,
        stream,
        nodes,
        metaTrack: metadata,
        timeline,
        start: startRef.current
      });
    } else if (replay && canvasRef.current) {
      drawRef.current = redraw({ canvas, nodes });
    }
    if (drawRef.current) gsap.ticker.add(drawRef.current);
    return () => {
      if (timelineRef.current) timelineRef.current.pause(0);
      if (drawRef.current) gsap.ticker.remove(drawRef.current);
    };
  }, [stream, replay, metadata]);
  return /* @__PURE__ */ jsx("canvas", { className: "h-40 w-full", ref: canvasRef });
}
function RecordingTime({ timer }) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  let className = "";
  if (timer >= 90) className = "text-yellow-500";
  if (timer >= 120) className = "text-red-500";
  return /* @__PURE__ */ jsxs("div", { className, children: [
    "Duration: ",
    padTime(minutes),
    ":",
    padTime(seconds)
  ] });
}
function padTime(time) {
  const timeString = `${time}`;
  return timeString.padStart(2, "0");
}
const MAX_CACHE_ENTRIES = 50;
const imgCache = /* @__PURE__ */ new Map();
function imgSrc(src) {
  const cached = imgCache.get(src);
  if (cached) return cached;
  const promise = preloadImage(src);
  imgCache.set(src, promise);
  promise.catch(() => {
    if (imgCache.get(src) === promise) imgCache.delete(src);
  });
  if (imgCache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = imgCache.keys().next().value;
    if (typeof oldestKey === "string") imgCache.delete(oldestKey);
  }
  return promise;
}
function preloadImage(src) {
  if (typeof Image === "undefined") return Promise.resolve(src);
  if (!src) return Promise.resolve(src);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
    if (img.complete) {
      if (img.naturalWidth > 0) resolve(src);
      else reject(new Error(`Failed to preload image: ${src}`));
    }
  });
}
const AVATAR_SIZE = 1400;
function getHost(origin) {
  try {
    return new URL(origin).host;
  } catch {
    return origin.replace(/^https?:\/\//, "");
  }
}
function EpisodeArtworkPreview({
  title,
  email,
  firstName,
  team,
  origin,
  hasGravatar,
  isAnonymous,
  onAnonymousChange
}) {
  const [debouncedTitle, setDebouncedTitle] = React.useState(title);
  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedTitle(title), 350);
    return () => clearTimeout(timeout);
  }, [title]);
  const host = getHost(origin);
  const titleForPreview = debouncedTitle.trim() || "Your call AbhiDev episode";
  const avatar = React.useMemo(
    () => getAbhiCallEpisodeArtworkAvatar({
      isAnonymous,
      team,
      gravatarUrl: hasGravatar ? getAvatar(email, { size: AVATAR_SIZE, fallback: null }) : null
    }),
    [email, team, hasGravatar, isAnonymous]
  );
  const artworkUrl = React.useMemo(() => {
    return getAbhiCallEpisodeArtworkUrl({
      title: titleForPreview,
      url: `${host}/calls/00/00`,
      name: isAnonymous ? "- Anonymous" : `- ${firstName}`,
      avatar,
      avatarIsRound: hasGravatar && !isAnonymous,
      // 2x for a crisp UI preview (the element is ~260px wide).
      size: 520
    });
  }, [titleForPreview, host, firstName, avatar, hasGravatar, isAnonymous]);
  const tooltip = isAnonymous ? `Anonymous is enabled. Your call still shows up in Kent's admin with your info, but the published episode artwork uses a generic AbhiBuddy avatar instead of your photo.` : `If you check this, your call still shows up in Kent's admin with your info, but the published episode artwork will use a generic AbhiBuddy avatar instead of your photo.`;
  const tooltipId = React.useId();
  const tooltipWrapperRef = React.useRef(null);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  React.useEffect(() => {
    if (!isTooltipOpen) return;
    function onPointerDown(event) {
      const wrapper = tooltipWrapperRef.current;
      if (!wrapper) return;
      if (event.target instanceof Node && wrapper.contains(event.target)) return;
      setIsTooltipOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isTooltipOpen]);
  function handleTooltipPointerLeave() {
    const wrapper = tooltipWrapperRef.current;
    if (!wrapper) {
      setIsTooltipOpen(false);
      return;
    }
    const active = document.activeElement;
    if (active instanceof Node && wrapper.contains(active)) return;
    setIsTooltipOpen(false);
  }
  return /* @__PURE__ */ jsx("section", { className: "mb-10 rounded-lg bg-gray-100 p-6 dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-primary text-lg font-medium", children: "Episode artwork" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-gray-600 dark:text-slate-400", children: [
          `By default we use your avatar from `,
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://gravatar.com",
              target: "_blank",
              rel: "noreferrer noopener",
              className: "underlined font-medium",
              children: "Gravatar"
            }
          ),
          ` (based on your account email). We encourage you to use your own photo.`
        ] })
      ] }) }),
      hasGravatar ? null : /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-gray-600 dark:text-slate-400", children: [
        `No Gravatar found for `,
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: email }),
        `. The artwork will use AbhiBuddy unless you add an image on Gravatar.`
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "mt-5 flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            name: "anonymous",
            className: "mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600",
            checked: isAnonymous,
            onChange: (e) => onAnonymousChange(e.currentTarget.checked)
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-primary inline-flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Publish anonymously" }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                ref: tooltipWrapperRef,
                className: "relative inline-flex",
                onPointerEnter: () => setIsTooltipOpen(true),
                onPointerLeave: handleTooltipPointerLeave,
                onFocus: () => setIsTooltipOpen(true),
                onBlur: (event) => {
                  const wrapper = tooltipWrapperRef.current;
                  if (!wrapper) return;
                  const nextFocused = event.relatedTarget;
                  if (nextFocused instanceof Node && wrapper.contains(nextFocused)) {
                    return;
                  }
                  setIsTooltipOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "What does publish anonymously mean?",
                      "aria-describedby": isTooltipOpen ? tooltipId : void 0,
                      "aria-expanded": isTooltipOpen,
                      onClick: () => setIsTooltipOpen(true),
                      onKeyDown: (event) => {
                        if (event.key === "Escape") setIsTooltipOpen(false);
                      },
                      className: "text-primary inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs leading-none opacity-80 hover:opacity-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600",
                      children: "?"
                    }
                  ),
                  isTooltipOpen ? /* @__PURE__ */ jsx(
                    "span",
                    {
                      id: tooltipId,
                      role: "tooltip",
                      className: "absolute top-full left-0 z-20 mt-2 w-72 rounded-md bg-white p-3 text-sm text-gray-700 shadow-lg ring-1 ring-black/5 dark:bg-gray-900 dark:text-slate-200 dark:ring-white/10",
                      children: tooltip
                    }
                  ) : null
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm text-gray-600 dark:text-slate-400", children: `Recommended: leave this unchecked so we can feature your avatar.` })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-3 lg:w-[260px] lg:flex-none", children: [
      /* @__PURE__ */ jsx("p", { className: "text-primary text-sm font-medium", children: "Preview" }),
      /* @__PURE__ */ jsx("div", { className: "relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 shadow-sm dark:bg-gray-700", children: /* @__PURE__ */ jsx(
        EpisodeArtworkImg,
        {
          src: artworkUrl,
          alt: "Episode artwork preview",
          loading: "lazy",
          className: "h-full w-full object-cover"
        }
      ) })
    ] })
  ] }) });
}
function EpisodeArtworkImg({
  src,
  className,
  ...props
}) {
  const safeSrc = src ?? "";
  const [fallbackSrc, setFallbackSrc] = React.useState(safeSrc);
  const latestSrcRef = React.useRef(safeSrc);
  if (latestSrcRef.current !== safeSrc) {
    latestSrcRef.current = safeSrc;
  }
  const isPending = fallbackSrc !== safeSrc;
  const imgClassName = clsx(
    className,
    "transition-opacity",
    isPending ? "opacity-60" : "opacity-100"
  );
  function handleResolved(resolvedSrc) {
    if (resolvedSrc !== latestSrcRef.current) return;
    setFallbackSrc(resolvedSrc);
  }
  function handlePreloadError() {
    handleResolved(safeSrc);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("img", { src: fallbackSrc, ...props, className: imgClassName }),
    isPending ? /* @__PURE__ */ jsx(
      ErrorBoundary,
      {
        resetKeys: [safeSrc],
        onError: handlePreloadError,
        fallback: null,
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: null, children: /* @__PURE__ */ jsx(PreloadImage, { src: safeSrc, onResolved: handleResolved }) })
      }
    ) : null
  ] });
}
function PreloadImage({
  src,
  onResolved
}) {
  const loadedSrc = React.use(imgSrc(src));
  React.useEffect(() => {
    onResolved(loadedSrc);
  }, [loadedSrc, onResolved]);
  return null;
}
const recordingFormActionPath = "/resources/calls/save";
function getNavigationPathFromResponse(response) {
  if (!response.redirected || !response.url) return null;
  const redirectUrl = new URL(response.url, window.location.origin);
  return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`;
}
function isRecordingFormDataEqual(first, second) {
  if (first === second) return true;
  if (!first || !second) return false;
  return first.fields.title === second.fields.title && first.fields.notes === second.fields.notes && first.errors.generalError === second.errors.generalError && first.errors.audio === second.errors.audio && first.errors.title === second.errors.title && first.errors.notes === second.errors.notes;
}
function RecordingForm({
  audio,
  data,
  intent,
  callId
}) {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { requestInfo, user, userInfo } = useRootData();
  const flyPrimaryInstance = requestInfo.flyPrimaryInstance;
  const audioURL = React.useMemo(() => {
    return URL.createObjectURL(audio);
  }, [audio]);
  const [submissionData, setSubmissionData] = React.useState(data);
  const idBase = React.useId();
  const titleId = `${idBase}-title`;
  const titleCountdownId = `${titleId}-countdown`;
  const notesId = `${idBase}-notes`;
  const notesCountdownId = `${notesId}-countdown`;
  const [fieldValues, setFieldValues] = React.useState(() => ({
    title: data?.fields.title ?? "",
    notes: data?.fields.notes ?? ""
  }));
  const [fieldInteracted, setFieldInteracted] = React.useState(() => ({
    title: false,
    notes: false
  }));
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [requestError, setRequestError] = React.useState(null);
  const previousPropData = React.useRef(data);
  const abortControllerRef = React.useRef(null);
  React.useEffect(() => {
    return () => URL.revokeObjectURL(audioURL);
  }, [audioURL]);
  React.useEffect(() => {
    if (isRecordingFormDataEqual(previousPropData.current, data)) return;
    previousPropData.current = data;
    setSubmissionData(data);
    setFieldValues({
      title: data?.fields.title ?? "",
      notes: data?.fields.notes ?? ""
    });
    setFieldInteracted({ title: false, notes: false });
    setHasAttemptedSubmit(false);
  }, [data]);
  React.useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);
  function markInteracted(field) {
    setFieldInteracted(
      (prev) => prev[field] ? prev : { ...prev, [field]: true }
    );
  }
  function handleTextFieldChange(field) {
    return (event) => {
      const value = event.currentTarget.value;
      setFieldValues(
        (prev) => prev[field] === value ? prev : { ...prev, [field]: value }
      );
      setSubmissionData(
        (prev) => prev ? {
          ...prev,
          errors: {
            ...prev.errors,
            generalError: void 0,
            [field]: null
          }
        } : prev
      );
    };
  }
  function handleTextFieldBlur(field) {
    return () => markInteracted(field);
  }
  const clientErrors = React.useMemo(
    () => ({
      title: getErrorForTitle(fieldValues.title),
      notes: getErrorForNotes(fieldValues.notes)
    }),
    [fieldValues.title, fieldValues.notes]
  );
  const displayedErrors = {
    title: clientErrors.title ?? submissionData?.errors.title ?? null,
    notes: clientErrors.notes ?? submissionData?.errors.notes ?? null
  };
  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setRequestError(null);
    const form = new FormData(event.currentTarget);
    const title = getStringFormValue(form, "title") ?? "";
    setHasAttemptedSubmit(true);
    const notes = getStringFormValue(form, "notes") ?? "";
    setFieldValues({ title, notes });
    const preflightErrors = {
      title: getErrorForTitle(title),
      notes: getErrorForNotes(notes)
    };
    if (Object.values(preflightErrors).some(Boolean)) {
      return;
    }
    const reader = new FileReader();
    const handleLoadEnd = async () => {
      try {
        if (typeof reader.result !== "string") {
          setRequestError("Unable to read recording. Please try again.");
          return;
        }
        form.append("audio", reader.result);
        const body = new URLSearchParams();
        for (const [key, value] of form.entries()) {
          if (typeof value === "string") {
            body.append(key, value);
          }
        }
        const headers = new Headers({
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        });
        if (flyPrimaryInstance) {
          headers.set("fly-force-instance-id", flyPrimaryInstance);
        }
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        try {
          const response = await fetch(recordingFormActionPath, {
            method: "POST",
            body,
            headers,
            signal: abortController.signal
          });
          const redirectPath = getNavigationPathFromResponse(response);
          if (redirectPath) {
            await navigate(redirectPath);
            return;
          }
          if (response.ok) {
            await revalidator.revalidate();
            return;
          }
          const actionData = await response.json().catch(() => null);
          if (actionData && typeof actionData === "object") {
            setSubmissionData(actionData);
          } else {
            setRequestError("Something went wrong submitting your recording.");
          }
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }
          console.error("Unable to submit recording", error);
          setRequestError("Unable to submit recording. Please try again.");
        } finally {
          if (abortControllerRef.current === abortController) {
            abortControllerRef.current = null;
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    };
    reader.addEventListener("loadend", handleLoadEnd, { once: true });
    setIsSubmitting(true);
    try {
      reader.readAsDataURL(audio);
    } catch (error) {
      reader.removeEventListener("loadend", handleLoadEnd);
      console.error("Unable to read recording", error);
      setRequestError("Unable to read recording. Please try again.");
      setIsSubmitting(false);
    }
  }
  const generalError = submissionData?.errors.generalError || requestError;
  const audioError = submissionData?.errors.audio;
  const audioDescribedBy = [
    generalError ? "general-error-message" : null,
    audioError ? "audio-error-message" : null
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      generalError ? /* @__PURE__ */ jsx("p", { id: "general-error-message", className: "text-center text-red-500", children: generalError }) : null,
      audioURL ? /* @__PURE__ */ jsx(
        "audio",
        {
          src: audioURL,
          controls: true,
          preload: "metadata",
          "aria-describedby": audioDescribedBy || void 0
        }
      ) : "loading...",
      audioError ? /* @__PURE__ */ jsx("p", { id: "audio-error-message", className: "text-center text-red-600", children: audioError }) : null
    ] }),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "intent", value: intent }),
      callId ? /* @__PURE__ */ jsx("input", { type: "hidden", name: "callId", value: callId }) : null,
      intent === "create-call" && user && userInfo ? /* @__PURE__ */ jsx(
        EpisodeArtworkPreview,
        {
          title: fieldValues.title,
          email: user.email,
          firstName: user.firstName,
          team: user.team,
          origin: requestInfo.origin,
          hasGravatar: userInfo.avatar.hasGravatar,
          isAnonymous,
          onAnonymousChange: setIsAnonymous
        }
      ) : null,
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(
          Field,
          {
            id: titleId,
            name: "title",
            label: "Title",
            maxLength: abhiCallFieldConstraints.title.maxLength,
            onChange: handleTextFieldChange("title"),
            onBlur: handleTextFieldBlur("title"),
            value: fieldValues.title,
            additionalAriaDescribedBy: titleCountdownId,
            "aria-invalid": Boolean(displayedErrors.title) && (hasAttemptedSubmit || fieldInteracted.title),
            error: hasAttemptedSubmit || fieldInteracted.title ? displayedErrors.title : null,
            className: "mb-2"
          }
        ),
        /* @__PURE__ */ jsx(
          CharacterCountdown,
          {
            id: titleCountdownId,
            value: fieldValues.title,
            maxLength: abhiCallFieldConstraints.title.maxLength,
            warnAt: 10
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx(
          Field,
          {
            id: notesId,
            name: "notes",
            label: "Notes (optional)",
            type: "textarea",
            required: false,
            maxLength: abhiCallFieldConstraints.notes.maxLength,
            onChange: handleTextFieldChange("notes"),
            onBlur: handleTextFieldBlur("notes"),
            value: fieldValues.notes,
            additionalAriaDescribedBy: notesCountdownId,
            "aria-invalid": Boolean(displayedErrors.notes) && (hasAttemptedSubmit || fieldInteracted.notes),
            error: hasAttemptedSubmit || fieldInteracted.notes ? displayedErrors.notes : null,
            className: "mb-2"
          }
        ),
        /* @__PURE__ */ jsx(
          CharacterCountdown,
          {
            id: notesCountdownId,
            value: fieldValues.notes,
            maxLength: abhiCallFieldConstraints.notes.maxLength,
            warnAt: 100
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "mt-8", disabled: isSubmitting, children: isSubmitting ? "Submitting..." : "Submit Recording" })
    ] })
  ] });
}
export {
  CallRecorder as C,
  RecordingForm as R,
  getNavigationPathFromResponse as g,
  recordingFormActionPath as r,
  useInterval as u
};
//# sourceMappingURL=recording-form-D8PrslRs.js.map
