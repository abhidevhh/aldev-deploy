import { UNSAFE_withComponentProps, useParams } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const projectPages = {
  "traffic-light-ai": {
    title: "AI Traffic Light Control System",
    sections: ["Built a YOLOv8-powered adaptive traffic system with ANPR and violation reporting.", "Used DeepSORT for vehicle tracking and OCR for license plate extraction.", "Implemented speed estimation, traffic optimization, and automated email alerts."]
  },
  "isl-translation": {
    title: "Indian Sign Language Translation",
    sections: ["Developed a clip-level Transformer framework for continuous ISL translation.", "Focused on spatiotemporal feature learning with 3D CNN embeddings.", "Improved BLEU-4 and ROUGE-L scores significantly over baseline methods."]
  },
  "goquant-cpp": {
    title: "GoQuant C++ Strategy Pipeline",
    sections: ["Designed a high-performance low-latency trading strategy engine.", "Built live-to-test workflow architecture with optimized backtesting.", "Focused on memory-efficient C++ execution and deterministic replay."]
  }
};
const projects_ = UNSAFE_withComponentProps(function ProjectDetailPage() {
  const {
    slug
  } = useParams();
  const project = slug ? projectPages[slug] : null;
  if (!project) {
    return /* @__PURE__ */ jsx("main", {
      className: "min-h-screen bg-slate-950 px-6 py-20 text-white",
      children: /* @__PURE__ */ jsx("h1", {
        className: "text-4xl font-bold",
        children: "Project not found"
      })
    });
  }
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-950 px-6 py-20 text-white",
    children: /* @__PURE__ */ jsxs("section", {
      className: "mx-auto max-w-4xl",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm uppercase tracking-[0.3em] text-slate-400",
        children: "Engineering Case Study"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-4 text-5xl font-bold",
        children: project.title
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-10 space-y-6",
        children: project.sections.map((section, index) => /* @__PURE__ */ jsx("div", {
          className: "rounded-2xl border border-slate-800 p-6",
          children: /* @__PURE__ */ jsx("p", {
            className: "leading-8 text-slate-400",
            children: section
          })
        }, index))
      })]
    })
  });
});
export {
  projects_ as default
};
//# sourceMappingURL=projects.-CQE7GA70.js.map
