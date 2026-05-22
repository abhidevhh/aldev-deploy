import { UNSAFE_withComponentProps } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const works = [{
  title: "AI Traffic Light Control System",
  impact: "Built a YOLOv8-based adaptive traffic system with ANPR, violation detection, and automated reporting."
}, {
  title: "Indian Sign Language Translation",
  impact: "Developed a clip-level Transformer architecture for continuous ISL translation with strong benchmark scores."
}, {
  title: "GoQuant C++ Strategy Pipeline",
  impact: "Designed a high-performance low-latency quant trading pipeline for live-to-test strategy workflows."
}, {
  title: "AI Recipe Generator",
  impact: "Built a React + OpenAI application that generates recipes from ingredients and image prompts."
}, {
  title: "InboxKit Smart Gmail Cleanup",
  impact: "Created an AI-powered Gmail workflow automation and smart inbox categorization platform."
}];
const portfolio = UNSAFE_withComponentProps(function PortfolioPage() {
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-950 px-6 py-20 text-white",
    children: /* @__PURE__ */ jsxs("section", {
      className: "mx-auto max-w-6xl",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm uppercase tracking-[0.3em] text-slate-400",
        children: "Portfolio • Work • Case Studies"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-4 text-5xl font-bold",
        children: "Selected Work & Engineering Impact"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-6 max-w-3xl text-lg leading-8 text-slate-400",
        children: "A curated portfolio of AI systems, full stack applications, machine learning research, and production-grade software I’ve built."
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-16 grid gap-6 md:grid-cols-2",
        children: works.map((work) => /* @__PURE__ */ jsxs("div", {
          className: "rounded-2xl border border-slate-800 p-6",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold",
            children: work.title
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-3 leading-7 text-slate-400",
            children: work.impact
          })]
        }, work.title))
      })]
    })
  });
});
export {
  portfolio as default
};
//# sourceMappingURL=portfolio-CPDf432o.js.map
