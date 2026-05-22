import { UNSAFE_withComponentProps } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const projects = [{
  title: "AI Traffic Light Control System",
  description: "YOLOv8-powered adaptive traffic signal optimization with ANPR, speed detection, and automated violation reporting."
}, {
  title: "Indian Sign Language Translation",
  description: "Clip-level spatiotemporal Transformer framework for continuous ISL translation with strong BLEU and ROUGE scores."
}, {
  title: "GoQuant C++ Strategy Pipeline",
  description: "Low-latency C++ live-to-test quantitative trading strategy pipeline built for performance-critical backtesting."
}, {
  title: "AI Recipe Generator",
  description: "React + OpenAI powered intelligent recipe generation app using ingredient prompts and optional image understanding."
}, {
  title: "GAN-Based AI Art",
  description: "Creative generative art platform using CNNs, GANs, and TensorFlow for multi-style artwork generation."
}, {
  title: "Smart Gmail Cleanup Tool",
  description: "InboxKit intelligently categorizes, summarizes, and automates Gmail cleanup workflows using AI."
}];
const projects_default = UNSAFE_withComponentProps(function ProjectsPage() {
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-950 text-white px-6 py-20",
    children: /* @__PURE__ */ jsxs("section", {
      className: "max-w-6xl mx-auto",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-5xl font-bold",
        children: "Projects"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-4 max-w-3xl text-slate-400 text-lg",
        children: "A curated portfolio of AI systems, machine learning research, and full-stack applications I’ve built across computer vision, NLP, quantitative finance, and developer tooling."
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-12 grid gap-6 md:grid-cols-2",
        children: projects.map((project) => /* @__PURE__ */ jsxs("div", {
          className: "rounded-2xl border border-slate-800 bg-slate-900/40 p-6",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold",
            children: project.title
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-3 leading-7 text-slate-400",
            children: project.description
          })]
        }, project.title))
      })]
    })
  });
});
export {
  projects_default as default
};
//# sourceMappingURL=projects-r0qkb082.js.map
