import { UNSAFE_withComponentProps } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { v as MicrophoneIcon } from "./icons-DQAXl5Y1.js";
import { c as H4, P as Paragraph } from "./typography-DBSbiCOF.js";
import "clsx";
import "react";
const handle = {
  getSitemapEntries: () => null
};
const index = UNSAFE_withComponentProps(function NoCallSelected() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-full min-h-[300px] flex-col items-center justify-center rounded-lg bg-gray-100 p-8 text-center lg:min-h-[500px] dark:bg-gray-800",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mb-6 rounded-full bg-gray-200 p-6 text-gray-400 dark:bg-gray-700 dark:text-gray-500",
      children: /* @__PURE__ */ jsx(MicrophoneIcon, {
        size: 48
      })
    }), /* @__PURE__ */ jsx(H4, {
      as: "h2",
      className: "mb-2",
      children: "Select a call"
    }), /* @__PURE__ */ jsx(Paragraph, {
      className: "max-w-md text-gray-500 dark:text-slate-400",
      children: "Choose a call from the list to listen, respond, and publish it to the podcast."
    })]
  });
});
export {
  index as default,
  handle
};
