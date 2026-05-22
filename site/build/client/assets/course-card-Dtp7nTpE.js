import { jsxs, jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { useReducedMotion, motion } from "framer-motion";
import { g as getImgProps } from "./images-D8NqauwH.js";
import { T as Themed } from "./theme-D6IyWRbl.js";
import { q as ArrowIcon } from "./icons-Xl-Om4A1.js";
const arrowVariants = {
  initial: { x: 0, y: 0, opacity: 1, scale: 1 },
  action: {
    scale: [1, 1.2, 1.2, 1],
    x: [2, 10, -10, 0],
    y: [-2, -10, 10, 0],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 0.4,
      times: [0, 0.3, 0.7, 1],
      ease: ["easeIn", "easeOut", "backOut"]
    }
  }
};
const titleClassName = "text-xl/7 font-semibold text-balance tracking-tight text-gray-800 @sm:text-2xl/7 @2xl/grid:text-xl/7 @3xl/grid:text-2xl/7 @6xl/grid:text-3xl/9 dark:font-medium dark:tracking-normal dark:text-gray-200";
const descriptionClassName = "mt-2 text-balance text-base/6 text-gray-500 dark:prose-dark @6xl/grid:text-lg/6";
function CourseCardLink({
  href,
  className,
  textClassName
}) {
  const shouldReduceMotion = useReducedMotion();
  return /* @__PURE__ */ jsxs(
    motion.a,
    {
      className: clsx(
        "course-card-button-gradient inline-flex shrink-0 items-center justify-center gap-0.5 rounded-full border border-gray-300 bg-gray-100 text-gray-900 transition-all duration-300 hover:border-gray-500 hover:bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:border-slate-500",
        className
      ),
      href,
      initial: "initial",
      whileHover: "action",
      whileTap: "action",
      animate: "initial",
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "shrink-0 -translate-y-px text-base whitespace-nowrap @6xl/grid:text-lg",
              textClassName
            ),
            children: "Visit"
          }
        ),
        /* @__PURE__ */ jsx(motion.span, { variants: shouldReduceMotion ? {} : arrowVariants, children: /* @__PURE__ */ jsx(ArrowIcon, { direction: "top-right", className: "shrink-0", size: 24 }) })
      ]
    }
  );
}
function CourseCard({
  title,
  description,
  imageBuilder,
  darkImageBuilder,
  lightImageBuilder,
  courseUrl,
  label,
  horizontal = false
}) {
  function getImg(builder) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        loading: "lazy",
        ...getImgProps(builder, {
          className: clsx("z-10 h-[70%] w-auto"),
          widths: [152, 304, 456, 608, 760, 940],
          sizes: [
            "(max-width: 375px) 152px",
            "(min-width: 376px) and (max-width: 767px) 304px",
            "470px"
          ]
        })
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "course-card-gradient dark:bg-gray-850 relative flex h-full gap-5 overflow-hidden rounded-2xl bg-gray-100 p-6 ring-1 ring-[rgba(0,0,0,0.05)] ring-inset @sm:gap-6 @sm:p-9 @2xl/grid:gap-6 @2xl/grid:p-9 @6xl/grid:p-12 dark:ring-[rgba(255,255,255,0.05)]",
        horizontal ? "flex-col @2xl:flex-row" : "flex-col"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "relative",
              horizontal && "w-full @2xl:order-last @2xl:w-[62%]"
            ),
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 hidden origin-bottom-right translate-x-5 -translate-y-full -rotate-90 text-right font-mono text-[11px]/none tracking-widest text-gray-400 uppercase opacity-80 @sm:block @2xl/grid:block @6xl/grid:translate-x-6 @6xl/grid:text-xs/none dark:text-slate-500 dark:opacity-60", children: label ?? `${title} course` }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: clsx(
                    "flex aspect-[4/3] items-center justify-center rounded-xl border border-gray-300 dark:border-black dark:border-gray-950",
                    horizontal && "@2xl:aspect-[11/6]"
                  ),
                  children: [
                    imageBuilder ? getImg(imageBuilder) : /* @__PURE__ */ jsx(
                      Themed,
                      {
                        light: getImg(lightImageBuilder),
                        dark: getImg(darkImageBuilder)
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        viewBox: "0 0 440 240",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        className: clsx(
                          "pointer-events-none absolute z-0 hidden h-full w-full text-gray-300 dark:text-black",
                          horizontal && "@2xl:block"
                        ),
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M0 40H440M0 80H440M0 120H440M0 160H440M0 200H440M40 0V240M80 0V240M120 0V240M160 0V240M200 0V240M240 0V240M280 0V240M320 0V240M360 0V240M400 0V240",
                            stroke: "currentColor",
                            strokeWidth: "1",
                            vectorEffect: "non-scaling-stroke"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        viewBox: "0 0 320 240",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        className: clsx(
                          "pointer-events-none absolute z-0 h-full w-full text-gray-300 dark:text-black",
                          horizontal && "@2xl:hidden"
                        ),
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M0 39.5H320M0 79.5H320M0 119.5H320M0 159.5H320M0 199.5H320M39.5 240L39.5 0M79.5 240L79.5 0M119.5 240L119.5 0M159.5 240V0M199.5 240L199.5 0M239.5 240L239.5 0M279.5 240V0",
                            stroke: "currentColor",
                            strokeWidth: "1",
                            vectorEffect: "non-scaling-stroke"
                          }
                        )
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "flex flex-1 items-start gap-2 @xs:gap-4 @sm:gap-8",
              horizontal && "@sm:gap-1 @2xl:flex-col"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h2", { className: titleClassName, children: title }),
                /* @__PURE__ */ jsx("p", { className: descriptionClassName, children: description })
              ] }),
              /* @__PURE__ */ jsx(
                CourseCardLink,
                {
                  href: courseUrl,
                  className: clsx(
                    "h-11 w-11 translate-x-0.5 translate-y-0.5 self-end @lg:h-12 @lg:w-auto @lg:pr-4 @lg:pl-6",
                    horizontal && "@2xl:self-auto"
                  ),
                  textClassName: "@lg:not-sr-only sr-only"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function SmallCourseCard({
  title,
  description,
  imageBuilder,
  lightImageBuilder,
  darkImageBuilder,
  courseUrl
}) {
  function getImg(builder) {
    return /* @__PURE__ */ jsx(
      "img",
      {
        loading: "lazy",
        ...getImgProps(builder, {
          className: "h-32 w-auto flex-none object-contain",
          widths: [128, 256, 384],
          sizes: ["8rem"]
        })
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "course-card-gradient dark:bg-gray-850 relative col-span-full flex flex-col items-start overflow-hidden rounded-2xl bg-gray-100 p-6 ring-1 ring-[rgba(0,0,0,0.05)] ring-inset @sm:p-9 @2xl/grid:col-span-6 @2xl/grid:p-9 @6xl/grid:p-12 dark:ring-[rgba(255,255,255,0.05)] [&:nth-child(3n-2)]:col-span-12", children: [
    imageBuilder ? getImg(imageBuilder) : /* @__PURE__ */ jsx(
      Themed,
      {
        light: getImg(lightImageBuilder),
        dark: getImg(darkImageBuilder)
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: clsx(titleClassName, "mt-12 pr-10"), children: title }),
    /* @__PURE__ */ jsx("p", { className: clsx(descriptionClassName, "mt-2 mb-6 max-w-[700px]"), children: description }),
    /* @__PURE__ */ jsx(
      CourseCardLink,
      {
        href: courseUrl,
        className: clsx("mt-auto h-12 -translate-x-0.5 pr-4 pl-6")
      }
    )
  ] });
}
export {
  CourseCard as C,
  SmallCourseCard as S
};
//# sourceMappingURL=course-card-Dtp7nTpE.js.map
