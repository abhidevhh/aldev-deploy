import { jsx, jsxs } from "react/jsx-runtime";
import { g as getImgProps, a as getImageBuilder } from "./images-D8NqauwH.js";
function TestimonialCard({
  testimonial,
  className = ""
}) {
  const img = /* @__PURE__ */ jsx(
    "img",
    {
      ...getImgProps(
        getImageBuilder(
          testimonial.cloudinaryId,
          `${testimonial.author} profile`
        ),
        {
          className: "mr-8 h-16 w-16 flex-none rounded-full object-cover",
          widths: [64, 128, 256],
          sizes: ["4rem"],
          transformations: {
            gravity: "face:center",
            resize: {
              aspectRatio: "1:1",
              type: "fill"
            }
          }
        }
      )
    }
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `bg-secondary col-span-4 flex flex-col justify-between gap-2 rounded-lg p-16 ${className}`,
      id: testimonial.id,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "quote-child prose-base mb-6",
            dangerouslySetInnerHTML: { __html: testimonial.testimonial }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          testimonial.link ? /* @__PURE__ */ jsx("a", { href: testimonial.link, target: "_blank", rel: "noreferrer", children: img }) : img,
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-primary mb-2 text-lg leading-none font-medium", children: testimonial.link ? /* @__PURE__ */ jsx(
              "a",
              {
                className: "underline",
                href: testimonial.link,
                target: "_blank",
                rel: "noreferrer",
                children: testimonial.author
              }
            ) : testimonial.author }),
            /* @__PURE__ */ jsx("p", { className: "text-secondary text-sm leading-none", children: testimonial.company })
          ] })
        ] })
      ]
    }
  );
}
export {
  TestimonialCard as T
};
//# sourceMappingURL=testimonial-card-CZgpZga8.js.map
