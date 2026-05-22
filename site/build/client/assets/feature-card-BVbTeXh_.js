import { jsxs, jsx } from "react/jsx-runtime";
function FeatureCard({ title, description, icon }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-secondary relative flex h-full w-full flex-col items-start rounded-lg px-8 py-12 lg:px-12", children: [
    /* @__PURE__ */ jsx("div", { className: "text-primary mb-8", children: icon }),
    /* @__PURE__ */ jsx("div", { className: "text-primary mb-4 flex flex-none items-end text-xl font-medium", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-secondary max-w-sm flex-auto text-xl", children: description })
  ] });
}
export {
  FeatureCard as F
};
//# sourceMappingURL=feature-card-BVbTeXh_.js.map
