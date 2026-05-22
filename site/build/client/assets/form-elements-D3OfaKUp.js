import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
import * as React from "react";
function Label({ className, ...labelProps }) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...labelProps,
      className: clsx(
        "inline-block text-lg text-gray-500 dark:text-slate-500",
        className
      )
    }
  );
}
const inputClassName = "placeholder-gray-500 dark:disabled:text-slate-500 focus-ring px-11 py-8 w-full text-black disabled:text-gray-400 dark:text-white text-lg font-medium bg-gray-100 dark:bg-gray-800 rounded-lg";
const Input = function Input2({
  ref,
  ...props
}) {
  const className = clsx(inputClassName, props.className);
  if (props.type === "textarea") {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        ...props,
        className
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      className,
      ref
    }
  );
};
function InputError({ children, id }) {
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ jsx("p", { role: "alert", id, className: "text-sm text-red-500", children });
}
function Field({
  ref,
  defaultValue,
  error,
  name,
  label,
  className,
  description,
  id,
  additionalAriaDescribedBy,
  autoComplete,
  required = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    FieldContainer,
    {
      id,
      label,
      className,
      error,
      description,
      additionalAriaDescribedBy,
      children: ({ inputProps }) => /* @__PURE__ */ jsx(
        Input,
        {
          ref,
          required,
          ...props,
          ...inputProps,
          name,
          autoComplete: autoComplete ?? name,
          defaultValue
        }
      )
    }
  );
}
function FieldContainer({
  error,
  label,
  className,
  description,
  id,
  children,
  additionalAriaDescribedBy
}) {
  const defaultId = React.useId();
  const inputId = id ?? defaultId;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;
  const hasMarginBottomClass = className?.includes("mb-");
  const ariaDescribedBy = [
    error ? errorId : description ? descriptionId : null,
    additionalAriaDescribedBy ?? null
  ].filter(Boolean).join(" ").trim();
  return /* @__PURE__ */ jsxs("div", { className: clsx(!hasMarginBottomClass && "mb-8", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-baseline justify-between gap-2", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: inputId, children: label }),
      error ? /* @__PURE__ */ jsx(InputError, { id: errorId, children: error }) : description ? /* @__PURE__ */ jsx("div", { id: descriptionId, className: "text-primary text-lg", children: description }) : null
    ] }),
    children({
      inputProps: {
        id: inputId,
        "aria-describedby": ariaDescribedBy || void 0
      }
    })
  ] });
}
function ButtonGroup({
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4", children });
}
function ErrorPanel({
  children,
  id
}) {
  return /* @__PURE__ */ jsxs("div", { role: "alert", className: "relative mt-8 px-11 py-8", id, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-lg bg-red-500 opacity-25" }),
    /* @__PURE__ */ jsx("div", { className: "text-primary relative text-lg font-medium", children })
  ] });
}
export {
  ButtonGroup as B,
  ErrorPanel as E,
  Field as F,
  InputError as I,
  Label as L,
  Input as a,
  FieldContainer as b,
  inputClassName as i
};
//# sourceMappingURL=form-elements-D3OfaKUp.js.map
