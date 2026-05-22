import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import { a as ArrowLink } from "./arrow-button-DsHCk3Gf.js";
import { G as Grid } from "./grid-Bsvu4qfo.js";
import { a as H2 } from "./typography-DBSbiCOF.js";
function HeaderSection({
  ctaUrl,
  cta,
  title,
  subTitle,
  className,
  as
}) {
  return /* @__PURE__ */ jsx(Grid, { as, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 lg:space-y-0", children: [
          /* @__PURE__ */ jsx(H2, { children: title }),
          subTitle ? /* @__PURE__ */ jsx(H2, { variant: "secondary", as: "p", children: subTitle }) : null
        ] }),
        cta && ctaUrl ? /* @__PURE__ */ jsx(ArrowLink, { to: ctaUrl, direction: "right", children: cta }) : null
      ]
    }
  ) });
}
export {
  HeaderSection as H
};
