import { UNSAFE_withComponentProps, useParams } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const projects_$slug = UNSAFE_withComponentProps(function ProjectDetailPage() {
  const {
    slug
  } = useParams();
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-950 px-6 py-20 text-white",
    children: /* @__PURE__ */ jsxs("section", {
      className: "mx-auto max-w-4xl",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm uppercase tracking-[0.3em] text-slate-400",
        children: "Project Case Study"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-4 text-5xl font-bold",
        children: slug
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-6 text-lg leading-8 text-slate-400",
        children: "This page will render the full MDX case study for the selected project."
      })]
    })
  });
});
export {
  projects_$slug as default
};
//# sourceMappingURL=projects._slug-CnkXu22g.js.map
