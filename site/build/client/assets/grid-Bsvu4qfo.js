import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
const Grid = function Grid2({
  ref,
  children,
  className,
  as: Tag = "div",
  featured,
  nested,
  rowGap,
  id
}) {
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      ref,
      id,
      className: clsx("relative", {
        "mx-10vw": !nested,
        "w-full": nested,
        "py-10 md:py-24 lg:pt-36 lg:pb-40": featured
      }),
      children: [
        featured ? /* @__PURE__ */ jsx("div", { className: "-mx-5vw absolute inset-0", children: /* @__PURE__ */ jsx("div", { className: "bg-secondary mx-auto h-full w-full max-w-[96rem] rounded-lg" }) }) : null,
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              "relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6",
              {
                "mx-auto max-w-7xl": !nested,
                "gap-y-4 lg:gap-y-6": rowGap
              },
              className
            ),
            children
          }
        )
      ]
    }
  );
};
export {
  Grid as G
};
//# sourceMappingURL=grid-Bsvu4qfo.js.map
