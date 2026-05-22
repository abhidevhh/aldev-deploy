import { UNSAFE_withComponentProps, useFetcher, Link } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { u as useTheme } from "./theme-D6IyWRbl.js";
import * as React from "react";
import { y as ChevronLeftIcon, F as PauseIcon, r as PlayIcon, x as ChevronRightIcon } from "./icons-Xl-Om4A1.js";
import "@conform-to/zod/v4";
import "cookie";
import "zod";
import "@epic-web/client-hints";
import "@epic-web/client-hints/color-scheme";
import "@epic-web/client-hints/time-zone";
import "@epic-web/invariant";
import "clsx";
const tracks = [
  { name: "Pulse Runner", src: "/music/Pulse Runner .mp3" },
  { name: "Pulse Runner 2 Formula Theme", src: "/music/Pulse Runner2formulatheme.mp3" },
  { name: "Echo Drift", src: "/music/Echo Drift.mp3" }
];
function MusicPlaylist() {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);
  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex);
  };
  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    playTrack(prevIndex);
  };
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        nextTrack();
      };
      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }
  }, [currentTrackIndex]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-transparent", children: [
    /* @__PURE__ */ jsx("audio", { ref: audioRef }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: prevTrack,
          className: "rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30",
          title: "Previous",
          children: /* @__PURE__ */ jsx(ChevronLeftIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: togglePlay,
          className: "rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30",
          title: isPlaying ? "Pause" : "Play",
          children: isPlaying ? /* @__PURE__ */ jsx(PauseIcon, { size: 16 }) : /* @__PURE__ */ jsx(PlayIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: nextTrack,
          className: "rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30",
          title: "Next",
          children: /* @__PURE__ */ jsx(ChevronRightIcon, {})
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-white ml-2 font-medium", children: tracks[currentTrackIndex].name })
    ] })
  ] });
}
const themeOptions = [{
  label: "Light",
  value: "light"
}, {
  label: "Dark",
  value: "dark"
}, {
  label: "Day",
  value: "day"
}, {
  label: "Red + Blue",
  value: "redblue"
}];
const _index = UNSAFE_withComponentProps(function HomePage() {
  const fetcher = useFetcher();
  const theme = useTheme();
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-primary text-primary transition-colors duration-500 px-6 py-20",
    children: [/* @__PURE__ */ jsxs("section", {
      id: "hero",
      className: "relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-secondary/20 shadow-2xl shadow-black/20",
      style: {
        backgroundImage: "url('/images/formula2aldev.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      children: [/* @__PURE__ */ jsxs("div", {
        className: "absolute inset-0",
        children: [/* @__PURE__ */ jsx("video", {
          className: "h-full w-full object-cover",
          src: "/videos/formula1aldev.mp4",
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute inset-0 bg-black/55"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative z-10 px-6 py-10 md:px-12 md:py-16 h-full flex flex-col justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-white",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm uppercase tracking-[0.35em] text-white/70",
            children: "Formula Experience"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-2 text-2xl font-bold md:text-3xl",
            children: "High Speed Racing"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-sm text-white/80 max-w-md",
            children: "Experience the thrill of Formula 1 racing with our immersive video and curated soundtrack."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "self-end",
          children: /* @__PURE__ */ jsx(MusicPlaylist, {})
        })]
      })]
    }), /* @__PURE__ */ jsxs("section", {
      id: "theme",
      className: "section-panel theme-panel mx-auto mt-16 max-w-6xl rounded-3xl border border-secondary/20 bg-primary/80 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm uppercase tracking-[0.3em] text-secondary",
            children: "Theme mode"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 text-3xl font-bold",
            children: "Select a color mode"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 max-w-2xl text-secondary",
            children: "Use the buttons below to change the page theme and keep the layout feeling material and structured."
          }), /* @__PURE__ */ jsxs("p", {
            className: "mt-3 text-sm text-secondary",
            children: ["Current mode: ", /* @__PURE__ */ jsx("strong", {
              children: theme
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
          children: /* @__PURE__ */ jsx(fetcher.Form, {
            method: "post",
            action: "/action/set-theme",
            className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
            children: themeOptions.map((option) => /* @__PURE__ */ jsx("button", {
              type: "submit",
              name: "theme",
              value: option.value,
              className: "rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-primary transition hover:bg-secondary/80",
              children: option.label
            }, option.value))
          })
        })]
      }), fetcher.state !== "idle" ? /* @__PURE__ */ jsx("div", {
        className: "mt-6 text-sm text-secondary",
        children: "Applying theme…"
      }) : null]
    }), /* @__PURE__ */ jsx("section", {
      id: "more",
      className: "mx-auto mt-16 max-w-6xl rounded-3xl border border-secondary/10 bg-secondary/10 p-10 text-primary shadow-lg shadow-black/5",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid gap-6 md:grid-cols-2",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold",
            children: "Ready to explore?"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 text-secondary",
            children: "Jump directly to the blog, portfolio, or about page from the home page structure."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid gap-3 sm:grid-cols-3",
          children: [/* @__PURE__ */ jsx(Link, {
            className: "rounded-2xl bg-primary/90 px-5 py-3 text-center text-sm font-semibold transition hover:bg-primary",
            to: "/blog",
            children: "Blog"
          }), /* @__PURE__ */ jsx(Link, {
            className: "rounded-2xl bg-primary/90 px-5 py-3 text-center text-sm font-semibold transition hover:bg-primary",
            to: "/courses",
            children: "Portfolio"
          }), /* @__PURE__ */ jsx(Link, {
            className: "rounded-2xl bg-primary/90 px-5 py-3 text-center text-sm font-semibold transition hover:bg-primary",
            to: "/about",
            children: "About"
          })]
        })]
      })
    })]
  });
});
export {
  _index as default
};
//# sourceMappingURL=_index-BHbO2k5V.js.map
