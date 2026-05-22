import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import * as React from "react";
const fontSize = {
  h1: "leading-tight text-4xl md:text-5xl",
  h2: "leading-tight text-3xl md:text-4xl",
  h3: "text-2xl font-medium md:text-3xl",
  h4: "text-xl font-medium md:text-2xl",
  h5: "text-lg font-medium md:text-xl",
  h6: "text-lg font-medium"
};
const titleColors = {
  primary: "text-black dark:text-white",
  secondary: "text-gray-600 dark:text-slate-500"
};
function Title({
  variant = "primary",
  size,
  as,
  className,
  ...rest
}) {
  const Tag = as ?? size;
  return /* @__PURE__ */ jsx(
    Tag,
    {
      className: clsx(fontSize[size], titleColors[variant], className),
      ...rest
    }
  );
}
function H1(props) {
  return /* @__PURE__ */ jsx(Title, { ...props, size: "h1" });
}
function H2(props) {
  return /* @__PURE__ */ jsx(Title, { ...props, size: "h2" });
}
function H3(props) {
  return /* @__PURE__ */ jsx(Title, { ...props, size: "h3" });
}
function H4(props) {
  return /* @__PURE__ */ jsx(Title, { ...props, size: "h4" });
}
function H5(props) {
  return /* @__PURE__ */ jsx(Title, { ...props, size: "h5" });
}
function H6(props) {
  return /* @__PURE__ */ jsx(Title, { ...props, size: "h6" });
}
function Paragraph({
  className,
  prose = true,
  as = "p",
  textColorClassName = "text-secondary",
  ...rest
}) {
  return React.createElement(as, {
    className: clsx("max-w-full text-lg", textColorClassName, className, {
      "prose prose-light dark:prose-dark": prose
    }),
    ...rest
  });
}
export {
  H3 as H,
  Paragraph as P,
  H6 as a,
  H4 as b,
  H2 as c,
  H5 as d,
  H1 as e
};
//# sourceMappingURL=typography-DDpAXXrz.js.map
