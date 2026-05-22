import { UNSAFE_withComponentProps, Form, UNSAFE_withErrorBoundaryProps, redirect, data } from "react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { u as useCapturedRouteError } from "./misc-react-BeZfIuw-.js";
import "@sentry/react-router";
import "md5-hash";
import "react";
import "./images-Dyd95Mrb.js";
import "cloudinary-build-url";
import "clsx";
import "emoji-regex";
import "./misc-CQO4K9rH.js";
import "date-fns";
const handle = {
  getSitemapEntries: () => null
};
async function loader() {
  return data({});
}
async function action({
  request
}) {
  return redirect(new URL(request.url).pathname);
}
const guestInfo = UNSAFE_withComponentProps(function GuestInfo({
  loaderData: data2
}) {
  return /* @__PURE__ */ jsxs("div", {
    children: [`TODO: make this a thing...`, /* @__PURE__ */ jsx("pre", {
      children: JSON.stringify(data2, null, 2)
    }), /* @__PURE__ */ jsx(Form, {
      method: "POST",
      noValidate: true,
      children: /* @__PURE__ */ jsx("button", {
        type: "submit",
        children: "submit"
      })
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useCapturedRouteError();
  console.error(error);
  if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Error"
      }), /* @__PURE__ */ jsx("pre", {
        children: error.stack
      })]
    });
  } else {
    return /* @__PURE__ */ jsx("h2", {
      children: "Unknown Error"
    });
  }
});
export {
  ErrorBoundary,
  action,
  guestInfo as default,
  handle,
  loader
};
