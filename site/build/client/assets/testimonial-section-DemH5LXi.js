import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Link } from "react-router";
import { A as ArrowButton } from "./arrow-button-DsHCk3Gf.js";
import { a as H2 } from "./typography-DBSbiCOF.js";
import { T as TestimonialCard } from "./testimonial-card-DnXWXfPy.js";
function TestimonialSection({
  testimonials,
  className
}) {
  const [page, setPage] = React.useState(0);
  if (!testimonials.length) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${className} mx-10vw mb-14 grid grid-cols-4 gap-6 lg:grid-cols-8 xl:grid-cols-12`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-full mb-20 flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 lg:space-y-0", children: [
            /* @__PURE__ */ jsx(H2, { children: `Don't just take my word for it.` }),
            /* @__PURE__ */ jsxs(H2, { variant: "secondary", as: "p", children: [
              "What",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/testimonials", className: "underline", children: "others" }),
              " ",
              "have to say"
            ] })
          ] }),
          testimonials.length > 3 ? /* @__PURE__ */ jsxs("div", { className: "col-span-2 col-start-11 mb-16 items-end justify-end space-x-3", children: [
            /* @__PURE__ */ jsx(
              ArrowButton,
              {
                direction: "left",
                onClick: () => setPage((p) => p - 1)
              }
            ),
            /* @__PURE__ */ jsx(
              ArrowButton,
              {
                direction: "right",
                onClick: () => setPage((p) => p + 1)
              }
            )
          ] }) : null
        ] }),
        Array.from({
          length: testimonials.length > 3 ? 3 : testimonials.length
        }).map((_, index) => {
          const testimonialIndex = (page * 3 + index) % testimonials.length;
          const testimonial = testimonials[testimonialIndex];
          if (!testimonial) return null;
          return /* @__PURE__ */ jsx(
            TestimonialCard,
            {
              testimonial,
              className: index >= 2 ? "hidden xl:block" : ""
            },
            testimonialIndex
          );
        })
      ]
    }
  );
}
export {
  TestimonialSection as T
};
